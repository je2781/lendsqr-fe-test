"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/store/useAuth";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const {setAuthStatus} = useAuth();

  useEffect(() => {
    if (user.email.includes("@") && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, setButtonDisabled]);

  async function onLogin() {
    try {
      setIsLoading(true);
      //updated auth status
      setAuthStatus(true);

      toast.success("Login successful!");
      router.push(`/users`);

    } catch (error) {
      const e = error as Error;
      setIsLoading(false);
      return toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center lg:justify-center pt-36 lg:p-0 min-h-screen w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
        className="flex flex-col gap-y-6 bg-transparent lg:w-[447px] w-full lg:items-start items-center"
      >
        <header className="mb-4">
          <h1 className={`text-primary-500 font-bold lg:text-4xl text-3xl lg:text-start text-center`}>
            Welcome&#33;
          </h1>
          <h3
            className={`text-primary-400 font-normal lg:text-lg text-sm mt-3 lg:text-start text-center`}
          >
            Enter details to login.
          </h3>
        </header>
        <input
          className={`lg:w-full max-w-[90%] w-[80%] px-3 py-2 bg-transparent border-2 border-primary-400/15 focus:outline-none focus:border-primary-500 placeholder:font-sans placeholder:text-sm rounded-sm`}
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <div className="flex flex-col lg:w-full max-w-[90%] w-[80%] gap-y-5">
          <section className="focus-within:border-2 focus-within:border-primary-500 w-full pr-4 border-2 py-2 flex flex-row items-center bg-transparent border-primary-400/15 rounded-sm justify-between">
            <input
              className="pl-3 py-1 focus:outline-none placeholder:font-sans placeholder:text-sm h-full bg-transparent"
              id="password"
              type={`${isVisible ? "text" : "password"}`}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <span
              className="cursor-pointer text-secondary-400 font-semibold text-[12px]"
              onClick={() => setIsVisible((prevState) => !prevState)}
            >
              SHOW
            </span>
          </section>
          <section className="flex flex-row justify-start">
            <Link
              href={`/resetpassword`}
              className="btn text-center text-secondary-400 text-sm font-semibold"
            >
              FORGOT PASSWORD?
            </Link>
          </section>
        </div>
        <button
          disabled={buttonDisabled}
          onClick={onLogin}
          type="submit"
          className={`lg:w-full mt-2 max-w-[90%] w-[80%] py-2 font-semibold text-sm text-white rounded-md ${
            buttonDisabled
              ? "bg-secondary-400/70 cursor-not-allowed"
              : "bg-secondary-400 hover:ring-2 ring-secondary-400 cursor-pointer"
          } `}
        >
          {isLoading ? "Processing.." : "LOG IN"}
        </button>
      </form>
    </div>
  );
}
