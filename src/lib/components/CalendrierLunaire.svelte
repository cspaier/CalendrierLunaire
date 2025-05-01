<script>
	import { onMount, afterUpdate } from 'svelte';
	import CalendrierLunaire from '$lib/calendrier/CalendrierLunaire.js';


    export let options;
	export let calendrierDiv;

	let calendrier;

    function updateRendu() {
        if (!calendrier || !calendrier.textureLune?.loaded) return;
        calendrier.majOptions(options);
    }


	onMount(() => {
		calendrier = new CalendrierLunaire(calendrierDiv);
		calendrier.dessine();
	});

	afterUpdate(() => {
		updateRendu();
	});


</script>

<div bind:this={calendrierDiv} class="calendrier"></div>

<style>
	.calendrier {
		height: 98vh;
        flex-grow: 4;
	}
    :global(.heure-repere) {
    text-shadow: 0px 0px 1px rgb(255, 255, 255),
        0px 0px 2px rgb(255, 255, 255),
        0px 0px 3px rgb(255, 255, 255),
        0px 0px 4px rgb(255, 255, 255),
        0px 0px 5px rgb(255, 255, 255),
        0px 0px 5px rgb(255, 255, 255),
        0px 0px 5px rgb(255, 255, 255),
        0px 0px 5px rgb(255, 255, 255),
        0px 0px 5px rgb(255, 255, 255),
        0px 0px 5px rgb(255, 255, 255),
        0px 0px 6px rgb(255, 255, 255),
        0px 0px 7px rgb(255, 255, 255),
        0px 0px 8px rgb(255, 255, 255)

        ;
    filter:drop-shadow(0px 0px 1px rgb(255,255,255));   
}
</style>