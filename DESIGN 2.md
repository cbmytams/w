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

Gouttières de 6% sur grand écran, 7% sur mobile. Une barre unique, trois colonnes symétriques (1fr / auto / 1fr) : identité, navigation, contact. Le livre conserve sa scène 3D. Les cas clients suivent immédiatement en bandes cinéma d'environ 250px, avec 80% pour la photographie et 20% pour les résultats. Alternance noir / blanc / noir, titres clients en Barlow Condensed et détails accessibles dans une modale. Sur mobile, chaque bande reste compacte : un visuel d'environ 290px porte le texte, puis trois résultats s'alignent sur une seule ligne. Pas de cartes imbriquées ni de coins arrondis décoratifs.

Les photographies de campagne authentiques restent intactes, particulièrement lorsque du branding apparaît dans la scène. Aucun générateur d'image ne doit recréer un logo. Une source verticale peut être intégrée dans une bande panoramique avec un arrière-plan agrandi provenant de la même photographie et une version nette au premier plan ; les marques officielles sont ajoutées séparément depuis les assets du site si nécessaire.

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
