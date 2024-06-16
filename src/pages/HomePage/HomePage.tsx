import QrCodeBox from '@/components/HomePage/components/QrCodeBox'
import star from '@/assets/star.svg'
import background from '@/assets/background.png'
import not_1 from '@/assets/not_1.svg'
import not_2 from '@/assets/not_2.svg'
import not_3 from '@/assets/not_3.svg'
import not_4 from '@/assets/not_4.svg'
import { useEffect, useState } from 'react'
import ProgressBar from '@/components/HomePage/components/ProgressBar'
import cot from '@/assets/cot.svg'
import prevMusic from '@/assets/prev_music.mp3'
import afterMusic from '@/assets/after_music.mp3'
import { useQuery } from '@tanstack/react-query'
import ConfigServices from '@/services/configServices'
import { socket } from '@/utils/socket'

const HomePage = () => {
  const [isFull, setIsFull] = useState(false)
  const [progress, setProgress] = useState(0)
  const [content, setContent] = useState('')
  const [prevAudio, setPrevAudio] = useState<HTMLAudioElement>()
  const [afterAudio, setAfterAudio] = useState<HTMLAudioElement>()

  useEffect(() => {
    const prevAudio = new Audio(prevMusic)
    prevAudio.loop = true
    setPrevAudio(prevAudio)
    const afterAudio = new Audio(afterMusic)
    afterAudio.loop = true
    setAfterAudio(afterAudio)
  }, [])

  const goFullScreen = () => {
    setIsFull(true)

    prevAudio &&
      prevAudio.play().then(() => {
        console.log('Prev music is playing!')
      })

    const elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    }
  }

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
      setTimeout(() => {
        prevAudio && prevAudio.pause()
        afterAudio && afterAudio.play()

        ConfigServices.getContent().then((response) => {
          setContent(response.data)
        })
      }, 1000)
    } else {
      prevAudio && prevAudio.play()
      afterAudio && afterAudio.pause()
    }

    return () => {
      prevAudio && prevAudio.pause()
      afterAudio && afterAudio.pause()
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
    <>
      <div className="w-full h-screen relative overflow-hidden">
        <div className="fixed top-0 left-0 right-0 bottom-0">
          <img
            src={background}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute left-[2%] top-[2%] star1">
          <img src={star} alt="ngôi sao 1" className="-rotate-45 w-24" />
        </div>
        <div className="absolute left-[45%] top-[10%] star2">
          <img src={star} alt="ngôi sao 2" className=" w-24" />
        </div>
        <div className="absolute right-[15%] top-[2%] star3">
          <img src={star} alt="ngôi sao 3" className="-rotate-45 w-24" />
        </div>
        <div className="absolute left-[25%] top-[8%] not1">
          <img src={not_1} alt="nốt 1" className="-rotate-[40deg] w-32" />
        </div>
        <div className="absolute right-[25%] top-[4%] not2">
          <img src={not_2} alt="nốt 2" className="-rotate-[40deg] w-32" />
        </div>

        <div className="absolute left-[10%] bottom-[450px] z-20 not3">
          <img src={not_3} alt="nốt 3" className="rotate-[42deg] w-40" />
        </div>
        <div className="absolute right-[6%] top-[20%] not4">
          <img src={not_4} alt="nốt 4" className="rotate-[32deg] w-40" />
        </div>

        <div className="absolute left-[20%] bottom-[290px] z-20 star4">
          <img src={star} alt="sao 4" className="-rotate-[50deg] w-40" />
        </div>
        <div className="absolute right-[6%] bottom-[32%] star5">
          <img src={star} alt="sao 5" className="-rotate-[60deg] w-36" />
        </div>
        <div className="absolute left-[10%] bottom-0 z-10">
          <img src={cot} alt="cột" className="w-60" />
          <div className="absolute left-1/2 -translate-x-1/2 top-24 font-extrabold text-4xl"></div>
        </div>
        {!isFull && (
          <button
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 p-2 px-3 z-40 rounded-md"
            onClick={goFullScreen}
          >
            Full màn hình
          </button>
        )}

        <div className="absolute top-44 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <ProgressBar />
          <div className="bg-[#D9D9D9] w-fit bg-opacity-40 p-4 rounded-md mt-20">
            <QrCodeBox />
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 right-0 z-50 bg-black bg-opacity-70 h-screen overflow-auto opacity-0 scale-0 ${
          progress === 100 && content && 'open-content-animate'
        }`}
      >
        <div className="flex justify-center">
          <img src={`${content}`} alt="content" className="max-w-full" />
        </div>
      </div>
    </>
  )
}

export default HomePage
