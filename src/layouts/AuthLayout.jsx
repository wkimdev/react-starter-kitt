import { Outlet } from 'react-router'
import { Card } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <Outlet />
      </Card>
      <Toaster />
    </div>
  )
}
