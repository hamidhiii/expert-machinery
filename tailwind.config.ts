import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Default Tailwind tops out at 2xl (1536px) and the site never designed
      // past lg (1024px), so anything wider just centered the same 1280px
      // column with growing blank margins. 3xl targets 24"+ / large monitors.
      screens: {
        "3xl": "1920px",
      },
      colors: {
        // White base with the navy + orange of the EXPERT MACHINERY logo
        paper: "#FFFFFF",
        surface: "#F5F7FA",
        ink: "#1B2432",
        "ink-800": "#27334A",
        muted: "#5C6A7E",
        line: "#E4E7EC",
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
