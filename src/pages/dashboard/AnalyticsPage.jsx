import { TrendingUp, TrendingDown, Users, MousePointerClick } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PageHeader from '@/components/common/PageHeader'

const stats = [
  { label: '총 방문자', value: '48,295', change: '+12.5%', up: true, icon: Users },
  { label: '페이지뷰', value: '128,430', change: '+8.2%', up: true, icon: MousePointerClick },
  { label: '이탈률', value: '34.6%', change: '-2.1%', up: false, icon: TrendingDown },
  { label: '평균 체류시간', value: '3분 24초', change: '+0.8%', up: true, icon: TrendingUp },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="분석" description="방문자 통계 및 사이트 분석 데이터를 확인합니다." />

      {/* 지표 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className={`text-xs mt-1 ${up ? 'text-green-600' : 'text-red-500'}`}>
                {change} 전월 대비
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 기간별 탭 */}
      <Tabs defaultValue="week">
        <TabsList>
          <TabsTrigger value="week">주간</TabsTrigger>
          <TabsTrigger value="month">월간</TabsTrigger>
          <TabsTrigger value="year">연간</TabsTrigger>
        </TabsList>
        <TabsContent value="week">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm text-center py-16">
                주간 차트 영역 — 실제 서비스에서는 Chart.js / Recharts 연동
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="month">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm text-center py-16">
                월간 차트 영역
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="year">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm text-center py-16">
                연간 차트 영역
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
