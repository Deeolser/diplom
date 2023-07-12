/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        whiteout: '#fbfbfb',
        errigal_white: '#f1f1f3',
        dark_errigal_white: '#dddddf',
        head_over_heels: '#615970',
        dusky_grape: '#888293',
        bauhaus: '#404040',
        grape_mist: '#c4c1ca',
      },
    },
    fontFamily: {
      body: ['Inter']
    }
  },
  plugins: [],
}

