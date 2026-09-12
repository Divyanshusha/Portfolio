/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0A0E10',
        'bg-soft': '#0E1416',
        surface: '#12191C',
        'surface-2': '#171F23',
        border: '#232C30',
        text: '#EDEDE8',
        'text-muted': '#8FA0A4',
        'text-dim': '#54636A',
        pass: '#5FCB8D',
        'pass-bg': 'rgba(95,203,141,0.1)',
        wip: '#E8A93B',
        'wip-bg': 'rgba(232,169,59,0.1)',
        accent: '#4FE3D6',
        'accent-bg': 'rgba(79,227,214,0.1)',
        electric: '#6E8CFF',
        'electric-bg': 'rgba(110,140,255,0.1)',
        alert: '#E8735B',
        'alert-bg': 'rgba(232,115,91,0.1)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        wrap: '1200px',
      },
      keyframes: {
        blink: { '50%': { opacity: 0 } },
        'grid-pan': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '60px 60px' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        'grid-pan': 'grid-pan 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
