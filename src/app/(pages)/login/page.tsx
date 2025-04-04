"use client";

import Login from "@/components/auth/Login";
import SplashScreen from "@/components/auth/Splash";
import React from "react";
import entries from '../../../../public/entries.json';

export default function LoginPage() {
  let userDataIsAvailable = false;
  let timeoutId: NodeJS.Timeout | null = null;

  if (typeof window !== "undefined") {
    userDataIsAvailable = !!window.localStorage.getItem("users");
  }

  const [loginScreen, setLoginScreen] = React.useState(
    userDataIsAvailable ? <Login /> : <SplashScreen />
  );

  React.useEffect(() => {
    if(!userDataIsAvailable){
      window.localStorage.setItem("users", JSON.stringify(entries));

      timeoutId = setTimeout(() => {
        setLoginScreen(<Login />);
      }, 2000);
  
    }
    // Cleanup function to clear the timeout if the component unmounts or before the next effect runs
    return () => {
      if(timeoutId){

        clearTimeout(timeoutId);
      }
    };
  }, [userDataIsAvailable]);

  return loginScreen;
}
