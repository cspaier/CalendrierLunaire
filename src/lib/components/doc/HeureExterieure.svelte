<script>
    import  Donut  from '@lucide/svelte/icons/donut';
    export let heureExterieure;
</script>


<h3 class="text-xl font-semibold">Heure extérieure du calendrier</h3>

<p>Vous pouvez choisir l'heure qui correspond au cercles intérieur et extérieur du
calendrier: {heureExterieure}h</p>
<p>En effet, les heures à l'extérieur et à l'intérieur du calendrier sont les mêmes et le calendrier est une sorte de donut <Donut class="inline pb-1"/></p>
