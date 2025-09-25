import { useState, useRef, useEffect } from 'react'
import './InputArea.css'

const InputArea = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage('')
      resetTextareaHeight()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      const maxHeight = 120 // 최대 높이 (약 6줄)
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  return (
    <div className="input-area">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="프로젝트 관리에 대해 질문해보세요..."
            disabled={isLoading}
            rows={1}
            className="message-input"
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputArea
