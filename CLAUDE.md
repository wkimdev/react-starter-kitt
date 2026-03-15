# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev        # 개발 서버 (localhost:5173)
npm run build      # 프로덕션 빌드
npm run preview    # 빌드 결과 미리보기
npm run lint       # ESLint 검사
```

테스트 프레임워크는 현재 미설치. 추가 시 vitest 권장.

## 아키텍처

### 레이아웃 계층

라우터에서 레이아웃을 중첩 라우트로 감싼다. 페이지를 새로 만들 때 반드시 어느 레이아웃에 속할지 결정하고 `src/router/index.jsx`에 등록해야 한다.

| 레이아웃 | 경로 | 구성 |
|---------|------|------|
| `RootLayout` | `/`, `/about`, `/counter` | Header + Footer + Toaster |
| `AuthLayout` | `/login`, `/register` | 중앙 Card + Toaster |
| `DashboardLayout` | `/dashboard/*` | Sidebar + Header + Toaster |

### 컴포넌트 계층

- `src/components/ui/` — shadcn/ui 원본. **직접 수정 최소화**. 신규 컴포넌트는 `npx shadcn@latest add <name>` 패턴으로 추가한다.
- `src/components/layout/` — Header, Footer, Sidebar. 레이아웃 수준의 Organism.
- `src/components/common/` — 여러 페이지에서 재사용되는 조합 컴포넌트 (DataTable, PageHeader, EmptyState, Spinner).

### 상태 관리 (Zustand)

스토어 3개가 독립적으로 운영된다.

- `authStore` — `user`, `token` 보관. `persist` 미들웨어로 `localStorage('auth-storage')`에 자동 저장. 로그인: `setAuth({ user, token })`, 로그아웃: `clearAuth()`.
- `counterStore` — 카운터 예시. devtools만 적용.
- `sidebarStore` — 사이드바 collapsed 상태.

스토어 외부(인터셉터 등)에서 상태를 읽을 때는 `useAuthStore.getState()`를 사용한다 (훅 규칙 우회).

### API 레이어

`src/services/api.js`가 Axios 인스턴스 단일 진입점이다.

- 요청 시 `authStore`에서 토큰을 꺼내 `Authorization: Bearer` 헤더 자동 첨부.
- 응답은 `response.data`로 자동 unwrap되므로 호출부에서 `.data`를 다시 꺼낼 필요 없음.
- 401 응답 시 `clearAuth()` 호출 후 `/login`으로 리다이렉트.

API 호출 상태(`loading`, `error`, `data`)는 `src/hooks/useApi.js`의 `useApi(apiFunction)`로 관리한다.

### 폼 패턴

`react-hook-form` + `zod` + shadcn/ui `Form` 컴포넌트 조합을 표준으로 사용한다. `LoginPage`, `RegisterPage`가 참조 구현이다.

```jsx
const form = useForm({ resolver: zodResolver(schema), defaultValues: { ... } })
// <Form>, <FormField>, <FormItem>, <FormLabel>, <FormControl>, <FormMessage> 조합
```

### DataTable 사용법

`src/components/common/DataTable.jsx`는 `columns`(TanStack 컬럼 정의)와 `data` 배열을 받는다. `searchKey`를 넘기면 해당 컬럼 기준 텍스트 필터가 활성화된다. `columns`는 `useMemo`로 감싸야 불필요한 리렌더링을 방지한다.

### 경로 별칭

`@` → `src/` 로 매핑된다 (`vite.config.js` + `jsconfig.json`). 모든 import는 상대 경로 대신 `@/` 를 사용한다.

### CSS / 스타일

Tailwind CSS v4를 `@tailwindcss/vite` 플러그인으로 사용한다 (`tailwind.config.js` 없음). CSS 변수는 `src/index.css`의 `@layer base`에 정의되어 있으며 shadcn/ui 테마 토큰을 따른다. 클래스 병합은 `src/lib/utils.js`의 `cn()` (clsx + tailwind-merge) 함수를 사용한다.

### ESLint 주의사항

- `no-unused-vars`: 대문자 시작 변수(React 컴포넌트)와 `_` 접두사 변수는 무시됨.
- `react-refresh/only-export-components`: shadcn/ui `ui/` 파일은 variants와 컴포넌트를 같이 export하므로 warn으로 완화되어 있음 — 해당 경고는 무시해도 됨.
- `react-hooks/incompatible-library`: `useReactTable`이 React Compiler와 호환되지 않는다는 경고 — 정상 동작에는 영향 없음.
