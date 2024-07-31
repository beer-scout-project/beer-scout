//update color to fit beer scout theme

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        myDark: {
          primary: '#00CED1',
          'primary-content': '#000000',
          secondary: '#FFD166',
          'secondary-content': '#000000',
          accent: '#252525',
          'accent-content': '#FFFFFF',
          neutral: '#050505',
          'neutral-content': '#FFFFFF',
          'base-100': '#000000',
          'base-200': '#000000',
          'base-300': '#000000',
          'base-content': '#F8F8FF',
          info: '#00A7E6',
          'info-content': '#FFFFFF',
          success: '#6ABE45',
          'success-content': '#FFFFFF',
          warning: '#F97316',
          'warning-content': '#FFFFFF',
          error: '#F54748',
          'error-content': '#FFFFFF',
        },
      },
      {
        myLight: {
          primary: '#00CED1',
          'primary-content': '#000000',
          secondary: '#FFD166',
          'secondary-content': '#000000',
          accent: '#C0C0C0',
          'accent-content': '#000000',
          neutral: '#D3D3D3',
          'neutral-content': '#000000',
          'base-100': '#F8F8FF',
          'base-200': '#F0F0F0',
          'base-300': '#E8E8E8',
          'base-content': '#000000',
          info: '#00A7E6',
          'info-content': '#FFFFFF',
          success: '#6ABE45',
          'success-content': '#FFFFFF',
          warning: '#F97316',
          'warning-content': '#FFFFFF',
          error: '#F54748',
          'error-content': '#FFFFFF',
        },
      },
    ],
  },
};
