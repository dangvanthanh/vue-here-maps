<template>
  <div id="app">
    <HereMap/>
  </div>
</template>

<script>
import HereMap from './components/HereMap.vue'

export default {
  name: 'app',
  components: {
    HereMap
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
