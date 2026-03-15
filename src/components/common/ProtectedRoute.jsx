import { Navigate, useLocation } from 'react-router'
import { useAuthStore } from '@/stores/authStore'

export default function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token)
  const location = useLocation()

  if (!token) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  }

  return children
}
