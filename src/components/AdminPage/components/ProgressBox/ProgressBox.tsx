import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ConfigServices from '@/services/configServices'
import { alertErrorAxios } from '@/utils/alert'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ProgressBox = () => {
  const [percentage, setPercentage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const progressQuery = useQuery({
    queryKey: ['progress'],
    queryFn: ConfigServices.getProgress,
  })

  useEffect(() => {
    if (progressQuery.isSuccess) {
      setPercentage(progressQuery.data.data)
    }
  }, [progressQuery.isSuccess, progressQuery.data])

  const handleChangeProgress = async () => {
    try {
      setIsLoading(true)
      await ConfigServices.updateProgress(percentage)

      toast.success('Thay đổi tiến trình thành công')
    } catch (error) {
      alertErrorAxios(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Điều chỉnh phần trăm</h2>
      <Input
        type="range"
        value={percentage}
        min={0}
        max={100}
        onChange={(e) => setPercentage(+e.target.value)}
      />
      <div className="flex mt-2 items-center justify-around">
        <p>Phần trăm hiện tại: {percentage}%</p>
        <Button disabled={isLoading} onClick={handleChangeProgress}>
          Cập nhật tiến trình
        </Button>
      </div>
    </div>
  )
}

export default ProgressBox
