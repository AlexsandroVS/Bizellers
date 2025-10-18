/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-lima': 'var(--verde-lima)',
        'verde-lima-dark': 'var(--verde-lima-dark)',
        'verde-lima-light': 'var(--verde-lima-light)',
        'verde-lima-muted': 'var(--verde-lima-muted)',
        'negro': 'var(--negro)',
        'blanco': 'var(--blanco)',
        'azul-claro': 'var(--azul-claro)',
        'gray-900': 'var(--gray-900)',
        'gray-800': 'var(--gray-800)',
        'gray-700': 'var(--gray-700)',
        'gray-100': 'var(--gray-100)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
