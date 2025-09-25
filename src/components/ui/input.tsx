import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <input
      className={cn(
        'flex h-10 w-full bg-background px-3 py-2 text-base file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        // Remove all focus and ring styles that cause the black border
        'focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0',
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export { Input }
