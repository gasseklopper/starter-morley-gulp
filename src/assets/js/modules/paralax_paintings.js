import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// gsap.registerPlugin(ScrollToPlugin);

console.clear()
console.log('test')

class Paintinks {
	constructor() {
		const select = (e) => document.querySelector(e)
		const selectAll = (e) => document.querySelectorAll(e)

		const stage = select('.stage')
		console.log('test satge', stage)

		console.info('Paintinks initiddafafasdasdlized')
	}
}

export default Paintinks
