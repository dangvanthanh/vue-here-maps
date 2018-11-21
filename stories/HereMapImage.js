export default {
  name: 'HereMapImage',
  data() {
    return {
      mapImage: ''
    };
  },
  template: `
      <div>
        <img :src="mapImage"/>
      </div>
    `,

  created() {
    this.mapImage = `https://image.maps.api.here.com/mia/1.6/mapview?ml=vie&c=10.762622%2C106.660172&w=400&h=400&z=16&app_id=FymdsOx1OInDIkWIBErG&app_code=i_LyBjYPh3K-ymfzPrpBPw&r=1539096998293`;
  }
};
