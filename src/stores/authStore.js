import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        // 로그인 상태 저장
        setAuth: ({ user, token }) => set({ user, token }),
        // 로그아웃 처리
        clearAuth: () => set({ user: null, token: null }),
      }),
      {
        name: 'auth-storage', // localStorage 키
        partialize: (state) => ({ user: state.user, token: state.token }),
      }
    ),
    { name: 'auth-store' }
  )
)
