/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: '#CF0A0A', 
        secondary: '#000000', // Black
        accent: '#f40006', 
        background: '#c10005', // Light Gray
        textPrimary: '#a50000', // Almost Black
        textSecondary: '#fff', // White
      },
      fontFamily: {
        // Custom font 'Silene'
        french: ['IM+Fell+French+Canon', 'sans-serif'],
        augustus: ['Augustus', 'serif'],
        sans: ['sans-serif'],
      },
      video: {
        'background': 'url("/video/studio.mp4")',
      },
  },
  plugins: [],
}
}
