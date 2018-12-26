import { storiesOf } from '@storybook/vue';

import HereMap from './components/HereMap.vue';
import HereMapTheme from './components/HereMapTheme.vue';
import HereMapWeather from './components/HereMapWeather.vue';

import HereMapMarker from './HereMapMarker';
import HereMapImage from './HereMapImage';
import HereMapPlace from './HereMapPlace';
import HereMapRoute from './HereMapRoute';
import HereMapCapture from './HereMapCapture';

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
          appId="FymdsOx1OInDIkWIBErG" 
          appCode="i_LyBjYPh3K-ymfzPrpBPw" 
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
          appId="FymdsOx1OInDIkWIBErG" 
          appCode="i_LyBjYPh3K-ymfzPrpBPw" 
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
          appId="FymdsOx1OInDIkWIBErG" 
          appCode="i_LyBjYPh3K-ymfzPrpBPw" 
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
          appId="FymdsOx1OInDIkWIBErG" 
          appCode="i_LyBjYPh3K-ymfzPrpBPw" 
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
          appId="FymdsOx1OInDIkWIBErG" 
          appCode="i_LyBjYPh3K-ymfzPrpBPw" 
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
        appId="FymdsOx1OInDIkWIBErG" 
        appCode="i_LyBjYPh3K-ymfzPrpBPw" 
        :lng="106.660172" 
        :lat="10.762622"/>
  `
  }));
