// Apple-like easing curves for premium animations
// Based on cubic-bezier specifications

// Type for Framer Motion compatible easing
type EasingArray = [number, number, number, number]

export const EASING: Record<string, EasingArray> = {
    // Apple's signature easing - smooth and natural
    apple: [0.4, 0.0, 0.2, 1],

    // Page transitions — cinematic deceleration
    smooth: [0.22, 1, 0.36, 1],

    // Float navs, hero reveals — elegant entrance
    entrance: [0.22, 0.61, 0.36, 1],

    // Homepage cinematic — ultra-smooth deceleration
    premium: [0.16, 1, 0.3, 1],

    // FadeIn, cards, subtle reveals
    subtle: [0.25, 0.4, 0.25, 1],

    // Ease variations
    easeInOut: [0.4, 0.0, 0.2, 1],
    easeOut: [0.0, 0.0, 0.2, 1],
    easeIn: [0.4, 0.0, 1, 1],

    // Sharp & snappy
    sharp: [0.4, 0.0, 0.6, 1],

    // Gentle & soft
    gentle: [0.25, 0.1, 0.25, 1],

    // Spring-like
    bounce: [0.68, -0.55, 0.265, 1.55],
}

export const DURATION = {
    instant: 0.15,
    fast: 0.3,
    normal: 0.4,
    slow: 0.6,
    slower: 0.8,
    cinematic: 1.0,
} as const

