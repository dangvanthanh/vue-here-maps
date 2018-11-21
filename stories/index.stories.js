import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MyButton from './MyButton';
import Welcome from './Welcome';
import HereMap from './HereMap';
import HereMapMarker from './HereMapMarker';
import HereMapImage from './HereMapImage';
import HereMapPlace from './HereMapPlace';
// storiesOf('Welcome', module).add('to Storybook', () => ({
//   components: { Welcome },
//   template: '<welcome :showApp="action" />',
//   methods: { action: linkTo('Button') }
// }));

// storiesOf('Button', module)
//   .add('with text', () => ({
//     components: { MyButton },
//     template: '<my-button @click="action">Hello Button</my-button>',
//     methods: { action: action('clicked') }
//   }))
//   .add('with JSX', () => ({
//     components: { MyButton },
//     // eslint-disable-next-line no-unused-vars
//     render(h) {
//       return <my-button onClick={this.action}>With JSX</my-button>;
//     },
//     methods: { action: linkTo('clicked') }
//   }))
//   .add('with some emoji', () => ({
//     components: { MyButton },
//     template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
//     methods: { action: action('clicked') }
//   }));

storiesOf('JavaScript', module)
  .add('Maps', () => ({
    components: { HereMap },
    template: `
      <div>
        <HereMap 
          appId="FymdsOx1OInDIkWIBErG" 
          appCode="i_LyBjYPh3K-ymfzPrpBPw" 
          :lng="106.660172" 
          :lat="10.762622"
          :zoom="14"/>
      </div>
    `
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
    template: `
      <div>Route</div>
    `
  }))
  .add('Capture', () => ({
    template: `
      <div>Capture</div>
    `
  }))
  .add('Weather', () => ({
    template: `
    <div>Weather</div>
  `
  }));
