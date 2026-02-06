"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function ConstellationBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (prefersReducedMotion) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        setCanvasSize()
        window.addEventListener("resize", setCanvasSize)

        // Particles
        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            radius: number
        }> = []

        const particleCount = 36
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
            })
        }

        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }
        window.addEventListener("mousemove", handleMouseMove)

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            particles.forEach((particle, index) => {
                // Move particle
                particle.x += particle.vx
                particle.y += particle.vy

                // Mouse interaction
                const dx = mouseX - particle.x
                const dy = mouseY - particle.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 100) {
                    particle.vx += dx * 0.0001
                    particle.vy += dy * 0.0001
                }

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                // Draw particle
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(99, 102, 241, 0.55)" // Indigo
                ctx.fill()

                // Draw connections
                particles.forEach((otherParticle, otherIndex) => {
                    if (index === otherIndex) return

                    const dx = particle.x - otherParticle.x
                    const dy = particle.y - otherParticle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(otherParticle.x, otherParticle.y)
                        const opacity = 1 - distance / 150
                        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.25})` // Cyan
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                })
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", setCanvasSize)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [prefersReducedMotion])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-60"
            style={{ mixBlendMode: "screen" }}
        />
    )
}
