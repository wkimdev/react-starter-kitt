import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import Header from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'

const mockClearAuth = vi.fn()

vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(),
}))

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )
}

// Header calls useAuthStore() without a selector, so mock returns the store object directly
function mockStoreWithUser(user) {
  useAuthStore.mockReturnValue({ user, clearAuth: mockClearAuth })
}

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when user is not logged in', () => {
    beforeEach(() => {
      mockStoreWithUser(null)
    })

    it('renders the logo with StarterKit text', () => {
      renderHeader()
      expect(screen.getByText('StarterKit')).toBeInTheDocument()
    })

    it('renders desktop nav links', () => {
      renderHeader()
      // Desktop nav links are hidden on mobile but present in DOM
      expect(screen.getAllByText('홈').length).toBeGreaterThan(0)
      expect(screen.getAllByText('소개').length).toBeGreaterThan(0)
      expect(screen.getAllByText('카운터').length).toBeGreaterThan(0)
      expect(screen.getAllByText('대시보드').length).toBeGreaterThan(0)
    })

    it('renders login and register buttons when logged out', () => {
      renderHeader()
      // Desktop login/register buttons
      const loginLinks = screen.getAllByRole('link', { name: '로그인' })
      const registerLinks = screen.getAllByRole('link', { name: '회원가입' })
      expect(loginLinks.length).toBeGreaterThan(0)
      expect(registerLinks.length).toBeGreaterThan(0)
    })

    it('does not render user avatar when logged out', () => {
      renderHeader()
      // AvatarFallback should not render a user initial
      expect(screen.queryByText('T')).not.toBeInTheDocument()
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      mockStoreWithUser({ name: '테스트 유저', email: 'test@example.com' })
    })

    it('renders user avatar with first letter of name', () => {
      renderHeader()
      expect(screen.getByText('테')).toBeInTheDocument()
    })

    it('does not render login/register desktop buttons when logged in', () => {
      renderHeader()
      // The hidden md:flex div containing login/register buttons should not be present
      // when user is logged in (user menu dropdown replaces it)
      expect(screen.queryByRole('link', { name: '로그인' })).not.toBeInTheDocument()
    })

    it('opens user dropdown menu on avatar click', async () => {
      const user = userEvent.setup()
      renderHeader()

      // Avatar button contains the user initial - find by the avatar fallback text
      // The button wraps the Avatar which shows '테' (first char of '테스트 유저')
      const avatarFallback = screen.getByText('테')
      await user.click(avatarFallback)

      expect(screen.getByText('테스트 유저')).toBeInTheDocument()
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })

    it('calls clearAuth when logout is clicked', async () => {
      const user = userEvent.setup()
      renderHeader()

      // Open dropdown by clicking on avatar fallback text
      const avatarFallback = screen.getByText('테')
      await user.click(avatarFallback)

      // Click logout
      const logoutItem = screen.getByText('로그아웃')
      await user.click(logoutItem)

      expect(mockClearAuth).toHaveBeenCalledTimes(1)
    })
  })

  describe('logo link', () => {
    beforeEach(() => {
      mockStoreWithUser(null)
    })

    it('logo links to home page', () => {
      renderHeader()
      // Find the link that wraps StarterKit text
      const logoLink = screen.getByRole('link', { name: /StarterKit/i })
      expect(logoLink).toHaveAttribute('href', '/')
    })
  })
})
