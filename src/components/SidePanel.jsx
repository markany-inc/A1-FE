import { useState } from 'react'
import './SidePanel.css'

function SidePanel({ isOpen, onClose, projects, suggestions, onSendMessage }) {
  const [selectedProject, setSelectedProject] = useState(null)

  if (!isOpen) return null

  const handleSuggestionClick = (suggestion) => {
    onSendMessage(suggestion.replace(/^[📋👥📊🔍🛠️📦⚙️]\s*/, '')) // 이모지 제거
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  const handleBackToList = () => {
    setSelectedProject(null)
  }

  return (
    <div className="side-panel">
      <div className="side-panel-content">
        <div className="content-wrapper">
          <div className="header-content">
            {selectedProject ? (
              <>
                <button className="back-button" onClick={handleBackToList}>
                  ← 목록으로
                </button>
                <h3>{selectedProject.name}</h3>
              </>
            ) : (
              <h3>📋 관련 프로젝트</h3>
            )}
            <button className="close-button" onClick={onClose}>
              ✕
            </button>
          </div>
          
          {selectedProject ? (
            /* 프로젝트 상세보기 */
            <div className="project-detail">
            <div className="detail-section">
              <h4>프로젝트 정보</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">제품명:</span>
                  <span className="value">{selectedProject.product}</span>
                </div>
                <div className="detail-item">
                  <span className="label">고객사:</span>
                  <span className="value">{selectedProject.client}</span>
                </div>
                <div className="detail-item">
                  <span className="label">수행자:</span>
                  <span className="value">{selectedProject.performer}</span>
                </div>
                <div className="detail-item">
                  <span className="label">담당자:</span>
                  <span className="value">{selectedProject.manager}</span>
                </div>
                <div className="detail-item">
                  <span className="label">작업기간:</span>
                  <span className="value">{selectedProject.period}</span>
                </div>
                <div className="detail-item">
                  <span className="label">상태:</span>
                  <span className={`status ${selectedProject.status}`}>{selectedProject.status}</span>
                </div>
                <div className="detail-item">
                  <span className="label">우선순위:</span>
                  <span className={`priority ${selectedProject.priority}`}>{selectedProject.priority}</span>
                </div>
              </div>
            </div>
            
            <div className="detail-section">
              <h4>해결 내용</h4>
              <div className="content-box">
                <p>{selectedProject.content}</p>
              </div>
            </div>
            </div>
          ) : (
            /* 프로젝트 리스트 */
            <>
              <div className="projects-section">
                {projects.length === 0 ? (
                  <p>관련 프로젝트가 없습니다.</p>
                ) : (
                  projects.map(project => (
                    <div 
                      key={project.id} 
                      className="project-card clickable"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="project-header">
                        <h4>{project.name}</h4>
                        <span className={`status ${project.status}`}>{project.status}</span>
                      </div>
                      <div className="project-info">
                        <div className="info-row">
                          <span className="label">제품:</span>
                          <span className="value">{project.product}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">고객사:</span>
                          <span className="value">{project.client}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">담당자:</span>
                          <span className="value">{project.performer}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">작업기간:</span>
                          <span className="value">{project.period}</span>
                        </div>
                      </div>
                      <div className="click-hint">클릭하여 상세보기 →</div>
                    </div>
                  ))
                )}
              </div>

              {/* 제안사항 하단 고정 */}
              {suggestions.length > 0 && (
                <div className="suggestions-bottom">
                  <h4>💡 다음 행동 제안</h4>
                  <div className="chips-container">
                    {suggestions.map((suggestion, index) => (
                      <button 
                        key={index} 
                        className="suggestion-chip"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SidePanel
