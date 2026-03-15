# React Starter Kitt

Vite 7 + React 19 기반의 **프로덕션 레디 스타터킷**

## 기술 스택

| 역할 | 라이브러리 |
|------|-----------|
| 빌드 | Vite 7 |
| UI 프레임워크 | React 19 |
| 스타일 | Tailwind CSS v4 |
| UI 컴포넌트 | shadcn/ui (Radix UI 기반) |
| 아이콘 | lucide-react |
| 라우팅 | React Router v7 |
| 상태 관리 | Zustand (devtools + persist) |
| 폼 관리 | React Hook Form + Zod |
| HTTP 클라이언트 | Axios |
| 테이블 | @tanstack/react-table |
| 토스트 알림 | Sonner |

## 디렉토리 구조

```
src/
├── components/
│   ├── ui/          # shadcn/ui 컴포넌트 (button, card, form 등 23개)
│   ├── layout/      # Header, Footer, Sidebar
│   └── common/      # DataTable, PageHeader, EmptyState, Spinner
├── layouts/         # RootLayout, AuthLayout, DashboardLayout
├── pages/
│   ├── auth/        # LoginPage, RegisterPage
│   └── dashboard/   # DashboardPage, AnalyticsPage, UsersPage, SettingsPage
├── router/          # createBrowserRouter 설정
├── stores/          # counterStore, authStore, sidebarStore
├── services/        # Axios 인스턴스 + 인터셉터
├── hooks/           # useApi
└── lib/             # cn() 유틸리티
```

## 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에서 VITE_API_BASE_URL 수정

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 라우트 구조

| 경로 | 레이아웃 | 페이지 |
|------|---------|--------|
| `/` | RootLayout | 홈 |
| `/about` | RootLayout | 소개 |
| `/counter` | RootLayout | Zustand 카운터 데모 |
| `/login` | AuthLayout | 로그인 |
| `/register` | AuthLayout | 회원가입 |
| `/dashboard` | DashboardLayout | 대시보드 |
| `/dashboard/analytics` | DashboardLayout | 분석 |
| `/dashboard/users` | DashboardLayout | 사용자 관리 |
| `/dashboard/settings` | DashboardLayout | 설정 |

## 주요 기능

- **반응형 레이아웃** — 모바일 Sheet 메뉴, Sidebar 접기/펼치기
- **인증 흐름** — Zustand persist로 로그인 상태 localStorage 유지
- **DataTable** — 정렬, 검색 필터, 페이지네이션 내장
- **폼 유효성** — Zod 스키마 기반 에러 메시지 표시
- **토스트 알림** — Sonner 전역 Toaster 연동
- **API 레이어** — Bearer 토큰 자동 첨부, 401 자동 로그아웃
