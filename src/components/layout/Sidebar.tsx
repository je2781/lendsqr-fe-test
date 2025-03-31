"use client";

import { dashboardItems } from "@/helpers/helpers";
import { useRouter } from "next/navigation";

export default function Sidebar() {
const router = useRouter();
  return (
    <nav
      id="sidebar"
      className="fixed left-0 top-[100px] h-[calc(100vh-100px)] overflow-y-auto py-12 w-[283px] hidden
        shadow-md lg:flex flex-col justify-between scrollbar-hidden hover:scrollbar-hover z-10 bg-white"
    >
      <ul
        className={`inline-flex items-start flex-col w-full font-sans font-normal gap-y-8`}
      >
        {dashboardItems.map((item, i) => {
          if (i === 0) {
            return (
              <li
                key={i}
                className="flex flex-row gap-x-3 items-center text-primary-500 w-full cursor-pointer pl-8"
              >
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
              <li
                key={i}
                className="flex flex-row gap-x-3 items-center w-full cursor-pointer pl-8"
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
                <h4 className="text-[12px] pl-8">
                  {Object.keys(item)[0].toUpperCase()}
                </h4>
                <ul className="w-full flex gap-y-2 flex-col text-[16px]">
                  {Object.values(item)[0].map(
                    (nestedItemList: any, nestedIndex: number) => (
                        <li
                        key={nestedIndex}
                        className="w-full cursor-pointer flex flex-row items-center group"
                        onClick={() => router.push(`/${Object.keys(nestedItemList)[0][0].toLowerCase() + Object.keys(nestedItemList)[0].slice(1)}`)}
                      >
                        <div className="py-2 w-[1.5%] bg-transparent group-hover:bg-secondary-400 h-full"></div>
                        <div className="py-2 flex flex-row gap-x-3 items-center w-[98.5%] bg-transparent group-hover:bg-secondary-400/5 pl-7">
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
      </ul>
    </nav>
  );
}
