import { Category } from "./types";

export const DASHBOARD_DATA: Category[] = [
    {
        id: "distribution",
        label: "Distribution",
        subCategories: [
            {
                id: "dsps",
                label: "DSPs",
                platforms: [
                    {
                        id: "spotify",
                        name: "Spotify",
                        logo: "/logos/talents/spotify.svg",
                        status: "Live",
                        isLive: true,
                        accessType: "Partner",
                        reach: "Global",
                        description: "Leader mondial du streaming. Accès direct à Spotify for Artists pour pitch playlists et analytics.",
                        metrics: { speed: "24-48h", share: "100%", geo: "180+ Pays", support: "Standard" }
                    },
                    {
                        id: "deezer",
                        name: "Deezer",
                        logo: "/logos/talents/deezer.svg",
                        status: "Live",
                        isLive: true,
                        accessType: "Partner",
                        reach: "Global",
                        description: "Plateforme française incontournable. Fort impact éditorial local et qualité HiFi.",
                        metrics: { speed: "24h", share: "100%", geo: "185 Pays", support: "Prioritaire" }
                    },
                    {
                        id: "apple",
                        name: "Apple Music",
                        logo: "/logos/talents/apple-music.svg",
                        status: "Live",
                        isLive: true,
                        accessType: "Partner",
                        reach: "Global",
                        description: "Qualité Lossless & Spatial Audio. Rémunération artiste supérieure à la moyenne.",
                        metrics: { speed: "1-3 j", share: "100%", geo: "165 Pays", support: "Standard" }
                    },
                    {
                        id: "tiktok",
                        name: "TikTok Music",
                        logo: "/logos/talents/tiktok.svg",
                        status: "Live",
                        isLive: true,
                        accessType: "Viral",
                        reach: "Viral",
                        description: "Le moteur de découverte musicale n°1. Monétisation via SoundOn disponible.",
                        metrics: { speed: "Instant", share: "100%", geo: "Global", support: "Creator" }
                    },
                    {
                        id: "amazon",
                        name: "Amazon Music",
                        logo: "/logos/talents/amazon-music.svg",
                        status: "Live",
                        isLive: true,
                        accessType: "Partner",
                        reach: "Global",
                        description: "Croissance forte. Intégration HD et Twitch. Idéal pour audiences matures.",
                        metrics: { speed: "3-4 j", share: "100%", geo: "Global", support: "Standard" }
                    }
                ]
            },
            {
                id: "aggregators",
                label: "Agrégateurs",
                platforms: [
                    {
                        id: "tunecore",
                        name: "TuneCore",
                        logo: "/logos/talents/tunecore.svg",
                        status: "Partenaire",
                        isLive: true,
                        accessType: "Access",
                        reach: "Global",
                        description: "Distribution illimitée. Idéal pour garder 100% des royalties. Partenaire fort en France.",
                        metrics: { speed: "1-2 j", share: "100%", geo: "Global", support: "Ticket" }
                    },
                    {
                        id: "distrokid",
                        name: "DistroKid",
                        logo: "/logos/talents/distrokid.svg",
                        status: "Partenaire",
                        isLive: true,
                        accessType: "Direct",
                        reach: "Global",
                        description: "Le plus rapide du marché. Tarif unique annuel pour uploads illimités. Outils marketing inclus.",
                        metrics: { speed: "Express", share: "100%", geo: "Global", support: "Auto" }
                    },
                    {
                        id: "wiseband",
                        name: "Wiseband",
                        logo: "/logos/talents/wiseband.svg",
                        status: "Partenaire",
                        isLive: true,
                        accessType: "Access",
                        reach: "Europe",
                        description: "Distributeur français basé en Vendée. Support humain réactif et merchandising intégré.",
                        metrics: { speed: "48h", share: "90%", geo: "Europe", support: "Humain" }
                    }
                ]
            },
            {
                id: "direct",
                label: "Partenaires directs",
                platforms: [
                    {
                        id: "youtube",
                        name: "YouTube Content ID",
                        logo: "/logos/talents/youtube.svg",
                        status: "Direct",
                        isLive: true,
                        accessType: "Direct",
                        reach: "Global",
                        description: "Monétisation automatique de vos titres utilisés dans toutes les vidéos sur la plateforme.",
                        metrics: { speed: "Auto", share: "80/20", geo: "Global", support: "Partner" }
                    },
                    {
                        id: "meta",
                        name: "Meta Rights",
                        logo: "/logos/talents/meta.svg",
                        status: "Direct",
                        isLive: true,
                        accessType: "Direct",
                        reach: "Social",
                        description: "Gestion des droits musicaux sur Facebook, Instagram et Threads.",
                        metrics: { speed: "Auto", share: "80/20", geo: "Global", support: "Partner" }
                    },
                    {
                        id: "sacem",
                        name: "SACEM",
                        logo: "/logos/talents/sacem.svg",
                        status: "Direct",
                        isLive: true,
                        accessType: "Major",
                        reach: "France",
                        description: "Gestion des droits d'auteur. Collecte essentielle pour radio, TV et concerts en France.",
                        metrics: { speed: "Trimestre", share: "Statut", geo: "Monde", support: "Bureau" }
                    }
                ]
            }
        ]
    },
    {
        id: "labels",
        label: "Labels",
        subCategories: [
            {
                id: "majors",
                label: "Majors",
                platforms: [
                    {
                        id: "universal",
                        name: "Universal Music France",
                        logo: "/logos/talents/universal-music-group.svg",
                        status: "Direct",
                        isLive: true,
                        accessType: "Major",
                        reach: "Major",
                        description: "Leader en France (Capitol, Polydor, Barclay). Accès prioritaire médias et playlists.",
                        metrics: { speed: "Custom", share: "Deal", geo: "Global", support: "A&R Team" }
                    },
                    {
                        id: "warner",
                        name: "Warner Music France",
                        logo: "/logos/talents/warner-music-group.svg",
                        status: "Direct",
                        isLive: true,
                        accessType: "Major",
                        reach: "Major",
                        description: "Maison d'artistes (Rec. 118, Parlophone). Expertise urbaine et pop forte.",
                        metrics: { speed: "Custom", share: "Deal", geo: "Global", support: "A&R Team" }
                    },
                    {
                        id: "sony",
                        name: "Sony Music France",
                        logo: "/logos/talents/sony-music.svg",
                        status: "En négociation",
                        isLive: false,
                        accessType: "Major",
                        reach: "Major",
                        description: "Puissance catalogue (RCA, Columbia). Discussion en cours pour canal direct.",
                        metrics: { speed: "Soon", share: "Deal", geo: "Global", support: "Pending" }
                    }
                ]
            },
            {
                id: "indie",
                label: "Indépendants",
                platforms: [
                    {
                        id: "because",
                        name: "Because Music",
                        logo: "/logos/talents/because.svg",
                        status: "Partenaire",
                        isLive: true,
                        accessType: "Access",
                        reach: "Premium",
                        description: "Le label indépendant français de référence (Justice, Metronomy, Christine and the Queens).",
                        metrics: { speed: "Direct", share: "50/50", geo: "Global", support: "Label Mgr" }
                    },
                    {
                        id: "totoutard",
                        name: "Tôt ou tard",
                        logo: "/logos/talents/totoutard.svg",
                        status: "Live",
                        isLive: true,
                        accessType: "Access",
                        reach: "France",
                        description: "Label historique de la scène française (Vianney, Shaka Ponk). Excellence artistique.",
                        metrics: { speed: "Direct", share: "Licence", geo: "France", support: "Label Mgr" }
                    },
                    {
                        id: "wagram",
                        name: "Wagram Music",
                        logo: "/logos/talents/wagram.svg",
                        status: "Live",
                        isLive: true,
                        accessType: "Access",
                        reach: "Europe",
                        description: "Distributeur et label indépendant majeur. Forte expertise développement.",
                        metrics: { speed: "Direct", share: "Distrib", geo: "Europe", support: "Marketing" }
                    }
                ]
            },
            {
                id: "white-label",
                label: "White Label",
                platforms: [
                    {
                        id: "white-label-program",
                        name: "Programme White Label",
                        logo: "",
                        status: "En négociation",
                        isLive: false,
                        accessType: "Access",
                        reach: "Sur-mesure",
                        description: "Structure en marque blanche pour lancer votre label avec distribution, admin et accompagnement dédiés.",
                        metrics: { speed: "Custom", share: "Custom", geo: "Global", support: "Dédié" }
                    }
                ]
            }
        ]
    },
    {
        id: "access",
        label: "Accès",
        subCategories: [
            {
                id: "premium",
                label: "Services Premium",
                platforms: [
                    {
                        id: "believe",
                        name: "Believe France",
                        logo: "/logos/talents/believe.svg",
                        status: "Premium",
                        isLive: true,
                        accessType: "Premium",
                        reach: "Network",
                        description: "Leader digital. Services 'Artist Solutions' pour accélérer votre carrière sans signer en major.",
                        metrics: { speed: "Priority", share: "Custom", geo: "Global", support: "A&R" }
                    },
                    {
                        id: "idol",
                        name: "IDOL",
                        logo: "/logos/talents/idol.svg",
                        status: "Premium",
                        isLive: true,
                        accessType: "Premium",
                        reach: "Quality",
                        description: "Distribution sélective haut de gamme. Technologie de pointe et marketing sur-mesure.",
                        metrics: { speed: "Priority", share: "Custom", geo: "Global", support: "Tech+" }
                    }
                ]
            },
            {
                id: "promotion",
                label: "Promotion",
                platforms: [
                    {
                        id: "groover",
                        name: "Groover",
                        logo: "/logos/talents/groover.svg",
                        status: "Live",
                        isLive: true,
                        accessType: "Access",
                        reach: "Media",
                        description: "Envoyez votre musique aux médias et labels. Retours garantis. (Partenaire Wafia).",
                        metrics: { speed: "7 Jours", share: "Fixe", geo: "Global", support: "Feedback" }
                    }
                ]
            }
        ]
    }
];
