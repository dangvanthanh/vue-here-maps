<template>
  <div>
    <button @click.prevent="changeTheme('normal.day')">Normal - Day</button>
    <button @click.prevent="changeTheme('normal.day.grey')">Normal - Day (Grey)</button>
    <button @click.prevent="changeTheme('normal.day.transit')">Normal - Day (Transit)</button>
    <button @click.prevent="changeTheme('normal.night')">Normal - Night</button>
    <button @click.prevent="changeTheme('normal.night.grey')">Normal - Night (Grey)</button>
    <button @click.prevent="changeTheme('reduced.night')">Reduced - Night</button>
    <button @click.prevent="changeTheme('reduced.day')">Reduced - Day</button>
  </div>
</template>

<script>
export default {
  name: 'HereMapTheme',
  methods: {
    changeTheme(theme) {
      this.$emit('handlerClick', theme);
    }
  }
}
</script>

<style>

</style>
