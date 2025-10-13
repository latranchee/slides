/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A2E',
        secondary: '#16213E',
        accent: 'var(--color-accent, #E94560)',
        success: '#00D9A3',
        warning: '#FFB800',
        'neutral-light': '#F7F7F7',
        'neutral-dark': '#2D2D2D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [],
}
