module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './locales/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        datepicker: '#f0f0f0',
        'datepicker-selected': '#3f51b5',
        'datepicker-hover': '#9fa8da',
      },
      textColor: {
        'datepicker-selected': '#ffffff',
      },
    },
  },
  plugins: [],
}
