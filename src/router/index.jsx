import { createBrowserRouter } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import AuthLayout from '@/layouts/AuthLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import CounterPage from '@/pages/CounterPage'
import DashboardPage from '@/pages/DashboardPage'
import AnalyticsPage from '@/pages/dashboard/AnalyticsPage'
import UsersPage from '@/pages/dashboard/UsersPage'
import SettingsPage from '@/pages/dashboard/SettingsPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ErrorPage from '@/pages/ErrorPage'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'counter', element: <CounterPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
])
