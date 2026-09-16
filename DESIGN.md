# Wafia / Page Marques V2

## Intention

Un dossier de campagne que l'on feuillette, puis des preuves grandeur nature. Le livre est un objet noir tactile, pas un tableau de bord. La suite se lit comme trois doubles pages de portfolio, sans cartes décoratives.

## Signature

Couverture fermée sur fond minéral, ouverture vers une scène anthracite, quatre feuilles qui tournent au rythme du défilement. Chaque page droite porte un sceau dessiné pour Influence, Création, Production ou Ads. Les cas clients forment trois bandes photographiques bord à bord, avec une colonne de résultats clairement séparée.

## Couleurs

- Papier minéral `#e8e9e6`, encre `#19201e`, ivoire `#f5f5ef`.
- Anthracite `#151716`, gris secondaire `#b6bbb5`.
- Accent vermillon `#f45a32` pour la progression, les sceaux et les chiffres, jamais pour de grandes surfaces.
- Les images apportent leur propre couleur; leurs zones de texte reçoivent une ombre lisible, sans filtre opaque uniforme.

## Typographie

Outfit pour les titres et grands chiffres; Plus Jakarta Sans pour la lecture. Titres courts et directs, phrases de campagne concrètes, libellés en petites capitales. Aucun crénage négatif. Les vrais chiffres du projet restent associés à leur unité.

## Grille et composants

Gouttières de 6% sur grand écran, 7% sur mobile. Une barre unique, trois colonnes symétriques (1fr / auto / 1fr) : identité, navigation, contact. Le livre conserve sa scène 3D. Les cas clients suivent immédiatement, en bandes cinéma d'environ 250px, avec 80% pour la photographie et 20% pour les résultats. Alternance noir / blanc / noir et titres clients en Barlow Condensed. Sur mobile, le texte court reste superposé au visuel puis les trois résultats s'alignent sur une ligne. Pas de cartes imbriquées ni de coins arrondis décoratifs.

## Mouvement

Le défilement pilote la couverture, puis une rotation physique et une légère courbure de chaque feuille entre les chapitres. Les textes changent au même jalon. Les dossiers apparaissent par translation et fondu modestes, chaque photographie respirant légèrement. Pas d'animation en boucle hors du rail de méthode validé. Avec `prefers-reduced-motion`, les feuilles et dossiers passent directement à leur état stable.

## Accessibilité et performance

Le contenu commercial existe en HTML hors du canvas; le livre 3D est décoratif. Les liens et boutons ont un focus visible. Images Next optimisées avec texte alternatif, contrastes maintenus sur les photographies. Le rendu WebGL ne tourne que lorsque le livre est visible. Contrôle visuel à 375, 768 et 1280 pixels, y compris pendant une page tournée.

## Limites

La suite de la V2 se développe section par section, avec validation visuelle explicite de Sasha avant chaque lot suivant. Le plan et les validations sont suivis dans `design-plans/marques-v2-suite-plan.md`.

## Notre méthode - lot 1

Référence : bande supérieure de la proposition 1 validée. Bande pleine largeur, papier `#f5f5f2`, encre `#19201e`, texte secondaire `#515650`, accent lisible `#c94426`, filets `#19201e26`. Gouttières de 6%, 7% sur mobile. Aucun encadré ni ombre.

En-tête compact : « Notre méthode », filet, « Du diagnostic à l'impact ». Cinq colonnes égales dès 1100px ; sous ce seuil, liste verticale avec numéros en marge. Étapes du plan : audit, stratégie, casting, production, diffusion & reporting. Titres Outfit 18px, texte Plus Jakarta Sans 14px, interligne 1.6, crénage nul. Les flèches sont des repères de lecture décoratifs.

## Identité et rail validés

Le seul logo Wafia est `public/wafia.svg`, mot-symbole serif en bas de casse. Les signatures de navigation, de couverture, de pages et de secours du livre utilisent sa géométrie réelle. Le nom dans une phrase reste du texte. Sur fond noir, le logo est inversé ou rendu ton sur ton, sans nouveau monogramme.

Le rail de méthode garde les cinq étapes visibles en permanence. Sur ordinateur elles composent une bande horizontale ; sous 1100px elles deviennent une liste verticale. Une impulsion vermillon, avec une traînée et un halo discret autour du point, parcourt le filet en 7,5 secondes et chaque étape devient nette durant son temps de lecture. Le mouvement passe par transform et opacity ; le cycle se met en pause hors du viewport ou au focus, mais continue au survol. En mouvement réduit, l'impulsion disparaît et les étapes ainsi que les filets restent fixes et lisibles. Le cycle n'a aucun lien avec le défilement du livre.

Sur les écrans de 768px et moins, le titre du hero commence à 31 à 40px sous la barre de navigation, avec les mêmes gouttières horizontales que le logo. Sur les téléphones de 720px de haut ou moins, les espacements du texte et la scène du livre sont resserrés pour éviter tout chevauchement.

Le mouvement permanent du rail remplace l'apparition unique initialement prévue. Courbe cubic-bezier(0.22, 1, 0.36, 1) pour la mise au point des étapes ; défilement natif conservé. CSS sans animation pour prefers-reduced-motion ; contenu lisible avant hydratation. Aucun ajout de dépendance.

## Ils nous font confiance

Référence validée le 15 septembre 2026 : un bandeau de preuve compact qui prolonge directement le papier ivoire de la méthode. Sa hauteur cible est d'environ 230px sur ordinateur et 205px sur mobile. Aucun numéro de chapitre, paragraphe, fond noir ou pied de section.

Le titre « Ils nous font confiance » est une ponctuation éditoriale de 26px accompagnée d'une petite flèche courbe vermillon. Les marques occupent deux lignes claires, séparées par un filet gris et une impulsion vermillon courte. Les bords se fondent légèrement dans le papier pour suggérer la continuité du mouvement.

Tous les logos de `CLIENTS` circulent dans deux rails horizontaux continus et en sens opposés. La boucle utilise deux groupes identiques par ligne et un espacement constant afin que la jonction reste invisible. Les logos sont monochromes, encre sur ivoire, et harmonisés par taille optique.

Sous 700px, le titre reste sur une ligne lorsque la largeur le permet et les rails montrent environ deux logos et demi. Avec `prefers-reduced-motion`, les animations s'arrêtent sur une composition lisible et le corridor devient défilable horizontalement. Le mouvement n'utilise que `transform`, `opacity` et `filter`.

## Cas clients

Les trois réalisations sont présentées dans des bandes cinéma compactes d'environ 250px sur ordinateur. La photographie occupe 80% de la largeur et les résultats 20%. Sur mobile, le texte court reste superposé au visuel et les trois résultats tiennent sur une ligne sous l'image.

Le module Basic-Fit remplace la bande simple par quatre previews verticales. Chaque preview porte la photo de profil réelle du talent, le logo TikTok, le volume d'abonnés arrondi et un lien vers le profil. Les avatars restent circulaires, nets et intégrés dans le dégradé bas de la vidéo. Chaque preview charge une version web légère (720p, sans audio) avec une image poster : rien n'est téléchargé avant l'arrivée à l'écran, la lecture démarre à l'intersection et se met en pause hors champ. En mouvement réduit, seul le poster s'affiche.

Les retouches photographiques conservent le cadrage, les personnes et le décor. Aucun générateur ne recrée un logo : les marquages incorrects sont retirés du visuel, puis les fichiers officiels sont superposés dans le site. Chaque bande apparaît une fois au scroll par une translation courte et une stabilisation très légère de l'image. En mouvement réduit, tout reste fixe et immédiatement lisible.

## L'équipe opérationnelle

La section équipe reprend la maquette validée le 15 septembre 2026 : une composition éditoriale compacte sur papier ivoire, sans cartes. Le texte occupe la première colonne, les deux portraits noir et blanc forment le centre, et une annotation manuscrite ferme la composition. Le libellé exact est « L'équipe opérationnelle » et le titre reste « Des experts de terrain. Et de culture. ».

Les portraits utilisent les photographies réelles de Sasha et Yaëlle, recadrées dans des cadres stables et soulignées par un filet vermillon. Le bouton « Découvrir l'équipe » ouvre un panneau latéral ivoire présentant les deux profils et l'argumentaire validé. Sur mobile, le texte passe au-dessus des portraits, les deux visages restent côte à côte et le panneau devient plein écran.

L'entrée de section suit une courte séquence texte, portraits, annotation. Le panneau reprend le mécanisme de drawer : translation au ressort depuis la droite, voile bref, verrouillage du défilement, fermeture par le bouton, le voile ou Échap, puis retour du focus au déclencheur. Les survols ne déplacent que l'image et la flèche. Avec `prefers-reduced-motion`, tous les déplacements deviennent de simples fondus.

## FAQ et CTA final

La FAQ ferme la partie informative sans ajouter de volume : deux colonnes, titre court à gauche, questions linéaires à droite. Aucun bloc arrondi, aucune carte, aucun halo coloré. Les réponses s'ouvrent par une animation de hauteur courte et le signe plus pivote en croix vermillon. Le copy répond aux objections avec des phrases humaines, sans jargon de prestation.

Le CTA final reprend la bande noire de campagne : une image sombre, traitée en noir et blanc, sert d'atmosphère et non de preuve client. Le titre vermillon « Parlons de votre prochaine campagne. » occupe la gauche, le texte et le bouton blanc restent dans une colonne séparée par un filet. Sur mobile, la bande devient verticale et garde un point d'action clair. Avec `prefers-reduced-motion`, les entrées deviennent statiques.
