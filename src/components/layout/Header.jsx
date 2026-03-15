import { Link, useLocation } from 'react-router'
import { Menu, User, LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'

// 네비게이션 링크 목록
const navLinks = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/counter', label: '카운터' },
  { href: '/dashboard', label: '대시보드' },
]

// NavLink 컴포넌트를 Header 외부에서 정의
const NavLink = ({ href, label, onClick }) => {
  const { pathname } = useLocation()
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        pathname === href ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {label}
    </Link>
  )
}

export default function Header() {
  const { user, clearAuth } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* 로고 */}
        <Link to="/" className="mr-6 flex items-center space-x-2 font-bold text-primary">
          <LayoutDashboard className="h-5 w-5" />
          <span>StarterKit</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          {/* 유저 메뉴 */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    대시보드
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearAuth} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">로그인</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">회원가입</Link>
              </Button>
            </div>
          )}

          {/* 모바일 메뉴 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link to="/" className="flex items-center gap-2 text-primary">
                    <LayoutDashboard className="h-5 w-5" />
                    StarterKit
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
              </nav>
              {!user && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" asChild>
                      <Link to="/login">로그인</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/register">회원가입</Link>
                    </Button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
