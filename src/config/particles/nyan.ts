import type { ISourceOptions } from "@tsparticles/engine";

export const nyanConfig: ISourceOptions = {
    background: {
        color: {
            value: "#0b111a", // Matching Wafia dark background
        },
        image: "url('/images/nyan-cat.gif')",
        position: "0 80%", // Pinned to the left edge so the rainbow tail makes sense, but lower down to avoid Wafia main UI
        repeat: "no-repeat",
        size: "40%", // Large enough to see the cat and tail, but doesn't cross into the center buttons
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        move: {
            direction: "left",
            enable: true,
            speed: 6,
            straight: false,
            outModes: {
                default: "out",
            },
        },
        number: {
            density: {
                enable: true,
            },
            value: 120, // Enough stars rushing left to simulate the cat flying right
        },
        opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
        },
        shape: {
            // Using circle instead of star so it safely works natively without needing @tsparticles/shape-star plugin
            type: "circle",
        },
        size: {
            value: { min: 1, max: 4 },
            animation: {
                enable: true,
                speed: 3,
                sync: false,
            },
        },
        zIndex: {
            value: 0
        }
    },
    detectRetina: true,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "repulse",
            },
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 100,
                duration: 0.4,
            },
        },
    },
};
