/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          deep: '#0B2B3B',
          primary: '#006c8b',
          light: '#1a8aa8',
        },
        cyan: {
          accent: '#2EC3E5',
          soft: '#7ad9ee',
        },
        offwhite: '#F6F7F9',
        slate: {
          muted: '#5B6974',
          soft: '#8a97a3',
        },
        ink: '#0B2B3B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        '2xl': '22px',
        '3xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(11, 43, 59, 0.04), 0 12px 32px -4px rgba(11, 43, 59, 0.08)',
        'card-lg': '0 8px 12px -2px rgba(11, 43, 59, 0.06), 0 24px 56px -8px rgba(11, 43, 59, 0.14)',
        'glow': '0 0 48px rgba(46, 195, 229, 0.28)',
        'soft': '0 2px 8px rgba(11, 43, 59, 0.04)',
        'nav': '0 8px 32px rgba(11, 43, 59, 0.06)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        'mesh': 'radial-gradient(at 20% 20%, rgba(46,195,229,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,108,139,0.20) 0px, transparent 50%), radial-gradient(at 0% 80%, rgba(26,138,168,0.15) 0px, transparent 50%)',
        'mesh-dark': 'radial-gradient(at 20% 20%, rgba(46,195,229,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,108,139,0.25) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(11,43,59,0.4) 0px, transparent 50%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'mesh-drift': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(2%, -2%) scale(1.05)' },
          '66%': { transform: 'translate(-2%, 1%) scale(0.98)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'mesh-drift': 'mesh-drift 18s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
