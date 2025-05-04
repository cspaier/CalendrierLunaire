<script>
  export let couleurVisibilite;
</script>

<h3 class="text-xl font-semibold">Visibilité</h3>

<p>Pour chaque jour lunaire, les horaires où la lune est visible dans le ciel sont indiqués en par la couleur suivante 
  <input class="w-[1em] h-[1em] inline-block" type="color" value="{couleurVisibilite}" disabled/>. Vous pouvez sélectionner la couleur de votre choix.
</p>
<p>Nous proposons deux types de visibilités:</p>
<ul class="list-disc list-inside space-y-1">
  <li><strong>Moyenne</strong> : une moyenne annuelle de la visibilité lunaire par phase de lune en France.</li>
  <li><strong>Réelle</strong> : visibilité exacte selon votre position géographique pour le mois lunaire en cours.</li>
</ul>
