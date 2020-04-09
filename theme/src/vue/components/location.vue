<template>
  <div class="location absolute inset-0">
    <div id="map" class="absolute inset-0"></div>
    <slot></slot>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  data() {
    return {
      map: null,
      center: null,
      zoom: null,
      data: null
    }
  },
  props: {
    'accessToken': {
      type: String,
      default: 'pk.eyJ1IjoiaWduaXNtIiwiYSI6ImNqOG9tdXRrYTA1OGozMm5uZDJrMWsydHkifQ.tkOkehct0nuaV6Pls1vlSg'
    },
    'mapStyle': {
      type: String,
      default: 'mapbox://styles/mapbox/dark-v10'
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken
    let wpElement = this.$el.querySelector('.gc_wp-mapbox-gl-js-map')

    let center = wpElement.getAttribute('data-center')
    let lng = center.split(',')[0]
    let lat = center.split(',')[1]
    this.center = [lng, lat]
    this.zoom = wpElement.getAttribute('data-zoom')
    this.data = JSON.parse(wpElement.getAttribute('data-mapdata'))
    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mapStyle, 
      center: this.center, 
      zoom: this.zoom
    })

    this.map.scrollZoom.disable();

    let marker = document.createElement('div');
    marker.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(marker)
    .setLngLat(this.data[0].geometry.coordinates)
    .addTo(this.map);
  }
}
</script>

<style lang="pcss">
  .gc_wp-mapbox-gl-js-map {
    @apply invisible fixed pointer-events-none;
    z-index: -9999;
  }

  .mapboxgl-ctrl-bottom-left,
  .mapboxgl-ctrl-bottom-right {
    @apply hidden;
  }
</style>