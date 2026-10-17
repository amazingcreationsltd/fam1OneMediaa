/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: '#F4F3EF',
        ink: '#0D0D0D',
        obsidian: '#0A0A0A',
        saffron: '#FACC15',
        signal: '#10B981',
        primary: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
        surface: 'rgb(var(--bg-surface-rgb) / <alpha-value>)',
        'surface-subtle': 'rgb(var(--bg-surface-subtle-rgb) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--bg-surface-elevated-rgb) / <alpha-value>)',
        accent: '#FACC15',
        'accent-btn': '#FACC15',
        'accent-hover': '#eab308',
        'accent-ink': '#0D0D0D',
        muted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Geist', 'system-ui', 'sans-serif'],
        tech: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Satoshi', 'Geist', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
};
