import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sand: '#f5f0e8',
        'sand-dark': '#ede6d6',
        ink: '#1a1612',
        'ink-soft': '#4a3f35',
        'ink-muted': '#8a7968',
        teal: '#2d7a6e',
        'teal-light': '#3a9688',
        'teal-pale': '#e8f4f2',
        amber: '#c8752a',
        'amber-pale': '#fdf3e8',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
