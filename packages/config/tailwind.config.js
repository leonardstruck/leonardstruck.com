/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: (theme) => {
        return {
          //...theme('screens'),
          sm: "100%",
          md: "100%",
          lg: "1024px",
        }
      }
    },
    extend: {
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
      },
      borderRadius: {
        "4xl": "2rem",
      }
    },
  },
  plugins: [
    require("tailwind-plugin-gradient-mask"),
    require('@tailwindcss/typography'),
  ],
}
