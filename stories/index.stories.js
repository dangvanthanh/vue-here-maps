import { storiesOf } from '@storybook/vue';

import HereMap from './components/HereMap.vue';
import HereMapCapture from './components/HereMapCapture.vue';
import HereMapImage from './components/HereMapImage.vue';
import HereMapMarker from './components/HereMapMarker.vue';
import HereMapTheme from './components/HereMapTheme.vue';
import HereMapPlace from './components/HereMapPlace.vue';
import HereMapRoute from './components/HereMapRoute.vue';
import HereMapWeather from './components/HereMapWeather.vue';

storiesOf('JavaScript', module)
  .add('Maps', () => ({
    components: { HereMap, HereMapTheme },
    data() {
      return {
        theme: 'normal.day'
      };
    },
    template: `
      <div>
        <HereMap 
          appId="${process.env.VUE_HERE_APP_ID}" 
          appCode="${process.env.VUE_HERE_APP_CODE}" 
          :lng="106.660172" 
          :lat="10.762622"
          :zoom="14"
          :theme="theme"/>
        <HereMapTheme @handlerClick="switchTheme" />
      </div>
    `,
    methods: {
      switchTheme(theme) {
        this.theme = theme;
      }
    }
  }))
  .add('Markers', () => ({
    components: { HereMapMarker },
    template: `
      <div>
        <HereMapMarker 
          appId="${process.env.VUE_HERE_APP_ID}" 
          appCode="${process.env.VUE_HERE_APP_CODE}" 
          :lng="106.660172" 
          :lat="10.762622"
          :zoom="14"/>
      </div>
    `
  }));

storiesOf('REST', module)
  .add('Image', () => ({
    components: { HereMapImage },
    template: `
    <div><HereMapImage/></div> 
    `
  }))
  .add('Place', () => ({
    components: { HereMapPlace },
    template: `
      <div>
        <HereMapPlace
          appId="${process.env.VUE_HERE_APP_ID}" 
          appCode="${process.env.VUE_HERE_APP_CODE}" 
          :lng="106.660172" 
          :lat="10.762622"
          :zoom="14"/>
      </div>
    `
  }))
  .add('Route', () => ({
    components: { HereMapRoute },
    template: `
      <div>
        <HereMapRoute
          appId="${process.env.VUE_HERE_APP_ID}" 
          appCode="${process.env.VUE_HERE_APP_CODE}" 
          :lng="106.660172" 
          :lat="10.762622"
          :zoom="14"/>
      </div>
    `
  }))
  .add('Capture', () => ({
    components: { HereMapCapture },
    template: `
      <div>
        <HereMapCapture
          appId="${process.env.VUE_HERE_APP_ID}" 
          appCode="${process.env.VUE_HERE_APP_CODE}" 
          :lng="106.660172" 
          :lat="10.762622"
          :zoom="14"/>
      </div>
    `
  }))
  .add('Weather', () => ({
    components: { HereMapWeather },
    template: `
      <HereMapWeather
        appId="${process.env.VUE_HERE_APP_ID}" 
        appCode="${process.env.VUE_HERE_APP_CODE}" 
        :lng="106.660172" 
        :lat="10.762622"/>
  `
  }));
