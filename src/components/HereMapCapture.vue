<template>
  <div class="here-map">
    <div v-show="isResult" class="relative">
      <div class="btn">
        <input type="button" value="Back" @click.prevent="backCapture"/>
      </div>
      <div ref="canvasMap"></div>
    </div>
    <div v-show="!isResult">
      <div ref="map" data-here-map></div>
    </div>
  </div>
</template>

<script>
import { setMapLanguage, addDraggableMarker } from '@/utils';

export default {
  name: 'HereMapCapture',
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
      platform: {},
      isResult: false
    };
  },
  created() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
  },
  mounted() {
    let vm = this;
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
    var ui = H.ui.UI.createDefault(this.map, defaultLayers, 'en-US');
    var behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );
    setMapLanguage(this.map, this.platform, defaultLayers, 'VIE');
    addDraggableMarker(this.map, behavior, marker);

    // Create capture button
    let captureContainer = document.createElement('div');
    captureContainer.style.position = 'absolute';
    captureContainer.style.top = '0';
    captureContainer.style.left = '0';
    captureContainer.style.backgroundColor = '#fff';
    captureContainer.style.padding = '10px';

    let captureButton = document.createElement('input');
    captureButton.value = 'Capture';
    captureButton.type = 'button';

    captureContainer.appendChild(captureButton);
    this.$refs.map.appendChild(captureContainer);

    const capture = function(map, ui) {
      // Capturing area of the map is asynchronous, callback function receives HTML5 canvas
      // element with desired map area rendered on it.
      // We also pass an H.ui.UI reference in order to see the ScaleBar in the output.
      // If dimensions are omitted, whole veiw port will be captured
      map.capture(
        function(canvas) {
          if (canvas) {
            vm.isResult = true;
            vm.$refs.canvasMap.innerHTML = '';
            vm.$refs.canvasMap.appendChild(canvas);
          } else {
            alert('Capturing is not supported');
          }
        },
        [ui],
        0,
        0,
        400,
        400
      );
    };

    captureButton.onclick = function() {
      capture(vm.map, ui);
    };
  },
  methods: {
    backCapture() {
      this.isResult = false;
    }
  }
};
</script>

<style>
div[data-here-map] {
  position: relative;
  width: 400px;
  height: 400px;
}

.relative {
  position: relative;
}

.btn {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
}
</style>
