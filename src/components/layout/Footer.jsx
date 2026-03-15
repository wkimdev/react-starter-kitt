import { Link } from 'react-router'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 브랜드 */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">StarterKit</h3>
            <p className="text-sm text-muted-foreground">
              Vite + React + shadcn/ui 기반의 모던 스타터킷
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">링크</h3>
            <ul className="space-y-1">
              {[
                { href: '/', label: '홈' },
                { href: '/about', label: '소개' },
                { href: '/counter', label: '카운터' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 기술 스택 */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">기술 스택</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Vite 7 + React 19</li>
              <li>Tailwind CSS v4</li>
              <li>shadcn/ui + Radix UI</li>
              <li>Zustand + React Router</li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} StarterKit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
