export default {
  methods: {
    getPlatform(credentials) {
      return new H.service.Platform(credentials);
    },
    getMap(container, layers, settings) {
      return new H.Map(container, layers, settings);
    },
    getEvents(map) {
      return new H.mapevents.MapEvents(map);
    },
    getBehavior(events) {
      return new H.mapevents.Behavior(events);
    },
    getUi(map, layers) {
      return H.ui.UI.createDefault(map, layers);
    }
  }
};
