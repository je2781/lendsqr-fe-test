"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { dashboardItems } from "./helpers";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export function SideBarList(router: AppRouterInstance, paddingLeft: string) {
  return (
    <>
      {dashboardItems.map((item, i) => {
        if (i === 0) {
          return (
            <li
              key={i}
              className={`flex flex-row gap-x-3 items-center text-primary-500 w-full cursor-pointer ${paddingLeft}`}
            >
              <i
                className={`fa-solid ${
                  Object.values(item)[0]
                } text-primary-500 text-lg w-[8%]`}
              ></i>
              <h4 className="text-[16px]">{Object.keys(item)[0]}</h4>
              <i className="fa-solid fa-angle-down text-primary-500 text-lg"></i>
            </li>
          );
        } else if (i === 1) {
          return (
            <li
              key={i}
              className={`flex flex-row gap-x-3 items-center w-full cursor-pointer ${paddingLeft}`}
            >
              <i
                className={`fa-solid ${
                  Object.values(item)[0]
                } text-primary-500/50 text-lg w-[8%]`}
              ></i>
              <h4 className="text-primary-500/50 w-[92%] text-[16px]">
                {Object.keys(item)[0]}
              </h4>
            </li>
          );
        } else {
          return (
            <li
              key={i}
              className="text-primary-500 w-full flex flex-col gap-y-4"
            >
              <h4 className={`text-[12px] ${paddingLeft}`}>
                {Object.keys(item)[0].toUpperCase()}
              </h4>
              <ul className="w-full flex gap-y-2 flex-col text-[16px]">
                {Object.values(item)[0].map(
                  (nestedItemList: any, nestedIndex: number) => (
                    <li
                      key={nestedIndex}
                      className="w-full cursor-pointer flex flex-row items-center group"
                      onClick={() =>
                        router.push(
                          `/${
                            Object.keys(nestedItemList)[0][0].toLowerCase() +
                            Object.keys(nestedItemList)[0].slice(1)
                          }`
                        )
                      }
                    >
                      <div className="py-2 w-[1.5%] bg-transparent group-hover:bg-secondary-400 h-full"></div>
                      <div className="py-2 flex flex-row gap-x-3 items-center w-[98.5%] bg-transparent group-hover:bg-secondary-400/5 lg:pl-7 pl-[14px]">
                        <i
                          className={`fa-solid ${
                            Object.values(nestedItemList)[0]
                          } text-primary-500/60 text-lg w-[8%] group-hover:text-primary-500`}
                        ></i>
                        <h4 className="text-primary-500/60 w-[92%] group-hover:text-primary-500">
                          {Object.keys(nestedItemList)[0]}
                        </h4>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </li>
          );
        }
      })}
    </>
  );
}

export function HeaderContent(
  ProfilePic: StaticImageData,
  username: string,
  display = "hidden",
  flexProp = "",
  padding = ""
) {
  return (
    <div
      className={`lg:flex ${display} flex-row gap-x-10 lg:w-[20%] w-full items-center lg:mt-3 ${flexProp} ${padding}`}
    >
      <Link
        href="/docs"
        className="lg:inline-block hidden text-sm font-roboto underline-offset-1 underline font-normal"
      >
        Docs
      </Link>
      <Link
        href="/docs"
        className="lg:hidden inline-block text-sm font-roboto underline-offset-1 underline font-normal"
      >
        Docs
      </Link>
      <div className="flex flex-row lg:gap-x-8 gap-x-4 items-center">
        <i className="fa-regular fa-bell text-lg text-primary-500 cursor-pointer"></i>
        <div className="flex flex-row gap-x-3 items-center">
          <span
            className="h-[48px] w-[48px] overflow-hidden cursor-pointer rounded-[50%] ring-2 ring-offset-1 ring-primary-500"
            style={{ backgroundImage: `url(${ProfilePic})` }}
          >
            <Image
              src={ProfilePic}
              width={48}
              height={48}
              alt="prodile pic"
              className="object-cover w-full h-full"
            />
          </span>
          <div className="lg:flex hidden flex-row gap-x-3 items-center cursor-pointer">
            <h5 className="text-sm text-primary-500 font-medium">{username}</h5>
            <i className="fa-solid fa-angle-down text-sm text-primary-500"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export function articleHeaderTemplate(width = 'w-[16%]', title = 'ORGANIZATION') {
  return (
    <>
      <li className={width}>
        <div className="flex flex-row items-center gap-x-2">
          <h5>{title}</h5>
          <i className="fa-solid fa-filter text-primary-500"></i>
        </div>
      </li>
    </>
  );
}
