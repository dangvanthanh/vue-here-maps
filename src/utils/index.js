export function setMapLanguage(map, platform, defaultLayers, language) {
  let mapTileService = platform.getMapTileService({
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
    { lg: language, ppi: ppi }
  );
  map.setBaseLayer(mapLayer);

  // Display default UI components on the map and change default
  // language to simplified Chinese.
  // Besides supported language codes you can also specify your custom translation
  // using H.ui.i18n.Localization.
  var ui = H.ui.UI.createDefault(map, defaultLayers, 'zh-CN');

  // Remove not needed settings control
  ui.removeControl('mapsettings');

  //
  //  let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
}

export function addDraggableMarker(map, behavior, marker) {
  marker.draggable = true;

  map.addEventListener(
    'dragstart',
    ev => {
      let target = ev.target;

      if (target instanceof H.map.Marker) {
        behavior.disable();
      }
    },
    false
  );

  map.addEventListener(
    'dragend',
    ev => {
      let target = ev.target;

      if (target instanceof H.map.Marker) {
        behavior.enable();
      }
    },
    false
  );

  map.addEventListener(
    'drag',
    ev => {
      let target = ev.target;
      let pointer = ev.currentPointer;

      if (target instanceof H.map.Marker) {
        target.setPosition(
          map.screenToGeo(pointer.viewportX, pointer.viewportY)
        );
      }
    },
    false
  );
}
