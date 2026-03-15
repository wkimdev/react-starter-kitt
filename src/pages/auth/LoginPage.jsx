import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'

// 로그인 유효성 스키마
const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setAuth } = useAuthStore()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values) => {
    try {
      // 실제 API 연동 시 api.post('/auth/login', values) 사용
      // 데모용 더미 처리
      await new Promise((r) => setTimeout(r, 800))
      setAuth({ user: { name: '테스트 유저', email: values.email }, token: 'demo-token' })
      toast.success('로그인 성공!')
      const redirect = searchParams.get('redirect') || '/dashboard'
      navigate(redirect)
    } catch {
      toast.error('로그인에 실패했습니다.')
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>이메일과 비밀번호를 입력하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
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
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          계정이 없으신가요?{' '}
          <Link to="/register" className="text-primary hover:underline">
            회원가입
          </Link>
        </p>
      </CardFooter>
    </>
  )
}
