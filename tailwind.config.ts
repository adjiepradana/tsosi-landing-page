import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#9B1B5A",
          plum: "#4B1735",
          rose: "#F5E8EF",
          ivory: "#FCF9F7",
          charcoal: "#29242A",
          gray: "#756D73",
          border: "#E9DDE3",
        },
        primary: {
          DEFAULT: "#9B1B5A",
          foreground: "#FFFFFF",
          50: "#FAF0F4",
          100: "#F5E8EF",
          200: "#E6B5CD",
          300: "#D381AB",
          400: "#BE4E89",
          500: "#9B1B5A",
          600: "#7E1447",
          700: "#600E35",
          800: "#4B1735",
          900: "#320E22",
        },
        background: "#FCF9F7",
        foreground: "#29242A",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#29242A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#29242A",
        },
        muted: {
          DEFAULT: "#F5E8EF",
          foreground: "#756D73",
        },
        accent: {
          DEFAULT: "#F5E8EF",
          foreground: "#9B1B5A",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        border: "#E9DDE3",
        input: "#E9DDE3",
        ring: "#9B1B5A",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(75, 23, 53, 0.05), 0 2px 6px -1px rgba(75, 23, 53, 0.03)",
        card: "0 10px 30px -4px rgba(75, 23, 53, 0.07), 0 4px 10px -2px rgba(75, 23, 53, 0.03)",
        elevated: "0 20px 40px -10px rgba(75, 23, 53, 0.12), 0 8px 16px -4px rgba(75, 23, 53, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
