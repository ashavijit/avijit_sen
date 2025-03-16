'use client'

import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'
import {
  Code,
  Trophy,
  Star,
  CheckCircle2,
  Clock,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Globe,
  MapPin,
  Building2,
  GraduationCap,
  Calendar,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface Submission {
  title: string
  titleSlug: string
  timestamp: string
  statusDisplay: string
  lang: string
}

interface Author {
  username: string
  isActive: boolean
  profile: {
    userAvatar: string
  }
}

interface Post {
  id: number
  creationDate: number
  contentPreview: string
  author: Author
}

interface TrendingTopic {
  id: number
  title: string
  post: Post
}

interface LeetCodeStats {
  totalSolved: number
  totalQuestions: number
  ranking: number
  contributionPoint: number
  reputation: number
  submissions: {
    easy: { solved: number; total: number; submissions: number }
    medium: { solved: number; total: number; submissions: number }
    hard: { solved: number; total: number; submissions: number }
  }
  recentSubmissions: Submission[]
}

interface SkillTag {
  tagName: string
  tagSlug: string
  problemsSolved: number
}

interface SkillStats {
  advanced: SkillTag[]
  intermediate: SkillTag[]
  fundamental: SkillTag[]
}

interface UserProfile {
  username: string
  name: string
  birthday: string
  avatar: string
  ranking: number
  reputation: number
  gitHub: string
  twitter: string
  linkedIN: string
  website: string[]
  country: string
  company: string
  school: string
  skillTags: string[]
  about: string
}

export default function LeetCodePage() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [skillStats, setSkillStats] = useState<SkillStats | null>(null)
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const COLORS = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9370DB',
    '#20B2AA',
  ]

  const DEFAULT_AVATAR = 'https://secure.gravatar.com/avatar/?s=200&d=mp'

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileRes, userRes] = await Promise.all([
          fetch(
            'https://alfa-leetcode-api.onrender.com/userProfile/shellpy03/',
            {
              headers: {
                Accept: 'application/json',
              },
            }
          ),
          fetch('https://alfa-leetcode-api.onrender.com/shellpy03/', {
            headers: {
              Accept: 'application/json',
            },
          }),
        ])

        if (!profileRes.ok || !userRes.ok) {
          throw new Error(`API error: ${profileRes.status} ${userRes.status}`)
        }

        const [profileText, userText] = await Promise.all([
          profileRes.text(),
          userRes.text(),
        ])

        let profileData, userData
        try {
          profileData = JSON.parse(profileText)
          userData = JSON.parse(userText)
          setProfile(userData)
          if (!profileData?.totalSolved || !profileData?.totalQuestions) {
            throw new Error('Missing required profile data fields')
          }

          const transformedStats: LeetCodeStats = {
            totalSolved: profileData.totalSolved,
            totalQuestions: profileData.totalQuestions,
            ranking: profileData.ranking || 0,
            contributionPoint: profileData.contributionPoint || 0,
            reputation: profileData.reputation || 0,
            submissions: {
              easy: {
                solved: profileData.easySolved || 0,
                total: profileData.totalEasy || 0,
                submissions:
                  profileData.totalSubmissions?.find(
                    (s: any) => s.difficulty === 'Easy'
                  )?.submissions || 0,
              },
              medium: {
                solved: profileData.mediumSolved || 0,
                total: profileData.totalMedium || 0,
                submissions:
                  profileData.totalSubmissions?.find(
                    (s: any) => s.difficulty === 'Medium'
                  )?.submissions || 0,
              },
              hard: {
                solved: profileData.hardSolved || 0,
                total: profileData.totalHard || 0,
                submissions:
                  profileData.totalSubmissions?.find(
                    (s: any) => s.difficulty === 'Hard'
                  )?.submissions || 0,
              },
            },
            recentSubmissions: (profileData.recentSubmissions || []).slice(
              0,
              4
            ),
          }
          setStats(transformedStats)
        } catch (e) {
          console.error('Failed to parse response:', { profileText, userText })
          throw new Error('Invalid data format')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchSkillsData = async () => {
      try {
        const skillsRes = await fetch(
          'https://alfa-leetcode-api.onrender.com/skillStats/shellpy03/',
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )

        if (!skillsRes.ok) {
          throw new Error(`Skills API error: ${skillsRes.status}`)
        }

        const skillsText = await skillsRes.text()
        let skillsData
        try {
          skillsData = JSON.parse(skillsText)
          if (!skillsData?.data?.matchedUser?.tagProblemCounts) {
            throw new Error('Missing required skills data fields')
          }

          const transformedSkills: SkillStats = {
            advanced: (
              skillsData.data.matchedUser.tagProblemCounts.advanced || []
            )
              .sort(
                (a: SkillTag, b: SkillTag) =>
                  b.problemsSolved - a.problemsSolved
              )
              .slice(0, 6),
            intermediate: (
              skillsData.data.matchedUser.tagProblemCounts.intermediate || []
            )
              .sort(
                (a: SkillTag, b: SkillTag) =>
                  b.problemsSolved - a.problemsSolved
              )
              .slice(0, 6),
            fundamental: (
              skillsData.data.matchedUser.tagProblemCounts.fundamental || []
            )
              .sort(
                (a: SkillTag, b: SkillTag) =>
                  b.problemsSolved - a.problemsSolved
              )
              .slice(0, 6),
          }
          setSkillStats(transformedSkills)
        } catch (e) {
          console.error('Failed to parse skills response:', skillsText)
          throw new Error('Invalid skills data format')
        }
      } catch (error) {
        console.error('Error fetching skills data:', error)
      }
    }

    const fetchTrendingData = async () => {
      try {
        const trendingRes = await fetch(
          'https://alfa-leetcode-api.onrender.com/trendingDiscuss?first=20',
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )

        if (!trendingRes.ok) {
          throw new Error(`Trending API error: ${trendingRes.status}`)
        }

        const trendingText = await trendingRes.text()
        let trendingData
        try {
          trendingData = JSON.parse(trendingText)
          setTrendingTopics(trendingData.cachedTrendingCategoryTopics || [])
        } catch (e) {
          console.error('Failed to parse trending response:', trendingText)
          throw new Error('Invalid trending data format')
        }
      } catch (error) {
        console.error('Error fetching trending data:', error)
      }
    }

    const fetchAllData = async () => {
      setLoading(true)
      await Promise.all([
        fetchProfileData(),
        fetchSkillsData(),
        fetchTrendingData(),
      ])
      setLoading(false)
    }

    fetchAllData()
  }, [])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatCreationDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  }

  const renderPieChart = (data: SkillTag[]) => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="problemsSolved"
          nameKey="tagName"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <RechartsTooltip />
      </PieChart>
    </ResponsiveContainer>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <PageHeader
          title="LeetCode Profile"
          subtitle="Track my problem-solving journey and coding achievements on LeetCode"
          icon={<Code className="h-8 w-8 text-primary" />}
          className="mb-8 px-4"
        />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[120px] rounded-lg overflow-hidden">
                  <Skeleton className="h-full" />
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[200px] rounded-lg overflow-hidden">
                  <Skeleton className="h-full" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="LeetCode Profile"
        subtitle="Track my problem-solving journey and coding achievements on LeetCode"
        icon={<Code className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Profile Card */}
          {profile && (
            <motion.div variants={itemVariants} className="mb-12 transform-gpu">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Profile Background */}
                    <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5" />

                    {/* Profile Content */}
                    <div className="p-6 -mt-16">
                      {/* Avatar and Basic Info */}
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="relative">
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-24 h-24 rounded-full border-4 border-background shadow-xl"
                          />
                          <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-background" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                            <div>
                              <h2 className="text-2xl font-bold font-space-grotesk">
                                {profile.name}
                              </h2>
                              <p className="text-muted-foreground font-space-mono">
                                @{profile.username}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {profile.gitHub && (
                                <a
                                  href={profile.gitHub}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                >
                                  <Github className="h-5 w-5" />
                                </a>
                              )}
                              {profile.twitter && (
                                <a
                                  href={profile.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                >
                                  <Twitter className="h-5 w-5" />
                                </a>
                              )}
                              {profile.linkedIN && (
                                <a
                                  href={profile.linkedIN}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                >
                                  <Linkedin className="h-5 w-5" />
                                </a>
                              )}
                              {profile.website?.[0] && (
                                <a
                                  href={`https://${profile.website[0]}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                                >
                                  <Globe className="h-5 w-5" />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* About */}
                          <p className="mt-4 text-muted-foreground">
                            {profile.about}
                          </p>

                          {/* Info Grid */}
                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {profile.country && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{profile.country}</span>
                              </div>
                            )}
                            {profile.company && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span>{profile.company}</span>
                              </div>
                            )}
                            {profile.school && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <GraduationCap className="h-4 w-4" />
                                <span>{profile.school}</span>
                              </div>
                            )}
                            {profile.birthday && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(
                                    profile.birthday
                                  ).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Skill Tags */}
                          <div className="mt-6 flex flex-wrap gap-2">
                            {profile.skillTags.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="font-space-mono"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Stats Overview */}
          {stats && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              variants={itemVariants}
            >
              {[
                {
                  title: 'Problems Solved',
                  value: stats.totalSolved,
                  icon: <Trophy className="h-6 w-6 text-primary" />,
                  tooltip: `Solved ${stats.totalSolved} out of ${stats.totalQuestions} problems`,
                },
                {
                  title: 'Global Ranking',
                  value: `#${stats.ranking}`,
                  icon: <Star className="h-6 w-6 text-primary" />,
                  tooltip: 'Your position in the global LeetCode rankings',
                },
                {
                  title: 'Contribution Points',
                  value: stats.contributionPoint,
                  icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
                  tooltip: 'Points earned from contributing to the community',
                },
                {
                  title: 'Reputation',
                  value: stats.reputation,
                  icon: <Trophy className="h-6 w-6 text-primary" />,
                  tooltip: 'Your reputation score in the LeetCode community',
                },
              ].map((stat, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                      >
                        <Card className="bg-gradient-to-br from-background to-primary/5 hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="bg-primary/10 p-3 rounded-xl">
                                {stat.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground font-space-grotesk">
                                  {stat.title}
                                </p>
                                <h3 className="text-2xl font-bold font-space-grotesk">
                                  {stat.value}
                                </h3>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stat.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </motion.div>
          )}

          {/* Problem Solving Progress */}
          {stats && (
            <motion.div variants={itemVariants} className="mb-12 transform-gpu">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 font-space-grotesk flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Problem Solving Progress
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        level: 'Easy',
                        solved: stats.submissions.easy.solved,
                        total: stats.submissions.easy.total,
                        color: 'bg-green-500',
                      },
                      {
                        level: 'Medium',
                        solved: stats.submissions.medium.solved,
                        total: stats.submissions.medium.total,
                        color: 'bg-yellow-500',
                      },
                      {
                        level: 'Hard',
                        solved: stats.submissions.hard.solved,
                        total: stats.submissions.hard.total,
                        color: 'bg-red-500',
                      },
                    ].map((difficulty) => (
                      <div key={difficulty.level}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium font-space-grotesk flex items-center gap-2">
                            <span
                              className={cn(
                                'w-2 h-2 rounded-full',
                                difficulty.color
                              )}
                            />
                            {difficulty.level}
                          </span>
                          <span className="text-sm text-muted-foreground font-space-mono">
                            {difficulty.solved} / {difficulty.total}
                          </span>
                        </div>
                        <div className="relative">
                          <Progress
                            value={(difficulty.solved / difficulty.total) * 100}
                            className={cn(
                              'h-2 rounded-full transition-all duration-300',
                              difficulty.color.replace('bg-', 'bg-opacity-20')
                            )}
                          />
                          <motion.div
                            className={cn(
                              'absolute top-0 left-0 h-2 rounded-full',
                              difficulty.color
                            )}
                            initial={{ width: '0%' }}
                            animate={{
                              width: `${
                                (difficulty.solved / difficulty.total) * 100
                              }%`,
                            }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Skills Statistics */}
          {skillStats && (
            <motion.div variants={itemVariants} className="mb-12 transform-gpu">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 font-space-grotesk flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Skills Statistics
                  </h3>
                  <Tabs defaultValue="advanced" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      {['Advanced', 'Intermediate', 'Fundamental'].map(
                        (tab) => (
                          <TabsTrigger
                            key={tab}
                            value={tab.toLowerCase()}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            {tab}
                          </TabsTrigger>
                        )
                      )}
                    </TabsList>
                    <AnimatePresence mode="wait">
                      {['advanced', 'intermediate', 'fundamental'].map(
                        (category) => (
                          <TabsContent
                            key={category}
                            value={category}
                            className="mt-0"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                              className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                              <div className="relative">
                                {renderPieChart(
                                  skillStats[category as keyof SkillStats]
                                )}
                              </div>
                              <div className="space-y-4">
                                {skillStats[category as keyof SkillStats].map(
                                  (skill, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: index * 0.1,
                                      }}
                                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                                    >
                                      <div
                                        className="w-4 h-4 rounded-full"
                                        style={{
                                          backgroundColor:
                                            COLORS[index % COLORS.length],
                                        }}
                                      />
                                      <div className="flex-1">
                                        <p className="font-medium font-space-grotesk">
                                          {skill.tagName}
                                        </p>
                                        <p className="text-sm text-muted-foreground font-space-mono">
                                          {skill.problemsSolved} problems solved
                                        </p>
                                      </div>
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </motion.div>
                          </TabsContent>
                        )
                      )}
                    </AnimatePresence>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Recent Submissions */}
          {stats?.recentSubmissions && stats.recentSubmissions.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12 transform-gpu">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 font-space-grotesk flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Submissions
                  </h3>
                  <div className="space-y-4">
                    {stats.recentSubmissions.map((submission, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-300 group">
                          <div className="flex items-center gap-4">
                            <div className="min-w-[24px]">
                              <Badge
                                variant={
                                  submission.statusDisplay === 'Accepted'
                                    ? 'default'
                                    : 'secondary'
                                }
                                className={cn(
                                  'font-space-mono transition-all duration-300',
                                  submission.statusDisplay === 'Accepted'
                                    ? 'group-hover:bg-green-500'
                                    : 'group-hover:bg-red-500'
                                )}
                              >
                                {submission.statusDisplay === 'Accepted'
                                  ? 'AC'
                                  : 'WA'}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-medium font-space-grotesk group-hover:text-primary transition-colors">
                                {submission.title}
                              </h4>
                              <p className="text-sm text-muted-foreground font-space-mono">
                                {formatTimestamp(submission.timestamp)} ·{' '}
                                {submission.lang.toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <a
                            href={`https://leetcode.com/problems/${submission.titleSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors p-2 hover:bg-primary/10 rounded-full"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Trending Discussions */}
          {trendingTopics.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12 transform-gpu">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold font-space-grotesk flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Trending Discussions
                    </h3>
                    <Badge
                      variant="outline"
                      className="font-space-mono animate-pulse"
                    >
                      Latest Updates
                    </Badge>
                  </div>
                  <div className="space-y-6">
                    {trendingTopics.slice(0, 5).map((topic, index) => (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-300 group">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <img
                                src={
                                  topic.post.author?.profile?.userAvatar ||
                                  DEFAULT_AVATAR
                                }
                                alt={
                                  topic.post.author?.username ||
                                  'Anonymous User'
                                }
                                className="w-10 h-10 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium font-space-grotesk text-primary truncate group-hover:text-primary/80 transition-colors">
                                  {topic.title}
                                </h4>
                                {topic.post.author?.isActive && (
                                  <Badge
                                    variant="secondary"
                                    className="flex-shrink-0 group-hover:bg-green-500/20 transition-colors"
                                  >
                                    Active
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2 group-hover:text-muted-foreground/80 transition-colors">
                                {topic.post.contentPreview}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="font-space-mono">
                                  {topic.post.author?.username || 'Anonymous'}
                                </span>
                                <span>•</span>
                                <span className="font-space-mono">
                                  {formatCreationDate(topic.post.creationDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Show error message if no data is available */}
          {!stats && !skillStats && trendingTopics.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="bg-red-500/10 p-6 rounded-lg">
                <p className="text-lg font-space-grotesk text-red-500">
                  Unable to load LeetCode data. Please try again later.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
