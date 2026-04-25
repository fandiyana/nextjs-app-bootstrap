import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f766e",
          dark: "#0b5e58",
          light: "#14b8a6",
        },
      },
    },
  },
  plugins: [],
};

export default config;
