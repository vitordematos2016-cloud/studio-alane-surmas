/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          950: '#3D070E',
          900: '#540C15',
          850: '#66121D',
          800: '#781824',
          750: '#8A1F2C',
          700: '#9E2737',
          600: '#B83244',
          500: '#D14155',
        },
        nude: {
          50: '#FCF8F5',
          100: '#FBF5F0',
          150: '#F8EFEA',
          200: '#F3E5DD',
          250: '#ECDCCF',
          300: '#E2CEBF',
          400: '#D1B4A0',
        },
        champagne: {
          100: '#FAF6EE',
          200: '#F2E8D3',
          300: '#E5D3B0',
          400: '#D6BB88',
          500: '#C5A059',
          600: '#A6823C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        brand: ['Cinzel', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'glow-velvet': '0 0 70px -5px rgba(120, 24, 36, 0.55)',
        'glow-pill': '0 12px 30px -4px rgba(120, 24, 36, 0.45)',
        'lux-card': '0 20px 45px -15px rgba(84, 12, 21, 0.12)',
        'lux-banner': '0 25px 60px -15px rgba(120, 24, 36, 0.35)',
      }
    },
  },
  plugins: [],
}
