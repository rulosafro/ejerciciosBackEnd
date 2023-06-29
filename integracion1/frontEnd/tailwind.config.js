import withMT from "@material-tailwind/react/utils/withMT"

export default withMT({
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(252, 237, 33)',
				secondary: '',
				ramaBlack: '#222',
				ramaWhite: '#ddd',
			},
			fontFamily: {
				sans: ['Raleway', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
			},
			screens: {
				'lg': '930px',
			},
			maxWidth: {
				'screen-3xl': '1500px',
				'screen-4xl': '1700px',
			},
		},
	},
	plugins: [],
})
