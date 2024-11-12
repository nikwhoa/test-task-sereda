import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: "var(--font-lexend)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-bg": "var(--main-bg)",
        "main-text": "var(--main-text)",
        "main-red": "var(--main-red)",
        "main-green": "var(--main-green)",
        "main-yellow": "var(--main-yellow)",
        "main-blue": "var(--main-blue)",
        "main-gray": "var(--main-gray)",
        "second-text": "var(--second-text)",
        "second-bg": "var(--second-bg)",
        'scrollbar-track': '#2A2A2A',
        'scrollbar-thumb': '#797979',
      },
    },
  },
  plugins: [],
} satisfies Config;
