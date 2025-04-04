"use client";

import Login from "@/components/auth/Login";
import SplashScreen from "@/components/auth/Splash";
import React from "react";

export default function LoginPage() {
  const userDataIsAvailable = !!window.localStorage.getItem("users");
  const [loginScreen, setLoginScreen] = React.useState(
    userDataIsAvailable ? <Login /> : <SplashScreen />
  );
  let timeoutId: NodeJS.Timeout | null;

  React.useEffect(() => {
    if(!userDataIsAvailable){

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
  }, []);

  return loginScreen;
}
