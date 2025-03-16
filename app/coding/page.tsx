'use client'

import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Code, Star, Award } from 'lucide-react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CodingProfilesPage() {
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  const codingProfiles = [
    {
      platform: 'LeetCode',
      username: 'avijit',
      stats: '550+ Algorithms solved',
      link: 'https://leetcode.com/avijit/',
      icon: '/placeholder.svg?height=80&width=80',
    },
    {
      platform: 'HackerRank',
      username: 'avijit',
      stats: '5★ Rating & Gold Badge in MySQL',
      link: 'https://www.hackerrank.com/avijit',
      icon: '/placeholder.svg?height=80&width=80',
    },
    {
      platform: 'GitHub',
      username: 'avijit',
      stats: 'Open Source Contributor',
      link: 'https://github.com/avijit',
      icon: 'https://sjc.microlink.io/orntz3lxqXqwi8B2BPYqY5PXyO8Rmjg9-m6lgrWxQFVI5FTUyhBuF5EU7-I2lEAkoeWrsrV26ZKRmerjHgSKOA.jpeg',
    },
  ]

  const openSourceContributions = [
    {
      project: 'gis-ops',
      description:
        'Contributed to geospatial data processing tools and libraries.',
      link: 'https://github.com/gis-ops',
    },
    {
      project: 'windicss',
      description:
        'Contributed to the Windi CSS framework, an alternative to Tailwind CSS.',
      link: 'https://github.com/windicss/windicss',
    },
    {
      project: 'blitzjs',
      description:
        'Contributed to Blitz.js, a full-stack React framework built on Next.js.',
      link: 'https://github.com/blitz-js/blitz',
    },
    {
      project: 'ScoreLabs',
      description:
        'Contributed to open-source projects under ScoreLabs organization.',
      link: 'https://github.com/scorelab',
    },
  ]

  const achievements = [
    {
      title: "JWOC'23 Organizer",
      description:
        "Organized JWOC'23 and developed the website for this open-source event with more than 1500 participants.",
      icon: <Award className="h-8 w-8 text-primary" />,
    },
    {
      title: '650+ Coding Problems',
      description:
        'Solved over 650 algorithmic problems across various coding platforms.',
      icon: <Code className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Gold Badge in MySQL',
      description:
        'Achieved Gold Badge in MySQL on HackerRank, demonstrating advanced database skills.',
      icon: <Star className="h-8 w-8 text-primary" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="Coding Profiles"
        subtitle="Explore my achievements and contributions across various coding platforms"
        icon={<Code className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Coding Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {codingProfiles.map((profile, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center gap-6">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-primary/10 group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={profile.icon || '/placeholder.svg'}
                          alt={profile.platform}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight font-space-grotesk">
                          {profile.platform}
                        </h2>
                        <p className="text-primary font-medium font-space-mono">
                          @{profile.username}
                        </p>
                        <p className="text-muted-foreground font-inter">
                          {profile.stats}
                        </p>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors font-space-grotesk"
                      >
                        <a
                          href={profile.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Profile
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Open Source Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <h2 className="text-2xl font-bold font-space-grotesk">
                Open Source Contributions
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openSourceContributions.map((contrib, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-4 items-start">
                        <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <Github className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 font-space-grotesk">
                            <a
                              href={contrib.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors inline-flex items-center gap-2"
                            >
                              {contrib.project}
                              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </h3>
                          <p className="text-muted-foreground leading-relaxed font-inter">
                            {contrib.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Achievements Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-8 bg-primary rounded-full"></div>
              <h2 className="text-2xl font-bold font-space-grotesk">
                Achievements
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5 border-primary/20">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center gap-6">
                        <div className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          {achievement.icon}
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold tracking-tight font-space-grotesk">
                            {achievement.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed font-inter">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
