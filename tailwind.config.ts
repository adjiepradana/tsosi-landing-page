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
          vibrant: "#B8125C",
          magenta: "#FF2A85",
          plum: "#1E0616",
          deep: "#2D0A22",
          rose: "#FCE7F1",
          ivory: "#FFFFFF",
          charcoal: "#110D13",
          gray: "#4B444D",
          border: "#E5D5DF",
          borderDark: "#3D1A30",
        },
        primary: {
          DEFAULT: "#9B1B5A",
          foreground: "#FFFFFF",
          50: "#FFF1F6",
          100: "#FCE7F1",
          200: "#FBCFE4",
          300: "#F69EC7",
          400: "#EE5B9F",
          500: "#9B1B5A",
          600: "#B8125C",
          700: "#7E1447",
          800: "#4B1735",
          900: "#1E0616",
        },
        background: "#FFFFFF",
        foreground: "#110D13",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#110D13",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#110D13",
        },
        muted: {
          DEFAULT: "#F8F1F5",
          foreground: "#5E5660",
        },
        accent: {
          DEFAULT: "#FFF0F6",
          foreground: "#B8125C",
        },
        destructive: {
          DEFAULT: "#E11D48",
          foreground: "#FFFFFF",
        },
        border: "#E5D5DF",
        input: "#E5D5DF",
        ring: "#B8125C",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        lg: "0.875rem",
        md: "0.625rem",
        sm: "0.375rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(155, 27, 90, 0.08), 0 2px 6px -1px rgba(30, 6, 22, 0.04)",
        card: "0 10px 30px -4px rgba(155, 27, 90, 0.12), 0 4px 10px -2px rgba(30, 6, 22, 0.06)",
        elevated: "0 20px 40px -10px rgba(184, 18, 92, 0.22), 0 8px 16px -4px rgba(30, 6, 22, 0.1)",
        bold: "0 15px 35px -5px rgba(184, 18, 92, 0.3), 0 5px 15px rgba(0, 0, 0, 0.07)",
        glow: "0 0 35px rgba(255, 42, 133, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
