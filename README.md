# AI Project Manager Chatbot (A1-FE)

## 📋 프로젝트 개요

AI Project Manager Chatbot은 Team A1에서 개발한 프로젝트 관리 전용 AI 어시스턴트입니다. 이 웹 애플리케이션은 React와 Vite를 기반으로 구축되었으며, AWS Lambda 기반의 Strands Agent API와 연동하여 지능적인 프로젝트 관리 지원을 제공합니다.

## ✨ 주요 기능

### 🤖 AI 어시스턴트
- **프로젝트 계획 및 일정 관리**: 프로젝트 스케줄링과 마일스톤 관리 지원
- **팀 커뮤니케이션**: 효율적인 팀 협업을 위한 소통 도구
- **히스토리 분석 및 대응 전략**: 과거 프로젝트 데이터 분석을 통한 인사이트 제공

### 💬 채팅 인터페이스
- **실시간 대화**: 자연어 기반의 직관적인 대화형 인터페이스
- **마크다운 지원**: 봇 응답에서 서식이 있는 텍스트 표시
- **메시지 히스토리**: 로컬 스토리지를 통한 대화 기록 보존
- **타이핑 애니메이션**: 봇 응답 대기 시 시각적 피드백

### 🎨 사용자 인터페이스
- **웰컴 스크린**: 추천 질문과 기능 소개가 포함된 시작 화면
- **반응형 디자인**: 다양한 화면 크기에 최적화된 레이아웃
- **사이드 패널**: 프로젝트 관련 정보 및 추가 제안사항 표시
- **홈 버튼**: 언제든지 초기 화면으로 돌아갈 수 있는 네비게이션

## 🛠 기술 스택

### Frontend
- **React 18.2.0**: 컴포넌트 기반 UI 라이브러리
- **Vite 4.4.5**: 빠른 개발 서버 및 빌드 도구
- **React Markdown 10.1.0**: 마크다운 렌더링 지원

### Backend Integration
- **AWS Lambda**: Strands Agent API 호스팅
- **API Gateway**: RESTful API 엔드포인트 관리
- **CORS 지원**: 크로스 오리진 요청 처리

### Development Tools
- **TypeScript 지원**: 타입 안전성을 위한 개발 환경
- **ESLint**: 코드 품질 관리
- **Hot Module Replacement**: 개발 중 실시간 업데이트

## 📁 프로젝트 구조

```
A1-FE/
├── public/                 # 정적 파일
├── src/
│   ├── components/         # React 컴포넌트
│   │   ├── ChatWindow.jsx     # 채팅 메시지 표시 영역
│   │   ├── InputArea.jsx      # 메시지 입력 영역
│   │   ├── MessageBubble.jsx  # 개별 메시지 컴포넌트
│   │   ├── SidePanel.jsx      # 프로젝트 정보 사이드 패널
│   │   └── WelcomeScreen.jsx  # 초기 환영 화면
│   ├── App.jsx             # 메인 애플리케이션 컴포넌트
│   ├── App.css             # 전역 스타일
│   ├── index.css           # 기본 스타일
│   └── main.jsx            # 애플리케이션 진입점
├── .env                    # 환경 변수
├── package.json            # 프로젝트 의존성
├── vite.config.js          # Vite 설정
└── index.html              # HTML 템플릿
```

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn 패키지 매니저

### 설치
```bash
# 저장소 클론
git clone https://github.com/markany-inc/A1-FE.git
cd A1-FE

# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# 개발 모드로 실행 (http://localhost:5173)
npm run dev
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## ⚙️ 환경 설정

### 환경 변수 (.env)
```env
# Strands Agent API URL
VITE_STRANDS_AGENT_API_URL=https://kej7nzklnb.execute-api.ap-northeast-2.amazonaws.com/dev/api/chat
```

### API 프록시 설정 (vite.config.js)
개발 환경에서 CORS 문제 해결을 위한 프록시 설정:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://kej7nzklnb.execute-api.ap-northeast-2.amazonaws.com/dev',
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/api/, '/api')
    }
  }
}
```

## 🔌 API 연동

### Strands Agent API
- **엔드포인트**: `/api/chat`
- **메서드**: POST
- **요청 형식**:
```json
{
  "message": "사용자 메시지",
  "session_id": "session_timestamp"
}
```
- **응답 형식**:
```json
{
  "response": "AI 응답 메시지",
  "session_id": "세션 ID",
  "timestamp": "응답 시간",
  "agent_type": "에이전트 타입",
  "mcp_sources": "MCP 소스 정보"
}
```

## 🎯 주요 컴포넌트

### App.jsx
- 전체 애플리케이션의 상태 관리
- API 통신 로직
- 메시지 히스토리 관리
- 로컬 스토리지 연동

### ChatWindow.jsx
- 메시지 표시 영역
- 스크롤 자동 조정
- 웰컴 스크린과 채팅 화면 전환

### InputArea.jsx
- 사용자 입력 처리
- 자동 높이 조절 텍스트 영역
- 키보드 단축키 지원 (Enter: 전송, Shift+Enter: 줄바꿈)

### MessageBubble.jsx
- 개별 메시지 렌더링
- 마크다운 지원 (봇 메시지)
- 타임스탬프 표시

### WelcomeScreen.jsx
- 초기 화면 UI
- 추천 질문 버튼
- 기능 소개 섹션

### SidePanel.jsx
- 프로젝트 관련 정보 표시
- 추가 제안사항 제공
- 슬라이드 애니메이션

## 🎨 UI/UX 특징

### 디자인 시스템
- **색상 팔레트**: 현대적이고 전문적인 다크/라이트 테마
- **타이포그래피**: 가독성을 고려한 폰트 선택
- **애니메이션**: 부드러운 전환 효과와 마이크로 인터랙션

### 반응형 디자인
- 모바일 우선 접근 방식
- 태블릿 및 데스크톱 최적화
- 터치 친화적 인터페이스

### 접근성
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 고대비 색상 조합

## 🔧 개발 가이드

### 코드 스타일
- ES6+ 문법 사용
- 함수형 컴포넌트와 Hooks 패턴
- CSS 모듈화를 통한 스타일 관리

### 상태 관리
- React useState와 useEffect 활용
- 로컬 스토리지를 통한 데이터 영속성
- 컴포넌트 간 props를 통한 데이터 전달

### 성능 최적화
- React.memo를 통한 불필요한 리렌더링 방지
- useCallback과 useMemo 활용
- 코드 스플리팅 (필요시 적용 가능)

## 🚀 배포

### 빌드 최적화
```bash
npm run build
```

### 배포 옵션
- **정적 호스팅**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS CloudFront, Azure CDN
- **컨테이너**: Docker를 통한 컨테이너화

## 🐛 문제 해결

### 일반적인 문제들

#### CORS 오류
- 개발 환경: vite.config.js의 프록시 설정 확인
- 프로덕션: API 서버의 CORS 헤더 설정 확인

#### API 연결 실패
- 네트워크 연결 상태 확인
- API 엔드포인트 URL 검증
- 환경 변수 설정 확인

#### 로컬 스토리지 문제
- 브라우저 개발자 도구에서 스토리지 확인
- 프라이빗 브라우징 모드에서는 제한적 동작

## 🤝 기여 가이드

### 개발 워크플로우
1. 이슈 생성 및 할당
2. 기능 브랜치 생성
3. 개발 및 테스트
4. Pull Request 생성
5. 코드 리뷰 및 머지

### 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스 또는 보조 도구 변경
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👥 팀 정보

**Team A1** - MarkAny Inc.
- 프로젝트 관리 AI 솔루션 개발팀
- 혁신적인 AI 기술을 통한 업무 효율성 향상

## 📞 지원 및 문의

- **GitHub Issues**: [프로젝트 이슈 페이지](https://github.com/markany-inc/A1-FE/issues)
- **이메일**: team-a1@markany.com
- **문서**: [프로젝트 위키](https://github.com/markany-inc/A1-FE/wiki)

---

**마지막 업데이트**: 2024년 9월 26일
**버전**: 0.0.0
**Node.js 버전**: 16.0.0+
**React 버전**: 18.2.0
