"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const router = useRouter();

  let userDataIsAvailable = false;

  if (typeof window !== "undefined") {
    userDataIsAvailable = !!window.localStorage.getItem("users");
  }

  React.useEffect(() => {
    if (!userDataIsAvailable) {
      router.replace("/login");
    }
  }, [userDataIsAvailable]);

  // Prevent rendering until authentication is confirmed
  if (!userDataIsAvailable){
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin h-8 w-8 border-4 border-secondary-400 border-t-transparent rounded-full"></div>
          {/* Text */}
          <p className="mt-3 text-lg text-primary-400">Redirecting...</p>
        </div>
      </div>
    );
  }
    

  return <Dashboard />;
}