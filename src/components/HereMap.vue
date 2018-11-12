<template>
  <div class="here-map">
    <div ref="map" data-here-map></div>
  </div>
</template>

<script>
import { setMapLanguage } from '../utils';

export default {
  name: 'HereMap',
  props: {
    appId: String,
    appCode: String,
    lng: Number,
    lat: Number,
    zoom: Number
  },
  data() {
    return {
      map: {},
      platform: {}
    };
  },
  created() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
  },
  mounted() {
    const defaultLayers = this.platform.createDefaultLayers();
    const coordinates = {
      lng: this.lng,
      lat: this.lat
    };
    const mapOptions = {
      zoom: this.zoom,
      center: coordinates
    };

    this.map = new H.Map(this.$refs.map, defaultLayers.normal.map, mapOptions);
    const marker = new H.map.Marker(coordinates);
    marker.setData(`<div>Your Marker</div>`);
    this.map.addObject(marker);

    // Add the venue layer to the map
    this.map.addLayer(defaultLayers.venues);
    this.map.addLayer(defaultLayers.incidents);

    setMapLanguage(this.map, this.platform, defaultLayers, 'VIE');

    window.addEventListener('resize', () => {
      this.map.getViewPort().resize();
    });

    marker.addEventListener(
      'tap',
      evt => {
        let bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
          content: evt.target.getData()
        });

        ui.addBubble(bubble);
      },
      false
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div[data-here-map] {
  position: relative;
  width: 400px;
  height: 400px;
}
</style>
