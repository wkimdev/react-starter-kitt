import { useMemo } from 'react'
import { Plus, Users, BarChart3, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PageHeader from '@/components/common/PageHeader'
import DataTable from '@/components/common/DataTable'

// 샘플 데이터
const sampleUsers = [
  { id: 1, name: '김민준', email: 'minjun@example.com', role: '관리자', status: 'active' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '사용자', status: 'active' },
  { id: 3, name: '박지호', email: 'jiho@example.com', role: '사용자', status: 'inactive' },
  { id: 4, name: '최예린', email: 'yerin@example.com', role: '편집자', status: 'active' },
  { id: 5, name: '정우진', email: 'woojin@example.com', role: '사용자', status: 'active' },
]

// 통계 카드 데이터
const statsCards = [
  { title: '총 사용자', value: '1,234', icon: Users, change: '+12%' },
  { title: '이번 달 방문', value: '45,678', icon: BarChart3, change: '+8%' },
  { title: '전환율', value: '3.24%', icon: TrendingUp, change: '+0.5%' },
]

export default function DashboardPage() {
  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: '이름', enableSorting: true },
      { accessorKey: 'email', header: '이메일' },
      { accessorKey: 'role', header: '역할' },
      {
        accessorKey: 'status',
        header: '상태',
        cell: ({ row }) => (
          <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'}>
            {row.original.status === 'active' ? '활성' : '비활성'}
          </Badge>
        ),
      },
    ],
    []
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="대시보드"
        description="전체 서비스 현황을 확인합니다."
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            사용자 추가
          </Button>
        }
      />

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statsCards.map(({ title, value, icon: Icon, change }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-green-600 mt-1">{change} 전월 대비</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 사용자 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={sampleUsers} searchKey="name" />
        </CardContent>
      </Card>
    </div>
  )
}
