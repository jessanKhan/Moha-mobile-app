/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["July-Regular"],
        july: ["July-Regular"],
        "july-bold": ["July-Bold"],
        "july-italic": ["July-Italic"],
        "july-bold-italic": ["July-Bold-Italic"],
      },
    },
  },
  plugins: [],
}

