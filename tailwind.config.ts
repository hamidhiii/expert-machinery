import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette taken from the EXPERT MACHINERY logo
        ink: "#1B2432",
        "ink-900": "#141C27",
        "ink-700": "#27334A",
        steel: "#5C6A7E",
        flame: "#F0562A",
        "flame-dark": "#D2431B",
        "flame-soft": "#FFF1EA",
        sand: "#F4F6F9",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(20, 28, 39, 0.45)",
        lift: "0 30px 90px -40px rgba(20, 28, 39, 0.65)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
