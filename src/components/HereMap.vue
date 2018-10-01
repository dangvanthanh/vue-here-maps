<template>
  <div class="here-map" id="map"></div>
</template>

<script>
export default {
  name: "HereMap",
  props: {
    appId: String,
    appCode: String,
    lng: Number,
    lat: Number
  },
  mounted() {
    const platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      document.getElementById("map"),
      defaultLayers.normal.map,
      {
        zoom: 18,
        center: { lng: this.lng, lat: this.lat }
      }
    );

    // Add the venue layer to the map
    map.addLayer(defaultLayers.venues);

    // Get TileProvider from the venue layer
    var venueProvider = defaultLayers.venues.getProvider();

    // Set floor level
    venueProvider.setCurrentLevel(-1);

    // Log space information on "tap" event
    map.addEventListener("tap", e => {
      if (e.target instanceof H.service.venues.Space) {
        console.log(e.target.getData());
      }
    });

    // Highlight the space on "pointermove"
    map.addEventListener("pointermove", e => {
      let space = e.target;

      if (space instanceof H.service.venues.Space) {
        space.setStyle(
          space.getStyle().getCopy({
            lineWidth: 2,
            strokeColor: "rgba(0, 0, 0, 0.5)"
          })
        );
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.here-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
