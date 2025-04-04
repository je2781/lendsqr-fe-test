"use client";

import { AuthContextProvider } from "@/store/authContext";
import React from "react";

export default function PagesRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = React.useState(false);

  return (
    <AuthContextProvider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContextProvider>
  );
}
