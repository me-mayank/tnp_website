import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
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
  			muted: 'var(--muted)',
  			foreground: 'var(--foreground)',
  			background: 'var(--background)',
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)'
  		},
  		boxShadow: {
  			'glow-sm': '0 6px 24px rgba(12,36,71,0.12)',
  			'glow-md': '0 8px 32px rgba(12,36,71,0.18)'
  		},
  		backgroundImage: {
  			'college-pattern': "url('/images/campus.jpg')"
  		},
  		fontFamily: {
  			poppins: [
  				'var(--font-poppins)',
  				'sans-serif'
  			],
  			inter: [
  				'var(--font-inter)',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
}
export default config
