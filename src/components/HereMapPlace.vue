<template>
  <div class="here-map">
    <div>
      <input v-model="place" placeholder="Places..." @keydown.enter="search"/>
    </div>
    <div ref="map" data-here-map></div>
  </div>
</template>

<script>
export default {
  name: 'HereMapPlace',
  props: {
    appId: String,
    appCode: String,
    lng: Number,
    lat: Number
  },
  data() {
    return {
      place: ''
    };
  },
  mounted() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });

    const defaultLayers = this.platform.createDefaultLayers();
    const coordinates = {
      lng: this.lng,
      lat: this.lat
    };
    const mapOptions = {
      zoom: 14,
      center: coordinates
    };

    this.map = new H.Map(this.$refs.map, defaultLayers.normal.map, mapOptions);
  },
  methods: {
    geocode(platform, searchText) {
      const geocoder = platform.getGeocodingService();
      const geocodingParamerters = {
        searchText: searchText,
        jsonattributes: 1
      };

      geocoder.geocode(geocodingParamerters, this.onSuccess, this.onError);
    },
    onSuccess(result) {
      if (result.response.view[0]) {
        let group = new H.map.Group();
        const location = result.response.view[0].result;
        const position = location[0].location.displayPosition;

        const marker = new H.map.Marker({
          lat: position.latitude,
          lng: position.longitude
        });
        group.addObject(marker);

        this.map.addObject(group);
        this.map.setCenter(group.getBounds().getCenter());
      }
    },
    onError(error) {
      alert(error);
    },
    search() {
      this.geocode(this.platform, this.place);
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
