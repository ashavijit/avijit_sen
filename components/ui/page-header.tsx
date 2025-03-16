'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  gradient?: string
  icon?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  gradient = 'from-primary via-primary/90 to-primary/70',
  icon,
  className,
}: PageHeaderProps) {
  return (
    <motion.header
      className={cn('w-full max-w-6xl mx-auto', className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-b from-background/80 to-background/30 backdrop-blur-xl">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-50" />

        {/* Content */}
        <div className="relative px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex items-center gap-4">
            {/* Decorative bar */}
            <div className="h-12 w-1.5 rounded-full bg-gradient-to-b from-primary to-primary/50" />

            <div className="space-y-2">
              <h1
                className={cn(
                  'text-3xl sm:text-4xl font-bold font-space-grotesk tracking-tight',
                  'bg-gradient-to-r bg-clip-text text-transparent',
                  gradient
                )}
              >
                {icon && <span className="mr-3 inline-block">{icon}</span>}
                {title}
              </h1>
              {subtitle && (
                <motion.p
                  className="text-muted-foreground font-space-mono text-sm sm:text-base max-w-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-primary/5 via-primary/30 to-primary/5" />
      </div>
    </motion.header>
  )
}
