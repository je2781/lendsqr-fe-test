"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { dashboardItems } from "@/helpers/helpers";

export default function Sidebar({ pathName }: any) {
  return (
    <nav
      id="sidebar"
      className="fixed left-0 top-[102px] z-30 h-[calc(100vh-100px)] overflow-y-auto py-12 pl-8 w-[283px] hidden
        shadow-md lg:flex flex-col justify-between scrollbar-hidden hover:scrollbar-hover"
    >
        <ul
          className={`inline-flex items-start flex-col w-full font-sans font-normal gap-y-8`}
        >
          {dashboardItems.map((item, i) => {
            if (i === 0) {
              return (
                <li key={i} className="flex flex-row gap-x-3 items-center text-primary-500 w-full">
                  <i
                    className={`fa-solid ${
                      Object.values(item)[0]
                    } text-primary-500 text-lg w-[8%]`}
                  ></i>
                  <h4 className="text-[16px]">{Object.keys(item)[0]}</h4>
                  <i
                    className={`fa-solid fa-angle-down text-primary-500 text-lg`}
                  ></i>
                </li>
              );
            } else if (i === 1) {
              return (
                <li key={i} className="flex flex-row gap-x-3 items-center w-full">
                  <i
                    className={`fa-solid ${
                      Object.values(item)[0]
                    } text-primary-500/60 text-lg w-[8%]`}
                  ></i>
                  <h4 className="text-primary-500/60 w-[92%] text-[16px]">
                    {Object.keys(item)[0]}
                  </h4>
                </li>
              );
            } else {
              return (
                <li key={i} className="text-primary-500 w-full flex flex-col gap-y-4">
                  <h4 className="text-[12px]">{Object.keys(item)[0].toUpperCase()}</h4>
                  <ul className="w-full flex gap-y-4 flex-col  text-[16px]">
                    {Object.values(item)[0].map((nestedItemList: any, nestedIndex: number) => (
                      <li key={nestedIndex} className="flex flex-row gap-x-3 items-center w-full">
                        <i
                          className={`fa-solid ${
                            Object.values(nestedItemList)[0]
                          } text-primary-500/60 text-lg w-[8%]`}
                        ></i>
                        <h4 className="text-primary-500/60 w-[92%]">
                          {Object.keys(nestedItemList)[0]}
                        </h4>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
          })}
        </ul>
    </nav>
  );
}
