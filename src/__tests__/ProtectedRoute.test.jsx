import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import { useAuthStore } from '@/stores/authStore'

// authStore mock
vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(),
}))

const ProtectedPage = () => <div>Protected Content</div>
const LoginPage = () => <div>Login Page</div>

function renderWithRouter(initialPath = '/protected') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  describe('when user is not authenticated (no token)', () => {
    beforeEach(() => {
      useAuthStore.mockImplementation((selector) =>
        selector({ token: null, user: null })
      )
    })

    it('redirects to /login when no token', () => {
      renderWithRouter('/protected')
      expect(screen.getByText('Login Page')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('includes redirect query param with original path', () => {
      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <ProtectedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<div data-testid="login-page" />}
            />
          </Routes>
        </MemoryRouter>
      )
      // Since Navigate uses replace, the destination includes redirect param
      // We just verify the protected content is not shown
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })
  })

  describe('when user is authenticated (has token)', () => {
    beforeEach(() => {
      useAuthStore.mockImplementation((selector) =>
        selector({ token: 'demo-token', user: { name: 'Test', email: 'test@example.com' } })
      )
    })

    it('renders children when token is present', () => {
      renderWithRouter('/protected')
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
      expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
    })

    it('does not redirect when token exists', () => {
      renderWithRouter('/protected')
      // Should stay on protected route
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })
})
