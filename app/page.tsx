'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code,
  Briefcase,
  Layers,
  ExternalLink,
  ChevronRight,
  Quote,
  RefreshCw,
} from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Quote {
  quote: string
  author: string
}

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)

  const fetchQuote = async () => {
    try {
      setIsLoadingQuote(true)
      const response = await fetch(
        'https://api.breakingbadquotes.xyz/v1/quotes'
      )
      const data = await response.json()
      if (data && data.length > 0) {
        setQuote(data[0])
      }
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setIsLoadingQuote(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-space-mono text-sm mb-2">
              Software Development Engineer
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-space-grotesk">
              Hi, I'm{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Avijit Sen
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl font-inter leading-relaxed">
              Building scalable applications and solving complex problems with
              modern technologies. Currently at Derivix, developing trading
              systems and financial applications.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl font-space-grotesk"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Get in Touch <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="rounded-xl font-space-grotesk"
                >
                  <Link href="/resume">View Resume</Link>
                </Button>
              </motion.div>
            </div>
            <div className="flex gap-4 pt-4">
              {[
                {
                  href: 'https://github.com/avijit',
                  icon: <Github className="h-5 w-5" />,
                  label: 'GitHub',
                },
                {
                  href: 'https://linkedin.com/in/avijit',
                  icon: <Linkedin className="h-5 w-5" />,
                  label: 'LinkedIn',
                },
                {
                  href: 'mailto:avijitsen24.me@gmail.com',
                  icon: <Mail className="h-5 w-5" />,
                  label: 'Email',
                },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={social.href}
                    target={
                      social.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      social.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-primary/20 bg-background/50 backdrop-blur-sm"
                    >
                      {social.icon}
                      <span className="sr-only">{social.label}</span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt="Avijit Sen"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-primary/10 bg-gradient-to-br from-background to-primary/5 shadow-lg overflow-hidden"
        >
          <div className="p-6 md:p-8 relative">
            {quote ? (
              <>
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-24 w-24 text-primary" />
                </div>
                <div className="flex items-start gap-4">
                  <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg md:text-xl font-space-grotesk italic mb-4">
                      "{quote.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-primary font-space-mono">
                        — {quote.author}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={fetchQuote}
                        disabled={isLoadingQuote}
                        className="text-primary/70 hover:text-primary"
                      >
                        <RefreshCw
                          className={`h-4 w-4 mr-2 ${
                            isLoadingQuote ? 'animate-spin' : ''
                          }`}
                        />
                        New Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin mr-2"></div>
                <p className="text-muted-foreground">Loading quote...</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <section className="container mx-auto px-4 py-16 border-t border-primary/10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.h2
            variants={item}
            className="text-2xl font-bold font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            Explore My Work
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: '/experience',
                title: 'Experience',
                description:
                  'My professional journey at Derivix and previous internships.',
                icon: <Briefcase className="h-6 w-6" />,
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                href: '/projects',
                title: 'Projects',
                description:
                  'Technical projects including Meetify and Face-Find.',
                icon: <Code className="h-6 w-6" />,
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                href: '/skills',
                title: 'Skills',
                description:
                  'Technical expertise in languages, frameworks, and tools.',
                icon: <Layers className="h-6 w-6" />,
                gradient: 'from-amber-500 to-orange-500',
              },
            ].map((link, index) => (
              <motion.div
                key={index}
                variants={item}
                onMouseEnter={() => setHoveredCard(link.title)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -10 }}
              >
                <Link href={link.href} className="block h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-sm p-1">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        link.gradient
                      } opacity-0 transition-opacity duration-300 ${
                        hoveredCard === link.title ? 'opacity-10' : ''
                      }`}
                    ></div>
                    <div className="relative h-full rounded-xl p-6 flex flex-col">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${link.gradient} text-white w-fit mb-4`}
                      >
                        {link.icon}
                      </div>
                      <h3 className="text-xl font-bold font-space-grotesk mb-2">
                        {link.title}
                      </h3>
                      <p className="text-muted-foreground font-inter mb-4 flex-grow">
                        {link.description}
                      </p>
                      <div
                        className={`flex items-center text-sm font-medium font-space-mono transition-colors duration-300 ${
                          hoveredCard === link.title
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      >
                        Explore{' '}
                        <ArrowRight
                          className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                            hoveredCard === link.title ? 'translate-x-1' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Latest Experience Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <motion.h2
              variants={item}
              className="text-2xl font-bold font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              Latest Experience
            </motion.h2>
            <motion.div variants={item} whileHover={{ x: 5 }}>
              <Button variant="ghost" asChild className="font-space-grotesk">
                <Link href="/experience" className="flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            variants={item}
            className="rounded-2xl border border-primary/10 bg-gradient-to-br from-background to-primary/5 shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-space-mono text-xs mb-3">
                    Current Position
                  </div>
                  <h3 className="text-xl font-bold font-space-grotesk mb-1">
                    Software Development Engineer - 1
                  </h3>
                  <p className="text-primary font-space-grotesk">
                    Derivix | A Fin-tech Startup
                  </p>
                </div>
                <p className="text-muted-foreground font-space-mono mt-2 md:mt-0">
                  Feb 2024 – Present
                </p>
              </div>
              <ul className="space-y-3 text-muted-foreground font-inter">
                {[
                  'Contributed to the development of an in-house intraday and positional options trading system.',
                  'Developed an intraday trading index strike live ratio trading system (TrackYourTheta).',
                  'Developing a backtesting platform for trading strategies evaluation.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <motion.h2
              variants={item}
              className="text-2xl font-bold font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              Featured Projects
            </motion.h2>
            <motion.div variants={item} whileHover={{ x: 5 }}>
              <Button variant="ghost" asChild className="font-space-grotesk">
                <Link href="/projects" className="flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Meetify',
                description:
                  'A MERN Stack video-conferencing web app with real-time video calling and chat functionality.',
                tech: [
                  'ReactJS',
                  'ExpressJS',
                  'Firebase',
                  'MongoDB',
                  'Socket.io',
                  'Tailwind CSS',
                ],
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                title: 'Face-Find',
                description:
                  'A web app for locating missing individuals using facial recognition technology.',
                tech: [
                  'HTML5',
                  'Bootstrap 5',
                  'Django',
                  'Python 3',
                  'Azure Face API',
                ],
                gradient: 'from-purple-500 to-pink-500',
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-primary/10 bg-gradient-to-br from-background to-primary/5 shadow-xl overflow-hidden"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${project.gradient}`}
                ></div>
                <div className="p-8">
                  <h3 className="text-xl font-bold font-space-grotesk mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-inter mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-space-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl font-space-grotesk"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> View Project
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl font-space-grotesk"
                    >
                      <Github className="h-4 w-4 mr-2" /> GitHub Repo
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
