<template>
  <div class="here-map">
    <div>
      <input
        v-model="place"
        placeholder="Places..."
        @keydown.enter="search"
        style="width: 100%; padding: 0.5rem; box-sizing: border-box; margin-bottom: 10px"
      />
    </div>
    <div ref="map" style="height: calc(100vh - 60px)"></div>
  </div>
</template>

<script>
export default {
  name: 'HereMapPlace',
  props: {
    apiKey: String,
    lng: Number,
    lat: Number,
    zoom: Number,
  },
  data() {
    return {
      map: {},
      platform: {},
      place: '',
    }
  },
  created() {
    this.platform = new H.service.Platform({
      apikey: this.apiKey,
    })

    window.addEventListener('resize', () => {
      this.map.getViewPort().resize()
    })
  },
  mounted() {
    const defaultLayers = this.platform.createDefaultLayers()
    const coordinates = {
      lng: this.lng,
      lat: this.lat,
    }
    const mapOptions = {
      zoom: this.zoom,
      center: coordinates,
    }

    this.map = new H.Map(this.$refs.map, defaultLayers.raster.normal.map, mapOptions)

    let mapTileService = this.platform.getMapTileService({
      type: 'base',
    })

    const pixelRatio = window.devicePixelRatio || 1
    const tileSize = pixelRatio === 1 ? 256 : 512
    const ppi = pixelRatio === 1 ? undefined : 320

    // Our layer will load tiles from the HERE Map Tile API
    let mapLayer = mapTileService.createTileLayer('maptile', 'normal.day', tileSize, 'png8', { lg: 'VIE', ppi: ppi })

    this.map.setBaseLayer(mapLayer)

    const events = new H.mapevents.MapEvents(this.map)
    const behavior = new H.mapevents.Behavior(events)
    const ui = H.ui.UI.createDefault(this.map, defaultLayers)
  },
  methods: {
    geocode(platform, searchText) {
      const geocoder = platform.getGeocodingService()
      const geocodingParamerters = {
        searchText: searchText,
        jsonattributes: 1,
      }

      geocoder.geocode(geocodingParamerters, this.onSuccess, this.onError)
    },
    onSuccess(result) {
      if (result.response.view[0]) {
        let group = new H.map.Group()
        const location = result.response.view[0].result
        const position = location[0].location.displayPosition

        const marker = new H.map.Marker({
          lat: position.latitude,
          lng: position.longitude,
        })

        group.addObject(marker)

        this.map.addObject(group)
        this.map.setCenter(group.getBoundingBox().getCenter())
      }
    },
    onError(error) {
      alert(error)
    },
    search() {
      this.geocode(this.platform, this.place)
    },
  },
}
</script>

<style></style>
