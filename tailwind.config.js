/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
        textSlow: "textSlow 8s ease infinite",
        fadeUp: "fadeUp 1s ease",
        fadeIn: "fadeIn 1s ease",
        drop: "drop 2s ease-in forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            transform: "translateY(50px)",
            opacity: "0",
          },

          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },

          "100%": {
            opacity: "1",
          },
        },

        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        textSlow: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        drop: {
          "0%": { transform: "translateY(0px)", opacity: 1 },
          "100%": { transform: "translateY(2200px)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
