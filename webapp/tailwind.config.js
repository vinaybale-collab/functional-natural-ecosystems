/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
        heading: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        fne: {
          collapsed: '#8B0000',
          critical: '#DC143C',
          stressed: '#FF8C00',
          moderate: '#FFD700',
          good: '#90EE90',
          excellent: '#228B22',
          pristine: '#006400',
        }
      },
      boxShadow: {
        'clean': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'float': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}