import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ramPrimary: {
          100: '#fefbd3',
          200: '#fef8a6',
          300: '#fdf47a',
          400: '#fdf14d',
          500: '#fced21',
          600: '#cabe1a',
          700: '#978e14',
          800: '#655f0d',
          900: '#322f07'
        },
        ramSecondary: {
          100: '#dfe3e5',
          200: '#bfc7cc',
          300: '#9eacb2',
          400: '#7e9099',
          500: '#5e747f',
          600: '#4b5d66',
          700: '#38464c',
          800: '#262e33',
          900: '#131719'
        },
        ramaBlack: '#0B090A',
        ramaWhite: '#ddd'
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      screens: {
        lg: '930px'
      },
      maxWidth: {
        'screen-3xl': '1500px',
        'screen-4xl': '1700px'
      }
    }
  },
  plugins: []
})
