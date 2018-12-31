import { addDecorator, configure } from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withOptions({
    name: 'Vue Here Maps',
    url: 'https://github.com/dangvanthanh/vue-here-maps'
  })
);

configure(loadStories, module);
