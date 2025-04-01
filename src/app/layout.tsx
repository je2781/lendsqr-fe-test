import type { Metadata } from "next";
import "./globals.scss";
import { avenirNextLTPro } from "../helpers/helpers";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Lendsqr",
  description: "Get a loan quick",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="generator" content="SEOmatic"/>
        <meta name="geo.region" content="Nigeria"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </head>
      <body
        className={`antialiased ${avenirNextLTPro.variable}`}
      > 
          <div id='mobile-modal'></div>
          <div id='filter-modal'></div>
          <div id='backdrop-root'></div>
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
