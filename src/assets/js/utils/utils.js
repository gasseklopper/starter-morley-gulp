// // Map number x from range [a, b] to [c, d]
// const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// // Linear interpolation
// const lerp = (a, b, n) => (1 - n) * a + n * b;

// const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

// // Gets the mouse position
// const getMousePos = (e) => {
//     let posx = 0;
//     let posy = 0;
//     if (!e) e = window.event;
//     if (e.pageX || e.pageY) {
//         posx = e.clientX;
//         posy = e.clientY;
//     }
// 	// console.log('clientX', e.clientX)
// 	// console.log('clientY', e.clientY)
// 	// console.log('mouse position x -> ', posx)
// 	// console.log('mouse position y -> ', posy)
//     return { x : posx, y : posy }
// };

// // Generate a random float.
// const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

// export { map, lerp, clamp, getMousePos, getRandomFloat };

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b

const calcWinsize = () => {
	return { width: window.innerWidth, height: window.innerHeight }
}

// Gets the mouse position
const getMousePos = (e) => {
	let posx = 0
	let posy = 0
	if (!e) e = window.event
	if (e.pageX || e.pageY) {
		posx = e.clientX
		posy = e.clientY
	}

	return { x: posx, y: posy }
}

export { map, lerp, calcWinsize, getMousePos }
