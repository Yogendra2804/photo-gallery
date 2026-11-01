/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fi-canvas':  '#F5F3EE',
        'fi-ink':     '#101010',
        'fi-muted':   '#686868',
        'fi-border':  '#242424',
        'fi-blue':    '#2428FF',
        'fi-lime':    '#DFFF00',
        'fi-orange':  '#F15A36',
      },
      fontFamily: {
        sans:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
