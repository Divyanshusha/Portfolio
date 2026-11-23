/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#05030A', // Deep black-purple background
        'bg-soft': '#0A0612',
        surface: '#110D1F', // Dark purple card background
        'surface-2': '#191330',
        border: '#2B214C', // Subtle purple border
        text: '#FFFFFF',
        'text-muted': '#A78BFA', // Soft violet text
        'text-dim': '#6D5B98',
        pass: '#EC4899', // Magenta highlight
        'pass-bg': 'rgba(236,72,153,0.1)',
        wip: '#F59E0B',
        'wip-bg': 'rgba(245,158,11,0.1)',
        accent: '#8B5CF6', // Bright violet accent
        'accent-bg': 'rgba(139,92,246,0.15)',
        electric: '#C084FC',
        'electric-bg': 'rgba(192,132,252,0.15)',
        alert: '#EF4444',
        'alert-bg': 'rgba(239,68,68,0.1)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        wrap: '1200px',
      },
      keyframes: {
        blink: { '50%': { opacity: 0 } },
        'grid-pan': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '60px 60px' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 0.8 } },
        starTwinkle: { '0%,100%': { opacity: 0.2 }, '50%': { opacity: 1 } },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        'grid-pan': 'grid-pan 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        twinkle: 'starTwinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};