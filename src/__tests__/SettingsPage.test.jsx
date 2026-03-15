import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import SettingsPage from '@/pages/dashboard/SettingsPage'

// sonner toast mock - use vi.hoisted so variables are available inside vi.mock factory
const { mockToastSuccess, mockToastError } = vi.hoisted(() => ({
  mockToastSuccess: vi.fn(),
  mockToastError: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: {
    success: mockToastSuccess,
    error: mockToastError,
  },
}))

function renderSettingsPage() {
  return render(
    <MemoryRouter>
      <SettingsPage />
    </MemoryRouter>
  )
}

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders the page header with title and description', () => {
      renderSettingsPage()
      expect(screen.getByText('설정')).toBeInTheDocument()
      expect(screen.getByText('계정 및 서비스 환경을 설정합니다.')).toBeInTheDocument()
    })

    it('renders three tabs: profile, notifications, security', () => {
      renderSettingsPage()
      expect(screen.getByRole('tab', { name: '프로필' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: '알림' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: '보안' })).toBeInTheDocument()
    })

    it('shows profile tab content by default', () => {
      renderSettingsPage()
      expect(screen.getByText('프로필 정보')).toBeInTheDocument()
      expect(screen.getByLabelText('이름')).toBeInTheDocument()
      expect(screen.getByLabelText('이메일')).toBeInTheDocument()
    })
  })

  describe('profile tab', () => {
    it('has default values for name and email fields', () => {
      renderSettingsPage()
      expect(screen.getByLabelText('이름')).toHaveValue('테스트 유저')
      expect(screen.getByLabelText('이메일')).toHaveValue('test@example.com')
    })

    it('shows success toast when save button is clicked', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      const saveButton = screen.getByRole('button', { name: '저장' })
      await user.click(saveButton)

      expect(mockToastSuccess).toHaveBeenCalledWith('설정이 저장되었습니다.')
    })
  })

  describe('notifications tab', () => {
    it('switches to notifications tab when clicked', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '알림' }))

      expect(screen.getByText('알림 설정')).toBeInTheDocument()
      expect(screen.getByText('이메일 알림')).toBeInTheDocument()
      expect(screen.getByText('푸시 알림')).toBeInTheDocument()
      expect(screen.getByText('마케팅 수신')).toBeInTheDocument()
    })

    it('has email notifications enabled by default', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '알림' }))

      // Find the switch buttons - email switch should be checked
      const switches = screen.getAllByRole('switch')
      // First switch (email) should be checked (aria-checked=true)
      expect(switches[0]).toHaveAttribute('aria-checked', 'true')
    })

    it('has push and marketing notifications disabled by default', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '알림' }))

      const switches = screen.getAllByRole('switch')
      expect(switches[1]).toHaveAttribute('aria-checked', 'false')
      expect(switches[2]).toHaveAttribute('aria-checked', 'false')
    })

    it('toggles push notification switch', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '알림' }))

      const switches = screen.getAllByRole('switch')
      const pushSwitch = switches[1]
      expect(pushSwitch).toHaveAttribute('aria-checked', 'false')

      await user.click(pushSwitch)
      expect(pushSwitch).toHaveAttribute('aria-checked', 'true')
    })

    it('shows success toast when save button is clicked on notifications tab', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '알림' }))
      await user.click(screen.getByRole('button', { name: '저장' }))

      expect(mockToastSuccess).toHaveBeenCalledWith('설정이 저장되었습니다.')
    })
  })

  describe('security tab', () => {
    it('switches to security tab when clicked', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '보안' }))

      expect(screen.getByText('비밀번호 변경')).toBeInTheDocument()
    })

    it('shows password change form fields', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '보안' }))

      expect(screen.getByLabelText('현재 비밀번호')).toBeInTheDocument()
      expect(screen.getByLabelText('새 비밀번호')).toBeInTheDocument()
      expect(screen.getByLabelText('비밀번호 확인')).toBeInTheDocument()
    })

    it('shows error when new passwords do not match', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '보안' }))

      await user.type(screen.getByLabelText('현재 비밀번호'), 'currentpass')
      await user.type(screen.getByLabelText('새 비밀번호'), 'newpassword1')
      await user.type(screen.getByLabelText('비밀번호 확인'), 'differentpassword')
      await user.click(screen.getByRole('button', { name: '변경' }))

      await waitFor(() => {
        expect(screen.getByText('새 비밀번호가 일치하지 않습니다.')).toBeInTheDocument()
      })
    })

    it('shows error when new password is too short (less than 8 chars)', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '보안' }))

      await user.type(screen.getByLabelText('현재 비밀번호'), 'currentpass')
      await user.type(screen.getByLabelText('새 비밀번호'), 'short')
      await user.type(screen.getByLabelText('비밀번호 확인'), 'short')
      await user.click(screen.getByRole('button', { name: '변경' }))

      await waitFor(() => {
        expect(screen.getByText('새 비밀번호는 8자 이상이어야 합니다.')).toBeInTheDocument()
      })
    })

    it('shows success toast after successful password change', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '보안' }))

      await user.type(screen.getByLabelText('현재 비밀번호'), 'currentpass')
      await user.type(screen.getByLabelText('새 비밀번호'), 'newpassword123')
      await user.type(screen.getByLabelText('비밀번호 확인'), 'newpassword123')
      await user.click(screen.getByRole('button', { name: '변경' }))

      await waitFor(
        () => {
          expect(mockToastSuccess).toHaveBeenCalledWith('설정이 저장되었습니다.')
        },
        { timeout: 2000 }
      )
    })

    it('resets form after successful password change', async () => {
      const user = userEvent.setup()
      renderSettingsPage()

      await user.click(screen.getByRole('tab', { name: '보안' }))

      const currentPasswordInput = screen.getByLabelText('현재 비밀번호')
      await user.type(currentPasswordInput, 'currentpass')
      await user.type(screen.getByLabelText('새 비밀번호'), 'newpassword123')
      await user.type(screen.getByLabelText('비밀번호 확인'), 'newpassword123')
      await user.click(screen.getByRole('button', { name: '변경' }))

      await waitFor(
        () => {
          expect(currentPasswordInput).toHaveValue('')
        },
        { timeout: 2000 }
      )
    })
  })
})
