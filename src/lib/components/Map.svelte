<script>
    import * as Card from "$lib/components/ui/card";

    import maplibregl from 'maplibre-gl';
    import { MapLibre, Marker, Popup } from 'svelte-maplibre-gl';
    import { onMount, createEventDispatcher } from 'svelte';
    import Info from "./ui/Info.svelte";
    import Position from "./doc/Position.svelte";

    import { mode,theme } from "mode-watcher";
  
  const dispatch = createEventDispatcher();
  let {position, ...otherprops} = $props();
  

    let positionInitiale = [position.lng, position.lat];

    let style = $derived($mode==="dark" ?
     "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json":
      "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json");

    function mettreAJour() {
      dispatch('update', {
        position
      });
    }


  </script>

  <Card.Root class="p-0">
    <Card.CardContent class="p-1 relative">
        <Info class="absolute top-4 right-4 z-50 bg-card rounded-full"><Position/></Info>
      <MapLibre
      style={style}
      class="m-0 h-[350px] rounded-xl"
      zoom={5}
      center={positionInitiale}
      maxPitch={85}
      attributionControl={false}
    >
      <Marker bind:lnglat={position} ondragend={mettreAJour} draggable>
      </Marker>
    </MapLibre>
    </Card.CardContent>
  </Card.Root>
