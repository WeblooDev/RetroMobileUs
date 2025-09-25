import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<
  {
    ref?: React.Ref<HTMLTextAreaElement>
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, ...props }) => {
  return (
    <textarea
      className={cn(
        'flex h-[90px] w-full rounded border border-border bg-background text-base p-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
