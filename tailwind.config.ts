import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Focus Labs Media Group — Brand Book color system
        black: "#000000", // Absolute Black — primary background, cinema darkness
        charcoal: "#1C1C1E", // Charcoal — cards, elevated surfaces
        gray: {
          DEFAULT: "#8E8E93", // Neutral Gray — secondary text, captions
          accent: "#888888", // Accent text (italic serif quotes)
        },
        white: "#FFFFFF", // Pure White — primary text, high contrast
        amber: "#FF9500", // Focus Amber — accents, CTAs, highlights ONLY
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        accent: ["var(--font-playfair)", "serif"],
      },
      letterSpacing: {
        widest: ".25em",
      },
      lineHeight: {
        body: "1.5",
      },
      maxWidth: {
        prose: "70ch",
      },
    },
  },
  plugins: [],
};

export default config;
