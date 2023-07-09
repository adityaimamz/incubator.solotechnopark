/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('../../src/images/bg-hero-image.webp')",
        hero: "url('/bg-hero-image.webp')",
        patern:
          "url('/patern-top.svg'), url('/patern-bottom.svg'), linear-gradient(to bottom right, #0D3585, #2E62CC)",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
        5: "5px",
      },
      colors: {
        "primary-100": "#2E62CC",
        "primary-200": "#EAEFFA",
        "primary-300": "#0D3585",
        "secondary-100": "#5E5E5E",
        "secondary-200": "#FFAA53",
        "danger-100": "#FE6F6F",
        "warning-100": "#FECA47",
        "success-100": "#39B590",
        dark: "#363636",
      },
      animation: {
        fadeInBottom: "fadeInBottom 0.5s ease-out",
      },
      keyframes: {
        fadeInBottom: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
