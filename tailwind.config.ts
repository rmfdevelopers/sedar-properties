import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A3080",
        secondary: "#F8F8F6",
        accent: "#F07020",
        navy: {
          900: "#0D1945",
          800: "#1A3080",
          700: "#2442AD",
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;