import { createBrowserRouter } from 'react-router-dom'
// import RootLayout from '@/layouts/RootLayout'
import NotFoundPage from '@/pages/NotFoundPage'
import { AuthEvent, AuthGuard } from '@/providers/AuthProvider'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import AdminPage from '@/pages/AdminPage'
import QueuePage from '@/pages/QueuePage'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  { element: <HomePage />, index: true },
  {
    path: 'queue',
    element: <QueuePage />,
  },
  {
    element: (
      <AuthGuard>
        <AuthEvent />
      </AuthGuard>
    ),
    children: [
      {
        path: 'admin',
        element: <AdminPage />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
])

export default router
