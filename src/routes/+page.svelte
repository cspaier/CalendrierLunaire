<script>
    import Reglages from '$lib/components/Reglages.svelte';
    import Documentation from '$lib/components/Documentation.svelte';
    import CalendrierComposant from '$lib/components/CalendrierLunaire.svelte';
    import BoutonTelecharger from '$lib/components/BoutonTelecharger.svelte';
    import Map from '$lib/components/Map.svelte';
    import NavBar from '$lib/components/NavBar.svelte';

    import { Button } from '$lib/components/ui/button';
    import { Separator } from '$lib/components/ui/separator';
  
    import Calendrier from '$lib/calendrier/CalendrierLunaire.js';
  
    let options = Calendrier.optionsDefault;
    let calendrierDiv;
  
    let ongletActif = 'reglages';
  
    function updateReglages(event) {
        options = Object.assign(options, event.detail);
    }
  </script>
  
  <div class="flex h-screen">
    <!-- <DarkLightSwitch />
    <div class="w-16 bg-muted border-r flex flex-col items-center py-4 gap-2">
      <Button variant={ongletActif === 'reglages' ? 'default' : 'ghost'} size="icon" on:click={() => ongletActif = 'reglages'}>
        <span class="i-lucide-settings w-5 h-5" />
      </Button>
      <Button variant={ongletActif === 'documentation' ? 'default' : 'ghost'} size="icon" on:click={() => ongletActif = 'documentation'}>
        <span class="i-lucide-help-circle w-5 h-5" />
      </Button>
    </div> -->
  
    <!-- Outils à gauche -->
     <NavBar bind:ongletActif/>
    <div class="w-[30%] space-y-2 p-3 overflow-y-auto">
      <h1 class="text-3xl font-bold mb-4">
        Calendrier Lunaire Circulaire
      </h1>
      {#if ongletActif === 'reglages'}
      <h2 class="text-2xl font-bold mb-2 ">
        Reglages
      </h2>
        <Reglages {...options} on:update={updateReglages} />
        <BoutonTelecharger {calendrierDiv} />
        <Map {...options} on:update={updateReglages} />
      {:else if ongletActif === 'documentation'}
        <Documentation {...options}/>
      {/if}
    </div>
  
    <!-- Calendrier à droite -->
    <div class="flex-1 p-4 overflow-auto">
      <CalendrierComposant {options} bind:calendrierDiv />
    </div>
  </div>
  