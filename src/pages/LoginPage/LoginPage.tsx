import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import AuthService from '@/services/authServices'
import { useAppDispatch } from '@/app/hooks'
import { updateAuth } from '@/features/auth/authSlice'
import { setAuthLS } from '@/utils/authLS'
import { AuthResponse } from '@/types/authType'
import { alertErrorAxios } from '@/utils/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const LoginPage = () => {
  const dispatch = useAppDispatch()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: AuthService.login,
  })

  const navigate = useNavigate()

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await mutation.mutateAsync(values)
      const data: AuthResponse = res.data

      dispatch(
        updateAuth({
          isAuthenticated: true,
          user: data.user,
        })
      )

      setAuthLS(data)
      toast.success('đăng nhập thành công')

      setTimeout(() => {
        console.log('redirect')

        navigate('/admin')
      }, 1000)
    } catch (error) {
      alertErrorAxios(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-full w-[500px] p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
