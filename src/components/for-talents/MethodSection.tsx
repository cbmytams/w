"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Container } from "@/components/ui/container"
import { TALENT_METHOD } from "@/constants"
import { ArrowRight, Check, Sparkles } from "lucide-react"

/**
 * MethodSection — Premium Motion Design Stepper
 * 
 * Inspired by Linear, Stripe, Apple motion design:
 * - Spring physics (not linear easing)
 * - 3D perspective transforms
 * - Staggered text reveals
 * - Morphing gradient backgrounds
 * - SVG progress paths
 * - Particle glow effects
 * - Mouse-reactive spotlight
 */
export function MethodSection() {
    const [activeStep, setActiveStep] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [progress, setProgress] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    // Mouse tracking for spotlight effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const spotlightX = useSpring(mouseX, { stiffness: 100, damping: 30 })
    const spotlightY = useSpring(mouseY, { stiffness: 100, damping: 30 })

    const steps = TALENT_METHOD.steps
    const STEP_DURATION = 6000
    const TICK_INTERVAL = 30

    // Handle mouse move for spotlight
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }, [mouseX, mouseY])

    // Auto-progress
    useEffect(() => {
        if (isPaused) return

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + (TICK_INTERVAL / STEP_DURATION) * 100
                if (next >= 100) {
                    setActiveStep(current => (current + 1) % steps.length)
                    return 0
                }
                return next
            })
        }, TICK_INTERVAL)

        return () => clearInterval(interval)
    }, [isPaused, steps.length])

    const goToStep = useCallback((index: number) => {
        setActiveStep(index)
        setProgress(0)
    }, [])

    const currentStep = steps[activeStep]

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        }
    }

    // Text reveal animation for each character
    const titleWords = currentStep.title.split(" ")

    return (
        <section
            id="method"
            ref={containerRef}
            className="section-spacing px-4 relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute inset-0 opacity-30 dark:opacity-50"
                    style={{
                        background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(139, 92, 246, 0.15), transparent 40%)`
                    }}
                />

                {/* Floating orbs */}
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[100px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ left: "10%", top: "20%" }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[80px]"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                        scale: [1, 0.9, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ right: "10%", bottom: "20%" }}
                />
            </div>

            <Container className="relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Header with sparkle */}
                    <motion.div variants={itemVariants} className="text-center mb-20">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium mb-6"
                        >
                            <Sparkles className="w-4 h-4" />
                            Process
                        </motion.div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                            {TALENT_METHOD.title}
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-white/50 max-w-xl mx-auto">
                            {TALENT_METHOD.subtitle}
                        </p>
                    </motion.div>

                    {/* Premium Step Indicators */}
                    <motion.div variants={itemVariants} className="relative mb-16">
                        {/* SVG Progress Path */}
                        <div className="absolute top-1/2 left-12 right-12 -translate-y-1/2 h-[2px] overflow-hidden">
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                {/* Background path */}
                                <line
                                    x1="0" y1="1" x2="100%" y2="1"
                                    stroke="currentColor"
                                    className="text-slate-200 dark:text-white/10"
                                    strokeWidth="2"
                                    strokeDasharray="8 8"
                                />
                                {/* Animated progress path */}
                                <motion.line
                                    x1="0" y1="1" x2="100%" y2="1"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{
                                        pathLength: (activeStep / (steps.length - 1)) + (progress / 100) * (1 / (steps.length - 1))
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8B5CF6" />
                                        <stop offset="50%" stopColor="#A855F7" />
                                        <stop offset="100%" stopColor="#D946EF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Step Circles */}
                        <div className="relative flex justify-between px-4">
                            {steps.map((step, index) => {
                                const isActive = index === activeStep
                                const isPast = index < activeStep

                                return (
                                    <motion.button
                                        key={step.number}
                                        onClick={() => goToStep(index)}
                                        className="group relative focus:outline-none"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Glow effect for active */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="stepGlow"
                                                className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                style={{ scale: 2 }}
                                            />
                                        )}

                                        {/* Outer ring */}
                                        <motion.div
                                            className={`
                                                relative z-10 w-16 h-16 rounded-full flex items-center justify-center
                                                transition-colors duration-500
                                                ${isActive
                                                    ? 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500'
                                                    : isPast
                                                        ? 'bg-violet-500'
                                                        : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10'
                                                }
                                            `}
                                            animate={{
                                                boxShadow: isActive
                                                    ? "0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)"
                                                    : "0 0 0px rgba(139, 92, 246, 0)"
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {/* Inner content */}
                                            <AnimatePresence mode="wait">
                                                {isPast ? (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ scale: 0, rotate: -90 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        exit={{ scale: 0, rotate: 90 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    >
                                                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                                                    </motion.div>
                                                ) : (
                                                    <motion.span
                                                        key="number"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                        className={`
                                                            text-lg font-bold
                                                            ${isActive || isPast ? 'text-white' : 'text-slate-400 dark:text-white/40'}
                                                        `}
                                                    >
                                                        {step.number}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        {/* Label */}
                                        <motion.span
                                            className={`
                                                absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                                                text-sm font-medium transition-all duration-300
                                                ${isActive
                                                    ? 'text-violet-600 dark:text-violet-400 font-semibold'
                                                    : 'text-slate-400 dark:text-white/40'
                                                }
                                            `}
                                            animate={{
                                                y: isActive ? 0 : 5,
                                                opacity: isActive ? 1 : 0.7
                                            }}
                                        >
                                            {step.title}
                                        </motion.span>

                                        {/* Duration badge */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.span
                                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                                                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-medium whitespace-nowrap"
                                                >
                                                    {step.duration}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Content Card with 3D perspective */}
                    <motion.div
                        variants={itemVariants}
                        className="perspective-1000 mt-24"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{
                                    opacity: 0,
                                    rotateX: 10,
                                    y: 60,
                                    filter: "blur(20px)",
                                    scale: 0.95
                                }}
                                animate={{
                                    opacity: 1,
                                    rotateX: 0,
                                    y: 0,
                                    filter: "blur(0px)",
                                    scale: 1
                                }}
                                exit={{
                                    opacity: 0,
                                    rotateX: -10,
                                    y: -60,
                                    filter: "blur(20px)",
                                    scale: 0.95
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    mass: 1
                                }}
                                className="relative"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Card with gradient border */}
                                <div className="relative rounded-3xl overflow-hidden">
                                    {/* Animated gradient border */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/50 via-purple-500/50 to-fuchsia-500/50 p-[1px] rounded-3xl">
                                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 opacity-20 animate-pulse" />
                                    </div>

                                    {/* Card content */}
                                    <div className="relative m-[1px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[23px] p-10 md:p-14">
                                        {/* Top row */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <motion.span
                                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-bold"
                                                    layoutId="stepBadge"
                                                >
                                                    Étape {currentStep.number}
                                                </motion.span>
                                                <span className="text-slate-400 dark:text-white/40 text-sm">
                                                    {currentStep.duration}
                                                </span>
                                            </div>

                                            {/* Progress ring */}
                                            <div className="relative w-12 h-12">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="24"
                                                        cy="24"
                                                        r="20"
                                                        stroke="currentColor"
                                                        className="text-slate-200 dark:text-white/10"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <motion.circle
                                                        cx="24"
                                                        cy="24"
                                                        r="20"
                                                        stroke="url(#ringGradient)"
                                                        strokeWidth="4"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: progress / 100 }}
                                                        transition={{ duration: 0.1 }}
                                                        style={{
                                                            strokeDasharray: "125.6",
                                                            strokeDashoffset: 125.6 * (1 - progress / 100)
                                                        }}
                                                    />
                                                    <defs>
                                                        <linearGradient id="ringGradient">
                                                            <stop offset="0%" stopColor="#8B5CF6" />
                                                            <stop offset="100%" stopColor="#D946EF" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-white/60">
                                                    {Math.round(progress)}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title with staggered word animation */}
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 flex flex-wrap gap-x-4">
                                            {titleWords.map((word, i) => (
                                                <motion.span
                                                    key={`${activeStep}-${i}`}
                                                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 100,
                                                        damping: 15,
                                                        delay: i * 0.1
                                                    }}
                                                >
                                                    {word}
                                                </motion.span>
                                            ))}
                                        </h3>

                                        {/* Description */}
                                        <motion.p
                                            className="text-xl text-slate-600 dark:text-white/60 mb-8 leading-relaxed max-w-2xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.6 }}
                                        >
                                            {currentStep.description}
                                        </motion.p>

                                        {/* Details */}
                                        <motion.p
                                            className="text-slate-400 dark:text-white/40"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.6 }}
                                        >
                                            {currentStep.details}
                                        </motion.p>

                                        {/* Navigation arrows */}
                                        <div className="flex items-center gap-4 mt-10">
                                            <motion.button
                                                onClick={() => goToStep((activeStep - 1 + steps.length) % steps.length)}
                                                className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <ArrowRight className="w-5 h-5 rotate-180" />
                                            </motion.button>
                                            <motion.button
                                                onClick={() => goToStep((activeStep + 1) % steps.length)}
                                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Étape suivante
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Pause indicator */}
                    <AnimatePresence>
                        {isPaused && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="text-center mt-8"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 text-sm">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                    En pause — explorez à votre rythme
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Container>
        </section>
    )
}
