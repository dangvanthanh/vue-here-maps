<template>
  <div id="app">
    <HereMap 
      appId="FymdsOx1OInDIkWIBErG" 
      appCode="i_LyBjYPh3K-ymfzPrpBPw" 
      :lng="106.660172" 
      :lat="10.762622"/>
  </div>
</template>

<script>
import HereMap from "./components/HereMap.vue";

export default {
  name: "app",
  components: {
    HereMap
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
</style>
