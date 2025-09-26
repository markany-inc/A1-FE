import { useState, useEffect, useRef } from 'react'
import ChatWindow from './components/ChatWindow'
import InputArea from './components/InputArea'
import SidePanel from './components/SidePanel'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [sidePanelData, setSidePanelData] = useState({ projects: [], suggestions: [] })
  const chatWindowRef = useRef(null)

  // 로컬 스토리지에서 채팅 기록 불러오기
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages)
      setMessages(parsedMessages)
      setShowWelcome(parsedMessages.length === 0)
    }
  }, [])

  // 메시지 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setShowWelcome(false)
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('받은 데이터:', data)
      
      const botMessage = {
        id: Date.now() + 1,
        content: data.content || '죄송합니다. 응답을 받을 수 없습니다.',
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      
      // 사이드 패널 열기 조건 확인
      if (data.hasImportantInfo === true) {
        console.log('사이드패널 열기 조건 만족')
        setSidePanelData({
          projects: data.projects || [],
          suggestions: data.suggestions || []
        })
        setSidePanelOpen(true)
      } else {
        console.log('사이드패널 열기 조건 불만족:', data.hasImportantInfo)
      }
      
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      const errorMessage = {
        id: Date.now() + 1,
        content: '네트워크 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedMessage = (content) => {
    sendMessage(content)
  }

  const handleHomeClick = () => {
    setShowWelcome(true)
    setSidePanelOpen(false)
  }

  const closeSidePanel = () => {
    setSidePanelOpen(false)
  }

  return (
    <div className={`app ${sidePanelOpen ? 'with-side-panel' : ''}`}>
      {messages.length > 0 && (
        <button className="home-button" onClick={handleHomeClick}>
          🏠
        </button>
      )}
      <div 
        className="main-content"
        style={{ 
          width: sidePanelOpen ? '50%' : '100%' 
        }}
      >
        <ChatWindow 
          ref={chatWindowRef}
          messages={messages} 
          isLoading={isLoading}
          onSuggestedMessage={handleSuggestedMessage}
          showWelcome={showWelcome}
        />
        <InputArea onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
      
      <SidePanel 
        isOpen={sidePanelOpen}
        onClose={closeSidePanel}
        projects={sidePanelData.projects}
        suggestions={sidePanelData.suggestions}
        onSendMessage={sendMessage}
      />
    </div>
  )
}

export default App
