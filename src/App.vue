<template>
  <div id="app">
    <div class="grid">
      <div class="grid__item">
        <h2>Map</h2>
        <HereMap 
          appId="FymdsOx1OInDIkWIBErG" 
          appCode="i_LyBjYPh3K-ymfzPrpBPw" 
          :lng="106.660172" 
          :lat="10.762622"/>
      </div>
      <div class="grid__item">
        <h2>Route</h2>
        <HereMapRoute 
          appId="FymdsOx1OInDIkWIBErG" 
          appCode="i_LyBjYPh3K-ymfzPrpBPw" 
          :lng="106.660172" 
          :lat="10.762622"/>
      </div>
    </div>

  </div>
</template>

<script>
import HereMap from "./components/HereMap.vue";
import HereMapRoute from "./components/HereMapRoute.vue";

export default {
  name: "app",
  components: {
    HereMap,
    HereMapRoute
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.grid {
  width: 850px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 400px;
  grid-gap: 50px;
}
</style>
