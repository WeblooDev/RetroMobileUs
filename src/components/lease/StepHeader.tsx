import { cn } from '@/lib/utils'

interface StepHeaderProps {
  title: string
  currentStep: number
  totalSteps: number
}

export function StepHeader({ title, currentStep, totalSteps }: StepHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-ivar text-3xl text-[#121212]">{title}</h2>
      <div className="font-ivar text-3xl ">
        <span className="text-[#121212] ">{String(currentStep).padStart(2, '0')}</span>
        <span className="text-muted-foreground">/{String(totalSteps).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
