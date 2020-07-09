// import App from './modules/app.js'
// import Nav from './modules/nav.js'
import Paralax from './modules/paralax.js'
import Paintinks from './modules/paralax_paintings.js'
import barba from '@barba/core';
import { gsap } from "gsap";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, MorphSVGPlugin);
var navigation = gsap.timeline({paused:true, reversed:true});
navigation.to("#navigationWrap", 0.5, {opacity: 1, display: 'block'})
          .to(".navbar", 0.3, {opacity: 0}, "-=0.1")
          .to(".close", 0.3, {display: "block", opacity: 1}, "-=0.1")
          .from(".menu", 0.5, {opacity: 0, y: 30})
var menu = document.querySelector('.navbar')
var close = document.querySelector('.close')

menu.onclick  = () => {
console.log('navbar', menu)
navigation.reversed() ? navigation.play() : navigation.reverse();
}
close.onclick  = () => {
console.log('navbar close', menu)
navigation.reversed() ? navigation.play() : navigation.reverse();
}
// $(".navbar, .close").click (function() {
//   navigation.reversed() ? navigation.play() : navigation.reverse();
// })
barba.init({
        transitions: [{
          name: 'opacity-transition',
          leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0
            });
          }
        }]
      });

// const app = new App()
// const nav = new Nav()
const paralax = new Paralax()
const paintinks = new Paintinks()