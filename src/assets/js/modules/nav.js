console.info('Nav initiddafafasdasdlized')


import Headroom from 'headroom.js'
import Macy from 'macy'
import {
	disableBodyScroll,
	enableBodyScroll
} from 'body-scroll-lock'


class Nav {
	constructor() {

		const show = (...elems) => elems.forEach((elem) => elem.classList.add('visible'))
		const hide = (...elems) => elems.forEach((elem) => elem.classList.remove('visible'))

		const bindHeadroom = (elem) => {

			const opaque = elem.classList.contains('header--opaque')

			// Don't activate Headroom when the header should be opaque
			if (opaque === true) return

			const headroom = new Headroom(elem, {
				classes: {
					top: 'header--unscrolled',
					notTop: 'header--scrolled'
				}
			})

			headroom.init()

		}

		const bindMasonry = (elem) => {

			elem.querySelectorAll('.header__masonry').forEach((elem) => {

				new Macy({
					container: elem,
					columns: 2,
					trueOrder: true,
					breakAt: {
						900: 2
					}
				})

			})

		}

		const bindMobileMenu = (elem) => {

			const burger = elem.querySelector('.header__burger')
			const icon = elem.querySelector('.header__icon')
			const mobileMenu = document.querySelector('.mobile_menu')

			let visible = mobileMenu.classList.contains('visible')
			const opaque = elem.classList.contains('header--opaque')

			burger.onclick = () => {

				// Toggle opaque when not already opaque
				if (opaque === false) {
					elem.classList.toggle('header--opaque')
				}

				if (visible === true) {
					enableBodyScroll(mobileMenu)
				} else {
					disableBodyScroll(mobileMenu)
				}

				icon.classList.toggle('active')
				mobileMenu.classList.toggle('visible')

				visible = !visible

			}

		}

		const bindMenu = (elem) => {

			const menu = elem.querySelector('.header__menu')
			const overlay = elem.querySelector('.header__overlay')
			const items = elem.querySelectorAll('.header__item')
			const inners = menu.querySelectorAll(`.header__menu_inner`)

			const showItem = (item, inner) => () => {

				show(menu)
				show(overlay)

				hide(...inners)
				show(inner)

				bindMasonry(inner)

				items.forEach((item) => {
					item.classList.remove('active')
					item.classList.add('inactive')
				})
				item.classList.add('active')

			}

			const hideAll = () => {

				hide(menu)
				hide(overlay)

				items.forEach((item) => {
					item.classList.remove('active')
					item.classList.remove('inactive')
				})

			}

			items.forEach((item) => {

				const id = item.getAttribute('data-header-menu-id')
				const inner = menu.querySelector(`.header__menu_inner[data-header-menu-id='${ id }']`)

				if (inner == null) return item.onmouseenter = hideAll
				else item.onmouseenter = showItem(item, inner)

			})

			elem.onmouseleave = hideAll

		}

		const bindDescriptions = (elem) => {

			elem.querySelectorAll('.header__subitem').forEach((item) => {

				const id = item.getAttribute('data-header-description-id')
				const inner = item.closest('.header__menu_inner')
				const items = inner.querySelectorAll(`.header__subitem`)
				const descriptions = inner.querySelectorAll(`.header__description`)
				const description = inner.querySelector(`.header__description[data-header-description-id='${ id }']`)

				if (description == null) return

				item.onmouseenter = () => {

					items.forEach((inner) => inner.classList.remove('active'))
					item.classList.add('active')

					descriptions.forEach((inner) => inner.classList.remove('visible'))
					description.classList.add('visible')

				}

			})

		}

		document.querySelectorAll('.header').forEach((elem) => {

			bindHeadroom(elem)
			bindMobileMenu(elem)
			bindMenu(elem)
			bindDescriptions(elem)

		})


	}
}

export default Nav