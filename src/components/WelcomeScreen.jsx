import './WelcomeScreen.css'

const WelcomeScreen = ({ onSuggestedMessage }) => {
  const suggestedMessages = [
    "프로젝트 일정은 어느정도로 잡아야할까요?",
    "짱구님의 일정을 알려주세요",
    "프로젝트 히스토리 확인하는 방법",
    "코카콜라 고객사 프로젝트의 마감일을 알려주세요"
  ]

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="team-badge">Team A1</div>
          <div className="ai-icon">🤖</div>
          <h1>AI Project Manager</h1>
          <p>프로젝트 관리를 도와드리는 AI 어시스턴트입니다.</p>
        </div>
        
        <div className="features">
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>프로젝트 계획 및 일정 관리</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <span>커뮤니케이션</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span>히스토리 분석 및 대응 전략</span>
          </div>
        </div>
      </div>

      <div className="suggested-messages">
        <h3>추천 질문</h3>
        <div className="suggestions-grid">
          {suggestedMessages.map((message, index) => (
            <button
              key={index}
              className="suggestion-button"
              onClick={() => onSuggestedMessage(message)}
            >
              {message}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
