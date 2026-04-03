import type { ISourceOptions } from "@tsparticles/engine";

export const meshConfig: ISourceOptions = {
    background: {
        color: {
            value: "#0b111a",
        },
    },
    fpsLimit: 120,
    particles: {
        color: {
            value: ["#00F0FF", "#FF00AA"],
        },
        links: {
            color: "random",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
            triangles: {
                enable: true,
                opacity: 0.1,
            }
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
        },
        number: {
            density: {
                enable: true,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "square",
        },
        size: {
            value: { min: 2, max: 4 },
        },
    },
    detectRetina: true,
};
