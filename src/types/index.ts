/**
 * Types partagés pour le projet Wafia
 * Centralise toutes les interfaces et types réutilisables
 */

import { ReactNode } from "react"

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
    name: string
    href: string
}

// ============================================
// Client Types
// ============================================

export interface Client {
    name: string
    width: string
}

export interface HeroStat {
    icon: string
    stat: string
    label: string
}

// ============================================
// FAQ Types
// ============================================

export interface FaqItem {
    q: string
    a: string
}

// ============================================
// Component Props Types
// ============================================

export interface SectionHeadingProps {
    title: ReactNode
    subtitle?: string
    align?: "left" | "center"
    className?: string
}

export interface InlineCalloutProps {
    title: string
    subtitle?: string
    bullets?: string[]
    children?: ReactNode
    accentColor?: "orange" | "red" | "pink"
    className?: string
}

// ============================================
// Process Step Types
// ============================================

export interface ProcessStep {
    number: string
    title: string
    description: string
    icon?: ReactNode
}

// ============================================
// Feature Types
// ============================================

export interface Feature {
    icon: ReactNode
    title: string
    description: string
}
