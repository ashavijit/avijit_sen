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
    // Close active contact on mobile when scrolling
    const handleScroll = () => setActiveContact(null)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

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
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
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
      value: 'github.com/ashavijit',
      href: 'https://github.com/ashavijit',
      color: 'from-primary/40 to-primary/20',
      iconColor: 'var(--primary)',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/avijit-sen-69a00b1b9',
      href: 'https://linkedin.com/in/avijit-sen-69a00b1b9',
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
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {contactBubbles.map((bubble, index) => (
              <motion.div
                key={index}
                className="relative flex justify-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setActiveContact(index)}
                onHoverEnd={() => setActiveContact(null)}
              >
                <a
                  href={bubble.href}
                  className="block w-full"
                  target={bubble.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    bubble.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  <div
                    className={`aspect-square rounded-2xl bg-gradient-to-br ${bubble.color} p-[1px] shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="w-full h-full rounded-2xl bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-3 gap-2 relative overflow-hidden group">
                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />

                      {/* Icon */}
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${bubble.color} bg-opacity-10 transform transition-transform duration-300 group-hover:scale-110`}
                      >
                        <bubble.icon
                          className="h-6 w-6"
                          style={{
                            color: bubble.iconColor,
                            strokeWidth: 1.5,
                          }}
                        />
                      </div>

                      {/* Title */}
                      <span className="text-sm font-medium text-center font-space-grotesk">
                        {bubble.title}
                      </span>

                      {/* Subtle ring animation on hover */}
                      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/10 opacity-0 group-hover:opacity-30 scale-90 group-hover:scale-100 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Expanded info on hover - Only show on desktop */}
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-background/90 backdrop-blur-md rounded-lg p-3 shadow-xl border border-primary/20 w-48 z-10 hidden md:block"
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
                      <p className="text-sm text-muted-foreground font-space-mono break-all">
                        {bubble.value}
                      </p>
                    </div>
                  </motion.div>
                </a>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info Card */}
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
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold font-space-grotesk mb-6 sm:mb-8 flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-primary" />
                    <span>Connect With Me</span>
                  </h2>

                  <div className="space-y-6 sm:space-y-8">
                    {contactBubbles.slice(0, 4).map((contact, index) => (
                      <a
                        key={index}
                        href={contact.href}
                        target={
                          contact.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          contact.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors group"
                      >
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${contact.color} transform transition-transform duration-300 group-hover:scale-110`}
                        >
                          <contact.icon
                            className="h-5 w-5"
                            style={{
                              color: contact.iconColor,
                              strokeWidth: 1.5,
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium font-space-grotesk">
                            {contact.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-space-mono">
                            {contact.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={
                isMounted ? { opacity: formOpacity, scale: formScale } : {}
              }
            >
              <Card
                className="border-none shadow-xl bg-gradient-to-br from-background to-primary/5 overflow-hidden"
                id="contact-form"
              >
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold font-space-grotesk mb-6 sm:mb-8 flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span>Send a Message</span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="min-h-[150px] bg-background/50 resize-y"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : isSubmitted ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Sent!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
