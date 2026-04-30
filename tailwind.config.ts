import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-900': '#071733',
        'brand-800': '#0A2647',
        'brand-700': '#144272',
        'brand-accent': '#2C74B3',
        'muted': '#6B7280',
      },
      boxShadow: {
        'glow-sm': '0 6px 24px rgba(12,36,71,0.12)',
        'glow-md': '0 8px 32px rgba(12,36,71,0.18)',
      },
      backgroundImage: {
        'college-pattern': "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
