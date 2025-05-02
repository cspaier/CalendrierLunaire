<script>
    import * as Card from "$lib/components/ui/card";
</script>
<Card.Root>
    <Card.Header>
      <h3 class="text-xl font-semibold">Visibilité</h3>
    </Card.Header>
    <Card.Content class="space-y-2">
        <p>Pour chaque jour lunaire, les horaires où la lune est visible dans le ciel sont indiqués en vert.
        <p>Nous proposons deux types de visibilités:</p>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>Moyenne</strong> : une moyenne annuelle de la visibilité lunaire par phase de lune en France.</li>
              <li><strong>Réelle</strong> : visibilité exacte selon votre position géographique pour le mois lunaire en cours.</li>
            </ul>
    </Card.Content>
  </Card.Root>