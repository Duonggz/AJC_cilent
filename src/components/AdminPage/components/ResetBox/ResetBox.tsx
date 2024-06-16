import { Button } from '@/components/ui/button'
import ConfigServices from '@/services/configServices'
import { alertErrorAxios } from '@/utils/alert'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ResetBox = () => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const handleReset = async () => {
    try {
      setIsLoading(true)
      await ConfigServices.reset()
      queryClient.refetchQueries({
        queryKey: [],
      })

      toast.success('Reset thành công')
    } catch (error) {
      alertErrorAxios(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button disabled={isLoading} className="mt-3" onClick={handleReset}>
      Reset dữ liệu
    </Button>
  )
}

export default ResetBox
