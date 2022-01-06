<template>
  <div style="display: flex; flex-wrap: wrap;">
    <div style="position: relative; width: 50%; height: calc(100vh - 16px)">
      <div ref="map" style="height: calc(100vh - 16px)"></div>
    </div>
    <div style="width: 50%; height: calc(100vh - 16px);">
      <div ref="canvasMap"></div>
    </div>
  </div>
</template>

<script>
import HereMapMixins from '../HereMapMixins';

export default {
  name: 'HereMapCapture',
  mixins: [HereMapMixins],
  props: {
    apiKey: String,
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
  template: `

  `,
  created() {
    this.platform = this.getPlatform({
      apikey: this.apiKey
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

    this.map = new H.Map(this.$refs.map, defaultLayers.raster.normal.map, mapOptions);
    const events = this.getEvents(this.map);
    const behavior = this.getBehavior(events);
    const ui = this.getUi(this.map, defaultLayers);

    const marker = new H.map.Marker(coordinates);
    this.map.addObject(marker);

    marker.draggable = true;

    this.map.addEventListener(
      'dragstart',
      ev => {
        let target = ev.target;

        if (target instanceof H.map.Marker) {
          behavior.disable();
        }
      },
      false
    );

    this.map.addEventListener(
      'dragend',
      ev => {
        let target = ev.target;

        if (target instanceof H.map.Marker) {
          behavior.enable();
        }
      },
      false
    );

    this.map.addEventListener(
      'drag',
      ev => {
        let target = ev.target;
        let pointer = ev.currentPointer;

        if (target instanceof H.map.Marker) {
          target.setPosition(
            this.map.screenToGeo(pointer.viewportX, pointer.viewportY)
          );
        }
      },
      false
    );

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
  }
};
</script>

<style></style>
