import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'fc-purple': '#7c65c1'
      }
    },
  },
  plugins: [],
};

export default config;
