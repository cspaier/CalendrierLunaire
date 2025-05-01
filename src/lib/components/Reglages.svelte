<script>
    import { onMount, createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    export let heureExterieure;
    export let afficherEmojis;
    export let afficherHoraires;
    export let emojisHeures;
    export let afficherJourActuel;
    export let visibiliteMoyenne;

    let calendrierDiv;
  
    let nouvelleHeure = '';
    let nouvelEmoji = '';
  


    function mettreAJour() {
      dispatch('update', {
        heureExterieure,
        afficherEmojis,
        afficherHoraires,
        afficherJourActuel,
        visibiliteMoyenne,
        emojisHeures
      });
    }
  
    function modifierEmoji(heure, event) {
      emojisHeures = { ...emojisHeures, [heure]: event.target.value };
      mettreAJour();
    }
  
    function modifierHeure(ancienneHeure, event) {
      const nouvelleCle = parseInt(event.target.value);
      if (!isNaN(nouvelleCle) && !emojisHeures[nouvelleCle]) {
        const nouveau = { ...emojisHeures };
        nouveau[nouvelleCle] = nouveau[ancienneHeure];
        delete nouveau[ancienneHeure];
        emojisHeures = nouveau;
        mettreAJour();
      }
    }
  
    function supprimerHeure(heure) {
      const nouveau = { ...emojisHeures };
      delete nouveau[heure];
      emojisHeures = nouveau;
      mettreAJour();
    }
  
    function ajouterHeureEmoji() {
      const h = parseInt(nouvelleHeure);
      if (!isNaN(h)) {
        emojisHeures = { ...emojisHeures, [h]: nouvelEmoji.trim() };
        nouvelleHeure = '';
        nouvelEmoji = '';
        mettreAJour();
      }
    }


  </script>
  
  <div class="reglages">
    <label>
      Heure extérieure : <span class="sliderLabelSpan">{heureExterieure}</span>
      <input type="range" min="0" max="24" bind:value={heureExterieure} on:input={mettreAJour} />
    </label>
  
    <label>
      <input type="checkbox" bind:checked={afficherEmojis} on:change={mettreAJour} />
      Afficher les emojis
    </label>
  
    <label>
      <input type="checkbox" bind:checked={afficherHoraires} on:change={mettreAJour} />
      Afficher les horaires
    </label>
    <label>
      <input type="checkbox" bind:checked={afficherJourActuel} on:change={mettreAJour} />
      Afficher le jour lunaire actuel
    </label>

    <fieldset>
      <legend>Type de visibilité</legend>
      <label>
        <input
          type="radio"
          bind:group={visibiliteMoyenne}
          value={true}
          on:change={mettreAJour}
        />
        Moyenne
      </label>
      <label>
        <input
          type="radio"
          bind:group={visibiliteMoyenne}
          value={false}
          on:change={mettreAJour}
        />
        Réelle
      </label>
    </fieldset>
    

    <fieldset>
      <legend>Repères horaires</legend>
      <div class="emoji-ligne">
        <span>Heure</span><span>Emoji</span>
      </div>
      {#each Object.entries(emojisHeures).sort((a, b) => a[0] - b[0]) as [heure, emoji]}
        <div class="emoji-ligne">
          <input
            type="number"
            min="0"
            max="23"
            value={heure}
            on:change={(e) => modifierHeure(heure, e)}
          />
          <input
            type="text"
            value={emoji}
            maxlength="2"
            on:input={(e) => modifierEmoji(heure, e)}
          />
          <button on:click={() => supprimerHeure(heure)}>❌</button>
        </div>
      {/each}
      <div class="emoji-ajout">
        <input type="number" min="0" max="23" bind:value={nouvelleHeure} placeholder="Heure" />
        <input type="text" bind:value={nouvelEmoji} maxlength="2" placeholder="Emoji" />
        <button on:click={ajouterHeureEmoji}>➕ Ajouter</button>
      </div>
    </fieldset>

    
  </div>
  
  <style>
    .reglages {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  
    fieldset {
      border: 1px solid #ccc;
      padding: 1em;
    }
  
    .emoji-ligne, .emoji-ajout {
      display: flex;
      gap: 0.5em;
      align-items: center;
      margin-bottom: 0.4em;
    }
  
    input[type="text"] {
      width: 3ch;
      text-align: center;
    }
  
    input[type="number"] {
      width: 5ch;
    }
  
    button {
      cursor: pointer;
    }
    .sliderLabelSpan{
      width: 2em;
	    display: inline-block;
	    text-align: left;
    }
  </style>
  