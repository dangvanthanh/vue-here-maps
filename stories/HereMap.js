import HereMapMixins from './HereMapMixins';

export default {
  name: 'HereMap',
  mixins: [HereMapMixins],
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
  template: `
    <div class="here-map">
      <div ref="map" style="height: calc(100vh - 16px)"></div>
    </div>
  `,
  created() {
    this.platform = this.getPlatform({
      app_id: this.appId,
      app_code: this.appCode
    });

    window.addEventListener('resize', () => {
      this.map.getViewPort().resize();
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

    this.map = this.getMap(
      this.$refs.map,
      defaultLayers.normal.map,
      mapOptions
    );
    this.map.addLayer(defaultLayers.venues);

    let mapTileService = this.platform.getMapTileService({
      type: 'base'
    });

    const pixelRatio = window.devicePixelRatio || 1;
    const tileSize = pixelRatio === 1 ? 256 : 512;
    const ppi = pixelRatio === 1 ? undefined : 320;

    // Our layer will load tiles from the HERE Map Tile API
    let mapLayer = mapTileService.createTileLayer(
      'maptile',
      'normal.day',
      tileSize,
      'png8',
      { lg: 'VIE', ppi: ppi }
    );

    this.map.setBaseLayer(mapLayer);

    const events = this.getEvents(this.map);
    const behavior = this.getBehavior(events);
    const ui = this.getUi(this.map, defaultLayers);
  }
};
