import { Link, useLocation } from 'react-router'
import {
  Home,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebarStore'

// 사이드바 메뉴 목록
const sidebarItems = [
  { href: '/dashboard', icon: Home, label: '홈' },
  { href: '/dashboard/analytics', icon: BarChart3, label: '분석' },
  { href: '/dashboard/users', icon: Users, label: '사용자' },
  { href: '/dashboard/settings', icon: Settings, label: '설정' },
]

export default function Sidebar() {
  const location = useLocation()
  const { collapsed, toggleCollapsed } = useSidebarStore()

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* 로고 영역 */}
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold overflow-hidden">
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="truncate">StarterKit</span>}
        </Link>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 p-2 space-y-1">
        {sidebarItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* 접기/펼치기 버튼 */}
      <div className="p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapsed}
          className="w-full justify-center"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="ml-2 text-xs">접기</span>}
        </Button>
      </div>
    </aside>
  )
}
