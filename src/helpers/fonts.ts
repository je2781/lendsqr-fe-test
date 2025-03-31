import localFont from "next/font/local";

export const avenirNextLTPro = localFont({
  src: [
    {
      path: "../../public/fonts/AvenirNext-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNext-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-It.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-avenir-next",
  display: "swap",
});
