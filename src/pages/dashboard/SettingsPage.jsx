import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import PageHeader from '@/components/common/PageHeader'

// 비밀번호 변경 유효성 스키마
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력하세요.'),
    newPassword: z.string().min(8, '새 비밀번호는 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력하세요.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

// 보안 탭 컴포넌트
function SecurityTabContent({ handleSave }) {
  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values) => {
    try {
      // 실제 API 연동 시 api.post('/auth/change-password', values) 사용
      // 데모용 더미 처리
      await new Promise((r) => setTimeout(r, 800))
      form.reset()
      handleSave()
    } catch {
      toast.error('비밀번호 변경에 실패했습니다.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>비밀번호 변경</CardTitle>
        <CardDescription>정기적으로 비밀번호를 변경하면 계정을 안전하게 유지할 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>현재 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>새 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? '변경 중...' : '변경'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
  })

  const handleSave = () => {
    toast.success('설정이 저장되었습니다.')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="설정" description="계정 및 서비스 환경을 설정합니다." />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">프로필</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
        </TabsList>

        {/* 프로필 탭 */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>프로필 정보</CardTitle>
              <CardDescription>공개 프로필 정보를 수정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" defaultValue="테스트 유저" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" defaultValue="test@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">소개</Label>
                <Input id="bio" placeholder="간단한 소개를 입력하세요." />
              </div>
              <Button onClick={handleSave}>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 알림 탭 */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>수신할 알림 유형을 선택합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'email', label: '이메일 알림', desc: '주요 업데이트를 이메일로 수신합니다.' },
                { key: 'push', label: '푸시 알림', desc: '브라우저 푸시 알림을 수신합니다.' },
                { key: 'marketing', label: '마케팅 수신', desc: '이벤트 및 프로모션 정보를 수신합니다.' },
              ].map(({ key, label, desc }) => (
                <div key={key}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      checked={notifications[key]}
                      onCheckedChange={(v) => setNotifications((prev) => ({ ...prev, [key]: v }))}
                    />
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
              <Button onClick={handleSave}>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 보안 탭 */}
        <TabsContent value="security">
          <SecurityTabContent handleSave={handleSave} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
