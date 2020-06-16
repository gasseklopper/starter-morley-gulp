import App from './modules/app.js'
import Nav from './modules/nav.js'
import Paralax from './modules/paralax.js'
// import barba from '@barba/core';
// import { gsap } from "gsap";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, MorphSVGPlugin);
// barba.init({
//         transitions: [{
//           name: 'opacity-transition',
//           leave(data) {
//             return gsap.to(data.current.container, {
//               opacity: 0
//             });
//           },
//           enter(data) {
//             return gsap.from(data.next.container, {
//               opacity: 0
//             });
//           }
//         }]
//       });

const app = new App()
const nav = new Nav()
const paralax = new Paralax()