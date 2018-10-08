<template>
  <div class="here-map">
    <div ref="map" data-here-map></div>
  </div>
</template>

<script>
export default {
  name: 'HereMapRoute',
  props: {
    appId: String,
    appCode: String,
    lng: Number,
    lat: Number
  },
  created() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
  },
  mounted() {
    const defaultLayers = this.platform.createDefaultLayers();
    const coordinates = {
      lng: this.lng,
      lat: this.lat
    };

    const mapOptions = {
      zoom: 18,
      center: coordinates
    };

    const map = new H.Map(this.$refs.map, defaultLayers.normal.map, mapOptions);

    const routingParameters = {
      // The routing mode:
      mode: 'fastest;bicycle',
      // The start point of the route:
      waypoint0: 'geo!10.762622,106.660172103',
      // The end point of the route:
      waypoint1: 'geo!10.7846,106.660172105',
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      representation: 'display'
    };

    const onResult = function(result) {
      let route, routeShape, startPoint, endPoint, linestring;

      if (result.response.route) {
        // Pick the first route from the response:
        route = result.response.route[0];
        // Pick the route's shape:
        routeShape = route.shape;

        // Create a linestring to use as a point source for the route line
        linestring = new H.geo.LineString();

        // Push all the points in the shape into the linestring:
        routeShape.forEach(function(point) {
          let parts = point.split(',');
          linestring.pushLatLngAlt(parts[0], parts[1]);
        });

        // Retrieve the mapped positions of the requested waypoints:
        startPoint = route.waypoint[0].mappedPosition;
        endPoint = route.waypoint[1].mappedPosition;

        // Create a polyline to display the route:
        let routeLine = new H.map.Polyline(linestring, {
          style: { lineWidth: 10 },
          arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
        });

        // Create a marker for the start point:
        let startMarker = new H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude
        });

        // Create a marker for the end point:
        let endMarker = new H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude
        });

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        map.setViewBounds(routeLine.getBounds());
      }
    };

    const onError = error => {
      alert(error);
    };

    // Get an instance of the routing service:
    var router = this.platform.getRoutingService();

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult, onError);
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
