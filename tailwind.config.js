/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

const customColors = {
  white: colors.white,
  black: colors.black,
  transparent: colors.transparent,
  green: "#0D6139",
  "green-bg": "#009951",
  "green-white": "#17AE67",
  "green-black": "#00391E",
  "green-2": "#2C9765",
  "green-3": "#149659",
  gray: "#F6F2F2",
  "gray-bg": "#F0F0F0",
  red: "rgb(201, 56, 56)",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: customColors,
    extend: {
      borderRadius: {
        circle: "50%",
      },
      backgroundColor: ["autofill"],
      padding: {
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        60: "60px",
        70: "70px",
        80: "80px",
        90: "90px",
        100: "100px",
      },
      margin: {
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        60: "60px",
        70: "70px",
        80: "80px",
        90: "90px",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        18: "18px",
        24: "24px",
      },
      fontFamily: {
        chillax: "chillax, Montserrat Alternates",
        montserrat: "Montserrat Alternates",
        comfortaa: "Comfortaa",
      },
      screens: {
        gtbdf: { max: "1200px" },
        btbdf: { max: "1110px" },
        tbdf: { max: "768px" },
        mb: { min: "412px" },
        smb: { min: "320px" },
      },
    },
  },
  plugins: [],
};
