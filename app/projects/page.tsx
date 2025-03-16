'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ExternalLink,
  Github,
  ArrowRight,
  Calendar,
  Code,
  Layers,
  Search,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const projects = [
    {
      title: 'Meetify',
      description:
        'A MERN Stack video-conferencing web app with real-time video calling and chat functionality.',
      longDescription:
        'Developed Meetify, a MERN Stack video-conferencing web app with real-time video calling and chat. Used Firebase for secure backend authentication and MongoDB for efficient database management. Crafted the UI using ReactJS and Material-UI, resulting in a 30% increase in user engagement and a 20% decrease in bounce rate.',
      image: '/placeholder.svg?height=400&width=600',
      technologies: [
        'ReactJS',
        'ExpressJS',
        'Firebase',
        'MongoDB',
        'Socket.io',
        'Tailwind CSS',
      ],
      liveLink: '#',
      githubLink: '#',
      date: 'October 2021',
      category: 'web',
      features: [
        'Real-time video conferencing with WebRTC',
        'Instant messaging during calls',
        'User authentication with Firebase',
        'Persistent chat history with MongoDB',
        'Responsive design for all devices',
      ],
    },
    {
      title: 'Face-Find',
      description:
        'A web app for locating missing individuals using facial recognition technology.',
      longDescription:
        "Created Face-Find, a web app for locating missing individuals using facial recognition technology. Managed data efficiently with SQLite, achieving an 80% reduction in data retrieval time. Utilized Azure Face API for over 100 accurate facial matches, enhancing the app's reliability and success rate.",
      image: '/placeholder.svg?height=400&width=600',
      technologies: [
        'HTML5',
        'Bootstrap 5',
        'Django',
        'Python 3',
        'Azure Face API',
      ],
      liveLink: '#',
      githubLink: '#',
      date: 'August 2021',
      category: 'ai',
      features: [
        'Facial recognition with Azure Face API',
        'Missing person database management',
        'Image processing and comparison',
        'User-friendly reporting interface',
        'Admin dashboard for case management',
      ],
    },
    {
      title: 'JWOC-23 Website',
      description:
        "Website for JWOC'23, an open-source event with more than 1500 participants.",
      longDescription:
        "Organized JWOC'23 and developed the JWOC-23 website, an open-source event with more than 1500 participants. The website served as the central hub for the event, providing information, registration, and project listings for participants.",
      image: '/placeholder.svg?height=400&width=600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      liveLink: '#',
      githubLink: '#',
      date: 'January 2023',
      category: 'web',
      features: [
        'Project showcase and discovery',
        'Participant registration system',
        'Mentor-mentee matching',
        'Event timeline and schedule',
        'Leaderboard for contributions',
      ],
    },
  ]

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

  // Filter projects based on search query
  const filteredProjects = (category: string) => {
    return projects
      .filter((project) => category === 'all' || project.category === category)
      .filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="Projects"
        subtitle="Explore my portfolio of projects, from web applications to system architecture"
        icon={<Code className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto mb-6">
              A showcase of my technical work, personal projects, and
              contributions to open-source.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                asChild
                className="font-space-grotesk rounded-xl bg-gradient-to-r from-primary/90 to-purple-600/90 border-none shadow-lg hover:shadow-xl"
              >
                <Link
                  href="/upcomingprojects"
                  className="flex items-center gap-2 px-6 py-2"
                >
                  <Zap className="h-4 w-4" />
                  Explore Projects In Progress
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="mb-10">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="w-full max-w-xl mx-auto flex mb-8 bg-background/50 backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden p-1">
              <TabsTrigger
                value="all"
                className="flex-1 font-space-grotesk text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3 px-2 sm:px-4"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger
                value="web"
                className="flex-1 font-space-grotesk text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3 px-2 sm:px-4"
              >
                Web Apps
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="flex-1 font-space-grotesk text-sm sm:text-base data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3 px-2 sm:px-4"
              >
                AI Projects
              </TabsTrigger>
            </TabsList>

            {['all', 'web', 'ai'].map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                {filteredProjects(category).length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <Layers className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-bold font-space-grotesk mb-2">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-12"
                  >
                    {filteredProjects(category).map((project, index) => (
                      <motion.div
                        key={index}
                        variants={item}
                        className="group"
                        onMouseEnter={() => setActiveProject(index)}
                        onMouseLeave={() => setActiveProject(null)}
                      >
                        <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background to-primary/5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            <div className="relative h-64 md:h-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <Image
                                src={project.image || '/placeholder.svg'}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute bottom-0 left-0 p-4 z-20">
                                <Badge className="bg-black/50 text-white border-none backdrop-blur-sm font-space-mono">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {project.date}
                                </Badge>
                              </div>
                              <motion.div
                                className="absolute top-4 right-4 z-20 flex gap-2"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: activeProject === index ? 1 : 0,
                                }}
                              >
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full w-8 h-8 bg-white/20 backdrop-blur-md hover:bg-white/40"
                                  >
                                    <ExternalLink className="h-4 w-4 text-white" />
                                  </Button>
                                </a>
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full w-8 h-8 bg-white/20 backdrop-blur-md hover:bg-white/40"
                                  >
                                    <Github className="h-4 w-4 text-white" />
                                  </Button>
                                </a>
                              </motion.div>
                            </div>
                            <div className="p-6 flex flex-col">
                              <CardContent className="p-0 mb-4 flex-grow">
                                <h2 className="text-2xl font-bold mb-2 font-space-grotesk group-hover:text-primary transition-colors">
                                  {project.title}
                                </h2>
                                <p className="text-muted-foreground mb-6 font-inter leading-relaxed">
                                  {project.longDescription}
                                </p>

                                <div className="mb-6">
                                  <h3 className="text-sm font-medium mb-3 text-primary font-space-grotesk flex items-center">
                                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                                      <ArrowRight className="h-2.5 w-2.5 text-primary" />
                                    </div>
                                    KEY FEATURES
                                  </h3>
                                  <ul className="space-y-2">
                                    {project.features.map((feature, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-sm"
                                      >
                                        <ArrowRight className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                                        <span className="font-inter">
                                          {feature}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h3 className="text-sm font-medium mb-3 text-primary font-space-grotesk flex items-center">
                                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                                      <Code className="h-2.5 w-2.5 text-primary" />
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
                                        <Code className="h-3 w-3 mr-1 text-primary" />
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="p-0 pt-4 flex gap-4 justify-end">
                                <Button
                                  asChild
                                  size="sm"
                                  className="font-space-grotesk rounded-xl"
                                >
                                  <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    Live Demo
                                  </a>
                                </Button>
                                <Button
                                  variant="outline"
                                  asChild
                                  size="sm"
                                  className="font-space-grotesk rounded-xl"
                                >
                                  <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                  </a>
                                </Button>
                              </CardFooter>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
