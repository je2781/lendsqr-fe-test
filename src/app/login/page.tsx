'use client';


import Login from "@/components/auth/Login";
import SplashScreen from "@/components/auth/Splash";
import React from "react";



export default function LoginPage() {
  const [loginScreen, setLoginScreen] = React.useState(<SplashScreen/>);

  setTimeout(() => {
    setLoginScreen(<Login/>);
  }, 2000);

  return loginScreen;
}
