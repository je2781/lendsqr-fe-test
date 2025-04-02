'use client';


import Login from "@/components/auth/Login";
import SplashScreen from "@/components/auth/Splash";
import React from "react";



export default function LoginPage() {
  const [loginScreen, setLoginScreen] = React.useState(<SplashScreen/>);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoginScreen(<Login />);
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts or before the next effect runs
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return loginScreen;
}
