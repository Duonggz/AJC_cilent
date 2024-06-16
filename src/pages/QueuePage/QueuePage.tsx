import ConfigServices from '@/services/configServices'
import { socket } from '@/utils/socket'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const QueuePage = () => {
  const [progress, setProgress] = useState(0)
  const [content, setContent] = useState('')

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
    if (progress === 100) {
      ConfigServices.getContent().then((response) => {
        setContent(response.data)
      })
    }
  }, [progress])

  useEffect(() => {
    const handleUpdateProgress = (progress: number) => {
      setProgress(progress)
    }

    const handleResetData = () => {
      setProgress(0)
    }

    ConfigServices.addView()

    socket.on('updateProgress', handleUpdateProgress)
    socket.on('resetData', handleResetData)

    return () => {
      socket.off('updateProgress', handleUpdateProgress)
      socket.off('resetData', handleResetData)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!content && (
        <div className="flex flex-col items-center relative">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          {/* <h2 className="text-center text-gray-700 text-xl font-semibold absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
          {progress}%
        </h2> */}
        </div>
      )}
      {content && (
        <div
          className={`absolute top-0 left-0 right-0 z-50 bg-black bg-opacity-70 h-screen overflow-auto`}
        >
          <div className="flex justify-center">
            <img src={`${content}`} alt="content" className="max-w-full" />
          </div>
        </div>
      )}
    </div>
  )
}

export default QueuePage
