import { Separator } from '@/components/ui/separator'

/**
 * 페이지 상단 헤더 — 제목, 설명, 액션 버튼 영역
 * @param {string} title - 페이지 제목
 * @param {string} [description] - 부제목
 * @param {React.ReactNode} [actions] - 우측 액션 버튼
 */
export default function PageHeader({ title, description, actions }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <Separator />
    </div>
  )
}
