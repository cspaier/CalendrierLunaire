# Calendrier lunaire

## Origines

> Papa, tu peux m'expliquer la Lune? Pourquoi des fois elle est entière et des fois un croissant?
  
   *Tasse de café, lampe torche, ombre... papier crayon pour proposer un calendrier circulaire afin de suivre les phases de la lune.*

> Oui, d'accord, mais des fois on la voit le matin, et des fois le soir.
   
   *Reprend du café.*

## A propos

Cette application propose une représentation circulaire du calendrier lunaire indiquant les phases de la lune et les heures de visibilités de la lune.

On indique par défaut les horaires de visibilités moyennes en France mais on peut les comparer aux horaires réels dans le centre de la France Métropolitaine ([Vesdun](https://fr.wikipedia.org/wiki/Vesdun)).

L'utilisateur peut paramétrer l'affichage et télécharger un rendu du calendrier au format SVG pour impression.


## Technologies

On utilise [two.js](https://two.js.org/) pour le rendu svg et [svelte.js](https://svelte.dev/) pour l'interface HTML/JS/CSS.

Les calculs liés à la Lune se sont inspirés de ce [gist](https://gist.github.com/jesgs/444d4c978c7b6687f09080260e1cd723) de @jesgs et le calcul de l'ombre sur la lune de ce [CodePen](https://codepen.io/cermi76/pen/poBOpBE).

La photo de la lune provient de [cette image](https://commons.wikimedia.org/wiki/File:FullMoon2020.tif) de Wikimedia.

## Déploiement local
On suppose node (testé en 18.20.8) et npm (testé en 10.8.2) installés.
- Cloner le dépot: `git clone git@github.com:cspaier/CalendrierLunaire.git`
- Se placer dans le dossier: `cd CalendrierLunaire`
- Installer les dépendances: `npm install`
- Lancer le serveur de dévellopement: `npm run dev`

## Mise en production
C'est un projet statique. Il suffit donc de compiler le projet et d'héberger les fichiers derrière un serveur web.

- compiler le projet: `npm run build`
- Héberger le contenu du dossier `build` derrière votre serveur web préféré.


