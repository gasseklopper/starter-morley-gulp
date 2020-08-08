import { gsap } from 'gsap'
import Paralax from './modules/paralax.js'
// import Layout_slider from './modules/layout_slider.js'
import Paintinks from './modules/paralax_paintings.js'

import Cursor from './modules/cursor3'

// const navigation = gsap.timeline({ paused: true, reversed: true })
// navigation
// 	.to('#navigationWrap', 0.5, { opacity: 1, display: 'block' })
// 	.to('.navbar', 0.3, { opacity: 0 }, '-=0.1')
// 	.to('.close', 0.3, { display: 'block', opacity: 1 }, '-=0.1')
// 	.from('.menu', 0.5, { opacity: 0, y: 30 })
// const menu = document.querySelector('.navbar')
// const close = document.querySelector('.close')

// menu.onclick = () => {
// 	console.log('navbar', menu)
// 	navigation.reversed() ? navigation.play() : navigation.reverse()
// }
// close.onclick = () => {
// 	console.log('navbar close', menu)
// 	navigation.reversed() ? navigation.play() : navigation.reverse()
// }
// $(".navbar, .close").click (function() {
//   navigation.reversed() ? navigation.play() : navigation.reverse();
// })

const cursor = new Cursor(document.querySelector('.cursor'))

;[...document.querySelectorAll('a')].forEach((el) => {
	el.addEventListener('mouseenter', () => cursor.emit('enter'))
	el.addEventListener('mouseleave', () => cursor.emit('leave'))
})

const paralax = new Paralax()
// const layout_slider = new Layout_slider()
const paintinks = new Paintinks()
