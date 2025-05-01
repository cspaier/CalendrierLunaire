<script>
    import maplibregl from 'maplibre-gl';
    import { MapLibre, Marker, Popup } from 'svelte-maplibre-gl';
    import { onMount, createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  export let position;

    let positionInitiale = [position.lng, position.lat];

    function mettreAJour() {
      dispatch('update', {
        position
      });
    }
  </script>

  
  <MapLibre
    style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
    class="map"
    zoom={5}
    center={positionInitiale}
    maxPitch={85}
    attributionControl={false}
  >
    <Marker bind:lnglat={position} ondragend={mettreAJour} draggable>
    </Marker>
  </MapLibre>

  <style>
    :global(.map){
      height: 300px;
      margin-top:10px;
    }
  </style>

