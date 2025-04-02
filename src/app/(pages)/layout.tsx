"use client";

import { AuthContextProvider } from "@/store/authContext";
import entries from "../../../public/entries.json";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("users", JSON.stringify(entries));
    }
  }, []);

  return (
    <AuthContextProvider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContextProvider>
  );
}
