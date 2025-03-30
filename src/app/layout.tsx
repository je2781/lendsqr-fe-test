import type { Metadata } from "next";
import "./globals.scss";
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
      </head>
      <body
        className={`antialiased`}
      > 
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
