import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ContentBox from '@/components/AdminPage/components/ContentBox'
import ProgressBox from '@/components/AdminPage/components/ProgressBox'
import ResetBox from '@/components/AdminPage/components/ResetBox'
import ViewBox from '@/components/AdminPage/components/ViewBox'
import { Button } from '@/components/ui/button'
import { resetAuth, selectAuth } from '@/features/auth/authSlice'
import { resetAuthLS } from '@/utils/authLS'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
  const auth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(resetAuth())
    resetAuthLS()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-500 py-4 text-center">
        <h1 className="text-xl  text-white">Xin chào {auth.user.fullName}</h1>

        <Button variant={'outline'} className="mt-2" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </header>

      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ViewBox />
          <ProgressBox />
        </div>

        <ContentBox />

        <ResetBox />
      </div>
    </div>
  )
}

export default AdminPage
