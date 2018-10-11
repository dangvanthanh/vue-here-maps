<template>
  <div class="here-map">
    <div ref="map" data-here-map></div>
  </div>
</template>

<script>
export default {
  name: 'HereMap',
  props: {
    appId: String,
    appCode: String,
    lng: Number,
    lat: Number,
    zoom: Number
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
    this.map.addObject(marker);

    // Add the venue layer to the map
    this.map.addLayer(defaultLayers.venues);
    this.map.addLayer(defaultLayers.incidents);
    var behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );
    this.switchMapLanguage(this.map, this.platform, defaultLayers);

    window.addEventListener('resize', () => {
      this.map.getViewPort().resize();
    });
  },
  methods: {
    switchMapLanguage(map, platform, defaultLayers) {
      let mapTileService = platform.getMapTileService({
        type: 'base'
      });

      let pixelRatio = window.devicePixelRatio || 1;

      // Our layer will load tiles from the HERE Map Tile API
      let vietnamMapLayer = mapTileService.createTileLayer(
        'maptile',
        'normal.day',
        pixelRatio === 1 ? 256 : 512,
        'png8',
        { lg: 'VIE', ppi: pixelRatio === 1 ? undefined : 320 }
      );

      map.setBaseLayer(vietnamMapLayer);

      let ui = H.ui.UI.createDefault(map, defaultLayers, '');

      ui.removeControl('mapsettings');
    }
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
