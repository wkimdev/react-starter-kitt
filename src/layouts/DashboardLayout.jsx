import { Outlet } from 'react-router'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { Toaster } from '@/components/ui/sonner'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header variant="dashboard" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  )
}
