import { cn } from '@/lib/utils'

/**
 * 빈 데이터 상태 UI
 * @param {React.ElementType} [icon] - lucide 아이콘 컴포넌트
 * @param {string} title - 주 메시지
 * @param {string} [description] - 부 메시지
 * @param {React.ReactNode} [action] - CTA 버튼
 */
export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {Icon && (
        <div className="mb-4 rounded-full bg-muted p-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
