'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Code,
  Database,
  Server,
  Globe,
  PenToolIcon as Tool,
  Cloud,
  Layers,
  Cpu,
  LineChart,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { PageHeader } from '@/components/ui/page-header'

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState('languages')
  const skills = {
    languages: [
      { name: 'C/C++', level: 90, icon: <Cpu className="h-5 w-5" /> },
      { name: 'Python', level: 85, icon: <Code className="h-5 w-5" /> },
      { name: 'JavaScript', level: 95, icon: <Code className="h-5 w-5" /> },
      { name: 'TypeScript', level: 90, icon: <Code className="h-5 w-5" /> },
      { name: 'HTML/CSS', level: 85, icon: <Layers className="h-5 w-5" /> },
      { name: 'ShellScript', level: 75, icon: <Code className="h-5 w-5" /> },
    ],
    frameworks: [
      { name: 'React.js', level: 90, icon: <Layers className="h-5 w-5" /> },
      { name: 'Next.js', level: 85, icon: <Layers className="h-5 w-5" /> },
      { name: 'Express.js', level: 90, icon: <Server className="h-5 w-5" /> },
      { name: 'Socket.io', level: 80, icon: <Server className="h-5 w-5" /> },
      { name: 'Flask', level: 75, icon: <Server className="h-5 w-5" /> },
      { name: 'Django', level: 80, icon: <Server className="h-5 w-5" /> },
      { name: 'Fast-API', level: 75, icon: <Server className="h-5 w-5" /> },
      { name: 'MongoDB', level: 85, icon: <Database className="h-5 w-5" /> },
      { name: 'Golang', level: 70, icon: <Code className="h-5 w-5" /> },
    ],
    tools: [
      { name: 'Git', level: 90, icon: <Tool className="h-5 w-5" /> },
      { name: 'Docker', level: 85, icon: <Tool className="h-5 w-5" /> },
      { name: 'Kubernetes', level: 80, icon: <Tool className="h-5 w-5" /> },
      { name: 'AWS', level: 85, icon: <Cloud className="h-5 w-5" /> },
      { name: 'CI/CD', level: 80, icon: <LineChart className="h-5 w-5" /> },
      { name: 'VS-CODE', level: 95, icon: <Tool className="h-5 w-5" /> },
      { name: 'Sublime3', level: 85, icon: <Tool className="h-5 w-5" /> },
      { name: 'Azure', level: 75, icon: <Cloud className="h-5 w-5" /> },
    ],
  }

  const SkillBar = ({
    name,
    level,
    icon,
  }: {
    name: string
    level: number
    icon: React.ReactNode
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl transition-all duration-300 border ${
                isHovered
                  ? 'bg-primary text-primary-foreground scale-110 border-primary'
                  : 'bg-primary/10 text-primary border-primary/30'
              }`}
            >
              {icon}
            </div>
            <span
              className={`font-medium font-space-grotesk text-lg transition-colors ${
                isHovered ? 'text-primary' : ''
              }`}
            >
              {name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-space-mono text-sm text-muted-foreground">
              {level}%
            </span>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                isHovered
                  ? 'bg-primary text-primary-foreground scale-110 border-primary'
                  : 'bg-primary/10 text-primary border-primary/30'
              }`}
            >
              <span className="font-space-mono text-sm font-bold">
                {level >= 90
                  ? 'A+'
                  : level >= 80
                  ? 'A'
                  : level >= 70
                  ? 'B+'
                  : 'B'}
              </span>
            </div>
          </div>
        </div>
        <div className="relative h-3 rounded-xl overflow-hidden bg-muted border border-primary/20">
          <motion.div
            className="absolute inset-0 bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.15)_40%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.15)_60%,rgba(255,255,255,0.15)_100%)]" />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="Skills & Expertise"
        subtitle="A comprehensive overview of my technical skills and professional competencies"
        icon={<Cpu className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold font-space-grotesk mb-4">
              My Technical Expertise
            </h2>
            <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
              A comprehensive overview of my skills and proficiency levels
              across various technologies and domains.
            </p>
          </motion.div>

          {/* Skills Tabs */}
          <div>
            <Tabs
              defaultValue="languages"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-10">
                <TabsList className="flex w-full max-w-2xl mx-auto bg-background/50 backdrop-blur-sm border-2 border-primary/20 rounded-xl overflow-hidden">
                  <TabsTrigger
                    value="languages"
                    className="flex-1 text-sm sm:text-base font-space-grotesk data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-3 sm:px-6 flex items-center justify-center"
                  >
                    <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap">Languages</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="frameworks"
                    className="flex-1 text-sm sm:text-base font-space-grotesk data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-3 sm:px-6 flex items-center justify-center"
                  >
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap">Frameworks</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tools"
                    className="flex-1 text-sm sm:text-base font-space-grotesk data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-3 sm:px-6 flex items-center justify-center"
                  >
                    <Tool className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap">Tools</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <motion.div
                className="bg-gradient-to-br from-background to-primary/5 rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                    {activeTab === 'languages' ? (
                      <Code className="h-6 w-6 text-primary" />
                    ) : activeTab === 'frameworks' ? (
                      <Layers className="h-6 w-6 text-primary" />
                    ) : (
                      <Tool className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk truncate">
                    {activeTab === 'languages'
                      ? 'Programming Languages'
                      : activeTab === 'frameworks'
                      ? 'Frameworks & Libraries'
                      : 'Tools & DevOps'}
                  </h2>
                </div>

                <TabsContent value="languages" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:gap-x-12">
                    {skills.languages.map((skill, index) => (
                      <SkillBar
                        key={index}
                        name={skill.name}
                        level={skill.level}
                        icon={skill.icon}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="frameworks" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:gap-x-12">
                    {skills.frameworks.map((skill, index) => (
                      <SkillBar
                        key={index}
                        name={skill.name}
                        level={skill.level}
                        icon={skill.icon}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="tools" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:gap-x-12">
                    {skills.tools.map((skill, index) => (
                      <SkillBar
                        key={index}
                        name={skill.name}
                        level={skill.level}
                        icon={skill.icon}
                      />
                    ))}
                  </div>
                </TabsContent>
              </motion.div>
            </Tabs>
          </div>

          {/* Areas of Expertise */}
          <div>
            <motion.h2
              className="text-2xl font-bold font-space-grotesk mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Areas of Expertise
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Database className="h-12 w-12" />,
                  title: 'Backend Development',
                  description:
                    'Building robust, scalable server-side applications with Node.js, Python, and Go. Experienced in RESTful APIs, GraphQL, and microservices architecture.',
                  gradient: 'from-blue-500 to-indigo-600',
                },
                {
                  icon: <Globe className="h-12 w-12" />,
                  title: 'Frontend Development',
                  description:
                    'Creating responsive, intuitive user interfaces with React.js and Next.js. Proficient in modern CSS frameworks and state management solutions.',
                  gradient: 'from-purple-500 to-pink-600',
                },
                {
                  icon: <Cloud className="h-12 w-12" />,
                  title: 'DevOps & Cloud',
                  description:
                    'Implementing CI/CD pipelines, containerization, and cloud infrastructure. Experience with AWS services, Docker, and Kubernetes for deployment.',
                  gradient: 'from-green-500 to-emerald-600',
                },
              ].map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="h-full border-none shadow-xl overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${area.gradient} p-8 flex justify-center text-white border-b-2 border-white/20`}
                    >
                      <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border border-white/30">
                        {area.icon}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-center font-space-grotesk">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground text-center font-inter leading-relaxed">
                        {area.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skill Stats */}
          <motion.div
            className="bg-gradient-to-br from-background to-primary/5 rounded-2xl p-8 shadow-xl border-2 border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold font-space-grotesk mb-8">
              Skill Distribution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  category: 'Languages',
                  count: skills.languages.length,
                  icon: <Code className="h-8 w-8" />,
                },
                {
                  category: 'Frameworks',
                  count: skills.frameworks.length,
                  icon: <Layers className="h-8 w-8" />,
                },
                {
                  category: 'Tools',
                  count: skills.tools.length,
                  icon: <Tool className="h-8 w-8" />,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border-2 border-primary/20 flex flex-col items-center text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold font-space-grotesk mb-2">
                    {stat.count}
                  </h3>
                  <p className="text-muted-foreground font-space-mono">
                    {stat.category}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
