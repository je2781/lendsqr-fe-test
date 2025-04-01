"use client";

import { useRouter } from "next/navigation";

export default function UserDetails({ userData }: any) {
  const router = useRouter();
  return (
    <main
      role="main"
      className="lg:pl-[340px] font-sans lg:pr-12 lg:pt-[175px] lg:pb-12 pb-8 pt-[155px] min-h-screen flex flex-col gap-y-10"
    >
      <header className="font-medium text-2xl text-primary-500 font-sans lg:p-0 pl-6 flex flex-row justify-between items-end">
        <div className="inline-flex flex-col items-start gap-y-9">
          <button
            onClick={() => router.replace("/users")}
            className="cursor-pointer inline-flex flex-row gap-x-2 items-center font-normal text-[16px] text-primary-400"
          >
            <i className="fa-solid fa-arrow-left text-primary-400"></i>
            <h4>Back To Users</h4>
          </button>
          <h1>User Details</h1>
        </div>
        <div className="inline-flex flex-row gap-x-3 items-center">
          <button className="px-3 py-1 cursor-pointer font-semibold text-sm rounded-md text-status-blacklisted border border-status-blacklisted">
            BLACKLIST USER
          </button>
          <button className="px-3 py-1 cursor-pointer font-semibold text-sm rounded-md text-secondary-400 border border-secondary-400">
            ACTIVATE USER
          </button>
        </div>
      </header>
      <div className="lg:flex flex-row hidden flex-col lg:gap-x-6 gap-y-6">
        <article className="w-[962px] flex flex-col items-start gap-y-3 p-6 h-[210px] bg-white border border-primary-500/6 rounded-sm shadow-md">
          <div className="flex flex-col justify-between">
            <div className="flex-row flex gap-x-4 items-center">
              <span className="h-[100px] w-[100px] rounded-[50%] bg-cover bg-center bg-primary-500/16 flex justify-center items-center">
                <label htmlFor="pic" className="cursor-pointer">
                  <i className="fa-regular fa-user text-primary-500 text-[40px]"></i>
                </label>
                <input className="hidden" type="file" id='pic'/>
              </span>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
