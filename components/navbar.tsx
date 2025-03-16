'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavLink {
  href: string
  label: string
}

interface NavLinkWithChildren {
  label: string
  children: Array<NavLink & { external?: boolean }>
}

type NavigationLink = NavLink | NavLinkWithChildren

const navLinks: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  {
    label: 'Profiles',
    children: [
      {
        href: '/leetcode',
        label: 'LeetCode',
        external: false,
      },
      { href: '/github', label: 'GitHub', external: false },
    ],
  },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolled past threshold
      if (currentScrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Determine scroll direction for navbar visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide navbar
        setVisible(false)
      } else {
        // Scrolling up or at top - show navbar
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/70 backdrop-blur-xl shadow-lg'
          : 'bg-transparent',
        visible ? 'translate-y-0' : '-translate-y-full'
      )}
      initial={{ y: 0 }}
      animate={{
        y: visible ? 0 : '-100%',
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          'container mx-auto transition-all duration-300',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between rounded-full px-4 py-2 transition-all duration-300',
            scrolled
              ? 'bg-background/80 backdrop-blur-xl shadow-md border border-primary/10'
              : ''
          )}
        >
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl font-space-grotesk">
              Avijit<span className="text-primary">Sen</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              if ('children' in link) {
                return (
                  <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary font-space-grotesk text-muted-foreground">
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {link.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild>
                          {child.external ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cursor-pointer w-full"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link href={child.href}>{child.label}</Link>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary relative font-space-grotesk',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-2">
              <div className="bg-background/95 backdrop-blur-xl rounded-xl border border-primary/10 shadow-lg overflow-hidden">
                <nav className="flex flex-col py-4 px-4 gap-2">
                  {navLinks.map((link) => {
                    if ('children' in link) {
                      return (
                        <div key={link.label} className="space-y-1">
                          <div className="py-2 px-3 text-sm font-medium text-muted-foreground font-space-grotesk">
                            {link.label}
                          </div>
                          {link.children.map((child) => (
                            <div key={child.href} className="pl-6">
                              {child.external ? (
                                <a
                                  href={child.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 text-muted-foreground font-space-grotesk"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.label}
                                </a>
                              ) : (
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'block py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 font-space-grotesk',
                                    pathname === child.href
                                      ? 'text-primary bg-primary/5'
                                      : 'text-muted-foreground'
                                  )}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 font-space-grotesk',
                          pathname === link.href
                            ? 'text-primary bg-primary/5'
                            : 'text-muted-foreground'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
