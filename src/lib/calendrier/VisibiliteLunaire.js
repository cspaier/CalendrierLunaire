import SunCalc from "suncalc";


/**
 * Gestion des heures de visibilités de la lune.
 * On propose des visibilités moyennes ou réelles.
 * 
 * On expose uniquement des méthode statiques.
 */
export class VisibiliteLunaire{
    static visibiliteMoyenne = [
        { lever: 6, coucher: 18, phase: "Nouvelle Lune" },
        { lever: 7, coucher: 19, phase: "Croissant initial" },
        { lever: 8, coucher: 20, phase: "Croissant initial" },
        { lever: 9, coucher: 21, phase: "Premier croissant" },
        { lever: 10, coucher: 22, phase: "" },
        { lever: 11, coucher: 23, phase: "" },
        { lever: 12, coucher: 24, phase: "" },
        { lever: 13, coucher: 1, phase: "Premier Quartier" },
        { lever: 14, coucher: 2, phase: "" },
        { lever: 15, coucher: 3, phase: "" },
        { lever: 16, coucher: 4, phase: "Gibbeuse croissante" },
        { lever: 17, coucher: 5, phase: "" },
        { lever: 18, coucher: 6, phase: "" },
        { lever: 19, coucher: 7, phase: "" },
        { lever: 18, coucher: 6, phase: "Pleine Lune" },
        { lever: 19, coucher: 7, phase: "" },
        { lever: 20, coucher: 8, phase: "" },
        { lever: 21, coucher: 9, phase: "Gibbeuse décroissante" },
        { lever: 22, coucher: 10, phase: "" },
        { lever: 23, coucher: 11, phase: "" },
        { lever: 24, coucher: 12, phase: "" },
        { lever: 1, coucher: 13, phase: "Dernier Quartier" },
        { lever: 2, coucher: 14, phase: "" },
        { lever: 3, coucher: 15, phase: "" },
        { lever: 4, coucher: 16, phase: "Dernier croissant" },
        { lever: 5, coucher: 17, phase: "" },
        { lever: 6, coucher: 18, phase: "" },
        { lever: 7, coucher: 19, phase: "" },
        { lever: 6, coucher: 18, phase: "Nouvelle Lune" },
    ];


          /**
       * Retourne le jour lunaire (0..28)
       * @param {Date} date 
       * @returns 
       */
          static getJourLunaire(date = new Date()) {
            const BASE_LUNATION_JULIAN_DATE = 2423436.6115277777;
            const LUNAR_MONTH = 29.530588861;
            
            const normalize = (value) =>{
                value = value - parseInt(value);
                
                if (value < 0){
                    value = value + 1;
                }
                return value;
            }
            const getJulianDate = (date) =>
                (date / 86400000) + 2440587.5;
            
            return normalize((getJulianDate(date) - BASE_LUNATION_JULIAN_DATE) / LUNAR_MONTH) * LUNAR_MONTH;
        }


    /**
     * Retourne un tableau de visibilité lunaire moyenne sur l'année:
     * [{
     *   jour: le jour du mois lunaire (0..28)
     *   debut: l'heure du lever de lune >= heure extérieure
     *   fin: l'heure du coucher de lune <= heure extérieure + 24
     * },...
     * @param {in} heureExterieure 
     * @returns 
     */
    static getVisibiliteMoyenneFormatee(heureExterieure){
      return VisibiliteLunaire.formatVisibilite(VisibiliteLunaire.visibiliteMoyenne, heureExterieure);
    }

    /**
    * Retourne un tableau de visibilité lunaire réelle pour le mois en cours en france:
    * [{
    *   jour: le jour du mois lunaire (0..28)
    *   debut: l'heure du lever de lune >= heure extérieure
    *   fin: l'heure du coucher de lune <= heure extérieure + 24
    * },...
    */
    static getVisibiliteReelleFormatee(heureExterieure, position){
      return VisibiliteLunaire.formatVisibilite(this.getVisibilitesReelles(position), heureExterieure);
    }

    /**
     * Nettoie un tableau en fusionnant des visibilités redondantes.
     * Le paramètre tableau est formatté comme:
     * [{
     *   jour: le jour du mois lunaire (0..28)
     *   debut: l'heure du lever de lune
     *   fin: l'heure du coucher de lune
     * },...
     * ]
     * @param {Array} tableau des visibilites
     * @returns {Array} 
     */
    static fusionnerTranches(tableau) {
        const  tableauNettoye = [];
        for (const [index, visibilite] of tableau.entries()) {
            let indexVisibiliteExistante = tableauNettoye.findIndex((v) =>
                v.jour === visibilite.jour &&
            !(visibilite.fin <= v.debut || visibilite.debut >= v.fin)
            );
            if (indexVisibiliteExistante >= 0){
                let visibiliteExistante = tableauNettoye[indexVisibiliteExistante];
                tableauNettoye[indexVisibiliteExistante] = {
                    'jour': visibiliteExistante.jour,
                    'debut': Math.min(visibilite.debut, visibiliteExistante.debut),
                    'fin': Math.max(visibilite.fin, visibiliteExistante.fin)
    
                }
            } else {
                tableauNettoye.push(visibilite);
            }
        }
        return tableauNettoye;
      }
    
    
    /**
     * Formatte un tableau de visibilités en fonction d'une heure extérieure.
     * Le paramètre tableau est formatté comme:
     * [
     * {lever, coucher}, // jour  lunaire 0
     * {lever, coucher}, // jour lunaire 1
     * , ...
     * ]
     * On retourne un tableau:
     * [{
     *   jour: le jour du mois lunaire (0..28)
     *   debut: l'heure du lever de lune >= heure extérieure
     *   fin: l'heure du coucher de lune <= heure extérieure + 24
     * },...
     * ]
     * @param {Array} tableau 
     * @param {int} heureExterieure 
     * @returns 
     */
    static formatVisibilite(tableau, heureExterieure){
      let tableauVisibilites = [];
      
        for (const [index, jour] of tableau.entries()) {
          let debut = jour.lever;
          let fin = jour.coucher;
      
          // Cas où le coucher est techniquement le lendemain (ex: 2h du matin)
          if (fin <= debut) {
            fin += 24;
          }
      
          // Tranche à décaler vers le jour précédent (avant heureExterieure)
          if (debut < heureExterieure) {
            let jourPrecedent = (index - 1 + 29) % 29;
            tableauVisibilites.push({
              jour: jourPrecedent,
              debut: debut + 24,
              fin: heureExterieure + 24
            });
            debut = heureExterieure;
          }
      
          // Tranche à décaler vers le jour suivant (au-delà de heureExterieure + 24)
          if (fin > heureExterieure + 24) {
            let jourSuivant = (index + 1) % 29;
            tableauVisibilites.push({
              jour: jourSuivant,
              debut: heureExterieure,
              fin: fin - 24
            });
            fin = heureExterieure + 24;
          }
      
          // Si tranche résiduelle sur le jour courant, on l'ajoute
          if (debut < fin) {
            tableauVisibilites.push({
              jour: index,
              debut: debut,
              fin: fin
            });
          }
        }
      
        return VisibiliteLunaire.fusionnerTranches(tableauVisibilites);
    }

    


    /**
     * Retourne un tableau des visibilités lunaires du mois en cours
     * [
     * {lever, coucher}, // jour  lunaire 0
     * {lever, coucher}, // jour lunaire 1
     * , ...
     * ]
     * @returns 
     */
    static getVisibilitesReelles(position){
      //46°29′38″N 2°36′10″E
      // Nassigny est le centre de la France métropolitaine (Corse comprise)

      // 46° 32′ 23″ nord, 2° 25′ 49″ est
      // Sans la corse: Vesdun
      // 46.53972222
      // 2.43027778
      console.log(position)
      let latitude = position.lat;
      let longitude = position.lng;
      let jourLunaire = Math.round(VisibiliteLunaire.getJourLunaire());
      
      let tableauVisibilites = [];
      let jour = new Date();
      jour.setHours(0);
      jour.setMinutes(0);

      jour.setDate(jour.getDate()- jourLunaire);

      for(let i=0; i<29;i++){

        jour.setDate(jour.getDate()+1);

        let luneInfos = SunCalc.getMoonTimes(jour, latitude,  longitude);
        let heureLever = luneInfos.rise ?
            luneInfos.rise.getHours() + luneInfos.rise.getMinutes()/60 :
            24;
        let heureCoucher = luneInfos.set ?
          luneInfos.set.getHours() + luneInfos.set.getMinutes()/60 :
          0;

        tableauVisibilites.push({
          lever: heureLever,
          coucher:heureCoucher
        });

      }
      return tableauVisibilites;
    }
}

