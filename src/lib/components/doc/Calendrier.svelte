<script>
    import  Pizza  from '@lucide/svelte/icons/pizza';
    import * as Card from "$lib/components/ui/card";
    export let heureExterieure;
</script>
<Card.Root>
    <Card.Header>
      <h3 class="text-xl font-semibold">Présentation du calendrier</h3>
    </Card.Header>
    <Card.Content class="space-y-2">
      <p>Le calendrier représente un cycle lunaire complet (29 jours) sous forme circulaire :</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Chaque jour lunaire est un <strong>secteur radial</strong> <Pizza class="inline pb-1"/>.</li>
        <li>Chaque heure de la journée est un <strong>cercle concentrique</strong> ({heureExterieure}h à l'extérieur et au centre).</li>
        <li>Les phases de la lune sont indiquées sur le bord externe.</li>
        <li>Des repères peuvent indiquer des heures ou événements particuliers.</li>
      </ul>
    </Card.Content>
  </Card.Root>