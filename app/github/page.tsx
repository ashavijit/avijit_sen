'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Github,
  GitFork,
  Star,
  Eye,
  Code,
  GitBranch,
  GitCommit,
  ExternalLink,
  Calendar,
  Clock,
  MapPin,
  Building,
  Link as LinkIcon,
  X,
} from 'lucide-react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { PageHeader } from '@/components/ui/page-header'

// Types for GitHub API responses
interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  topics: string[]
  visibility: string
}

interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  html_url: string
  repository: {
    name: string
  }
}

interface GitHubCommitActivity {
  total: number
  week: number
  days: number[]
}

interface RepoDetails extends GitHubRepo {
  commitActivity?: GitHubCommitActivity[]
}

interface LanguageStats {
  [key: string]: number
}

export default function GitHubPage() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [commits, setCommits] = useState<GitHubCommit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRepo, setSelectedRepo] = useState<RepoDetails | null>(null)
  const [repoModalOpen, setRepoModalOpen] = useState(false)
  const [loadingRepoDetails, setLoadingRepoDetails] = useState(false)
  const [languages, setLanguages] = useState<LanguageStats>({})
  const [loadingLanguages, setLoadingLanguages] = useState(false)
  const [selectedCommitRepo, setSelectedCommitRepo] = useState<string | null>(
    null
  )

  const fetchLanguages = async (username: string) => {
    setLoadingLanguages(true)
    try {
      // Fetch all repositories to get complete language data
      const allReposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      )
      const allRepos = await allReposResponse.json()

      // Fetch language data for each repository
      const languageStats: LanguageStats = {}
      await Promise.all(
        allRepos.map(async (repo: GitHubRepo) => {
          if (repo.language) {
            languageStats[repo.language] =
              (languageStats[repo.language] || 0) + 1
          }
        })
      )

      setLanguages(languageStats)
    } catch (err) {
      console.error('Error fetching language statistics:', err)
    } finally {
      setLoadingLanguages(false)
    }
  }

  const fetchCommits = async (repoName: string) => {
    try {
      const commitsResponse = await fetch(
        `https://api.github.com/repos/ashavijit/${repoName}/commits?per_page=5`
      )
      const commitsData = await commitsResponse.json()

      // Add repository info to each commit
      const commitsWithRepo = commitsData.map((commit: any) => ({
        ...commit,
        repository: {
          name: repoName,
        },
      }))

      setCommits(commitsWithRepo)
      setSelectedCommitRepo(repoName)
    } catch (err) {
      console.error('Error fetching commits:', err)
      setCommits([])
    }
  }

  const fetchGitHubData = async () => {
    setLoading(true)
    setError(null)
    try {
      const username = 'ashavijit'

      // Fetch user data
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      )
      if (!userResponse.ok) {
        throw new Error('User not found')
      }
      const userData = await userResponse.json()
      setUser(userData)

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
      )
      const reposData = await reposResponse.json()
      setRepos(reposData)

      // Fetch languages data
      await fetchLanguages(username)

      // Fetch commits for the first repo if available
      if (reposData.length > 0) {
        await fetchCommits(reposData[0].name)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching GitHub data:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRepoDetails = async (repo: GitHubRepo) => {
    setLoadingRepoDetails(true)
    try {
      // Fetch commit activity for the repository
      const commitActivityResponse = await fetch(
        `https://api.github.com/repos/${repo.full_name}/stats/commit_activity`
      )
      const commitActivityData = await commitActivityResponse.json()

      setSelectedRepo({
        ...repo,
        commitActivity: commitActivityData,
      })
    } catch (err) {
      console.error('Error fetching repository details:', err)
    } finally {
      setLoadingRepoDetails(false)
    }
  }

  const handleRepoClick = async (repo: GitHubRepo) => {
    setRepoModalOpen(true)
    await fetchRepoDetails(repo)
  }

  useEffect(() => {
    fetchGitHubData()
  }, [])

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Animation variants
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
      <PageHeader
        title="GitHub Profile"
        subtitle="Explore my open source contributions, repositories, and coding activity"
        icon={<Github className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-lg text-muted-foreground font-space-grotesk">
                Loading GitHub data...
              </p>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl p-6 text-center">
              <h2 className="text-xl font-bold mb-2 font-space-grotesk">
                Error
              </h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            user && (
              <>
                {/* User Profile */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {/* Profile Card */}
                  <motion.div variants={item} className="lg:col-span-1">
                    <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-background to-primary/5 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-6 mt-2">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-75"></div>
                            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background">
                              <Image
                                src={user.avatar_url}
                                alt={user.name || user.login}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <h2 className="text-2xl font-bold font-space-grotesk mb-1">
                            {user.name || user.login}
                          </h2>
                          <a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground font-space-mono mb-4 flex items-center justify-center gap-1 hover:text-primary transition-colors"
                          >
                            <Github className="h-4 w-4" />@{user.login}
                          </a>
                          {user.bio && (
                            <p className="text-muted-foreground mb-6 font-inter">
                              {user.bio}
                            </p>
                          )}

                          <div className="grid grid-cols-3 gap-4 w-full mb-6">
                            <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                              <span className="text-xl font-bold font-space-grotesk">
                                {user.public_repos}
                              </span>
                              <span className="text-xs text-muted-foreground font-space-mono">
                                Repos
                              </span>
                            </div>
                            <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                              <span className="text-xl font-bold font-space-grotesk">
                                {user.followers}
                              </span>
                              <span className="text-xs text-muted-foreground font-space-mono">
                                Followers
                              </span>
                            </div>
                            <div className="flex flex-col items-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                              <span className="text-xl font-bold font-space-grotesk">
                                {user.following}
                              </span>
                              <span className="text-xs text-muted-foreground font-space-mono">
                                Following
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3 w-full">
                            {user.company && (
                              <div className="flex items-center gap-3 text-sm">
                                <Building className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground font-space-mono">
                                  {user.company}
                                </span>
                              </div>
                            )}
                            {user.location && (
                              <div className="flex items-center gap-3 text-sm">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground font-space-mono">
                                  {user.location}
                                </span>
                              </div>
                            )}
                            {user.blog && (
                              <div className="flex items-center gap-3 text-sm">
                                <LinkIcon className="h-4 w-4 text-primary" />
                                <a
                                  href={
                                    user.blog.startsWith('http')
                                      ? user.blog
                                      : `https://${user.blog}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground font-space-mono hover:text-primary transition-colors truncate"
                                >
                                  {user.blog}
                                </a>
                              </div>
                            )}
                            <div className="flex items-center gap-3 text-sm">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="text-muted-foreground font-space-mono">
                                Joined {formatDate(user.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Repositories and Commits */}
                  <motion.div variants={item} className="lg:col-span-2">
                    <Tabs defaultValue="repositories" className="w-full">
                      <TabsList className="flex w-full bg-background/50 backdrop-blur-sm border-2 border-primary/20 rounded-xl overflow-hidden mb-6">
                        <TabsTrigger
                          value="repositories"
                          className="flex-1 text-sm sm:text-base font-space-grotesk data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-3 sm:px-6 flex items-center justify-center"
                        >
                          <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                          <span className="whitespace-nowrap">
                            Repositories
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="commits"
                          className="flex-1 text-sm sm:text-base font-space-grotesk data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-3 sm:px-6 flex items-center justify-center"
                        >
                          <GitCommit className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                          <span className="whitespace-nowrap">
                            Recent Commits
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="languages"
                          className="flex-1 text-sm sm:text-base font-space-grotesk data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-3 sm:px-6 flex items-center justify-center"
                        >
                          <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                          <span className="whitespace-nowrap">Languages</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="repositories" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {repos.length > 0 ? (
                            repos.map((repo) => (
                              <Card
                                key={repo.id}
                                className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-background to-primary/5 overflow-hidden cursor-pointer"
                                onClick={() => handleRepoClick(repo)}
                              >
                                <CardHeader className="p-5 pb-3">
                                  <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg font-space-grotesk flex items-center gap-2">
                                      <GitBranch className="h-5 w-5 text-primary" />
                                      <span className="truncate">
                                        {repo.name}
                                      </span>
                                    </CardTitle>
                                    {repo.fork && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        <GitFork className="h-3 w-3 mr-1" />
                                        Fork
                                      </Badge>
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent className="p-5 pt-0">
                                  {repo.description && (
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 font-inter">
                                      {repo.description}
                                    </p>
                                  )}
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {repo.language && (
                                      <Badge
                                        variant="secondary"
                                        className="bg-primary/10 text-primary border-none"
                                      >
                                        {repo.language}
                                      </Badge>
                                    )}
                                    {repo.topics &&
                                      repo.topics.slice(0, 2).map((topic) => (
                                        <Badge
                                          key={topic}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {topic}
                                        </Badge>
                                      ))}
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-muted-foreground font-space-mono">
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5" />
                                        <span>{repo.stargazers_count}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <GitFork className="h-3.5 w-3.5" />
                                        <span>{repo.forks_count}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-3.5 w-3.5" />
                                        <span>{repo.watchers_count}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>
                                        Updated {formatDate(repo.updated_at)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-4 pt-4 border-t border-primary/10">
                                    <a
                                      href={repo.html_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary text-sm font-space-grotesk flex items-center hover:underline"
                                    >
                                      View Repository
                                      <ExternalLink className="h-3.5 w-3.5 ml-1" />
                                    </a>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <div className="col-span-2 text-center py-12 bg-primary/5 rounded-xl border-2 border-primary/20">
                              <Code className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                              <h3 className="text-xl font-bold font-space-grotesk mb-2">
                                No repositories found
                              </h3>
                              <p className="text-muted-foreground">
                                This user doesn't have any public repositories
                                yet.
                              </p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="commits" className="mt-0">
                        <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-background to-primary/5">
                          <CardHeader className="p-5 pb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <CardTitle className="text-lg font-space-grotesk flex items-center gap-2">
                                <GitCommit className="h-5 w-5 text-primary" />
                                Recent Commits
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <select
                                  value={selectedCommitRepo || ''}
                                  onChange={(e) => fetchCommits(e.target.value)}
                                  className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5 text-sm font-space-grotesk focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                  {repos.map((repo) => (
                                    <option key={repo.id} value={repo.name}>
                                      {repo.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-0">
                            {commits.length > 0 ? (
                              <>
                                <div className="divide-y divide-primary/10">
                                  {commits.map((commit, index) => (
                                    <motion.div
                                      key={commit.sha}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="p-5 hover:bg-primary/5 transition-colors relative group"
                                    >
                                      {/* Timeline dot and line */}
                                      <div className="absolute left-5 top-0 bottom-0 w-px bg-primary/20 group-first:top-1/2 group-last:bottom-1/2" />
                                      <div className="absolute left-[17px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-primary bg-background" />

                                      <div className="flex items-start gap-6 pl-6">
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-start justify-between gap-4 mb-2">
                                            <a
                                              href={commit.html_url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-primary hover:underline font-space-grotesk font-medium line-clamp-2 flex-1"
                                            >
                                              {commit.commit.message}
                                            </a>
                                            <span className="text-xs text-muted-foreground font-space-mono whitespace-nowrap">
                                              {formatDate(
                                                commit.commit.author.date
                                              )}
                                            </span>
                                          </div>
                                          <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <GitCommit className="h-3.5 w-3.5 text-primary" />
                                              </div>
                                              <span className="font-mono text-xs text-muted-foreground">
                                                {commit.sha.substring(0, 7)}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Github className="h-3.5 w-3.5 text-primary" />
                                              </div>
                                              <span className="text-muted-foreground font-space-mono text-xs">
                                                {commit.commit.author.name}
                                              </span>
                                            </div>
                                            <a
                                              href={commit.html_url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="ml-auto text-xs text-primary hover:underline font-space-grotesk flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                              View Commit
                                              <ExternalLink className="h-3 w-3" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                                <div className="p-4 bg-primary/5 border-t border-primary/10">
                                  <a
                                    href={`https://github.com/ashavijit/${selectedCommitRepo}/commits`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline text-sm font-space-grotesk flex items-center justify-center gap-2"
                                  >
                                    View All Commits
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                </div>
                              </>
                            ) : (
                              <div className="text-center py-12">
                                <GitCommit className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                                <h3 className="text-xl font-bold font-space-grotesk mb-2">
                                  No commits found
                                </h3>
                                <p className="text-muted-foreground">
                                  No recent commits are available for this
                                  repository.
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="languages" className="mt-0">
                        <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-background to-primary/5">
                          <CardHeader className="p-5 pb-3">
                            <CardTitle className="text-lg font-space-grotesk flex items-center gap-2">
                              <Code className="h-5 w-5 text-primary" />
                              Top Programming Languages
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-5">
                            {loadingLanguages ? (
                              <div className="flex items-center justify-center py-12">
                                <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                              </div>
                            ) : Object.keys(languages).length > 0 ? (
                              <div className="space-y-8">
                                {/* Horizontal Bar Chart */}
                                <div className="space-y-4">
                                  {Object.entries(languages)
                                    .sort(([, a], [, b]) => b - a)
                                    .slice(0, 6)
                                    .map(([language, count], index) => {
                                      const percentage =
                                        (count /
                                          Object.values(languages).reduce(
                                            (a, b) => a + b,
                                            0
                                          )) *
                                        100
                                      const colors = [
                                        'from-blue-500 to-blue-700',
                                        'from-purple-500 to-purple-700',
                                        'from-green-500 to-green-700',
                                        'from-yellow-500 to-yellow-700',
                                        'from-red-500 to-red-700',
                                        'from-pink-500 to-pink-700',
                                      ]
                                      return (
                                        <motion.div
                                          key={language}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                          className="relative"
                                        >
                                          <div className="flex items-center gap-3 mb-2">
                                            <div className="w-24 text-sm font-space-grotesk truncate">
                                              {language}
                                            </div>
                                            <div className="flex-1 h-8 bg-primary/5 rounded-lg overflow-hidden">
                                              <motion.div
                                                initial={{ width: 0 }}
                                                animate={{
                                                  width: `${percentage}%`,
                                                }}
                                                transition={{
                                                  duration: 0.5,
                                                  delay: index * 0.1,
                                                }}
                                                className={`h-full bg-gradient-to-r ${colors[index]} rounded-lg`}
                                              />
                                            </div>
                                            <div className="w-20 text-right text-sm text-muted-foreground font-space-mono">
                                              {count} repos
                                            </div>
                                          </div>
                                        </motion.div>
                                      )
                                    })}
                                </div>

                                {/* Summary Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-primary/10">
                                  <div className="flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <span className="text-xl font-bold font-space-grotesk">
                                      {Object.keys(languages).length}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-space-mono text-center">
                                      Total Languages
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <span className="text-xl font-bold font-space-grotesk">
                                      {Object.values(languages).reduce(
                                        (a, b) => a + b,
                                        0
                                      )}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-space-mono text-center">
                                      Total Repositories
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <span className="text-xl font-bold font-space-grotesk">
                                      {Object.entries(languages).sort(
                                        ([, a], [, b]) => b - a
                                      )[0]?.[0] || 'N/A'}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-space-mono text-center">
                                      Most Used Language
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-12">
                                <Code className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                                <h3 className="text-xl font-bold font-space-grotesk mb-2">
                                  No language data
                                </h3>
                                <p className="text-muted-foreground">
                                  No programming languages found in
                                  repositories.
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                </motion.div>
              </>
            )
          )}
        </div>
      </main>

      {/* Repository Details Modal */}
      <Dialog open={repoModalOpen} onOpenChange={setRepoModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogTitle>Repository Details</DialogTitle>
          {selectedRepo && (
            <>
              <div className="flex items-center gap-2 text-2xl font-space-grotesk mb-4">
                <GitBranch className="h-6 w-6 text-primary" />
                {selectedRepo.name}
              </div>

              <div className="space-y-6">
                {/* Repository Description */}
                {selectedRepo.description && (
                  <p className="text-muted-foreground font-inter">
                    {selectedRepo.description}
                  </p>
                )}

                {/* Repository Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <Star className="h-5 w-5 text-primary mb-2" />
                    <span className="text-xl font-bold font-space-grotesk">
                      {selectedRepo.stargazers_count}
                    </span>
                    <span className="text-xs text-muted-foreground font-space-mono">
                      Stars
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <GitFork className="h-5 w-5 text-primary mb-2" />
                    <span className="text-xl font-bold font-space-grotesk">
                      {selectedRepo.forks_count}
                    </span>
                    <span className="text-xs text-muted-foreground font-space-mono">
                      Forks
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <Eye className="h-5 w-5 text-primary mb-2" />
                    <span className="text-xl font-bold font-space-grotesk">
                      {selectedRepo.watchers_count}
                    </span>
                    <span className="text-xs text-muted-foreground font-space-mono">
                      Watchers
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <Code className="h-5 w-5 text-primary mb-2" />
                    <span className="text-xl font-bold font-space-grotesk">
                      {selectedRepo.size}
                    </span>
                    <span className="text-xs text-muted-foreground font-space-mono">
                      Size (KB)
                    </span>
                  </div>
                </div>

                {/* Technologies and Topics */}
                <div className="space-y-2">
                  <h3 className="text-lg font-space-grotesk">
                    Technologies & Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRepo.language && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-none"
                      >
                        {selectedRepo.language}
                      </Badge>
                    )}
                    {selectedRepo.topics.map((topic) => (
                      <Badge key={topic} variant="outline">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Commit Activity Graph */}
                <div className="space-y-2">
                  <h3 className="text-lg font-space-grotesk">
                    Commit Activity
                  </h3>
                  <div className="h-48 w-full bg-primary/5 rounded-xl border-2 border-primary/10 p-4">
                    {loadingRepoDetails ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                      </div>
                    ) : selectedRepo.commitActivity &&
                      selectedRepo.commitActivity.length > 0 ? (
                      <div className="h-full flex items-end justify-between gap-1">
                        {selectedRepo.commitActivity
                          .slice(-12)
                          .map((week, index) => {
                            const maxCommits = Math.max(
                              ...selectedRepo.commitActivity!.map(
                                (w) => w.total
                              )
                            )
                            const height = (week.total / maxCommits) * 100
                            return (
                              <div
                                key={index}
                                className="flex-1 bg-primary/20 hover:bg-primary/30 transition-colors rounded-t"
                                style={{ height: `${height}%` }}
                                title={`${week.total} commits`}
                              />
                            )
                          })}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No commit activity data available
                      </div>
                    )}
                  </div>
                </div>

                {/* Repository Links */}
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <div className="text-sm text-muted-foreground font-space-mono">
                    Created: {formatDate(selectedRepo.created_at)}
                  </div>
                  <a
                    href={selectedRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline font-space-grotesk"
                  >
                    View on GitHub
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
