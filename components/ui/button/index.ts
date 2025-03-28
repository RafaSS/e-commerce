import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary/80',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 dark:bg-destructive/90 dark:hover:bg-destructive/80',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 dark:bg-secondary/20 dark:text-gray-100 dark:hover:bg-secondary/30',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100',
        link: 'text-primary underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300',
      },
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-7 rounded px-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
