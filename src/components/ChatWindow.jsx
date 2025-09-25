import { forwardRef, useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import WelcomeScreen from './WelcomeScreen'
import './ChatWindow.css'

const ChatWindow = forwardRef(({ messages, isLoading, onSuggestedMessage, showWelcome }, ref) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  return (
    <div className="chat-window" ref={ref}>
      <div className="chat-content">
        {showWelcome ? (
          <WelcomeScreen onSuggestedMessage={onSuggestedMessage} />
        ) : (
          <div className="messages-container">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="loading-indicator">
                <div className="typing-animation">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  )
})

ChatWindow.displayName = 'ChatWindow'

export default ChatWindow
