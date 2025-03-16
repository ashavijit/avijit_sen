import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ChevronRight,
  User,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/ui/page-header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="About Me"
        subtitle="Learn more about my journey, interests, and what drives me in technology"
        icon={<User className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 shadow-xl transform transition-transform hover:scale-[1.02]">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Avijit Sen"
                    fill
                    className="object-cover"
                  />
                </div>
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 font-space-grotesk">
                      Avijit Sen
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-space-grotesk">
                          Software Development Engineer
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-space-grotesk">Noida, India</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-space-grotesk">
                          B.Tech in Information Technology
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-space-grotesk">
                          Graduated July 2024
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-8 w-1 bg-primary rounded-full"></div>
                  <h1 className="text-4xl font-bold font-space-grotesk">
                    About Me
                  </h1>
                </div>

                <div className="prose dark:prose-invert max-w-none text-lg font-inter">
                  <p className="leading-relaxed">
                    I'm Avijit Sen, a{' '}
                    <span className="text-primary font-medium">
                      Software Development Engineer
                    </span>{' '}
                    with a passion for building scalable and efficient
                    applications. Currently working at Derivix, a fintech
                    startup, where I develop trading systems and financial
                    applications.
                  </p>
                  <p className="leading-relaxed">
                    With a strong foundation in full-stack development, I
                    specialize in creating robust backend systems and intuitive
                    user interfaces. My experience spans across various
                    technologies including Node.js, Python, React, and cloud
                    services.
                  </p>
                  <p className="leading-relaxed">
                    I'm particularly interested in financial technology,
                    distributed systems, and open-source development. My goal is
                    to create software that not only solves complex problems but
                    also provides an exceptional user experience.
                  </p>
                </div>
              </section>

              <section>
                <Tabs defaultValue="education" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-background border border-border">
                    <TabsTrigger
                      value="education"
                      className="font-space-grotesk data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Education
                    </TabsTrigger>
                    <TabsTrigger
                      value="interests"
                      className="font-space-grotesk data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Interests
                    </TabsTrigger>
                    <TabsTrigger
                      value="goals"
                      className="font-space-grotesk data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      Goals
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="education" className="mt-0">
                    <Card className="overflow-hidden border-none shadow-lg">
                      <div className="bg-gradient-to-r from-primary to-primary/70 p-6 text-white">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="h-6 w-6" />
                          <h3 className="text-xl font-semibold font-space-grotesk">
                            Education
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <h3 className="text-xl font-medium font-space-grotesk">
                            Jalpaiguri Government Engineering College
                          </h3>
                          <Badge
                            variant="outline"
                            className="w-fit h-fit font-space-mono"
                          >
                            October 2020 – July 2024
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mb-2 font-space-grotesk">
                          Bachelor's of Technology, Information Technology
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-space-mono">
                            CGPA: 9.1
                          </Badge>
                        </div>
                        <div className="mt-4 prose dark:prose-invert max-w-none font-inter">
                          <p>
                            During my time at JGEC, I focused on core computer
                            science subjects including data structures,
                            algorithms, database management, and software
                            engineering. I was actively involved in coding
                            competitions and technical events, which helped me
                            develop problem-solving skills and teamwork.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="interests" className="mt-0">
                    <Card className="overflow-hidden border-none shadow-lg">
                      <div className="bg-gradient-to-r from-primary to-primary/70 p-6 text-white">
                        <div className="flex items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-lightbulb"
                          >
                            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                            <path d="M9 18h6" />
                            <path d="M10 22h4" />
                          </svg>
                          <h3 className="text-xl font-semibold font-space-grotesk">
                            Technical Interests
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'Algorithmic Trading Systems',
                            'Distributed Systems Architecture',
                            'Cloud-Native Applications',
                            'DevOps & CI/CD Pipelines',
                            'Open Source Development',
                            'Machine Learning & AI',
                            'Blockchain Technology',
                            'Real-time Data Processing',
                          ].map((interest, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                            >
                              <ChevronRight className="h-5 w-5 text-primary" />
                              <span className="font-space-grotesk">
                                {interest}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="goals" className="mt-0">
                    <Card className="overflow-hidden border-none shadow-lg">
                      <div className="bg-gradient-to-r from-primary to-primary/70 p-6 text-white">
                        <div className="flex items-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-target"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="6" />
                            <circle cx="12" cy="12" r="2" />
                          </svg>
                          <h3 className="text-xl font-semibold font-space-grotesk">
                            Professional Goals
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {[
                            'Contribute to major open-source projects',
                            'Develop expertise in financial technology',
                            'Lead engineering teams on impactful projects',
                            'Mentor junior developers',
                            'Speak at technical conferences',
                          ].map((goal, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
                            >
                              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center text-primary font-bold font-space-mono">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium font-space-grotesk">
                                  {goal}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
