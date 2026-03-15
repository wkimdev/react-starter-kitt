---
name: project_patterns
description: react-starter-kitt 프로젝트의 핵심 아키텍처 패턴 및 구현 관례
type: project
---

## 레이아웃 구조
- RootLayout: Header + Footer + Toaster (/, /about, /counter)
- AuthLayout: Card 중앙 정렬 (path 없이 children만 — login/register는 /login, /register로 직접 경로 정의됨)
- DashboardLayout: Sidebar + Header(variant="dashboard") + Toaster (/dashboard/*)

**Why:** 라우터에서 errorElement는 RootLayout에만 적용되어 있음. AuthLayout과 DashboardLayout에는 errorElement 미설정.

## 컴포넌트 패턴
- 공통 컴포넌트: DataTable, PageHeader, EmptyState, Spinner (src/components/common/)
- 레이아웃 컴포넌트: Header, Footer, Sidebar (src/components/layout/)
- Header에는 NavLink가 컴포넌트 내부에 인라인 함수 컴포넌트로 정의됨 (렌더마다 재생성 — 개선 여지)
- DashboardPage와 UsersPage 모두 동일한 사용자 샘플 데이터를 별도로 정의하고 있음 (데이터 중복)

## 상태 관리 패턴
- authStore: persist + devtools 미들웨어, partialize로 user/token만 저장
- counterStore: devtools만 적용
- sidebarStore: devtools만 적용, persist 없음 (페이지 새로고침 시 collapsed 상태 초기화)
- 스토어 외부에서는 useAuthStore.getState() 패턴 준수됨 (api.js에서 사용)

## API 레이어
- src/services/api.js: axios 인스턴스, 요청 인터셉터(Bearer 자동첨부), 응답 인터셉터(data unwrap + 401 처리)
- 401 처리 시 window.location.href = '/login' (React Router navigate 미사용 — 의도적 선택)
- useApi(apiFunction): data/loading/error/execute/reset 반환하는 범용 훅

## 폼 패턴
- react-hook-form + zod + shadcn/ui Form 컴포넌트 조합
- LoginPage: zodResolver, isSubmitting 상태로 버튼 disabled 처리
- RegisterPage: .refine()으로 비밀번호 확인 교차 검증

## DataTable 관례
- columns는 useMemo로 감쌈 (DashboardPage, UsersPage 모두 준수)
- searchKey prop으로 단일 컬럼 필터링
- 빈 데이터 상태는 DataTable 내부에서 처리 (EmptyState 컴포넌트 미사용)

## 주요 발견 이슈
- SettingsPage 보안 탭: react-hook-form 없이 비제어 Input 사용 (프로젝트 폼 표준과 불일치)
- AboudPage Accordion key: idx (배열 인덱스) 사용 — 고정 데이터이므로 실질적 문제는 없으나 question을 key로 쓰는 것이 더 명시적
- Header NavLink: 컴포넌트 내부 함수형 컴포넌트 선언으로 매 렌더마다 재생성
- DashboardPage 통계 카드의 change 색상: 하드코딩된 text-green-600 (AnalyticsPage는 up prop으로 조건부 처리)
- 인증 보호 라우트 미구현: /dashboard/* 경로가 로그인 없이 접근 가능
- DataTable 검색 Input에 aria-label 미설정
- Sidebar는 모바일에서 hidden (모바일 대시보드 접근 불가)

**How to apply:** 추후 PR 리뷰 시 위 패턴 위반 여부를 우선 체크
