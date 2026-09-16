export const BOOK_CHAPTERS = [
  {
    service: "Influence",
    headline: ["LES BONNES", "VOIX. LES", "VRAIES", "CONNEXIONS."],
    promise: "Faites entrer votre marque dans la conversation.",
    body: "Nous choisissons les créateurs pour ce qu’ils incarnent et la confiance qu’ils ont construite. Puis nous imaginons ensemble une prise de parole qui donne envie d’écouter votre marque.",
    deliverables: [
      "Stratégie & casting sur mesure",
      "Négociation & suivi des talents",
      "Activation & mesure des résultats",
    ],
    caption:
      "La confiance ne s’achète pas au mille. Elle se construit avec les bonnes personnes.",
    footer: "DE LA PERTINENCE. AVANT DE LA PORTÉE.",
  },
  {
    service: "Création",
    headline: ["UNE IDÉE", "AVANT", "UN FORMAT."],
    promise: "Donnez une raison de s’arrêter sur votre marque.",
    body: "Un format ne fait pas une idée. Nous trouvons l’angle qui vous appartient, puis le déclinons en concepts, scripts et directions artistiques que les créateurs peuvent vraiment s’approprier.",
    deliverables: [
      "Concept & territoire de campagne",
      "Direction artistique & scripts",
      "Déclinaisons social-first",
    ],
    caption:
      "Une idée reconnaissable. Des contenus qui ne ressemblent qu’à vous.",
    footer: "VOTRE SINGULARITÉ. NOTRE POINT DE DÉPART.",
  },
  {
    service: "Production",
    headline: ["UN CONTENU.", "PLUSIEURS", "VIES."],
    promise: "Produisez aujourd’hui ce que vous diffuserez demain.",
    body: "Du tournage au dernier export, nous fabriquons des contenus pensés pour vos usages : réseaux sociaux, e-commerce, campagnes paid. Les formats et les droits sont cadrés dès le départ.",
    deliverables: [
      "Tournage, photo & UGC",
      "Montage & adaptations multiformats",
      "Droits d’usage & livraison organisée",
    ],
    caption: "Chaque prise de vue compte. Chaque déclinaison a sa place.",
    footer: "PENSÉ POUR ÊTRE VU. CONÇU POUR ÊTRE RÉUTILISÉ.",
  },
  {
    service: "Ads",
    headline: ["LA CRÉATION", "ATTIRE.", "LES ADS", "AMPLIFIENT."],
    promise: "Donnez à vos meilleurs contenus les moyens d’aller plus loin.",
    body: "Nous relions création et achat média : sélection des contenus, tests d’angles, amplification et optimisation. Votre budget suit ce qui fonctionne, avec une lecture claire des résultats.",
    deliverables: [
      "Social ads & creator ads",
      "Tests créatifs & optimisation",
      "Reporting orienté objectifs",
    ],
    caption:
      "Tester. Comprendre. Amplifier. Et remettre la création au travail.",
    footer: "L’ATTENTION EST UN DÉBUT. L’ACTION EST L’OBJECTIF.",
  },
] as const;

export function chapterAt(progress: number) {
  return Math.min(3, Math.max(0, Math.floor((progress - 0.32) / 0.205)));
}
