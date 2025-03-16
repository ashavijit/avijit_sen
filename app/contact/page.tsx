'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  Terminal,
  MessageSquare,
  Calendar,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PageHeader } from '@/components/ui/page-header'

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeContact, setActiveContact] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Scroll-based animations - only use on client side
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])
  const formScale = useTransform(scrollYProgress, [0.1, 0.2], [0.95, 1])
  const formOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0.8, 1])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: 'Message sent!',
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  // Floating contact bubbles data
  const contactBubbles = [
    {
      icon: Mail,
      title: 'Email',
      value: 'avijitsen24.me@gmail.com',
      href: 'mailto:avijitsen24.me@gmail.com',
      color: 'from-primary/40 to-primary/20',
      iconColor: 'var(--primary)',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8250325238',
      href: 'tel:+918250325238',
      color: 'from-primary/40 to-primary/20',
      iconColor: 'var(--primary)',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/avijit',
      href: 'https://github.com/avijit',
      color: 'from-primary/40 to-primary/20',
      iconColor: 'var(--primary)',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/avijit',
      href: 'https://linkedin.com/in/avijit',
      color: 'from-primary/40 to-primary/20',
      iconColor: 'var(--primary)',
    },
    {
      icon: MessageSquare,
      title: 'Chat',
      value: 'Start a conversation',
      href: '#contact-form',
      color: 'from-primary/40 to-primary/20',
      iconColor: 'var(--primary)',
    },
    {
      icon: Calendar,
      title: 'Schedule',
      value: 'Book a meeting',
      href: '#',
      color: 'from-primary/40 to-primary/20',
      iconColor: 'var(--primary)',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <PageHeader
        title="Get in Touch"
        subtitle="Connect with me through various channels or send me a direct message"
        icon={<Mail className="h-8 w-8 text-primary" />}
        className="mb-8 px-4"
      />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Floating Contact Bubbles */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {contactBubbles.map((bubble, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                onHoverStart={() => setActiveContact(index)}
                onHoverEnd={() => setActiveContact(null)}
              >
                <a
                  href={bubble.href}
                  className="block"
                  target={bubble.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    bubble.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${bubble.color} p-[1px] shadow-md hover:shadow-lg transition-all duration-300 will-change-transform`}
                  >
                    <div className="w-full h-full rounded-full bg-background/95 backdrop-blur-md flex items-center justify-center relative overflow-hidden group">
                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>

                      {/* Icon container with gradient background */}
                      <div
                        className={`p-3 rounded-full bg-gradient-to-br ${bubble.color} bg-opacity-10 transform transition-transform duration-300 group-hover:scale-110`}
                      >
                        <bubble.icon
                          className="h-5 w-5"
                          style={{
                            color: bubble.iconColor,
                            strokeWidth: 1.5,
                          }}
                        />
                      </div>

                      {/* Subtle ring animation on hover */}
                      <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-primary/10 opacity-0 group-hover:opacity-30 scale-90 group-hover:scale-100 transition-all duration-300"></div>
                    </div>
                  </div>

                  {/* Expanded info on hover */}
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-background/90 backdrop-blur-md rounded-lg p-3 shadow-xl border border-primary/20 w-48 z-10"
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{
                      opacity: activeContact === index ? 1 : 0,
                      scale: activeContact === index ? 1 : 0.8,
                      y: activeContact === index ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center">
                      <h3 className="font-medium font-space-grotesk text-lg mb-1">
                        {bubble.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-space-mono">
                        {bubble.value}
                      </p>
                    </div>
                  </motion.div>
                </a>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={
                isMounted ? { opacity: formOpacity, scale: formScale } : {}
              }
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-background to-primary/5 overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-space-grotesk mb-8 flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-primary" />
                    <span>Connect With Me</span>
                  </h2>

                  <div className="space-y-8">
                    {[
                      {
                        icon: Mail,
                        title: 'Email',
                        value: 'avijitsen24.me@gmail.com',
                        href: 'mailto:avijitsen24.me@gmail.com',
                      },
                      {
                        icon: Phone,
                        title: 'Phone',
                        value: '+91 8250325238',
                        href: 'tel:+918250325238',
                      },
                      {
                        icon: MapPin,
                        title: 'Location',
                        value: 'Noida, India',
                      },
                      {
                        icon: Github,
                        title: 'GitHub',
                        value: 'github.com/avijit',
                        href: 'https://github.com/avijit',
                      },
                      {
                        icon: Linkedin,
                        title: 'LinkedIn',
                        value: 'linkedin.com/in/avijit',
                        href: 'https://linkedin.com/in/avijit',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-5 group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium font-space-grotesk text-lg mb-1">
                            {item.title}
                          </h3>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={
                                item.href.startsWith('http')
                                  ? '_blank'
                                  : undefined
                              }
                              rel={
                                item.href.startsWith('http')
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                              className="text-muted-foreground hover:text-primary transition-colors font-space-mono"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground font-space-mono">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-none shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-primary/70 p-8 text-primary-foreground">
                    <h3 className="text-xl font-bold font-space-grotesk mb-4">
                      Available for Opportunities
                    </h3>
                    <p className="text-primary-foreground/90 font-inter">
                      I'm always open to discussing new projects, creative
                      ideas, or opportunities to be part of your vision.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={
                isMounted ? { opacity: formOpacity, scale: formScale } : {}
              }
              id="contact-form"
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-background to-primary/5 h-full">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-space-grotesk mb-8 flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-primary" />
                    <span className="typing-effect">Send Me a Message</span>
                  </h2>

                  {isSubmitted ? (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <CheckCircle className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold font-space-grotesk mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground max-w-md font-inter">
                        Thank you for reaching out. I'll get back to you as soon
                        as possible.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Terminal-style header */}
                      <div className="bg-primary/10 rounded-lg p-3 font-space-mono text-sm mb-6 border-l-4 border-primary">
                        <p className="text-primary">
                          $ initiating_contact_sequence
                        </p>
                        <p className="text-muted-foreground">
                          {'>'} Please enter your details below:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium font-space-grotesk flex items-center gap-2"
                          >
                            <span className="text-primary">$</span> Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-background/50 border-primary/20 focus:border-primary h-12 font-space-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium font-space-grotesk flex items-center gap-2"
                          >
                            <span className="text-primary">$</span> Your Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-background/50 border-primary/20 focus:border-primary h-12 font-space-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium font-space-grotesk flex items-center gap-2"
                        >
                          <span className="text-primary">$</span> Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can I help you?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="bg-background/50 border-primary/20 focus:border-primary h-12 font-space-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium font-space-grotesk flex items-center gap-2"
                        >
                          <span className="text-primary">$</span> Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message here..."
                          rows={8}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="bg-background/50 border-primary/20 focus:border-primary resize-none font-space-mono"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="px-8 py-6 h-auto text-base font-space-grotesk w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"></div>
                              $ sending_message...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Terminal className="h-4 w-4" />$ send_message
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Add some CSS for the typing effect */}
      <style jsx global>{`
        .typing-effect {
          border-right: 2px solid;
          animation: cursor-blink 1.5s steps(2) infinite;
        }

        @keyframes cursor-blink {
          0% {
            border-color: transparent;
          }
          50% {
            border-color: currentColor;
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}
