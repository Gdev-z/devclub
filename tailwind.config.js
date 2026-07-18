/** @type {import('tailwindcss').Config} */

/* ============================================================
   SELETOR DE FONTE DO TÍTULO DA HERO
   Descomente APENAS a linha da fonte desejada e comente as outras.
   A fonte escolhida vira a classe `font-jakarta` (usada no <h1> da Hero).
   Obs: a fonte precisa estar carregada no index.html (todas já estão).
   ============================================================ */
const HERO_FONT = '"Oxanium"'; // ← ativa agora
// const HERO_FONT = '"Exo 2"';
// const HERO_FONT = '"Plus Jakarta Sans"';
// const HERO_FONT = '"Sora"';
// const HERO_FONT = '"Clash Display"';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        devgreen: '#39D353',
        devpurple: '#8532F2',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        jakarta: [HERO_FONT, 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(57,211,83,0.45), 0 0 40px rgba(57,211,83,0.25)',
        'neon-purple': '0 0 24px rgba(133,50,242,0.35)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      })
    },
  ],
}
