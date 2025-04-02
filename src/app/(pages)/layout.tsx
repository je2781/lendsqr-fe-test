"use client";

import { AuthContextProvider } from "@/store/authContext";
import React from "react";

export default function RootLayout({
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