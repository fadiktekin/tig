import type { Config } from "tailwindcss";
const colors = require("material-ui-colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        mindaroBackgroundSecondary: "var(--mindaro-background-secondary)",
        creamBackgroundTertiary: "var(--cream-background-tertiary)",
        melonPrimary: "var(--melon-primary)",
        teaRoseSecondary: "var(--tea-rose-secondary)",
        snowTertiary: "var(--snow-tertiary)",
        whiteBackgroundPrimary: "var(--white-background-primary)",
        gunmetal: "var(--gunmetal)",
        ...colors,
      },
    },
  },
  plugins: [],
};

export default config;
