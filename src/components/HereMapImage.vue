<template>
  <div>
    <img :src="mapImage"/>
  </div>
</template>

<script>
import { MAP_IMAGE_API } from '../services/HereRest';

export default {
  name: 'HereMapImage',
  data() {
    return {
      mapImage: ''
    };
  },
  mounted() {
    this.mapImage = `${MAP_IMAGE_API}?c=10.762622%2C106.660172&w=400&h=400&z=16&app_id=FymdsOx1OInDIkWIBErG&app_code=i_LyBjYPh3K-ymfzPrpBPw&r=1539096998293`;
  }
};
</script>
