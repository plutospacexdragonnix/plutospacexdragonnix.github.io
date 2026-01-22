"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  glow: number
}

interface WaveParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  waveOffset: number
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const waveParticlesRef = useRef<WaveParticle[]>([])
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: -1, y: -1 })
  const previousMouseRef = useRef({ x: -1, y: -1 })
  const [isMounted, setIsMounted] = useState(false)

  // Generate random color between #fbcdf1 and #fef2fb
  const getRandomColor = () => {
    const colors = [
      "#fbcdf1",
      "#fbd5f3",
      "#fcddf5",
      "#fce5f7",
      "#fdedf9",
      "#fef2fb",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const particleCount = 150
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, // Slow random velocity
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 3 + 1.5,
        glow: Math.random() * 0.5 + 0.5,
      })
    }

    particlesRef.current = particles

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX
      const newY = e.clientY
      
      // Create wave particles at mouse position
      if (previousMouseRef.current.x >= 0 && previousMouseRef.current.y >= 0) {
        const dx = newX - previousMouseRef.current.x
        const dy = newY - previousMouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Create particles when mouse moves
        if (distance > 0) {
          for (let i = 0; i < 3; i++) {
            waveParticlesRef.current.push({
              x: previousMouseRef.current.x + (dx * i) / 3,
              y: previousMouseRef.current.y + (dy * i) / 3,
              vx: (dx / distance) * 0.5,
              vy: (dy / distance) * 0.5,
              life: 0,
              maxLife: 30,
              color: getRandomColor(),
              waveOffset: Math.random() * Math.PI * 2,
            })
          }
        }
      }
      
      previousMouseRef.current = { x: newX, y: newY }
      mouseRef.current = { x: newX, y: newY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 }
      previousMouseRef.current = { x: -1, y: -1 }
    }

    window.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const repulsionRadius = 100
      const repulsionForce = 0.5

      // Update and draw star particles
      particlesRef.current.forEach((particle) => {
        // Normal slow movement
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse repulsion effect
        if (mouse.x >= 0 && mouse.y >= 0) {
          const dx = particle.x - mouse.x
          const dy = particle.y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < repulsionRadius && distance > 0) {
            const force = (repulsionRadius - distance) / repulsionRadius
            const angle = Math.atan2(dy, dx)
            particle.vx += Math.cos(angle) * force * repulsionForce
            particle.vy += Math.sin(angle) * force * repulsionForce
          }
        }

        // Gradually slow down (friction)
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with glow effect
        ctx.save()
        ctx.globalAlpha = particle.glow
        ctx.shadowBlur = 10
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Update and draw wave particles
      waveParticlesRef.current = waveParticlesRef.current.filter((wave) => {
        wave.life++
        wave.x += wave.vx
        wave.y += wave.vy
        wave.vx *= 0.95
        wave.vy *= 0.95
        wave.waveOffset += 0.2

        // Remove if life exceeded
        if (wave.life > wave.maxLife) {
          return false
        }

        // Draw wave particle as a wavy line
        ctx.save()
        const alpha = 1 - wave.life / wave.maxLife
        ctx.globalAlpha = alpha
        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2.5
        ctx.lineCap = "round"

        // Draw wavy line
        ctx.beginPath()
        const segments = 5
        for (let i = 0; i <= segments; i++) {
          const t = i / segments
          const waveX = wave.x - wave.vx * t * 15
          const waveY = wave.y - wave.vy * t * 15 + Math.sin(wave.waveOffset + t * 4) * 5
          
          if (i === 0) {
            ctx.moveTo(waveX, waveY)
          } else {
            ctx.lineTo(waveX, waveY)
          }
        }
        ctx.stroke()
        ctx.restore()

        return true
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isMounted])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0"
      style={{ background: "transparent" }}
    />
  )
}
