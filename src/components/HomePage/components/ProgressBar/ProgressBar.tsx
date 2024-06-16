import ConfigServices from '@/services/configServices'
import { socket } from '@/utils/socket'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const ProgressBar = () => {
  const [progress, setProgress] = useState(0)

  const progressQuery = useQuery({
    queryKey: ['progress'],
    queryFn: ConfigServices.getProgress,
  })

  useEffect(() => {
    if (progressQuery.isSuccess) {
      setProgress(progressQuery.data.data)
    }
  }, [progressQuery.isSuccess, progressQuery.data])

  useEffect(() => {
    const handleUpdateProgress = (progress: number) => {
      setProgress(progress)
    }

    const handleResetData = () => {
      setProgress(0)
    }

    socket.on('updateProgress', handleUpdateProgress)
    socket.on('resetData', handleResetData)

    return () => {
      socket.off('updateProgress', handleUpdateProgress)
      socket.off('resetData', handleResetData)
    }
  }, [])

  return (
    <div className="w-[34rem] bg-[#F0DCDC] bg-opacity-45 rounded-full h-4">
      <div
        className="bg-progress-gradient h-4 rounded-full ease-linear duration-150"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
