import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin.js'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin.js'

// console.log('gasap', gsap)
// console.log('PixiPlugin', PixiPlugin)
// console.log('MotionPathPlugin', MotionPathPlugin)//
import anime from 'animejs/lib/anime.es.js'
// without this line, PixiPlugin and MotionPathPlugin may get dropped by your bundler (tree shaking)...
gsap.registerPlugin(PixiPlugin, MotionPathPlugin)

class App {
	constructor() {
		console.info('App initiddafafasdasdlized')
	}
}

export default App
