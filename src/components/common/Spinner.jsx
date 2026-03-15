import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * 전체 페이지 로딩 스피너
 * @param {string} [className] - 추가 클래스
 * @param {string} [message] - 로딩 메시지
 */
export default function Spinner({ className, message }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 gap-3', className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
