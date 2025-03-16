'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Cpu,
  Database,
  LineChart,
  Zap,
  Server,
  GitBranch,
  Rocket,
} from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

export default function UpcomingProjectsPage() {
  const upcomingProjects = [
    {
      title: 'High-Frequency Trading Engine',
      description:
        'A cutting-edge trading engine designed for ultra-low latency execution in financial markets.',
      icon: <Zap className="h-6 w-6" />,
      features: [
        'Ultra-low latency execution with ZeroMQ & nanomsg',
        'Sub-microsecond performance optimization',
        'FPGA acceleration for order processing',
      ],
      technologies: ['C++', 'ZeroMQ', 'nanomsg', 'FPGA', 'Linux'],
      gradient: 'from-blue-500 to-cyan-600',
      progress: 65,
    },
    {
      title: 'Options Analytics Platform',
      description:
        'Real-time analytics platform for options trading with advanced data processing capabilities.',
      icon: <LineChart className="h-6 w-6" />,
      features: [
        'Real-time market data processing with Kafka',
        'Redis Streams for price aggregation',
        'MongoDB time-series for analytics',
      ],
      technologies: ['Python', 'Kafka', 'Redis', 'MongoDB', 'React'],
      gradient: 'from-purple-500 to-pink-600',
      progress: 40,
    },
    {
      title: 'VoltaxDB - In-Memory Database',
      description:
        'High-performance in-memory database designed for low-latency applications.',
      icon: <Database className="h-6 w-6" />,
      features: [
        'C++ based high-performance storage engine',
        'Custom TCP server implementation',
        'LSM tree-based persistence layer',
      ],
      technologies: ['C++', 'Boost', 'CMake', 'Linux', 'TCP/IP'],
      gradient: 'from-amber-500 to-orange-600',
      progress: 25,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="Projects in Progress"
        subtitle="Discover what I'm currently working on and upcoming project initiatives"
        icon={<Rocket className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="font-space-grotesk"
            >
              <Link href="/projects" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Projects In Progress
            </h1>
            <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
              Explore the cutting-edge projects I'm currently developing. These
              are works in progress showcasing my latest technical explorations.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 perspective-1000"
          >
            {upcomingProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -5,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
                className="group"
              >
                <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5 will-change-transform">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div
                        className={`h-2 bg-gradient-to-r ${project.gradient} will-change-transform`}
                      ></div>
                      <div className="absolute -top-6 right-6 w-12 h-12 rounded-full bg-background shadow-lg flex items-center justify-center border border-primary/10">
                        <div
                          className={`text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`}
                        >
                          {project.icon}
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold font-space-grotesk transition-colors duration-200 ease-in-out group-hover:text-primary">
                          {project.title}
                        </h2>
                        <Badge
                          variant="outline"
                          className="font-space-mono bg-primary/10 border-primary/20"
                        >
                          {project.progress}% Complete
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-6 font-inter leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3 text-primary font-space-grotesk flex items-center">
                          <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                            <Server className="h-2.5 w-2.5 text-primary" />
                          </div>
                          KEY FEATURES
                        </h3>
                        <ul className="space-y-2">
                          {project.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-primary text-xs font-bold">
                                  {i + 1}
                                </span>
                              </div>
                              <span className="font-inter">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-3 text-primary font-space-grotesk flex items-center">
                          <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                            <GitBranch className="h-2.5 w-2.5 text-primary" />
                          </div>
                          TECHNOLOGIES
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="font-space-mono bg-background/50 border-primary/20 hover:bg-primary/5 transition-colors"
                            >
                              <Cpu className="h-3 w-3 mr-1 text-primary" />
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${project.gradient} will-change-transform`}
                            style={{
                              width: `${project.progress}%`,
                              transform: 'translateZ(0)',
                            }}
                          >
                            <div
                              className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.15)_40%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.15)_60%,rgba(255,255,255,0.15)_100%)] will-change-transform"
                              style={{ transform: 'translateZ(0)' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
