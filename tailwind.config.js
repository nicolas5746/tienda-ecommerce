/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}',],
  theme: {
    extend: {
      animation: {
        'animate-spin': 'spinner 0.5s infinite linear',
        'animate-greet': 'greeting 3s ease infinite'
      },
      keyframes: {
        greeting: {
          'to': { backgroundPosition: '200%' }
        },
        spinner: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      backgroundSize: {
        '200%': '200% auto',
      },
      colors: {
        'azure': '#f0ffff',
        'blood': '#660000',
        'blue-whale': '#342d7e',
        'crimson': '#dc143c',
        'dark-white': '#cbc0c0',
        'ferrari': '#f70d1a',
        'gainsboro': '#dcdcdc',
        'grey': '#5a5a5a',
        'linen': '#faf0e6',
        'medium-blue': '#0000cd',
        'navy': '#000080',
        'neon-red': '#fd1c03',
        'red': '#ff0000',
        'roman-silver': '#838996',
        'royal-blue': '#4169e1',
        'snow': '#fffafa',
        'squid-ink': '#1f2937',
        'steelblue': '#4682b4',
        'tomato-sauce': '#b21807',
        'transparent-black': '#030303d2',
        'transparent-grey': '#4a4a4acc',
        'transparent-dark-grey': '#0f171e80',
        'windows-blue': '#357ec7'
      },
      fontFamily: {
        'bungee-inline': ['"Bungee Inline", sans-serif'],
        'lato': ['"Lato", sans-serif'],
        'roboto': ['"Roboto", sans-serif']
      },
      fontSize: {
        xs: '0.2rem',
        '2xs': '0.3rem',
        '3xs': '0.4rem',
        '4xs': '0.5rem',
        '5xs': '0.6rem',
        sm: '0.7rem',
        '2sm': '0.8rem',
        '3sm': '0.9rem',
        base: '1rem',
        lg: '1.1rem',
        '2lg': '1.2rem',
        '3lg': '1.3rem',
        '4lg': '1.4rem',
        '5lg': '1.5rem',
        '6lg': '1.6rem',
        '7lg': '1.7rem',
        '8lg': '1.8rem',
        '9lg': '1.9rem',
        xl: '2rem',
        '2xl': '2.3rem',
        '3xl': '2.5rem',
        '4xl': '3rem',
        '5xl': '3.5rem',
        '6xl': '4rem',
        '7xl': '4.5rem',
        '8xl': '5rem'
      },
      screens: {
        '2xs': '360px',
        'xs': '480px',
        'sm': '600px',
        '2sm': '650px',
        'md': '768px',
        '2md': '800px',
        '3md': '850px',
        '4md': '992px',
        'lg': '1024px',
        'xl': '1200px',
        '2xl': '1600px'
      }
    }
  },
  plugins: [
    import('@tailwindcss/aspect-ratio'),
    (({ addUtilities }) => {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    })
  ]
}