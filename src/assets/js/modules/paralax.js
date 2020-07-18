import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// without this line, PixiPlugin and MotionPathPlugin may get dropped by your bundler (tree shaking)...
// gsap.registerPlugin(PixiPlugin, MotionPathPlugin);

class Paralax {
	constructor() {
		const totalScroll = document.documentElement.scrollHeight - innerHeight

		gsap.to('.parallax-bg', {
			scrollTrigger: {
				scrub: true,
			},
			y: (i, target) => -totalScroll * target.dataset.speed,
			ease: 'none',
		})
		console.info('Paralax initiddafafasdasdlized')
	}
}

export default Paralax
