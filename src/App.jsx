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
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content })
      })

      const data = await response.json()
      
      const botMessage = {
        id: Date.now() + 1,
        content: data.content || '죄송합니다. 응답을 받을 수 없습니다.',
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
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
