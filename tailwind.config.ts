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
      typography: ({ theme }: { theme: (path: string) => unknown }) => ({
        invert: {
          css: {
            "--tw-prose-body": "rgba(255,255,255,0.8)",
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": "rgba(255,255,255,0.8)",
            "--tw-prose-links": theme("colors.amber"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.amber"),
            "--tw-prose-bullets": theme("colors.amber"),
            "--tw-prose-hr": "rgba(255,255,255,0.1)",
            "--tw-prose-quotes": theme("colors.gray.accent"),
            "--tw-prose-quote-borders": theme("colors.amber"),
            "--tw-prose-captions": theme("colors.gray.DEFAULT"),
            "--tw-prose-code": theme("colors.white"),
            "--tw-prose-pre-code": theme("colors.white"),
            "--tw-prose-pre-bg": theme("colors.charcoal"),
            "--tw-prose-th-borders": "rgba(255,255,255,0.2)",
            "--tw-prose-td-borders": "rgba(255,255,255,0.1)",
            maxWidth: "none",
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              fontWeight: "500",
            },
            "h2, h3, h4": {
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: "300",
              textTransform: "uppercase",
              letterSpacing: ".08em",
            },
            strong: {
              fontWeight: "600",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
