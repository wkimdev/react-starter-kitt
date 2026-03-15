import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useSidebarStore = create(
  devtools(
    (set) => ({
      collapsed: false,
      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
    }),
    { name: 'sidebar-store' }
  )
)
