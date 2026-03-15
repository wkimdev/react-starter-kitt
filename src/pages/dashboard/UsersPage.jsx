import { useMemo } from 'react'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import PageHeader from '@/components/common/PageHeader'
import DataTable from '@/components/common/DataTable'

const users = [
  { id: 1, name: '김민준', email: 'minjun@example.com', role: '관리자', status: 'active', joined: '2024-01-15' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '사용자', status: 'active', joined: '2024-02-03' },
  { id: 3, name: '박지호', email: 'jiho@example.com', role: '사용자', status: 'inactive', joined: '2024-02-20' },
  { id: 4, name: '최예린', email: 'yerin@example.com', role: '편집자', status: 'active', joined: '2024-03-05' },
  { id: 5, name: '정우진', email: 'woojin@example.com', role: '사용자', status: 'active', joined: '2024-03-18' },
  { id: 6, name: '한소희', email: 'sohee@example.com', role: '사용자', status: 'inactive', joined: '2024-04-01' },
]

export default function UsersPage() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs">
                {row.original.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span>{row.original.name}</span>
          </div>
        ),
      },
      { accessorKey: 'email', header: '이메일' },
      { accessorKey: 'role', header: '역할' },
      { accessorKey: 'joined', header: '가입일' },
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
        title="사용자 관리"
        description="등록된 사용자 목록을 조회하고 관리합니다."
        actions={
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            사용자 초대
          </Button>
        }
      />

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">전체 사용자</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">활성 사용자</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">비활성 사용자</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              {users.filter((u) => u.status === 'inactive').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 사용자 테이블 */}
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={users} searchKey="name" />
        </CardContent>
      </Card>
    </div>
  )
}
