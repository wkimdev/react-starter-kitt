---
name: component testing patterns and common pitfalls
description: Patterns for mocking Zustand stores, sonner toasts, and testing react-hook-form + zod validation in this project
type: feedback
---

## Zustand store mock pattern

All stores in this project call `useAuthStore()` without a selector (destructuring pattern), NOT `useAuthStore(selector)`. Mock with `mockReturnValue`, not `mockImplementation`.

```js
vi.mock('@/stores/authStore', () => ({ useAuthStore: vi.fn() }))
useAuthStore.mockReturnValue({ user: null, clearAuth: vi.fn() })
```

**Why:** Header.jsx and LoginPage.jsx use `const { user, clearAuth } = useAuthStore()` — no selector argument. Using `mockImplementation((selector) => selector({...}))` causes "selector is not a function" error.

**How to apply:** Always use `mockReturnValue` for store mocks unless the component explicitly calls `useStore((state) => state.someField)`.

## Sonner toast mock with vi.hoisted

When mocking `sonner` and needing to assert on `toast.success`/`toast.error` calls, use `vi.hoisted` to define mock functions before `vi.mock` hoisting.

```js
const { mockToastSuccess, mockToastError } = vi.hoisted(() => ({
  mockToastSuccess: vi.fn(),
  mockToastError: vi.fn(),
}))
vi.mock('sonner', () => ({ toast: { success: mockToastSuccess, error: mockToastError } }))
```

**Why:** `vi.mock` is hoisted to top of file. Variables defined outside with `const` are not initialized yet when the factory runs — causes "Cannot access before initialization" error.
**How to apply:** Any time mock functions need to be referenced both inside `vi.mock` factory AND in test assertions.

## Zod v4 + @hookform/resolvers v5 email validation

`type="email"` inputs in jsdom may prevent form submit before react-hook-form validation runs, causing zod email errors not to appear in DOM. Use `mockSetAuth` not-called assertion as a proxy, or use `queryByText` conditionally.

**Why:** jsdom's HTML5 constraint validation for `type="email"` can intercept the submit event.
**How to apply:** For email field validation tests, assert that the submit handler was NOT called rather than asserting the error message appeared.

## Avatar button selection in Header

The Header's avatar button (DropdownMenuTrigger) has no accessible name. Find it by the avatar fallback text (first character of user.name).

```js
const avatarFallback = screen.getByText('테') // first char of '테스트 유저'
await user.click(avatarFallback)
```

**How to apply:** When testing Header user dropdown, click the avatar fallback text character, not a button role.
