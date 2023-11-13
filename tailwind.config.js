/** @type {import('tailwindcss').Config} */
export default {
	content: ['*.html'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['sunset', 'pastel'],
	},
}
