# exquiz.me - 실시간 퀴즈 플랫폼

exquiz.me는 실시간으로 퀴즈를 출제하고 참여할 수 있는 인터랙티브 퀴즈 플랫폼입니다. 데스크톱에서 퀴즈를 출제하고, 모바일 기기에서 참여자들이 실시간으로 퀴즈를 풀 수 있습니다.

## 시연 영상

- [교사용 시연영상](https://youtu.be/2gNm6TRiCKs) - 퀴즈 출제 및 관리 기능
- [학생용 시연영상](https://youtu.be/6wPXgYKShcM) - 퀴즈 참여 및 풀이 기능

## 주요 기능

### 퀴즈 출제 기능 (데스크톱)

- 다양한 유형의 퀴즈 생성 (객관식, 주관식, O/X, 넌센스)
- 이미지 및 비디오 콘텐츠 삽입 가능
- 문제별 시간 제한 및 점수 설정
- 실시간 참가자 관리 및 결과 확인
- 퀴즈 세트 저장 및 재사용

### 퀴즈 풀이 기능 (모바일)

- PIN 코드를 통한 간편한 퀴즈 참여
- 실시간 문제 풀이 및 피드백
- 참가자 랭킹 시스템
- 직관적인 모바일 인터페이스

## 기술 스택

### 프론트엔드

- [Next.js](https://nextjs.org/) - React 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 지원
- [Mantine UI](https://mantine.dev/) - UI 컴포넌트 라이브러리
- [Recoil](https://recoiljs.org/) - 상태 관리 라이브러리

### 실시간 통신

- [SockJS](https://github.com/sockjs/sockjs-client) - WebSocket 기반 실시간 통신
- [StompJS](https://github.com/stomp-js/stompjs) - STOMP 메시징 프로토콜 클라이언트

### 기타 주요 라이브러리

- [Axios](https://axios-http.com/) - HTTP 클라이언트
- [Mantine Hooks](https://mantine.dev/hooks/use-debounced-state/) - 유용한 React 훅 모음
- [Tabler Icons](https://tabler-icons.io/) - 아이콘 라이브러리

## 프로젝트 구조

```
exquiz_web/
├── components/         # 재사용 가능한 컴포넌트
│   ├── create/         # 퀴즈 생성 관련 컴포넌트
│   ├── display/        # 퀴즈 표시 관련 컴포넌트
│   ├── m/              # 모바일 관련 컴포넌트
│   ├── play/           # 퀴즈 플레이 관련 컴포넌트
│   ├── ConstValues.tsx # 상수 값 정의
│   └── States.tsx      # Recoil 상태 정의
├── pages/              # 페이지 컴포넌트
│   ├── api/            # API 라우트
│   ├── display/        # 퀴즈 디스플레이 페이지
│   ├── lobby/          # 로비 페이지
│   ├── m/              # 모바일 페이지
│   │   └── play/       # 모바일 퀴즈 플레이 페이지
│   ├── _app.tsx        # Next.js 앱 컴포넌트
│   ├── create.tsx      # 퀴즈 생성 페이지
│   ├── index.tsx       # 메인 페이지
│   └── result.tsx      # 결과 페이지
├── public/             # 정적 파일
├── styles/             # 스타일 파일
├── next.config.js      # Next.js 설정
└── tailwind.config.js  # Tailwind CSS 설정
```

## 특징적인 기술 구현

### WebSocket을 통한 실시간 통신

- SockJS와 StompJS를 활용하여 서버와 클라이언트 간 실시간 통신 구현
- 퀴즈 진행 상황, 참가자 응답, 결과 등을 실시간으로 동기화

### 비동기 프로그래밍

- async/await를 활용한 비동기 데이터 처리
- 효율적인 API 호출 및 응답 처리

### 스크롤 관리

- 퀴즈 출제 시 스크롤 위치 엄격히 관리
- 사용자 경험 최적화를 위한 스크롤 인터랙션 구현

## 시작하기

### 개발 환경 설정

1. 저장소 클론

```bash
git clone [repository-url]
cd exquiz_web
```

2. 의존성 설치

```bash
yarn install
# 또는
npm install
```

3. 개발 서버 실행

```bash
yarn dev
# 또는
npm run dev
```

4. 브라우저에서 확인

- 데스크톱: [http://localhost:3000](http://localhost:3000)
- 모바일: [http://localhost:3000/m/enter](http://localhost:3000/m/enter)

## 배포

Next.js 앱은 [Vercel Platform](https://vercel.com)을 통해 쉽게 배포할 수 있습니다.

```bash
yarn build
# 또는
npm run build
```

# exquiz.me - Real-time Quiz Platform

exquiz.me is an interactive quiz platform that allows real-time quiz creation and participation. Teachers can create quizzes on desktop devices, while students can solve them in real-time on mobile devices.

## Demonstration Videos

- [Teacher Demonstration](https://youtu.be/2gNm6TRiCKs) - Quiz creation and management features
- [Student Demonstration](https://youtu.be/6wPXgYKShcM) - Quiz participation and solving features

## Key Features

### Quiz Creation (Desktop)

- Various quiz types (multiple choice, short answer, true/false, word puzzles)
- Support for image and video content
- Customizable time limits and scores per question
- Real-time participant management and results tracking
- Quiz set saving and reuse

### Quiz Solving (Mobile)

- Easy quiz participation via PIN code
- Real-time problem solving and feedback
- Participant ranking system
- Intuitive mobile interface

## Technology Stack

### Frontend

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [Mantine UI](https://mantine.dev/) - UI component library
- [Recoil](https://recoiljs.org/) - State management library

### Real-time Communication

- [SockJS](https://github.com/sockjs/sockjs-client) - WebSocket-based real-time communication
- [StompJS](https://github.com/stomp-js/stompjs) - STOMP messaging protocol client

### Other Key Libraries

- [Axios](https://axios-http.com/) - HTTP client
- [Mantine Hooks](https://mantine.dev/hooks/use-debounced-state/) - Useful React hooks
- [Tabler Icons](https://tabler-icons.io/) - Icon library

## Project Structure

```
exquiz_web/
├── components/         # Reusable components
│   ├── create/         # Quiz creation components
│   ├── display/        # Quiz display components
│   ├── m/              # Mobile components
│   ├── play/           # Quiz play components
│   ├── ConstValues.tsx # Constant definitions
│   └── States.tsx      # Recoil state definitions
├── pages/              # Page components
│   ├── api/            # API routes
│   ├── display/        # Quiz display pages
│   ├── lobby/          # Lobby pages
│   ├── m/              # Mobile pages
│   │   └── play/       # Mobile quiz play pages
│   ├── _app.tsx        # Next.js app component
│   ├── create.tsx      # Quiz creation page
│   ├── index.tsx       # Main page
│   └── result.tsx      # Results page
├── public/             # Static files
├── styles/             # Style files
├── next.config.js      # Next.js configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Technical Implementation Highlights

### WebSocket Real-time Communication

- Implementation of real-time communication between server and client using SockJS and StompJS
- Real-time synchronization of quiz progress, participant responses, and results

### Asynchronous Programming

- Asynchronous data processing using async/await
- Efficient API calls and response handling

### Scroll Management

- Strict scroll position management during quiz creation
- Scroll interactions optimized for user experience

## Getting Started

### Development Environment Setup

1. Clone the repository

```bash
git clone [repository-url]
cd exquiz_web
```

2. Install dependencies

```bash
yarn install
# or
npm install
```

3. Run development server

```bash
yarn dev
# or
npm run dev
```

4. View in browser

- Desktop: [http://localhost:3000](http://localhost:3000)
- Mobile: [http://localhost:3000/m/enter](http://localhost:3000/m/enter)

## Deployment

The Next.js app can be easily deployed using the [Vercel Platform](https://vercel.com).

```bash
yarn build
# or
npm run build
```
