import http from '@/utils/http'

const ConfigServices = {
  allView: () => {
    return http.get('/views')
  },
  addView: () => {
    return http.post('/views')
  },
  getProgress: () => {
    return http.get('/progress')
  },
  updateProgress: (progress: number) => {
    return http.post('/progress', {
      progress: progress,
    })
  },
  getContent: () => {
    return http.get('/content')
  },
  updateContent: (content: File) => {
    const formData = new FormData()
    formData.append('image', content)
    return http.post('/content', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  },
  reset: () => {
    return http.post('/reset')
  },
}

export default ConfigServices
