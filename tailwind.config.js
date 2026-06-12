module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#ff7a3d',
          50: '#fff5ec',
          100: '#ffe4c4',
          200: '#ffd4a3',
          300: '#ffc482',
          400: '#ffb461',
          500: '#ff7a3d',
          600: '#ff6b2c',
          700: '#ff5c1b',
          800: '#e64d0a',
          900: '#cc3d00',
        },
        green: {
          DEFAULT: '#22c55e',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
      },
      animation: {
        blob: 'blob 7s infinite',
      },
    },
  },
  plugins: [],
};
