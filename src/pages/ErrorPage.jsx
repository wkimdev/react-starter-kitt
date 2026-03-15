import { useRouteError, isRouteErrorResponse, Link } from 'react-router'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/common/EmptyState'

export default function ErrorPage() {
  const error = useRouteError()
  const title = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : '알 수 없는 오류가 발생했습니다'
  const description = isRouteErrorResponse(error)
    ? (error.data?.message ?? '요청을 처리하는 중 오류가 발생했습니다.')
    : (error?.message ?? '잠시 후 다시 시도해 주세요.')

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={AlertTriangle}
        title={title}
        description={description}
        action={
          <Button asChild>
            <Link to="/">홈으로 돌아가기</Link>
          </Button>
        }
      />
    </div>
  )
}
