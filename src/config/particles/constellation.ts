import type { ISourceOptions } from "@tsparticles/engine";

export const constellationConfig: ISourceOptions = {
    background: {
        color: {
            value: "#0b111a",
        },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "grab",
            },
        },
        modes: {
            push: {
                quantity: 4,
            },
            grab: {
                distance: 140,
                links: {
                    opacity: 0.5,
                },
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
            },
            value: 100,
        },
        opacity: {
            value: 0.3,
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            }
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    detectRetina: true,
};
