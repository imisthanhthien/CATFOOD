/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wave: 'wave 2s infinite',  // Gợn sóng cho Messenger
        rotateSmooth: 'rotateSmooth 2s ease-in-out infinite',  // Xoay qua lại cho Zalo
      },
      keyframes: {
        wave: {
          '0%': { 
            transform: 'scale(1)', 
            boxShadow: '0 0 0 rgba(0, 0, 0, 0.1)' 
          },
          '50%': { 
            transform: 'scale(1.2)',  
            boxShadow: '0 0 30px rgba(255, 0, 255, 0.6)'  
          },
          '100%': { 
            transform: 'scale(1)', 
            boxShadow: '0 0 0 rgba(0, 0, 0, 0.1)'  
          },
        },
        rotateSmooth: {
          '0%': { transform: 'rotate(5deg)' },  // Xoay sang phải 30 độ
          '50%': { transform: 'rotate(-5deg)' },  // Xoay sang trái 30 độ
          '100%': { transform: 'rotate(5deg)' },  // Xoay sang phải 30 độ
        },
      },
    },
  },
  plugins: [],
}
