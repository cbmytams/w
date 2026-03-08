import type { ISourceOptions } from "@tsparticles/engine";

export const nyanConfig: ISourceOptions = {
    background: {
        color: {
            value: "#050510", // Matching Wafia dark background
        },
        image: "url('/images/nyan-cat.gif')",
        position: "center",
        repeat: "no-repeat",
        size: "150px", // Just enough to see it without blurring
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        move: {
            direction: "left",
            enable: true,
            speed: 4,
            straight: false, // Allow small deviations
            outModes: {
                default: "out",
            },
        },
        number: {
            density: {
                enable: true,
            },
            value: 120,
        },
        opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
        },
        shape: {
            // Include circle fallback in case star shape isn't bundled in slim
            type: ["star", "circle"],
            options: {
                star: {
                    sides: 5,
                },
            },
        },
        size: {
            value: { min: 2, max: 4 },
            animation: {
                enable: true,
                speed: 3,
                sync: false,
            },
        },
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
