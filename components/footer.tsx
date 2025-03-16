import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="font-bold text-xl">
              Avijit<span className="text-primary">Sen</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Software Development Engineer specializing in full-stack development
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-4">
              <Link href="https://github.com/avijit" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/avijit" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:avijitsen24.me@gmail.com">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Avijit Sen. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

