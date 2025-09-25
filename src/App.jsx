import { useState, useEffect, useRef } from 'react'
import ChatWindow from './components/ChatWindow'
import InputArea from './components/InputArea'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
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
      // 실제 구현에서는 백엔드 API 호출
      // 현재는 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const botMessage = {
        id: Date.now() + 1,
        content: `프로젝트 매니저 AI입니다. "${content}"에 대해 도움을 드리겠습니다. 프로젝트 관리, 일정 계획, 팀 협업에 관한 질문을 해주세요.`,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('메시지 전송 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedMessage = (content) => {
    sendMessage(content)
  }

  const handleHomeClick = () => {
    setShowWelcome(true)
  }

  return (
    <div className="app">
      {messages.length > 0 && (
        <button className="home-button" onClick={handleHomeClick}>
          🏠
        </button>
      )}
      <ChatWindow 
        ref={chatWindowRef}
        messages={messages} 
        isLoading={isLoading}
        onSuggestedMessage={handleSuggestedMessage}
        showWelcome={showWelcome}
      />
      <InputArea onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  )
}

export default App
