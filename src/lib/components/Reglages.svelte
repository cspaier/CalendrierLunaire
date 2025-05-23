<script>
  
  import { onMount, createEventDispatcher } from 'svelte';
  
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Label } from "$lib/components/ui/label";
  import { Slider } from "$lib/components/ui/slider";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import Info from "$lib/components/ui/Info.svelte";

  import HeureExterieure from './doc/HeureExterieure.svelte';
  import Visibilite from './doc/Visibilite.svelte';
  import Reperes from './doc/Reperes.svelte';
  import JourLunaire from './doc/JourLunaire.svelte';
  import DocCalendrier from './doc/Calendrier.svelte';

  import CalendrierLunaire from './CalendrierLunaire.svelte';
  
  const dispatch = createEventDispatcher();
  
  export let heureExterieure;
  export let afficherEmojis;
  export let afficherHoraires;
  export let emojisHeures;
  export let afficherJourActuel;
  export let visibiliteMoyenne;
  export let couleurVisibilite;
  
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
      emojisHeures,
      couleurVisibilite
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

<div class="space-y-2">
  <h2 class="text-2xl font-bold mb-2 ">
    Reglages
  </h2>
  <Card.Root>
    <Card.Content class="flex space-x-4 py-4 items-center">
      <Card.Title class="shrink-0">Heure extérieure : <span class="inline-block w-4 text-left">{heureExterieure}h</span></Card.Title>
      <Slider class="shrink" type="single" min={0} max={24} step={1} bind:value={heureExterieure} onValueChange={mettreAJour} />
      
    <Info><HeureExterieure {heureExterieure}/></Info>
    </Card.Content>
  </Card.Root>
  
  

  <Card.Root>
    <Card.Content class="flex space-x-4 py-4 justify-between items-center">
    <Card.Title>Afficher le jour lunaire actuel</Card.Title>
    <div class="space-x-4">
      <Switch bind:checked={afficherJourActuel} onCheckedChange={mettreAJour} />
      <Info><JourLunaire/></Info>
    </div>

    </Card.Content>
    </Card.Root>
  
  
  <Card.Root>
    <Card.Content class="flex space-x-4 py-3 justify-between items-center">
      <Card.Title>Type de visibilité</Card.Title>
    <div class="space-x-4 grow flex justify-end">
      
      <RadioGroup bind:value={visibiliteMoyenne} onValueChange={mettreAJour} class="flex space-x-2" >
        <div class="flex items-center space-x-2">
          <RadioGroupItem value={true} id="moyenne" />
          <Label for="moyenne">Moyenne</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem value={false} id="reelle" />
          <Label for="reelle">Réelle</Label>
        </div>
      </RadioGroup>
        <Input class="w-[60px] cursor-pointer" type="color" bind:value="{couleurVisibilite}" onchange={mettreAJour}/>
        
    <Info><Visibilite {couleurVisibilite}/></Info>

</div>
    </Card.Content>
  </Card.Root>   
  
  <Card.Root>
    <Card.Header>
      <Card.Title class="flex justify-between">
        <span>Repères horaires </span>
        
      <Info><Reperes/></Info>

      </Card.Title>
    </Card.Header>
    <Card.Content class="flex justify-between">
      <div>
      <div class="flex space-x-2 font-semibold">
        <span class="w-16">Heure</span><span>Emoji</span>
      </div>
      {#each Object.entries(emojisHeures).sort((a, b) => a[0] - b[0]) as [heure, emoji]}
      <div class="flex space-x-2">
        <Input type="number" min="0" max="23" value={heure} on:change={(e) => modifierHeure(heure, e)} class="w-16" />
          <Input type="text" maxlength="2" value={emoji} on:input={(e) => modifierEmoji(heure, e)} class="w-12 text-center" />
            <Button variant="ghost" onclick={() => supprimerHeure(heure)}>❌</Button>
          </div>
          {/each}
          <div class="flex space-x-2">
            <Input type="number" min="0" max="23" bind:value={nouvelleHeure} placeholder="Heure" class="w-16" />
            <Input type="text" bind:value={nouvelEmoji} maxlength="2" placeholder="Emoji" class="w-12 text-center" />
            <Button onclick={ajouterHeureEmoji}>➕</Button>
          </div>
          </div>
          <div class="space-y-3 text-right">
            <div class="flex items-center space-x-2">
              <Switch id="afficherEmojis" bind:checked={afficherEmojis} onCheckedChange={mettreAJour}/>
              <Label for="afficherEmojis">Afficher les emojis</Label>
            </div>
            
            <div class="flex items-center space-x-2">
              <Switch id="afficherHoraires" bind:checked={afficherHoraires} onCheckedChange={mettreAJour} />
              <Label for="afficherHoraires">Afficher les horaires</Label>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
      
    </div>

    