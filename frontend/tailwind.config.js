/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFBF7', // warm off-white / ivory
        surface: '#F5F2EB', // very light beige
        primary: '#C5A059', // muted cinematic gold
        primaryHover: '#A88540',
        textMain: '#2D2D2D', // deep charcoal
        textMuted: '#6B6B6B',
        card: '#FFFFFF'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(197, 160, 89, 0.2)' },
          '100%': { boxShadow: '0 0 15px rgba(197, 160, 89, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
