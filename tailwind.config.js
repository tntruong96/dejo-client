module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
      extend: {}
  },
  variants: {
      extend: {}
  },
  plugins: [require('@tailwindcss/forms')],
  colors: {
      primary: '#005c32',
      secondary: '#f5e400'
  },
  screens: {
      xs: { max: '575px' },

      sm: { min: '576px', max: '767px' },

      md: { min: '768px', max: '991px' },

      lg: { min: '992px', max: '1199px' },

      xl: { min: '1200px' }
  }
}
