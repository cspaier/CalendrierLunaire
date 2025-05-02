import { VisibiliteLunaire } from "$lib/calendrier/VisibiliteLunaire.js";
import { luneImgB64 } from '$lib/calendrier/lune_b64.js';
import Two from "two.js"


/**
* les heures vont de heureExterieur à heureExterieur+24
*/
export default class CalendrierLunaire{
    
    static angleSecteur = (Math.PI * 2) / 29;
    static optionsDefault = {
        heureExterieure: 7,
        afficherEmojis: true,
        afficherHoraires: true,
        afficherJourActuel: true,
        visibiliteMoyenne: true,
        emojisHeures: {
            7: '⏰',
            12: '🍝',
            16: '🍪',
            20: '🧸',
            24: '💤'
        },
        position: {lat: 46.53972222, lng: 2.43027778}
    };
    
    
    constructor(element){
        // Element du DOM
        this.element = element;
        // Marge entre les bords de l'élément et le calendrier
        this.marge = 10;

        this.options = CalendrierLunaire.optionsDefault;
        
        this.loadTextureLune();
        
        this.two = new Two({
            type: Two.Types.svg,
            fitted: true,
        }).appendTo(element);
        
        this.xCentre = this.two.width * 0.5;
        this.yCentre = this.two.height * 0.5;
        
        // Groupes d'affichage. L'ordre est important.
        this.cerclesHeuresGroup = this.two.makeGroup();
        this.secteursGroup = this.two.makeGroup();
        this.visibilitesGroup = this.two.makeGroup();
        this.jourActuelArc = this.two.makeGroup();
        this.heureCentre = this.getHeureCentre();
        this.cerclesReperesGroup = this.two.makeGroup();
        this.emojisGroup = this.two.makeGroup();
        this.heuresReperesGroup = this.two.makeGroup();
        
        
    }
    
    /***************************************************
     * Getters
     **************************************************/
    get rayonExterieur(){
        return Math.min(
            this.element.offsetWidth,
            this.element.offsetHeight
        ) / 2 - this.marge;
    }
    get hauteurHeure() {
        return this.rayonExterieur / (25 * (1+2 * Math.PI / 29));
    }
    get hauteurSecteurLune(){ return 2 * Math.PI * 25 * this.hauteurHeure / 29}
    get tailleLune(){ return this.hauteurSecteurLune - 6}
    // Raccourci pour les options
    get heureExterieure() {return this.options.heureExterieure};
    get afficherEmojis() {return this.options.afficherEmojis};
    get afficherJourActuel() {return this.options.afficherJourActuel};
    get afficherHoraires(){ return this.options.afficherHoraires};
    get emojisHeures() {return this.options.emojisHeures};
    get visibiliteMoyenne(){return this.options.visibiliteMoyenne}
    get position() {return this.options.position}

    get tableauVisibilites(){
        if (this.visibiliteMoyenne){
            return VisibiliteLunaire.getVisibiliteMoyenneFormatee(this.heureExterieure);

        }
        return VisibiliteLunaire.getVisibiliteReelleFormatee(this.heureExterieure, this.position);
    }
    
    /***************************************************
     * Chargement de la texture (lune)
     **************************************************/
    loadTextureLune(){
        this.textureLune = new Two.Texture(luneImgB64, this.onTextureLoaded.bind(this));
    }
    onTextureLoaded(){
        this.textureLune.scale = this.getScaleToMoonSize(this.textureLune.image);
        this.dessine();
    }
    
    /**************************************************
    * Utilitaires
    **************************************************/
    
    /**
    * Retourne les angles du secteur en fonction du jour.
    * debut
    * fin
    * milieu
    * @param {int} jour 
    */
    anglesFromJour(jour){
        const debut =  jour * CalendrierLunaire.angleSecteur - Math.PI / 2 - CalendrierLunaire.angleSecteur / 2;
        return {
            'debut' : debut,
            'fin': debut + CalendrierLunaire.angleSecteur,
            'milieu': debut + CalendrierLunaire.angleSecteur / 2
        };
    }
    
    /**
    * Retourne le rayon en fonction d'une heure
    * @param {int} heure 
    * @returns debut et fin de secteur horaire
    */
    rayonsFromHeure(heure){
        if (heure == this.heureExterieure + 24){
            return this.hauteurHeure;
        }
        return ((23 - heure + this.heureExterieure) % 24 + 1) * this.hauteurHeure;
    }
    
    /**
    * Retourne les coefficients pour qu'une image prenne la taille de la lune.
    * @param {img} image 
    * @returns {Two.Vector}
    */
    getScaleToMoonSize(image){
        const sx = this.tailleLune / image.width;
        const sy = this.tailleLune / image.height;
        return new Two.Vector(sx, sy);
    }
    
    /**
    * Supprime tous les elements d'un group Two.js
    * @param {Two.Group} group 
    */
    clearGroup(group){
        group.remove(group.children);
    }
    
    /***************************************************
    * Visibilites
    **************************************************/
    
    /**
    * Retourne un arc représentant la visibilité de la lune pour
    * un jour entre deux heures
    * @param {int} jour 0..28
    * @param {int} heureDebut heureExterieur.. heureExterieur+24
    * @param {int} heureFin heureExterieur.. heureExterieur+24
    * @returns {Two.arcSegment} l'arc
    */
    arcVisibilite(jour, heureDebut, heureFin){
        const r1 = this.rayonsFromHeure(heureDebut);
        const r2 = this.rayonsFromHeure(heureFin);
        
        const arc = new Two.ArcSegment(
            this.xCentre, this.yCentre, r1, r2,
            this.anglesFromJour(jour).debut + 0.01,
            this.anglesFromJour(jour).fin - 0.01,
            64
        );
        arc.fill = 'green';
        arc.opacity = 0.6;
        arc.noStroke();
        return arc;
    }
    
    /**
    * Dessine les visibilites
    */
    dessineVisibilites(){
        this.clearGroup(this.visibilitesGroup);
        let tableauVisibilites = this.tableauVisibilites;
        for (let visibilite of tableauVisibilites){
            this.visibilitesGroup.add(this.arcVisibilite(visibilite.jour, visibilite.debut, visibilite.fin));
        }
    }
    
    
    /***************************************************
    * Emojis
    **************************************************/
    
    /**
    * Retourne un tableau d'emojis pour un jour
    * Un emoji est un Two.Text
    * @param {int} jour 
    * @returns {array} Tableau d'emojis
    */
    getEmojisJour(jour){
        let emojisJourTab = [];
        
        let angle = this.anglesFromJour(jour).milieu;
        for (let [heure, emoji] of Object.entries(this.emojisHeures)){
            let rayon = this.rayonsFromHeure(heure);
            // N'affiche pas les emojis proches (3) du centre
            if (rayon < this.hauteurHeure * 3){
                continue;
            }
            
            if (heure == this.heureExterieure){
                rayon -= this.hauteurHeure/2;
            }
            
            let x = this.xCentre + Math.cos(angle) * rayon;
            let y = this.yCentre + Math.sin(angle) * rayon;
            let text = new Two.Text(
                emoji,
                x,
                y,
                {
                    'size': 2 * this.hauteurHeure,
                },
            );
            emojisJourTab.push(text);
        }
        return emojisJourTab;
    }
    
    /** 
    * Dessine les emojis.
    * Vide this.emojisGroup et le rempli avec les nouveaux emojis.
    */
    dessineEmojis(){
        this.clearGroup(this.emojisGroup);
        for (let jour = 0; jour <29; jour+=6){
            this.emojisGroup.add(this.getEmojisJour(jour));
        };
    }
    
    /***************************************************
    * Heures repères
    **************************************************/
    
    getHeureCentre(){
        let text = new Two.Text(
            this.heureExterieure,
            this.xCentre,
            this.yCentre + 3,
            {
                'size': this.hauteurHeure,
            },
        );
        return text;
    }
    
    dessineHeureCentre(){
        if (this.heureCentre){
            this.heureCentre.remove();
        }
        this.heureCentre = this.getHeureCentre();
        this.two.add(this.heureCentre);
    }
    /**
    * Dessine les cercles correspondant aux heures repères
    */
    dessineCerclesReperes(){
        this.clearGroup(this.cerclesReperesGroup);
        for(let heure of Object.keys(this.emojisHeures)){
            // N'affiche pas les emojis proches (3) du centre
            let rayon = this.rayonsFromHeure(heure);
            let cercle = new Two.Circle(this.xCentre, this.yCentre, rayon);
            cercle.stroke = 'black';
            cercle.noFill();
            this.cerclesReperesGroup.add(cercle);
        }
    }
    
    /**
    * Dessine les heures repères
    */
    dessineHeuresReperes(){
        this.clearGroup(this.heuresReperesGroup);
        
        for (let heure of Object.keys(this.emojisHeures)){
            let rayon = this.rayonsFromHeure(heure);
            
            if (rayon < this.hauteurHeure * 2){
                continue;
            }
            for(let jour=3;jour<29;jour+=6){
                let angle = this.anglesFromJour(jour).milieu;
                let x = this.xCentre + Math.cos(angle) * rayon;
                let y = this.yCentre + Math.sin(angle) * rayon;
                
                let text = new Two.Text(
                    heure,
                    x,
                    y,
                    {
                        'fill':'black',
                        'size': this.hauteurHeure,
                    },
                );
                text.className = "heure-repere";
                this.heuresReperesGroup.add(text);
            }
        }
    }
    
    

    dessineJourActuel(){
        let jour = Math.round(VisibiliteLunaire.getJourLunaire());
        console.log("Jour lunaire détecté:", jour);
        const r1 = this.rayonsFromHeure(this.heureExterieure + 24);
        const r2 = this.rayonExterieur;
        
        let arc = new Two.ArcSegment(
            this.xCentre, this.yCentre, r1, r2,
            this.anglesFromJour(jour).debut,
            this.anglesFromJour(jour).fin,
            64
        );
        arc.noFill();
        arc.stroke = "black";
        this.jourActuelArc.add(arc);
    }
    
    /***************************************************
     * Fond du calendrier
     **************************************************/

    /**
    * Dessine les cercles des heures
    */
    dessineCerclesHeures(){
        this.clearGroup(this.cerclesHeuresGroup);
        
        for (let i = 0; i <= 24; i++) {
            let radius = this.rayonsFromHeure(i + this.heureExterieure);
            this.cerclesHeuresGroup.add(new Two.Circle(this.xCentre, this.yCentre, radius));
        }
        this.cerclesHeuresGroup.noFill();
        this.cerclesHeuresGroup.stroke = 'lightgrey';
        
        // Cercle extérieur pour l'affichage des lunes
        const cercleExterieur = this.two.makeCircle(this.xCentre, this.yCentre, this.rayonExterieur);
        cercleExterieur.noFill();
        cercleExterieur.stroke = 'grey';
    }
    
    /** Dessine les secteurs des jours */
    dessineSecteursJours(){
        this.clearGroup(this.secteursGroup);
        
        for (let i = 0; i < 29; i++) {
            const a = this.anglesFromJour(i).debut;
            const x1 = this.xCentre + Math.cos(a) * this.hauteurHeure;
            const y1 = this.yCentre + Math.sin(a) * this.hauteurHeure;
            const x2 = this.xCentre + Math.cos(a) * this.rayonExterieur;
            const y2 = this.yCentre + Math.sin(a) * this.rayonExterieur;
            this.secteursGroup.add(new Two.Line(x1, y1, x2, y2));
        }
        this.secteursGroup.stroke = 'lightgrey';
    }
    
    dessineLunes(){
        for (let i = 0; i < 29; i++) {
            // position
            const a = this.anglesFromJour(i).milieu;
            const x = this.xCentre + Math.cos(a) * (this.rayonExterieur-this.hauteurSecteurLune/2);
            const y = this.yCentre + Math.sin(a) * (this.rayonExterieur-this.hauteurSecteurLune/2);
            
            // lune
            const rectangle = new Two.Rectangle(x, y, this.tailleLune, this.tailleLune);
            rectangle.fill = this.textureLune;
            rectangle.stroke = null;
            this.two.add(rectangle);
            
            // ombre
            let svg = this.getMoonShadowSvg(i);
            let moonShadow = this.two.interpret(svg);
            moonShadow.scale = this.getScaleToMoonSize(moonShadow.getBoundingClientRect());
            moonShadow.translation.x = x - this.tailleLune / 2;
            moonShadow.translation.y = y - this.tailleLune / 2;
        }
    }
    
    

    
    /**
    * Dessine le fond du calendrier:
    * Ce qui ne dépend pas des réglages.
    */
    dessineFond(){
        this.dessineCerclesHeures();   
        this.dessineSecteursJours();
        this.dessineLunes();
    }
    
    effaceReglages(){
        this.clearGroup(this.jourActuelArc);
        this.clearGroup(this.emojisGroup);
        this.clearGroup(this.heuresReperesGroup);
        this.clearGroup(this.cerclesReperesGroup);
    }
    
    dessineReglages(){
        this.dessineHeureCentre();
        this.dessineVisibilites();
        if (this.afficherJourActuel) {
            this.dessineJourActuel();
        }  
        if (this.afficherEmojis || this.afficherHoraires){
            this.dessineCerclesReperes();
        }
        if (this.afficherHoraires) {
            this.dessineHeuresReperes();
        }
        if (this.afficherEmojis) {
            this.dessineEmojis();
        }
        
        this.two.update();
    }
    
    dessine(){
        this.dessineFond();
        this.dessineReglages();
    }
    
    /**
     * Retourne un svg représentant l'ombre sur la lune.
     * Inspiré de https://codepen.io/cermi76/pen/poBOpBE.
     * @param {int} moonPhaseDay 
     * @returns 
     */
    getMoonShadowSvg(moonPhaseDay){
        var xmlns = "http://www.w3.org/2000/svg";
        
        var svg = document.createElementNS(xmlns, "svg");
        svg.setAttribute('width', 200);
        svg.setAttribute('height', 200);
        
        var path = document.createElementNS(xmlns, 'path');
        
        var d = ""
        if (moonPhaseDay<=15) {  //waxing 
            var pointMove = 230 - 17.3333 * moonPhaseDay;
            d = "M107 2C-30 2 -30 214 107 214C" + pointMove + " 214 " + pointMove + " 2 107 2Z";
            //svg.classList.add('waxing');
        } else {                 // waning
            var pointMove = -30 + 17.3333*(30-moonPhaseDay);
            d = "M107 2C"+pointMove+" 2 "+pointMove+" 214 107 214C233 214 228 2 107 2Z";
            //svg.classList.add('waning');
            
        }
        path.setAttribute('d',d);
        path.setAttribute('fill', "black");
        path.setAttribute('fill-opacity', "0.8");
        
        var circle = document.createElementNS(xmlns, 'circle');
        circle.setAttributeNS(null, 'cx', 100);
        circle.setAttributeNS(null, 'cy', 100);
        circle.setAttributeNS(null, 'r', 100);
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: none;' );
        
        svg.appendChild(circle);
        svg.appendChild(path);
        
        return svg;
    }
    
    
    majOptions(options){
        console.log(this.tableauVisibilites)

        console.log(options);
        this.options = options;
        this.effaceReglages();
        this.dessineReglages();
        console.log(this.tableauVisibilites)
    }

    /*************************************
     * Non utilisés.
     * On garde au kazou
     **************************************/

    /** Non utilisé
    * Dessine l'arc extérieur pour un jour:
    * Fond sous la lune
    * @param {int} jour 
    * @returns 
    */
    arcExterieur(jour){
        const r1 = this.rayonsFromHeure(this.heureExterieure);
        const r2 = this.rayonExterieur 
        
        const arc = this.two.makeArcSegment(
            this.xCentre, this.yCentre, r1, r2,
            this.anglesFromJour(jour).debut + 0.01,
            this.anglesFromJour(jour).fin - 0.01,
            64
        );
        arc.fill = 'lightgrey';
        arc.opacity = 0.6;
        arc.noStroke();
        return arc;
    }
    
    /**
    * Dessine les arcs extérieurs
    */
    dessineArcsExterieurs(){
        for (let jour = 0; jour <29; jour++){
            this.arcExterieur(jour);
        };
    }

    /**
     * Retourne le svg du calendrier.
     * @returns 
     */
    getSvg(){
        var blob = new Blob([this.element.innerHTML], { type: "image/svg+xml;charset=utf-8" });
        return blob;
    }
}
