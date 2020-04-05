import App from './modules/app.js'
import anime from './libs/anime.js';

const app = new App()
// const anime = require('anime');
anime({
  targets: '.stagger-visualizer',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
});