/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        mist: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F5F5F7',
          300: '#E6E6EB',
        },
        ink: {
          600: '#55525C',
          700: '#2F2C35',
          800: '#1D1B22',
          900: '#121117',
          950: '#0B0A0E',
        },
        accent: {
          200: '#F7DCE4',
          300: '#F2B6C8',
          400: '#E07A98',
          500: '#B42D57',
          600: '#8E1E42',
        },
        oxblood: {
          500: '#A3264E',
          600: '#8E1E42',
          700: '#6A1531',
        },
        whatsapp: {
          DEFAULT: '#1F8F55',
          hover: '#187346',
        },
      },
      fontFamily: {
        heading: ['Merienda', 'cursive', 'serif'],
        merienda: ['Merienda', 'cursive', 'serif'],
        serif: ['Merienda', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
