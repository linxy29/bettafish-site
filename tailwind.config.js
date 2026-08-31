/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './en/**/*.html', './*.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1890ff',
          dark: '#0c6fd1',
          soft: '#e9f3ff',
        },
        ink: '#16191f',
        muted: '#5a616c',
        faint: '#8c93a0',
        line: '#e4e8ed',
        surface: '#f5f7fa',
        navy: '#001529',
        footer: '#0d1117',
        ok: {
          DEFAULT: '#389e0d',
          line: '#b7eb8f',
          soft: '#f6ffed',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Noto Sans SC"', 'sans-serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Hiragino Sans GB"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1440px',
      },
      boxShadow: {
        frame: '0 -2px 40px rgba(23, 26, 33, 0.09)',
      },
    },
  },
  plugins: [],
}
