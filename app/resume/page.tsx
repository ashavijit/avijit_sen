'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download, Printer, FileText } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'

const ResumePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="Resume"
        subtitle="View my professional experience, education, and technical skills"
        icon={<FileText className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-end gap-4 mb-8">
            <Button
              asChild
              variant="outline"
              className="bg-background/50 backdrop-blur-sm"
            >
              <a href="#" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="font-space-grotesk">Download PDF</span>
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-background/50 backdrop-blur-sm"
            >
              <Printer className="h-4 w-4" />
              <span className="font-space-grotesk">Print</span>
            </Button>
          </div>

          <Card className="border border-primary/20 shadow-xl bg-gradient-to-br from-background to-primary/5 print:shadow-none overflow-hidden">
            <div className="border-2 border-primary/10 m-1 rounded-lg overflow-hidden">
              <CardContent className="p-8">
                <motion.div
                  className="mb-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-4xl font-bold mb-3 font-space-grotesk">
                    Avijit Sen
                  </h2>
                  <p className="text-lg text-muted-foreground font-space-grotesk mb-4">
                    Software Development Engineer
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm font-space-mono">
                    <span className="text-muted-foreground">
                      +91 8250325238
                    </span>
                    <span className="text-muted-foreground">|</span>
                    <a
                      href="mailto:avijitsen24.me@gmail.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      avijitsen24.me@gmail.com
                    </a>
                    <span className="text-muted-foreground">|</span>
                    <a
                      href="https://linkedin.com/in/avijit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      linkedin.com/in/avijit
                    </a>
                    <span className="text-muted-foreground">|</span>
                    <a
                      href="https://github.com/avijit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      github.com/avijit
                    </a>
                  </div>
                </motion.div>

                <section className="mb-10">
                  <h3 className="text-xl font-bold font-space-grotesk mb-6 pb-2 border-b border-primary/20">
                    Education
                  </h3>
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <div>
                      <h4 className="font-medium font-space-grotesk text-lg">
                        Jalpaiguri Government Engineering College
                      </h4>
                      <p className="text-muted-foreground font-inter">
                        Bachelor's of Technology, Information Technology
                      </p>
                    </div>
                    <div className="text-right font-space-mono">
                      <p>Jalpaiguri, WB</p>
                      <p className="text-muted-foreground">
                        October 2020 – July 2024
                      </p>
                    </div>
                  </div>
                  <p className="font-space-mono text-primary">CGPA: 9.1</p>
                </section>

                <section className="mb-10">
                  <h3 className="text-xl font-bold font-space-grotesk mb-6 pb-2 border-b border-primary/20">
                    Experience
                  </h3>
                  <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h4 className="font-medium font-space-grotesk text-lg">
                          Software Development Engineer - 1
                        </h4>
                        <p className="text-primary font-space-grotesk">
                          Derivix | A Fin-tech Startup
                        </p>
                      </div>
                      <div className="text-right font-space-mono">
                        <p>Noida, India</p>
                        <p className="text-muted-foreground">
                          Feb 2024 – Present
                        </p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground font-inter">
                      <li>
                        Contributed to the development of an in-house intraday
                        and positional options trading system using Linux,
                        Node.js, Redis, Python, MongoDB, and WebSockets,
                        enabling users to implement and execute their strategies
                        for F&O trading efficiently.
                      </li>
                      <li>
                        Developed an intraday trading index strike live ratio
                        trading system(TrackYourTheta) using Python, Redis, and
                        WebSockets, enabling automated order placement and
                        management for optimal profitability.
                      </li>
                      <li>
                        Developing a backtesting platform that enables users to
                        upload trading strategies and evaluate their
                        profitability based on historical data, using React,
                        Python, FastAPI, and MongoDB.
                      </li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h4 className="font-medium font-space-grotesk text-lg">
                          Full Stack Developer Intern
                        </h4>
                        <p className="text-primary font-space-grotesk">
                          Latracal Solutions | IIT Bombay
                        </p>
                      </div>
                      <div className="text-right font-space-mono">
                        <p>Bombay, India</p>
                        <p className="text-muted-foreground">
                          February 2023 – March 2023
                        </p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground font-inter">
                      <li>
                        Conducted thorough code profiling and optimizations,
                        resulting in a 25% reduction in the execution time of
                        critical lambda functions.
                      </li>
                      <li>
                        Applied DynamoDB's Pk-Sk and Index Query capabilities to
                        efficiently retrieve specific user data, resulting in a
                        15% improvement in database query performance.
                      </li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h4 className="font-medium font-space-grotesk text-lg">
                          Software Engineering Intern (Backend)
                        </h4>
                        <p className="text-primary font-space-grotesk">
                          Seeders Media LLP | A.K.A shethepeople.tv
                        </p>
                      </div>
                      <div className="text-right font-space-mono">
                        <p>Gurugram, India</p>
                        <p className="text-muted-foreground">
                          July 2022 – December 2022
                        </p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground font-inter">
                      <li>
                        Developed and deployed 10+ high-performance backend APIs
                        using Django Rest Framework, optimizing data retrieval
                        and processing speed by 40% on AWS infrastructure.
                      </li>
                      <li>
                        Proficiently managed end-to-end CI/CD pipelines for 4
                        projects using DevOps tools such as Docker, Kubernetes,
                        and Travis CI.
                      </li>
                      <li>
                        Enhanced the SEO performance of 32 news articles by
                        implementing both AMP and NON-AMP JSON LD Schema through
                        Google Search Console.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h4 className="font-medium font-space-grotesk text-lg">
                          Software Development Engineering Intern
                        </h4>
                        <p className="text-primary font-space-grotesk">
                          Lokal Ent. Pvt. Limited | B2B E-Commerce Company
                        </p>
                      </div>
                      <div className="text-right font-space-mono">
                        <p>Delhi, India</p>
                        <p className="text-muted-foreground">
                          December 2021 – May 2022
                        </p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground font-inter">
                      <li>
                        Led the development of backend servers and APIs using
                        ExpressJS with Typescript, achieving a 12% improvement
                        in response time and ensuring robust performance and
                        seamless integration.
                      </li>
                      <li>
                        Designed and implemented comprehensive API schemas for
                        each frontend screen, resulting in a 15% in data
                        transfer size and optimizing communication between
                        backend and frontend technologies, particularly in the
                        context of Flutter.
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-10">
                  <h3 className="text-xl font-bold font-space-grotesk mb-6 pb-2 border-b border-primary/20">
                    Projects
                  </h3>
                  <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h4 className="font-medium font-space-grotesk text-lg">
                          Meetify
                        </h4>
                        <p className="text-primary font-space-mono text-sm">
                          ReactJS, ExpressJS, Firebase, MongoDB, Socket.io,
                          Tailwind CSS
                        </p>
                      </div>
                      <p className="text-muted-foreground font-space-mono">
                        October 2021
                      </p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground font-inter">
                      <li>
                        Developed Meetify, a MERN Stack video-conferencing web
                        app with real-time video calling and chat.
                      </li>
                      <li>
                        Used Firebase for secure backend authentication and
                        MongoDB for efficient database management.
                      </li>
                      <li>
                        Crafted the UI using ReactJS and Material-UI, resulting
                        in a 30% increase in user engagement and a 20% decrease
                        in bounce rate.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h4 className="font-medium font-space-grotesk text-lg">
                          Face-Find
                        </h4>
                        <p className="text-primary font-space-mono text-sm">
                          HTML5, Bootstrap 5, Django, Python 3, Azure Face API
                        </p>
                      </div>
                      <p className="text-muted-foreground font-space-mono">
                        August 2021
                      </p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground font-inter">
                      <li>
                        Created Face-Find, a web app for locating missing
                        individuals using facial recognition technology.
                      </li>
                      <li>
                        Managed data efficiently with SQLite, achieving an 80%
                        reduction in data retrieval time.
                      </li>
                      <li>
                        Utilized Azure Face API for over 100 accurate facial
                        matches, enhancing the app's reliability and success
                        rate.
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-10">
                  <h3 className="text-xl font-bold font-space-grotesk mb-6 pb-2 border-b border-primary/20">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium font-space-grotesk mb-3">
                        Languages:
                      </h4>
                      <p className="text-muted-foreground font-space-mono text-sm">
                        C/C++, Python3, JavaScript, HTML/CSS, ShellScript,
                        TypeScript
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium font-space-grotesk mb-3">
                        Frameworks:
                      </h4>
                      <p className="text-muted-foreground font-space-mono text-sm">
                        ReactJS, NextJS, ExpressJs, Socket.io, Flask, Django,
                        Fast-API, MongoDB, Golang
                      </p>
                    </div>
                  </div>
                </section>
              </CardContent>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default ResumePage
