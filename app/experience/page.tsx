'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

export default function ExperiencePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const { scrollYProgress } = useScroll()

  // Improved scroll animations with better ranges
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const experiences = [
    {
      title: 'Software Development Engineer - 1',
      company: 'Derivix | A Fin-tech Startup',
      location: 'Noida, India',
      period: 'Feb 2024 – Present',
      responsibilities: [
        'Contributed to the development of an in-house intraday and positional options trading system using Linux, Node.js, Redis, Python, MongoDB, and WebSockets, enabling users to implement and execute their strategies for F&O trading efficiently.',
        'Developed an intraday trading index strike live ratio trading system(TrackYourTheta) using Python, Redis, and WebSockets, enabling automated order placement and management for optimal profitability.',
        'Developing a backtesting platform that enables users to upload trading strategies and evaluate their profitability based on historical data, using React, Python, FastAPI, and MongoDB.',
      ],
      technologies: [
        'Node.js',
        'Python',
        'Redis',
        'MongoDB',
        'WebSockets',
        'React',
        'FastAPI',
        'Linux',
      ],
      color: 'from-blue-500 to-indigo-600',
      achievements: [
        'Reduced system latency by 35% through optimization of database queries and caching strategies',
        'Implemented real-time data processing pipeline handling over 1M transactions per day',
      ],
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Latracal Solutions | IIT Bombay',
      location: 'Bombay, India',
      period: 'February 2023 – March 2023',
      responsibilities: [
        'Conducted thorough code profiling and optimizations, resulting in a 25% reduction in the execution time of critical lambda functions.',
        "Applied DynamoDB's Pk-Sk and Index Query capabilities to efficiently retrieve specific user data, resulting in a 15% improvement in database query performance.",
      ],
      technologies: ['AWS Lambda', 'DynamoDB', 'Node.js'],
      color: 'from-purple-500 to-pink-600',
      achievements: [
        'Recognized for optimizing critical lambda functions by 25%',
        'Improved database query performance by 15% through advanced indexing strategies',
      ],
    },
    {
      title: 'Software Engineering Intern (Backend)',
      company: 'Seeders Media LLP | A.K.A shethepeople.tv',
      location: 'Gurugram, India',
      period: 'July 2022 – December 2022',
      responsibilities: [
        'Developed and deployed 10+ high-performance backend APIs using Django Rest Framework, optimizing data retrieval and processing speed by 40% on AWS infrastructure.',
        'Proficiently managed end-to-end CI/CD pipelines for 4 projects using DevOps tools such as Docker, Kubernetes, and Travis CI.',
        'Enhanced the SEO performance of 32 news articles by implementing both AMP and NON-AMP JSON LD Schema through Google Search Console.',
      ],
      technologies: [
        'Django',
        'Django Rest Framework',
        'AWS',
        'Docker',
        'Kubernetes',
        'Travis CI',
        'SEO',
      ],
      color: 'from-green-500 to-emerald-600',
      achievements: [
        'Optimized data retrieval speed by 40% on AWS infrastructure',
        'Improved SEO performance for 32 news articles through schema implementation',
      ],
    },
    {
      title: 'Software Development Engineering Intern',
      company: 'Lokal Ent. Pvt. Limited | B2B E-Commerce Company',
      location: 'Delhi, India',
      period: 'December 2021 – May 2022',
      responsibilities: [
        'Led the development of backend servers and APIs using ExpressJS with Typescript, achieving a 12% improvement in response time and ensuring robust performance and seamless integration.',
        'Designed and implemented comprehensive API schemas for each frontend screen, resulting in a 15% in data transfer size and optimizing communication between backend and frontend technologies, particularly in the context of Flutter.',
      ],
      technologies: ['ExpressJS', 'TypeScript', 'API Design', 'Flutter'],
      color: 'from-amber-500 to-orange-600',
      achievements: [
        'Improved API response time by 12% through backend optimization',
        'Reduced data transfer size by 15% through efficient API schema design',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="Experience"
        subtitle="My professional journey and work experience in the tech industry"
        icon={<Briefcase className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Improved timeline line with gradient and animation */}
            <motion.div
              className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent"
              style={{
                scaleY: scrollYProgress,
                transformOrigin: 'top',
              }}
            />

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.15,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className="group"
                >
                  <Card
                    className={`overflow-hidden border-none shadow-xl transition-all duration-500
                      ${
                        expandedIndex === index
                          ? 'ring-2 ring-primary/50 transform scale-[1.02]'
                          : 'hover:translate-x-2 hover:shadow-2xl'
                      }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${exp.color} p-8 text-white relative overflow-hidden`}
                    >
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%)] bg-[length:4rem_4rem]" />
                      </div>

                      <div className="flex items-start gap-6 relative z-10">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-inner">
                          <Briefcase className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                            <h2 className="text-2xl font-bold font-space-grotesk tracking-tight">
                              {exp.title}
                            </h2>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none font-space-mono px-4 py-1.5 text-sm">
                              {exp.period}
                            </Badge>
                          </div>
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              <span className="font-space-grotesk">
                                {exp.company}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span className="font-space-grotesk">
                                {exp.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-0">
                      <button
                        className="w-full p-6 cursor-pointer flex justify-between items-center hover:bg-muted/50 transition-colors"
                        onClick={() => toggleExpand(index)}
                      >
                        <h3 className="text-lg font-medium font-space-grotesk text-primary">
                          Key Responsibilities & Technologies
                        </h3>
                        <motion.div
                          animate={{
                            rotate: expandedIndex === index ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-5 w-5 text-primary" />
                        </motion.div>
                      </button>

                      {expandedIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="px-6 pb-6 space-y-8"
                        >
                          <div>
                            <h4 className="text-md font-semibold mb-4 text-primary font-space-grotesk flex items-center gap-2">
                              <span className="h-1 w-4 bg-primary rounded-full"></span>
                              Responsibilities
                            </h4>
                            <ul className="space-y-4">
                              {exp.responsibilities.map((resp, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="bg-primary/10 p-1.5 rounded-full mt-1">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="text-primary"
                                    >
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  </div>
                                  <span className="text-muted-foreground font-inter leading-relaxed">
                                    {resp}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-md font-semibold mb-4 text-primary font-space-grotesk flex items-center gap-2">
                              <span className="h-1 w-4 bg-primary rounded-full"></span>
                              Key Achievements
                            </h4>
                            <ul className="space-y-4">
                              {exp.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="bg-primary/10 p-1.5 rounded-full mt-1">
                                    <ArrowRight className="h-4 w-4 text-primary" />
                                  </div>
                                  <span className="text-primary font-medium font-inter">
                                    {achievement}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-md font-semibold mb-4 text-primary font-space-grotesk flex items-center gap-2">
                              <span className="h-1 w-4 bg-primary rounded-full"></span>
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className="px-3 py-1.5 text-sm font-space-mono bg-primary/10 hover:bg-primary/20 transition-colors"
                                  >
                                    {tech}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
