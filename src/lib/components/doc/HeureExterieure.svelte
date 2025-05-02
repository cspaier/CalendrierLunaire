<script>
    import  Donut  from '@lucide/svelte/icons/donut';
    import * as Card from "$lib/components/ui/card";
    export let heureExterieure;
</script>

<Card.Root>
    <Card.Header>
      <h3 class="text-xl font-semibold">Heure extérieure du calendrier</h3>
    </Card.Header>
    <Card.Content class="space-y-2">
        <p>Vous pouvez choisir l'heure qui correspond au cercles intérieur et extérieur du
            calendrier: {heureExterieure}h</p>
        <p>En effet, les heures à l'extérieur et à l'intérieur du calendrier sont les mêmes et le calendrier est une sorte de donut <Donut class="inline pb-1"/></p>
    </Card.Content>
  </Card.Root>