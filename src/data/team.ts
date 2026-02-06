export interface TeamMember {
    id: string;
    name: string;
    role: string;
    location: string;
    slug: string;
    shortBio: string;
    proof: string[];
    quote: string;
    longSections: {
        title: string;
        text?: string;
        bullets?: string[];
    }[];
    links: {
        linkedin?: string;
        instagram?: string;
    };
    image: string;
}

export const TEAM: TeamMember[] = [
    {
        id: "sasha",
        name: "Sasha (Wahib) Guettat",
        role: "Fondateur • Brand strategist & creative producer",
        location: "Paris, France",
        slug: "sasha-guettat",
        shortBio: "Je ne suis pas un agent. Je construis des écosystèmes autour des talents et des marques.",
        proof: ["8 ans d’expérience", "350+ collaborations marques", "~400 talents activés"],
        quote: "Wafia n’est pas une agence : c’est une architecture.",
        longSections: [
            {
                title: "Mon approche",
                text: "Depuis 8 ans, j'observe le marché de l'influence évoluer. J'ai compris que la valeur ne réside pas dans le nombre de followers, mais dans la capacité à créer des écosystèmes durables."
            },
            {
                title: "Ce que je construis chez Wafia",
                bullets: [
                    "Stratégie & consulting pour marques et talents",
                    "Talent management avec une vision long terme",
                    "Direction créative & production de contenus",
                    "Influence & ops (traçabilité et performance)"
                ]
            }
        ],
        links: {
            linkedin: "https://www.linkedin.com/in/wahib-guettat/",
            instagram: "https://www.instagram.com/wahibguettat/"
        },
        image: "https://assets.wafia.fr/photo-mail/sasha.jpg"
    },
    {
        id: "yaelle",
        name: "Yaëlle",
        role: "Co-fondatrice • Direction artistique & stratégie talents (Canada)",
        location: "Canada",
        slug: "yaelle",
        shortBio: "Je structure des identités, des contenus et des trajectoires.",
        proof: ["Positionnement", "Storytelling", "Cohérence créative"],
        quote: "On ne gère pas des chiffres. On construit des carrières.",
        longSections: [
            {
                title: "Mon rôle chez Wafia",
                text: "Je pilote la direction artistique et la stratégie des talents, en assurant une cohérence visuelle et narrative pour chacun de nos partenaires."
            },
            {
                title: "Ce que je fais concrètement",
                bullets: [
                    "Identité & positionnement de marque personnelle",
                    "Formats & stratégie de contenus éditoriaux",
                    "Création de supports brand-ready (media kit, pages talents)",
                    "Méthode & organisation pour scaler la créativité"
                ]
            }
        ],
        links: {
            linkedin: "#"
        },
        image: "https://assets.wafia.fr/photo-mail/yaelle.jpg"
    }
];
