import { forwardRef } from 'react'
import { cs } from '@/utils/className'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}
export const Section = forwardRef((props: SectionProps, ref) => {
  const { as: Component = 'div', children, className, ...rest } = props

  return (
    <Component
      className={cs('w-full h-[100vh] px-6 flex items-center justify-center', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  )
})
