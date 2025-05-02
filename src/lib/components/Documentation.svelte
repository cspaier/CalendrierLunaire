<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import Calendrier from "./doc/Calendrier.svelte";
  import Visibilite from "./doc/Visibilite.svelte";
  import HeureExterieure from "./doc/HeureExterieure.svelte";
  import Reperes from "./doc/Reperes.svelte";
  import Position from "./doc/Position.svelte";
  import Telecharger from "./doc/Telecharger.svelte";

  export let emojisHeures;
  export let heureExterieure;
</script>

<div class="max-w-4xl mx-auto p-6 space-y-6">
  <h2 class="text-2xl font-bold mb-2 ">
    Documentation
  </h2>
  <Calendrier {heureExterieure}/>
  <Visibilite />

  <HeureExterieure {heureExterieure}/>
  <Reperes {emojisHeures}/>
  <Position />
  <Telecharger />
  
</div>
