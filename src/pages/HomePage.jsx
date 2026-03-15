import { Link } from 'react-router'
import { Rocket, Zap, Shield, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const features = [
  { icon: Rocket, title: 'Vite 7 + React 19', desc: '최신 빌드 툴과 React 버전으로 빠른 개발 경험' },
  { icon: Zap, title: 'Tailwind CSS v4', desc: '@tailwindcss/vite 플러그인으로 설정 없이 바로 사용' },
  { icon: Shield, title: 'shadcn/ui', desc: 'Radix UI 기반 접근성 완비된 UI 컴포넌트' },
  { icon: Layers, title: 'Zustand + Router', desc: '경량 상태관리와 React Router v7 라우팅' },
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* 히어로 섹션 */}
      <section className="text-center space-y-6 pt-8">
        <Badge variant="secondary" className="text-sm">v1.0.0</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          모던 React 스타터킷
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Vite 7 + React 19 + shadcn/ui + Tailwind CSS v4로 구성된
          프로덕션 레디 스타터킷입니다.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link to="/dashboard">대시보드 보기</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/counter">카운터 데모</Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* 기능 카드 */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">포함된 기술 스택</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
