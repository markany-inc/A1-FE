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
      // 환경별 API URL 설정
      const isDevelopment = import.meta.env.DEV
      const apiUrl = isDevelopment 
        ? '/api/chat'  // 개발환경: 프록시 사용
        : 'https://kej7nzklnb.execute-api.ap-northeast-2.amazonaws.com/dev/api/chat'  // 배포환경: 직접 호출
      
      console.log('API 호출 시작:', apiUrl, '(개발환경:', isDevelopment, ')')
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          message: content,
          session_id: `session_${Date.now()}`
        })
      })

      console.log('응답 상태:', response.status, response.statusText)
      console.log('응답 헤더:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error('HTTP 오류 응답:', errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const data = await response.json()
      console.log('Strands Agent 응답:', data)
      
      const botMessage = {
        id: Date.now() + 1,
        content: data.response || '죄송합니다. 응답을 받을 수 없습니다.',
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      
      // 현재 API는 hasProjects, projects, suggestions를 제공하지 않으므로 사이드패널은 열지 않음
      console.log('API 응답 데이터:', {
        response: data.response,
        session_id: data.session_id,
        timestamp: data.timestamp,
        agent_type: data.agent_type,
        mcp_sources: data.mcp_sources
      })
      
    } catch (error) {
      console.error('상세 오류 정보:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
      
      let errorMessage = '알 수 없는 오류가 발생했습니다.'
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'CORS 또는 네트워크 연결 오류입니다. 서버 설정을 확인해주세요.'
      } else if (error.message.includes('HTTP error')) {
        errorMessage = `서버 오류: ${error.message}`
      } else if (error.name === 'SyntaxError') {
        errorMessage = '서버 응답 형식 오류입니다.'
      }
      
      const errorMsg = {
        id: Date.now() + 1,
        content: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMsg])
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
