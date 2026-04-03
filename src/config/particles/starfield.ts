import type { ISourceOptions } from "@tsparticles/engine";

export const starfieldConfig: ISourceOptions = {
    background: {
        color: {
            value: "#0b111a",
        },
    },
    fpsLimit: 120,
    particles: {
        color: {
            value: "#ffffff",
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "out",
            },
            random: false,
            speed: 0.5,
            straight: false,
            trail: {
                enable: true,
                length: 10,
                fill: {
                    color: {
                        value: "#000000"
                    }
                }
            }
        },
        number: {
            density: {
                enable: true,
            },
            value: 400,
        },
        calc: {
            enable: true
        },
        opacity: {
            value: { min: 0.1, max: 0.8 },
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
            value: { min: 0.5, max: 2 },
        },
        life: {
            count: 0,
            delay: {
                value: 0,
                sync: false
            },
            duration: {
                value: 0,
                sync: false
            }
        },
        zIndex: {
            value: { min: 0, max: 100 },
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1
        }
    },
    detectRetina: true,
};
