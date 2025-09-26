import ReactMarkdown from 'react-markdown'
import './MessageBubble.css'

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user'
  
  return (
    <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
      <div className="message-content">
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        )}
      </div>
      <div className="message-time">
        {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  )
}

export default MessageBubble
