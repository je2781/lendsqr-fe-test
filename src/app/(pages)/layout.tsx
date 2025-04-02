"use client";

import { AuthContextProvider } from "@/store/authContext";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = React.useState(false);

  React.useEffect(() => {
    async function getUserData(){
      const res = await fetch(
        `https://run.mocky.io/v3/6f53e129-bcf5-45b2-81c9-d1a0d1f3acc4`,
        {
          cache: "no-store", // Ensure the request isn't cached
        }
      );
    
      const data = await res.json();
    
      localStorage.setItem('users', JSON.stringify(data.data));
    }

    getUserData();
  }, []);

  return (
    <AuthContextProvider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContextProvider>
  );
}