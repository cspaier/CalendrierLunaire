<script>
    import * as Card from "$lib/components/ui/card";

</script>
<Card.Root>
    <Card.Header>
      <h2 class="text-xl font-semibold">Position géographique</h2>
    </Card.Header>
    <Card.Content class="space-y-2">
        <p>Les horaires de visibilité réels sont calculés par défaut au centre de la France continentale (<a href="https://fr.wikipedia.org/wiki/Vesdun">Vesdun</a>)</p>.
        <p>En déplacant le marqueur sur la carte, les horaires de visibilités réels s'adapteront automatiquement à la position géographique.</p>
        <p>Il est prévu d'implémenter un calcul des horaires moyens annuels de visibilités lunaires.</p>
    </Card.Content>
  </Card.Root>