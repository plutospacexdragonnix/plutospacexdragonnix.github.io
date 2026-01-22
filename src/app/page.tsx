"use client"

import { useState, useRef, useLayoutEffect, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ExternalLink, Briefcase, Mail, Home, Code } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Particles from "@/components/Particles"
import Image from "next/image"
import portfolioPhoto from "@/assets/img/my portfolio photo.png"

type Section = "home" | "about" | "skills" | "projects" | "experience" | "contact"

const sections: Section[] = ["home", "about", "skills", "projects", "experience", "contact"]

// Vintage color palette
const COLORS = {
  bg: "#EDE5D8", // Warm cream background
  card: "#E8DCC4", // Sand card background
  text: "#2D1F1A", // Dark brown text
  textSecondary: "#2D1F1ACC", // Text with opacity
  accent: "#B87333", // Copper accent
  border: "#2D1F1A15", // Subtle border
}

const projects = [
  {
    id: 1,
    title: "Utilities Deals",
    tech: "Next.js, Tailwind CSS, HTML, JavaScript",
    description:
      "I built the Blog and About Us pages for Utilities Deals using Next.js and Tailwind CSS. I worked with the API provided by the client to fetch content, making sure the pages are responsive, user-friendly, and easy to navigate.",
    features: [],
    github: "",
    url: "https://utilitiesdeals.co.uk/",
    skills: ["Next.js", "Tailwind CSS", "HTML", "JavaScript"],
  },
  {
    id: 2,
    title: "BabyBazar.pk",
    tech: "Shopify, Ruby on Rails, JSON APIs, Liquid",
    description:
      "I managed the backend for BabyBazar.pk on Shopify using Ruby on Rails, building and maintaining JSON APIs to ensure smooth data flow and reliable platform performance.",
    features: [],
    github: "",
    url: "https://babybazar.pk/",
    skills: ["Shopify", "Ruby on Rails", "JSON APIs", "Liquid"],
  },
  {
    id: 3,
    title: "CompareNook.com",
    tech: "Node.js, Next.js, JavaScript, Full-Stack Development",
    description:
      "CompareNook.com is a price comparison website I built to help users find the best deals across multiple online marketplaces. It allows shoppers to quickly compare prices, explore different products, and make smarter purchasing decisions.",
    features: [],
    github: "",
    url: "https://www.comparenook.com/",
    skills: ["Node.js", "Next.js", "JavaScript", "Full-Stack Development"],
  },
]

interface Project {
  id: number
  title: string
  tech: string
  description: string
  features: string[]
  github: string
  url: string
  skills: string[]
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const activeSectionRef = useRef<Section>(activeSection)
  const selectedProjectRef = useRef<Project | null>(null)

  // Keep refs in sync with state
  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    selectedProjectRef.current = selectedProject
  }, [selectedProject])

  const handleSectionChange = (section: Section) => {
    if (section === activeSectionRef.current) return
    setActiveSection(section)
    setSelectedProject(null)
    selectedProjectRef.current = null
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    selectedProjectRef.current = project
  }

  const handleBack = () => {
    setSelectedProject(null)
    selectedProjectRef.current = null
  }

  // Scroll navigation handler with infinite loop - attach once and keep it active
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't handle scroll when viewing project detail
      if (selectedProjectRef.current) return

      // Only handle scroll if we're not already scrolling
      if (isScrollingRef.current) return

      e.preventDefault()

      const currentIndex = sections.indexOf(activeSectionRef.current)
      let nextIndex = currentIndex

      if (e.deltaY > 0) {
        // Scrolling down - move to next section (wrap around)
        nextIndex = (currentIndex + 1) % sections.length
      } else if (e.deltaY < 0) {
        // Scrolling up - move to previous section (wrap around)
        nextIndex = (currentIndex - 1 + sections.length) % sections.length
      }

      if (nextIndex !== currentIndex) {
        isScrollingRef.current = true
        const nextSection = sections[nextIndex]
        setActiveSection(nextSection)
        activeSectionRef.current = nextSection
        setSelectedProject(null)
        selectedProjectRef.current = null

        // Reset scrolling flag after animation
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false
        }, 500) // Match animation duration + buffer
      }
    }

    const container = document.body
    container.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, []) // Empty dependency array - attach once and never remove

  return (
    <div
      className="h-screen relative overflow-hidden"
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* Particles background */}
      <Particles />

      {/* Main container */}
      <div className="relative z-10 flex h-screen">
        {/* Left content area */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-12 md:py-16 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedProject ? `project-${selectedProject.id}` : `section-${activeSection}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.25,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="w-full max-w-2xl max-h-full overflow-y-auto scrollbar-thin"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: `${COLORS.accent}40 transparent`,
              }}
            >
              {selectedProject ? (
                <ProjectDetail project={selectedProject} onBack={handleBack} />
              ) : (
                <SectionContent section={activeSection} onProjectClick={handleProjectClick} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right navigation sidebar */}
        <DesktopNavigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </div>

      {/* Mobile navigation */}
      <MobileNavigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
    </div>
  )
}

// Navigation items
const navItems = [
  { id: "home" as Section, label: "Home", icon: Home },
  { id: "about" as Section, label: "About", icon: Briefcase },
  { id: "skills" as Section, label: "Skills", icon: Code },
  { id: "projects" as Section, label: "Projects", icon: ArrowRight },
  { id: "experience" as Section, label: "Experience", icon: Briefcase },
  { id: "contact" as Section, label: "Contact", icon: Mail },
]

// Desktop Navigation Component
function DesktopNavigation({
  activeSection,
  onSectionChange,
}: {
  activeSection: Section
  onSectionChange: (section: Section) => void
}) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null)

  useLayoutEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.id === activeSection)
    const button = buttonRefs.current[activeIndex]

    if (button) {
      const buttonTop = button.offsetTop
      const buttonHeight = button.offsetHeight
      const top = buttonTop + buttonHeight / 2 - 24
      setIndicatorTop(top)
    }
  }, [activeSection])

  return (
    <nav className="hidden md:flex flex-col items-center justify-center gap-6 w-24 relative">
      {/* Full height border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ backgroundColor: COLORS.border }}
      />

      {navItems.map((item, index) => {
        const Icon = item.icon
        const isActive = activeSection === item.id

        return (
          <button
            key={item.id}
            ref={(el) => {
              buttonRefs.current[index] = el
            }}
            onClick={() => onSectionChange(item.id)}
            className="group relative flex flex-col items-center gap-2 px-4 py-3 transition-all duration-200"
            style={{
              color: isActive ? COLORS.accent : COLORS.text,
              opacity: isActive ? 1 : 0.5,
            }}
          >
            <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        )
      })}

      {/* Active indicator */}
      {indicatorTop !== null && (
        <div
          className="absolute left-0 w-1 h-12 rounded-r-full transition-all duration-200 pointer-events-none"
          style={{
            backgroundColor: COLORS.accent,
            top: `${indicatorTop}px`,
          }}
        />
      )}
    </nav>
  )
}

// Mobile Navigation Component
function MobileNavigation({
  activeSection,
  onSectionChange,
}: {
  activeSection: Section
  onSectionChange: (section: Section) => void
}) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorLeft, setIndicatorLeft] = useState<number | null>(null)

  useLayoutEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.id === activeSection)
    const button = buttonRefs.current[activeIndex]

    if (button) {
      const buttonLeft = button.offsetLeft
      const buttonWidth = button.offsetWidth
      const left = buttonLeft + buttonWidth / 2
      setIndicatorLeft(left)
    }
  }, [activeSection])

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-lg z-50"
      style={{
        backgroundColor: `${COLORS.bg}F5`,
      }}
    >
      <nav className="relative">
        {/* Top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ backgroundColor: COLORS.border }}
        />

        {/* Active indicator */}
        {indicatorLeft !== null && (
          <div
            className="absolute top-0 h-1 w-12 rounded-b-full transition-all duration-200 pointer-events-none"
            style={{
              backgroundColor: COLORS.accent,
              left: `${indicatorLeft}px`,
              transform: "translateX(-50%)",
            }}
          />
        )}

        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                ref={(el) => {
                  buttonRefs.current[index] = el
                }}
                onClick={() => onSectionChange(item.id)}
                className="flex flex-col items-center gap-1 px-4 py-2 transition-all duration-200"
                style={{
                  color: isActive ? COLORS.accent : COLORS.text,
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

// Home Section Component
function HomeSection() {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-8 w-full min-h-full">
      {/* Background photo - always visible behind text with 50% opacity */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none flex items-center justify-center"
        style={{ zIndex: 5 }}
      >
        <div className="relative w-full h-full" style={{ maxWidth: "100vw", maxHeight: "100vh" }}>
          <Image
            src={portfolioPhoto}
            alt="Portfolio Photo Background"
            fill
            className="object-contain"
            sizes="100vw"
            priority
            style={{ opacity: 0.5 }}
          />
        </div>
      </div>

      {/* Content - positioned above background photo */}
      <div className="relative z-10 space-y-4 text-center">
        <h1
          className="text-5xl md:text-6xl font-bold tracking-tight"
          style={{ color: COLORS.text }}
        >
          Hi, I&apos;m Aoi Nakamura
          <span className="text-2xl md:text-3xl font-normal" style={{ display: "block", marginTop: "0.25rem" }}>
            (中村 蒼)
          </span>
        </h1>
        <p
          className="text-lg max-w-lg leading-relaxed mx-auto"
          style={{ color: COLORS.textSecondary }}
        >
          Full-Stack & Game Developer experienced in Node.js, Python, PHP/Laravel, building scalable web apps, secure APIs, and interactive games with Unity and Unreal Engine.
        </p>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap gap-6 text-sm justify-center" style={{ color: COLORS.text }}>
        <a
          href="https://github.com/AnnaPluto2/My-Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group transition-colors duration-200 flex items-center gap-2"
          style={{ color: COLORS.text }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.text)}
        >
          <FaGithub className="w-5 h-5" />
          <span>GitHub</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20"
            style={{
              backgroundColor: COLORS.text,
              color: COLORS.bg,
            }}
          >
            https://github.com/AnnaPluto2/My-Portfolio
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
              style={{ borderTopColor: COLORS.text }}
            />
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/nakamuraaoi"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group transition-colors duration-200 flex items-center gap-2"
          style={{ color: COLORS.text }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.text)}
        >
          <FaLinkedin className="w-5 h-5" />
          <span>LinkedIn</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20"
            style={{
              backgroundColor: COLORS.text,
              color: COLORS.bg,
            }}
          >
            https://www.linkedin.com/in/nakamuraaoi
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
              style={{ borderTopColor: COLORS.text }}
            />
          </div>
        </a>
        <a
          href="mailto:nakamuraaoi1124@gmail.com"
          className="relative group transition-colors duration-200 flex items-center gap-2"
          style={{ color: COLORS.text }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.text)}
        >
          <Mail className="w-5 h-5" />
          <span>Email</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20"
            style={{
              backgroundColor: COLORS.text,
              color: COLORS.bg,
            }}
          >
            nakamuraaoi1124@gmail.com
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
              style={{ borderTopColor: COLORS.text }}
            />
          </div>
        </a>
      </div>
    </div>
  )
}

// Section Content Component
function SectionContent({
  section,
  onProjectClick,
}: {
  section: Section
  onProjectClick: (project: Project) => void
}) {
  if (section === "home") {
    return <HomeSection />
  }

  if (section === "about") {
    return (
      <div className="space-y-6">
        <h2 className="text-4xl font-bold" style={{ color: COLORS.text }}>
          About Me
        </h2>
        <div className="space-y-4" style={{ color: COLORS.textSecondary }}>
          <p className="leading-relaxed">
            I&apos;m a Full-Stack and Game Developer with experience building web applications, backend systems, APIs, and interactive games. I focus on performance, security, and writing clean, maintainable code across both web and game development.
          </p>
          <p className="leading-relaxed">
            On the web side, I&apos;ve worked on projects like BabyBazar.pk, where I built backend systems using Ruby on Rails and JSON APIs, and CompareNook.com, a full-stack price comparison platform developed with Next.js and Node.js. I also create responsive, user-friendly interfaces for demo projects such as Foodie Delight.
          </p>
          <p className="leading-relaxed">
            On the game development side, I&apos;m skilled in Unity and Unreal Engine, where I develop gameplay systems, mechanics, and optimized game logic. I enjoy building immersive, interactive experiences while maintaining performance and scalability.
          </p>
          <p className="leading-relaxed">
            Overall, I&apos;m experienced in RESTful APIs, authentication and access control, database design, deployment workflows, and game engine development, and I continuously improve my skills through hands-on, real-world projects.
          </p>
        </div>
      </div>
    )
  }

  if (section === "skills") {
    const skillCategories = [
      {
        title: "Backend",
        skills: ["Node.js (Express, NestJS)", "Python (FastAPI, Flask)", "PHP (Laravel)", "Ruby on Rails"],
      },
      {
        title: "Frontend",
        skills: ["HTML, CSS, JavaScript", "React / Vue (basic or intermediate)", "Next.js", "TypeScript"],
      },
      {
        title: "Game Development",
        skills: ["Unity", "Unreal Engine", "C#", "C++"],
      },
      {
        title: "Database",
        skills: ["MySQL", "PostgreSQL", "MongoDB"],
      },
      {
        title: "Tools",
        skills: ["Git & GitHub", "Docker", "Nginx"],
      },
    ]

    return (
      <div className="space-y-6">
        <h2 className="text-4xl font-bold" style={{ color: COLORS.text }}>
          Skills
        </h2>
        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: COLORS.text }}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 text-sm rounded-md"
                    style={{ backgroundColor: COLORS.card, color: COLORS.text }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (section === "projects") {
    return (
      <div className="space-y-6">
        <h2 className="text-4xl font-bold" style={{ color: COLORS.text }}>
          Projects
        </h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>
    )
  }

  if (section === "experience") {
    const experiences = [
      {
        year: "2023 – Present",
        title: "Freelance Full-Stack Developer",
        company: "Freelance",
        location: "Remote",
        description: "Developed backend APIs and web applications. Worked with databases and authentication systems. Collaborated with designers and frontend developers.",
      },
      {
        year: "2015 - 2023",
        title: "Front-End & Game Developer",
        company: "Freelance",
        location: "Remote",
        description: "Developed interactive user interfaces and browser-based games. Built responsive web experiences using modern front-end frameworks. Implemented game mechanics, animations, and UI logic. Collaborated with designers and backend developers to deliver engaging, high-performance applications.",
      },
    ]

    return (
      <div className="space-y-6">
        <h2 className="text-4xl font-bold" style={{ color: COLORS.text }}>
          Experience
        </h2>

        {/* Mini Overview */}
        <div className="space-y-3 pb-2">
          <p className="text-sm" style={{ color: `${COLORS.text}CC` }}>
            <span style={{ color: COLORS.accent }} className="font-semibold">
              Full-Stack and Game Developer
            </span>{" "}
            specializing in backend systems, APIs, web applications, and game development
          </p>

          {/* Primary Stack */}
          <div className="space-y-1">
            <p className="text-xs font-medium" style={{ color: `${COLORS.text}80` }}>
              Primary Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Python", "PHP", "Laravel", "Ruby on Rails", "Express", "FastAPI", "React", "Next.js", "TypeScript", "Unity", "Unreal Engine", "C#", "C++"].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded text-xs font-medium border"
                  style={{
                    backgroundColor: COLORS.card,
                    borderColor: `${COLORS.text}20`,
                    color: COLORS.text,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Database & Tools */}
          <div className="space-y-1">
            <p className="text-xs font-medium" style={{ color: `${COLORS.text}80` }}>
              Database & Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {["MySQL", "PostgreSQL", "MongoDB", "Docker", "Git", "Nginx"].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded text-xs font-medium border"
                  style={{
                    backgroundColor: COLORS.card,
                    borderColor: `${COLORS.text}20`,
                    color: COLORS.text,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ backgroundColor: COLORS.border }}
          />

          <div className="space-y-6 pl-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div
                  className="absolute -left-8 top-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS.accent }}
                />

                <div className="space-y-1">
                  <p className="text-xs font-medium" style={{ color: COLORS.accent }}>
                    {exp.year}
                  </p>
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.text }}>
                    {exp.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: `${COLORS.text}CC` }}>
                    {exp.company}
                  </p>
                  <p className="text-xs" style={{ color: `${COLORS.text}80` }}>
                    {exp.location}
                  </p>
                  <p className="text-sm leading-relaxed pt-1" style={{ color: `${COLORS.text}99` }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (section === "contact") {
    return (
      <div className="space-y-6">
        <h2 className="text-4xl font-bold" style={{ color: COLORS.text }}>
          Get in Touch
        </h2>
        <div className="space-y-4" style={{ color: COLORS.textSecondary }}>
          <p className="leading-relaxed">
            I&apos;m currently available for freelance projects and consulting
            opportunities. Feel free to reach out if you&apos;d like to work together.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <a
              href="mailto:nakamuraaoi1124@gmail.com"
              className="relative group inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 w-fit"
              style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.accent
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.text
              }}
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20"
                style={{
                  backgroundColor: COLORS.text,
                  color: COLORS.bg,
                }}
              >
                nakamuraaoi1124@gmail.com
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                  style={{ borderTopColor: COLORS.text }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// Project Card Component
function ProjectCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left p-5 rounded-lg transition-all duration-200 flex items-center justify-between"
      style={{
        backgroundColor: COLORS.card,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${COLORS.card}CC`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = COLORS.card
      }}
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-semibold mb-1 transition-colors duration-200" style={{ color: COLORS.text }}>
          {project.title}
        </h3>
        <p className="text-sm line-clamp-2" style={{ color: `${COLORS.text}B3` }}>
          {project.description}
        </p>
      </div>
      <ArrowRight
        className="w-5 h-5 flex-shrink-0 ml-4 transition-all duration-200 group-hover:translate-x-1"
        style={{ color: COLORS.accent }}
      />
    </button>
  )
}

// Project Detail Component
function ProjectDetail({
  project,
  onBack,
}: {
  project: Project
  onBack: () => void
}) {
  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="group flex items-center gap-2 transition-colors duration-200"
        style={{ color: COLORS.text }}
        onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
        onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.text)}
      >
        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
        <span>Back</span>
      </button>

      <div className="space-y-4">
        <h2 className="text-5xl md:text-6xl font-bold" style={{ color: COLORS.text }}>
          {project.title}
        </h2>

        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
          style={{ backgroundColor: `${COLORS.accent}20` }}
        >
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: COLORS.accent }}
          />
          <span className="text-sm" style={{ color: COLORS.accent }}>
            Live
          </span>
        </div>
      </div>

      <p className="text-lg leading-relaxed" style={{ color: `${COLORS.text}CC` }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-sm rounded-md border"
            style={{
              backgroundColor: COLORS.card,
              borderColor: `${COLORS.text}20`,
              color: COLORS.text,
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200"
            style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.accent
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.text
            }}
          >
            <span>Visit Site</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}