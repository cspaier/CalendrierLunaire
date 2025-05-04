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
  export let couleurVisibilite;
</script>

<div class="max-w-4xl mx-auto p-6 space-y-6">
  <h2 class="text-2xl font-bold mb-2 ">
    Documentation
  </h2>
  <Card.Root>
    <Card.Content class="space-y-2">
      <Calendrier {heureExterieure}/>
  </Card.Content>
  </Card.Root>

  <Card.Root>
    <Card.Content class="space-y-2">
  <Visibilite {couleurVisibilite}/>
  </Card.Content>
  </Card.Root>

  <Card.Root>
    <Card.Content class="space-y-2">
  <HeureExterieure {heureExterieure}/>
  </Card.Content>
  </Card.Root>

  <Card.Root>
    <Card.Content class="space-y-2">
  <Reperes {emojisHeures}/>
    </Card.Content>
  </Card.Root>
  <Card.Root>

    <Card.Content class="space-y-2">
  <Position />
</Card.Content>
</Card.Root>

  <Card.Root>
    <Card.Content class="space-y-2">
  <Telecharger />
  </Card.Content>
  </Card.Root>
  
</div>
