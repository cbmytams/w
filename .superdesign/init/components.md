# Shared UI Components

## Button
- File path: `src/components/ui/button.tsx`
- Component: `Button`
- Description: Base button with variants and sizes (CVA + Radix Slot).
- Key props: `variant`, `size`, `asChild`.

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 hover:scale-[1.02] active:scale-[0.98]",
                destructive:
                    "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90",
                outline:
                    "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900",
                secondary:
                    "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-100/80",
                ghost: "hover:bg-slate-100 hover:text-slate-900",
                link: "text-slate-900 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-6 py-2", // Wafia spec: larger default buttons
                sm: "h-9 rounded-md px-3 text-xs",
                lg: "h-12 rounded-full px-8 text-base",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## ButtonAnimated
- File path: `src/components/ui/button-animated.tsx`
- Component: `ButtonAnimated`
- Description: Motion button with gradients, shine effect, and link support.
- Key props: `variant`, `size`, `href`, `onClick`, `disabled`.

```tsx
"use client"

import { ReactNode, forwardRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { EASING } from "@/lib/easing"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface BaseButtonProps {
    children: ReactNode
    className?: string
    variant?: "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
    href?: string
    onClick?: () => void
    disabled?: boolean
}

const ButtonAnimated = forwardRef<HTMLButtonElement | HTMLAnchorElement, BaseButtonProps>(
    ({ children, className, variant = "primary", size = "md", href, onClick, disabled }, ref) => {
        const prefersReducedMotion = useReducedMotion()

        // Size classes
        const sizeClasses = {
            sm: "px-6 py-2.5 text-sm",
            md: "px-8 py-3.5 text-base",
            lg: "px-12 py-4 text-lg",
        }

        // Variant classes
        const variantClasses = {
            primary: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40",
            secondary: "border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900",
            ghost: "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900",
        }

        const baseClasses = cn(
            "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all overflow-hidden",
            sizeClasses[size],
            variantClasses[variant],
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className
        )

        // Animation variants
        const buttonVariants = prefersReducedMotion
            ? undefined
            : {
                rest: { scale: 1 },
                hover: { scale: 1.02 },
                tap: { scale: 0.98 },
            }

        const shineVariants = {
            rest: { x: "-100%" },
            hover: {
                x: "200%",
                transition: {
                    duration: 0.8,
                    ease: EASING.apple,
                },
            },
        }

        const content = (
            <>
                {/* Shine effect for primary variant */}
                {variant === "primary" && !disabled && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        variants={shineVariants}
                        initial="rest"
                    />
                )}
                <span className="relative z-10">{children}</span>
            </>
        )

        if (href) {
            return (
                <Link href={href} className="inline-block">
                    <motion.div
                        className={baseClasses}
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {content}
                    </motion.div>
                </Link>
            )
        }

        return (
            <motion.button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={baseClasses}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={onClick}
                disabled={disabled}
            >
                {content}
            </motion.button>
        )
    }
)

ButtonAnimated.displayName = "ButtonAnimated"

export { ButtonAnimated }
```

## Card
- File path: `src/components/ui/card.tsx`
- Components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- Description: Base card primitives.
- Key props: standard `div`/`p` props via `React.HTMLAttributes`.

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-slate-500", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## Container
- File path: `src/components/ui/container.tsx`
- Component: `Container`
- Description: Page width container with responsive padding.
- Key props: standard `div` props.

```tsx
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
    return (
        <div
            className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
            {...props}
        >
            {children}
        </div>
    )
}
```

## FadeIn + StaggerContainer
- File path: `src/components/ui/fade-in.tsx`
- Components: `FadeIn`, `StaggerContainer`
- Description: Viewport-based reveal animations.
- Key props: `delay`, `direction`, `noOpacity`, `staggerDelay`.

```tsx
"use client"

import { motion, Variants } from "framer-motion"
import { ReactNode } from "react"

interface FadeInProps {
    children: ReactNode
    className?: string
    delay?: number
    direction?: "up" | "down" | "left" | "right"
    noOpacity?: boolean
}

const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
}

export function FadeIn({ children, className, delay = 0, direction = "up", noOpacity = false }: FadeInProps) {
    const offset = directions[direction]

    const variants: Variants = {
        hidden: {
            opacity: noOpacity ? 1 : 0,
            ...offset,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Stagger container for animating children sequentially
interface StaggerContainerProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
}

export function StaggerContainer({ children, className, staggerDelay = 0.1 }: StaggerContainerProps) {
    const variants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}
```

## Highlight
- File path: `src/components/ui/highlight.tsx`
- Component: `Highlight`
- Description: Text highlight with color variants.
- Key props: `color`.

```tsx
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HighlightProps {
    children: ReactNode
    className?: string
    color?: "primary" | "secondary" | "default"
}

const colorClasses = {
    primary: "text-indigo-600",
    secondary: "text-pink-600",
    default: "text-slate-600",
}

export function Highlight({ children, className, color = "primary" }: HighlightProps) {
    return (
        <span className={cn(colorClasses[color], "font-extrabold", className)}>
            {children}
        </span>
    )
}
```

## Input
- File path: `src/components/ui/input.tsx`
- Component: `Input`
- Description: Base input with focus ring and disabled styles.
- Key props: standard input props.

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>


const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
```

## FuturisticBackground
- File path: `src/components/ui/FuturisticBackground.tsx`
- Component: `FuturisticBackground`
- Description: Fullscreen Three.js starfield background.
- Key props: none.

```tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Star Field - Working implementation with space colors
 */
function StarField({ count = 2500 }) {
    const mesh = useRef<THREE.Points>(null!);

    const particles = useMemo(() => {
        const positions = [];
        const colors = [];

        // Space color palette: blues, purples, whites, occasional warm
        const palette = [
            new THREE.Color("#ffffff"), // White stars (most common)
            new THREE.Color("#ffffff"),
            new THREE.Color("#ffffff"),
            new THREE.Color("#a5b4fc"), // Soft blue
            new THREE.Color("#c4b5fd"), // Soft purple
            new THREE.Color("#fbbf24"), // Warm yellow (rare)
            new THREE.Color("#f472b6"), // Pink nebula tint
        ];

        for (let i = 0; i < count; i++) {
            // Spread stars in a sphere around camera
            const radius = 200 + Math.random() * 800;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            positions.push(x, y, z);

            // Color
            const color = palette[Math.floor(Math.random() * palette.length)];
            colors.push(color.r, color.g, color.b);
        }

        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors),
        };
    }, [count]);

    useFrame((state, delta) => {
        // Very slow rotation for immersion
        mesh.current.rotation.y += delta * 0.01;
        mesh.current.rotation.x += delta * 0.005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    args={[particles.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    args={[particles.colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={2}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/**
 * Nebula - Soft colored glow in space
 */
function Nebula({ position, color, scale = 100 }: { position: [number, number, number]; color: string; scale?: number }) {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        ref.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 0.2) * 10);
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.05} />
        </mesh>
    );
}

export default function FuturisticBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-[#050510]">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }}
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={["#050510"]} />

                {/* Stars */}
                <StarField count={2500} />

                {/* Distant Nebulae for color */}
                <Nebula position={[-300, 100, -500]} color="#f97316" scale={150} />
                <Nebula position={[400, -150, -600]} color="#ec4899" scale={120} />
                <Nebula position={[0, 200, -700]} color="#8b5cf6" scale={180} />
            </Canvas>

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050510_100%)] pointer-events-none" />
        </div>
    );
}
```
