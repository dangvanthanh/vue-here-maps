export default {
  name: 'HereMapMarker',
  props: {
    appId: String,
    appCode: String,
    lng: Number,
    lat: Number,
    zoom: Number,
  },
  data() {
    return {
      map: {},
      platform: {},
    };
  },
  template: `
    <div class="here-map">
      <div ref="map" style="height: calc(100vh - 16px)"></div>
    </div>
  `,
  created() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode,
    });
  },
  mounted() {
    const defaultLayers = this.platform.createDefaultLayers();
    const coordinates = {
      lng: this.lng,
      lat: this.lat,
    };
    const mapOptions = {
      zoom: this.zoom,
      center: coordinates,
    };

    this.map = new H.Map(this.$refs.map, defaultLayers.normal.map, mapOptions);
    this.map.addLayer(defaultLayers.venues);

    const marker = new H.map.Marker(coordinates);
    marker.setData(`<div>Your Marker</div>`);
    this.map.addObject(marker);
  },
};
