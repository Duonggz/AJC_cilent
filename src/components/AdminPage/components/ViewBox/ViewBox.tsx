import ConfigServices from '@/services/configServices'
import { socket } from '@/utils/socket'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const ViewBox = () => {
  const viewQuery = useQuery({
    queryKey: ['views'],
    queryFn: ConfigServices.allView,
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    const handleAddView = () => {
      queryClient.refetchQueries({
        queryKey: ['views'],
      })
    }

    socket.on('addView', handleAddView)

    return () => {
      socket.off('addView', handleAddView)
    }
  }, [])

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Số lượng lượt truy cập</h2>
      <p className="text-2xl">{viewQuery.data?.data?.length ?? 0}</p>
    </div>
  )
}

export default ViewBox
