import tailwind from "tailwindcss";
import { type Config } from "tailwindcss/config";

export default tailwind({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mjs}",
    "./app/**/*.{js,ts,jsx,tsx,mjs}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["ui-serif", "Georgia", "serif"],
        display: ["DM Sans", "sans-serif"],
      },
      colors: {
        beige: "#F5F0E9",
        brown: "#6B4B3A",
        gold: "#D4A853",
        green: "#7A9A6E",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config);