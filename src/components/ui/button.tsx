'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utilities/ui'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input bg-background',
        secondary: 'bg-secondary text-secondary-foreground',
        ghost: 'bg-transparent text-secondary-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        olive:
          'bg-[#8B9B5C] text-white hover:bg-white hover:text-black active:bg-white active:text-[#8B9B5C] disabled:opacity-60',
        black:
          'bg-black text-white hover:bg-[#8B9B5C] hover:text-white active:bg-white active:text-black disabled:opacity-60',
        outlineWhite:
          'bg-transparent text-white border border-white hover:bg-white hover:text-black active:bg-white active:text-black disabled:opacity-60',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        ctaNormal: 'h-[2.25rem] px-3 py-1 text-[17px] rounded-[30px] font-ivar uppercase',
        ctaBig: 'h-[2.75rem] px-4 py-1 text-[27px] rounded-[30px] font-ivar uppercase',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'
