"use client";

import React, { useReducer } from "react";
import useAuth from "@/store/useAuth";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const { authStatus } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!authStatus) {
      router.replace("/login");
    }
  }, [authStatus]);

  // Prevent rendering until authentication is confirmed
  if (!authStatus){
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