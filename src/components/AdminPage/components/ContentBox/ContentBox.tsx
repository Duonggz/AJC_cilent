import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ConfigServices from '@/services/configServices'
import { alertErrorAxios } from '@/utils/alert'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'

const ContentBox = () => {
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File>()

  const [isLoading, setIsLoading] = useState(false)

  const contentQuery = useQuery({
    queryKey: ['content'],
    queryFn: ConfigServices.getContent,
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (contentQuery.isSuccess) {
      setContent(contentQuery.data.data)
    }
  }, [contentQuery.isSuccess, contentQuery.data])

  const handleChangeContent = async () => {
    try {
      setIsLoading(true)
      if (file) {
        await ConfigServices.updateContent(file)
        queryClient.refetchQueries({
          queryKey: ['content'],
        })
        toast.success('Thay đổi nội dung thành công')
      }
    } catch (error) {
      alertErrorAxios(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Điều chỉnh nội dung</h2>

      <Input type="file" accept="image/*" onChange={handleUpdateFile} />
      <div className="max-w-96">
        <img
          src={file ? URL.createObjectURL(file) : `${content}`}
          className="max-w-full"
          alt="content"
        />
      </div>

      {file && (
        <Button
          disabled={isLoading}
          className="mt-3"
          onClick={handleChangeContent}
        >
          Cập nhật nội dung
        </Button>
      )}
    </div>
  )
}

export default ContentBox
