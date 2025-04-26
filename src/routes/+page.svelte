<script>
  import Calendrier from '$lib/calendrier/CalendrierLunaire.js';  
  import { VisibiliteLunaire } from '$lib/calendrier/VisibiliteLunaire';
  import { assets } from '$app/paths';
  //composants
  import CalendrierComposant from '$lib/components/CalendrierLunaire.svelte';
  import Reglages from '$lib/components/Reglages.svelte';
  import BoutonTelecharger from '$lib/components/BoutonTelecharger.svelte';
  
  let options = Calendrier.optionsDefault;
  let button;
  let calendrierDiv;
  
  function updateReglages(event) {
    options = event.detail;
  }
  
  
  
</script>
<a id="github-link" href="https://github.com/cspaier/CalendrierLunaire"><img src="{assets}/github-mark.svg"/></a>

<div class="flex">
  <div class="outils">
    <Reglages {...options} on:update={updateReglages} />
    <BoutonTelecharger {calendrierDiv} />
    
  </div>
  <CalendrierComposant {options} bind:calendrierDiv/>
</div>
<style>
  .flex{
    display: flex;
  }
  
  .outils{
      max-width: 350px;

  }
  #github-link{
    position:absolute;
    top:5px;
    right:5px;
  }

  #github-link > img{
    width:2em;
  }
</style>
