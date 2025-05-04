// filepath: c:\Users\sujan\Desktop\softwarefinal\my-react-app\tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/weather-alert-management/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Add other colors from weather-alert-management
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
