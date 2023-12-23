const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./app/components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		colors: {
			black: colors.black,
			white: colors.white,
			transparent: colors.transparent,
			primary: {
				50: '#edeff7',
				100: '#c9cee8',
				200: '#a6aed9',
				300: '#828dc9',
				400: '#5e6dba',
				500: '#4553a1',
				600: '#36417d',
				700: '#262e59',
				800: '#171c36',
				900: '#080912'
			},
			secondary: {
				50: '#e9fbf8',
				100: '#bef3eb',
				200: '#93ecde',
				300: '#93ecde',
				400: '#3cdcc4',
				500: '#23c3ab',
				600: '#1b9885',
				700: '#136c5f',
				800: '#0c4139',
				900: '#041613'
			},
			gray: {
				0: '#fff',
				50: '#f2f2f2',
				100: '#d9d9d9',
				200: '#bfbfbf',
				300: '#a6a6a6',
				400: '#8c8c8c',
				500: '#737373',
				600: '#595959',
				700: '#404040',
				800: '#262626',
				900: '#0d0d0d'
			},
			neutral: {
				50: '#fffae5',
				100: '#fff6cc',
				200: '#fff2b2',
				300: '#ffee99',
				400: '#ffe97f',
				500: '#ffe14c',
				600: '#ffd819'
			},
			danger: {
				50: '#f9dee1',
				100: '#f2b3b9',
				200: '#e87d86',
				300: '#e25a66',
				400: '#df4956',
				500: '#db3140',
				600: '#b6202d'
			},
			success: {
				50: '#ccf6c9',
				100: '#ccf6c9',
				200: '#aaefa5',
				300: '#88e980',
				400: '#66e35c',
				500: '#45dc38',
				600: '#2fc723'
			}
		},
		extend: {
			borderRadius: {
				image: '0.5rem',
				layout: '0.4rem'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			},
			transitionDuration: {
				DEFAULT: '200ms'
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3'
			},
			keyframes: {
				fade: {
					from: { opacity: 0 },
					to: { opacity: 1 }
				},
				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)'
					},
					'50%': {
						opacity: 0.3
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				fade: 'fade .5s ease-in-out',
				scaleIn: 'scaleIn .35s ease-in-out'
			}
		}
	},
	plugins: [
		plugin(function ({ addComponents, theme }) {
			addComponents({
				'.air-block': {
					backgroundColor: theme('colors.gray.950'),
					color: theme('colors.white'),
					boxShadow: theme('boxShadow.lg')
				}
			})
		})
	]
}
