/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        panel: '#0b1220',
        card: '#111827',
        border: '#243041',
        green: '#2dd4bf',
        red: '#f87171',
        yellow: '#fbbf24',
        blue: '#60a5fa',
        purple: '#a78bfa',
        bluelight: '#1d4ed8',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(96,165,250,0.25), 0 10px 25px rgba(15,23,42,0.5)',
      },
    },
  },
  plugins: [],
};
