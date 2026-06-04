/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // Emerald 500
          light: '#d1fae5',   // Emerald 100
          dark: '#047857',    // Emerald 700
        },
        secondary: {
          DEFAULT: '#06b6d4', // Cyan 500
          light: '#cffafe',   // Cyan 100
          dark: '#0e7490',    // Cyan 700
        },
        dark: '#0f172a',      // Slate 900
        light: '#f8fafc',     // Slate 50
        accent: '#f59e0b',    // Amber 500
        danger: '#ef4444',    // Red 500
        themeDatak: '#1e293b', // matches the dashboard naming
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      spacing: {
        '400': '400px',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(16, 185, 129, 0.1)',
        'premium-hover': '0 20px 40px -15px rgba(16, 185, 129, 0.2)',
        'accent-premium': '0 10px 30px -10px rgba(6, 182, 212, 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#10b981",
          "secondary": "#06b6d4",
          "accent": "#f59e0b",
          "neutral": "#171717",
          "base-100": "#f8fafc",
          "base-200": "#f1f5f9",
          "base-300": "#e2e8f0",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
        dark: {
          "primary": "#10b981",
          "secondary": "#06b6d4",
          "accent": "#f59e0b",
          "neutral": "#f3f4f6",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      }
    ],
  },
}