import localFont from "next/font/local";

export const playfair = localFont({
  src: [
    {
      path: "./fonts/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

export const pixelifySans = localFont({
  src: [
    {
      path: "./fonts/PixelifySans-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/PixelifySans-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./fonts/PixelifySans-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "./fonts/PixelifySans-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-pixelify",
  display: "swap",
});
