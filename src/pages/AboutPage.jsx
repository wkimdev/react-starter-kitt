import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqItems = [
  {
    question: 'shadcn/ui는 무엇인가요?',
    answer:
      'Radix UI 프리미티브를 기반으로 한 재사용 가능한 컴포넌트 모음입니다. npm 패키지가 아닌 소스코드를 직접 복사해 사용하므로 완전한 커스터마이징이 가능합니다.',
  },
  {
    question: 'Zustand를 왜 사용하나요?',
    answer:
      'Redux에 비해 보일러플레이트가 거의 없고, Context API보다 리렌더링 최적화가 우수합니다. devtools와 persist 미들웨어 지원으로 개발 경험도 뛰어납니다.',
  },
  {
    question: 'Tailwind CSS v4의 변경점은?',
    answer:
      'v4부터 tailwind.config.js 없이 CSS @import 방식으로 사용합니다. @tailwindcss/vite 플러그인으로 Vite와 완벽히 통합됩니다.',
  },
  {
    question: 'TypeScript를 사용하지 않나요?',
    answer:
      '이 스타터킷은 JSX 기반으로 구성되어 있습니다. TypeScript로 전환하려면 파일 확장자를 .tsx로 변경하고 tsconfig.json을 추가하면 됩니다.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">프로젝트 소개</h1>
        <p className="text-muted-foreground">
          이 스타터킷은 검증된 라이브러리를 조합하여 빠르게 프로덕션 레디 앱을 시작할 수 있도록 구성되었습니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>설계 원칙</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">바퀴를 재발명하지 않는다</strong> — 검증된 라이브러리 최대 활용</p>
          <p>• <strong className="text-foreground">Atomic Design</strong> — Atoms → Molecules → Organisms → Layouts</p>
          <p>• <strong className="text-foreground">접근성 우선</strong> — Radix UI 기반 WAI-ARIA 준수</p>
          <p>• <strong className="text-foreground">반응형 필수</strong> — 모바일 퍼스트 Tailwind CSS</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">자주 묻는 질문</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
