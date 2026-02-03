import { Variants } from "framer-motion"
import { EASING, DURATION } from "./easing"

// Reusable animation variants for Framer Motion

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION.normal,
            ease: EASING.apple,
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: DURATION.fast,
            ease: EASING.apple,
        }
    },
}

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: DURATION.normal,
            ease: EASING.apple,
        }
    },
    exit: { opacity: 0, y: 20 },
}

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: DURATION.normal,
            ease: EASING.apple,
        }
    },
    exit: { opacity: 0, scale: 0.95 },
}

export const slideInRight: Variants = {
    initial: { opacity: 0, x: 30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: DURATION.normal,
            ease: EASING.apple,
        }
    },
    exit: { opacity: 0, x: -30 },
}

export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: DURATION.normal,
            ease: EASING.apple,
        }
    },
    exit: { opacity: 0, x: 30 },
}

// Page transitions
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: DURATION.normal,
            ease: EASING.apple,
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: "blur(4px)",
        transition: {
            duration: DURATION.fast,
            ease: EASING.apple,
        }
    },
}

// Stagger children animation
export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        }
    }
}
