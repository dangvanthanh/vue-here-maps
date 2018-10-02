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
    const coordinates = {
      lng: this.lng,
      lat: this.lat
    };
    const mapOptions = {
      zoom: 18,
      center: coordinates
    };

    const map = new H.Map(
      document.getElementById("map"),
      defaultLayers.normal.map,
      mapOptions
    );

    const marker = new H.map.Marker(coordinates);
    map.addObject(marker);

    // Add the venue layer to the map
    map.addLayer(defaultLayers.venues);

    window.addEventListener("resize", () => {
      map.getViewPort().resize();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.here-map {
  position: relative;
  width: 100vm;
  height: 100vh;
}
</style>
