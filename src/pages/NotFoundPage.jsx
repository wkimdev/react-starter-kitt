import { Link } from 'react-router'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/common/EmptyState'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={FileQuestion}
        title="404 — 페이지를 찾을 수 없습니다"
        description="요청하신 페이지가 존재하지 않거나 이동되었습니다."
        action={
          <Button asChild>
            <Link to="/">홈으로 돌아가기</Link>
          </Button>
        }
      />
    </div>
  )
}
