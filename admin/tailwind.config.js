/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // 启用JIT模式: h-[10px]
  prefix: 'jw-',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        // xs: '12px',
        // sm: '14px',
        // base: '16px',
        // lg: '18px',
        // xl: '20px',
        // '2xl': '24px',
        // '3xl': '30px',
        // '4xl': '36px',
        // '5xl': '48px',
        // '6xl': '60px',
        // '7xl': '72px',
      },
      spacing: {
        none: 0,
        // xxs: '2px',
        // xs: '4px',
        // s: '8px',
        // m: '16px',
        // l: '24px',
        // xl: '32px',
        // xxl: '40px',
        // xxxl: '48px',
        // spe: '12px',
      },
      borderRadius: {
        none: 0,
        // s: '2px',
        // m: '4px',
        full: '9999px',
      },
      lineHeight: {
        // 3: '12px',
        // 4: '16px',
        // 5: '20px',
        // 6: '24px',
        // 7: '28px',
        // 8: '32px',
        // 9: '36px',
        // 10: '40px',
      },
    },
  },
  plugins: [],
}
