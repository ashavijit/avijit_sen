'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Code, Terminal, Wifi, WifiOff } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NotFound() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Use state to store binary digits
  const [binaryDigits, setBinaryDigits] = useState<number[][]>([])
  const [isClient, setIsClient] = useState(false)

  // Generate binary digits only on the client side
  useEffect(() => {
    setIsClient(true)
    const digits = Array.from({ length: 40 }, () =>
      Array.from({ length: 20 }, () => Math.round(Math.random()))
    )
    setBinaryDigits(digits)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Binary rain background - only render on client side */}
      {isClient && (
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          {binaryDigits.map((column, colIndex) => (
            <div
              key={colIndex}
              className="absolute text-primary font-space-mono text-xs"
              style={{
                left: `${(colIndex / 40) * 100}%`,
                top: `-2rem`,
                animation: `binaryRain ${2 + (colIndex % 3)}s linear ${
                  (colIndex % 2) * 0.5
                }s infinite`,
              }}
            >
              {column.map((digit, digitIndex) => (
                <div
                  key={digitIndex}
                  className={digit ? 'opacity-80' : 'opacity-30'}
                >
                  {digit}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-12 z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Glitch effect for 404 */}
          <motion.div
            className="relative mb-8 glitch-container"
            variants={itemVariants}
          >
            <h1 className="text-9xl font-bold font-space-grotesk text-primary relative">
              404
            </h1>
            <div className="absolute inset-0 text-9xl font-bold font-space-grotesk text-red-500 glitch-1">
              404
            </div>
            <div className="absolute inset-0 text-9xl font-bold font-space-grotesk text-blue-500 glitch-2">
              404
            </div>
          </motion.div>

          <motion.div className="mb-8 space-y-4" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Connection Lost
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <WifiOff className="h-6 w-6 text-primary animate-pulse" />
              <div className="h-0.5 w-24 bg-gradient-to-r from-primary/80 to-transparent"></div>
              <Terminal className="h-6 w-6 text-primary/60" />
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-primary/80"></div>
              <Wifi className="h-6 w-6 text-primary/40" />
            </div>
            <p className="text-xl text-muted-foreground font-inter max-w-lg mx-auto">
              The page you're looking for has been moved, deleted, or possibly
              never existed in this dimension.
            </p>
          </motion.div>

          <motion.div
            className="mb-12 p-4 bg-primary/5 border border-primary/10 rounded-lg font-space-mono text-sm inline-block"
            variants={itemVariants}
          >
            <div className="flex items-start gap-2 text-left">
              <div className="text-primary mt-1">
                <Code className="h-4 w-4" />
              </div>
              <div>
                <div className="text-primary">$ error_trace</div>
                <div className="text-muted-foreground">
                  {'>'} Error: Page not found
                </div>
                <div className="text-muted-foreground">
                  {'>'} at /requested/path
                </div>
                <div className="text-muted-foreground">
                  {'>'} status_code: 404
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="font-space-grotesk">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Homepage
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-space-grotesk"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes binaryRain {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .glitch-1,
        .glitch-2 {
          opacity: 0.5;
          mix-blend-mode: screen;
        }

        .glitch-1 {
          animation: glitch1 2s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .glitch-2 {
          animation: glitch2 2.5s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }

        @keyframes glitch1 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch2 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(3px, -3px);
          }
          40% {
            transform: translate(3px, 3px);
          }
          60% {
            transform: translate(-3px, -3px);
          }
          80% {
            transform: translate(-3px, 3px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  )
}
