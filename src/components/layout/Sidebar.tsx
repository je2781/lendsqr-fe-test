"use client";

import {SideBarList} from "@/helpers/LayoutContent";
import { useRouter } from "next/navigation";

export default function Sidebar({activeSection}: {activeSection: string}) {
const router = useRouter();
  return (
    <nav
      id="sidebar"
      className="fixed left-0 top-[100px] h-[calc(100vh-100px)] overflow-y-auto pt-12 pb-7 xl:w-[265px] lg:w-[224px] hidden
        shadow-md lg:flex flex-col justify-between scrollbar-hidden hover:scrollbar-hover z-5 bg-white"
    >
      <ul
        className={`inline-flex items-start flex-col w-full font-sans font-normal gap-y-8`}
      >
        {SideBarList(router, 'lg:pl-6 xl:pl-8 pl-8', activeSection)}
      </ul>
    </nav>
  );
}
