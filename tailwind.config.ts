import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: "#f0faf0",
          100: "#dcf5dc",
          200: "#bae7ba",
          300: "#8dd68d",
          400: "#5cbe5c",
          500: "#3da03d",
          600: "#2f7f2f",
          700: "#286328",
          800: "#224f22",
          900: "#1d421d",
          950: "#0f260f",
        },
        fin: {
          50: "#f0f7fe",
          100: "#dcebfc",
          200: "#bdd9fa",
          300: "#8cbef5",
          400: "#549def",
          500: "#2a7de8",
          600: "#1e63c9",
          700: "#1c51a3",
          800: "#1b4586",
          900: "#1b3c6f",
          950: "#12264a",
        },
        harvest: {
          300: "#fcd34d",
          500: "#f59e0b",
          700: "#d97706",
        },
        soil: {
          300: "#a78bfa",
          500: "#8b5cf6",
          700: "#7c3aed",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-lexend)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        button: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        "72": "18rem",
        "80": "20rem",
        "96": "24rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [forms, containerQueries, aspectRatio],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "selector",
};

export default config;
