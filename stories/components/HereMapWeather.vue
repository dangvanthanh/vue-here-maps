<template>
  <div>
    <h3 v-text="state"></h3>
    <div class="forecasts">
      <div v-for="forecast in weather" :key="forecast.dayOfWeek">
        <img :src="forecast.iconLink" />
        <div>{{ forecast.highTemperature }}<sup>C</sup>/{{ forecast.highTemperature | fahrenheit }}<sup>F</sup></div>
        <div>{{ format(parseISO(forecast.utcTime), 'MMM dd, yyyy') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { format, parseISO } from 'date-fns'

export default {
  name: 'HereMapWeather',
  props: {
    apiKey: String,
    lng: Number,
    lat: Number,
  },
  data() {
    return {
      state: '',
      weather: [],
      format,
      parseISO,
    }
  },
  filters: {
    fahrenheit: function (value) {
      return (value * (9 / 5) + 32).toFixed(2)
    },
  },
  mounted() {
    axios
      .get(
        `https://weather.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=${this.lat}&longitude=${this.lng}&app_key=${this.apiKey}`,
      )
      .then((res) => {
        if (res.data) {
          this.state = res.data.dailyForecasts.forecastLocation.state
          this.weather = res.data.dailyForecasts.forecastLocation.forecast
        }
      })
  },
}
</script>

<style scoped>
.forecasts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
}
</style>
