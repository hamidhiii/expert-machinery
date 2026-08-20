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
        // Warm editorial base with the navy + orange of the EXPERT MACHINERY logo
        cream: "#F4F1EA",
        "cream-200": "#EAE6DC",
        ink: "#161C26",
        "ink-800": "#1F2734",
        muted: "#6E7480",
        line: "#E1DCD1",
        flame: "#F0562A",
        "flame-dark": "#D2431B",
        "flame-soft": "#FDEDE6",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      letterSpacing: {
        display: "-0.03em",
      },
      boxShadow: {
        card: "0 24px 60px -40px rgba(22, 28, 38, 0.55)",
        lift: "0 40px 90px -50px rgba(22, 28, 38, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
