<template>
  <div class="here-map" id="map"></div>
</template>

<script>
export default {
  name: 'HereMap',
  mounted() {
    const platform = new H.service.Platform({
      app_id: 'FymdsOx1OInDIkWIBErG',
      app_code: 'i_LyBjYPh3K-ymfzPrpBPw'
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(document.getElementById('map'), defaultLayers.normal.map, {
      zoom: 10,
      center: { lng: 106.660172, lat: 10.762622 }
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
