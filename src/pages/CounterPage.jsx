import { Minus, Plus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCounterStore } from '@/stores/counterStore'

export default function CounterPage() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="max-w-md mx-auto pt-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Zustand 카운터 데모</CardTitle>
          <CardDescription>
            Redux DevTools에서 상태 변화를 실시간으로 확인할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 카운트 표시 */}
          <div className="flex justify-center">
            <Badge
              variant={count > 0 ? 'default' : count < 0 ? 'destructive' : 'secondary'}
              className="text-4xl px-8 py-4 rounded-xl"
            >
              {count}
            </Badge>
          </div>

          {/* 컨트롤 버튼 */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="icon" onClick={decrement}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={increment}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* 상태 설명 */}
          <p className="text-center text-xs text-muted-foreground">
            상태는 Zustand devtools 미들웨어로 관리됩니다.
            <br />
            Redux DevTools 확장 프로그램으로 확인하세요.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
