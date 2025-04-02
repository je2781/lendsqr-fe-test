'use client';

import Logo from "../../logo/Logo";
import SearchBar from "./Search";
import ProfilePic from "../../../../public/profile.png";
import React from "react";
import { MobileModal } from "../Modal";
import { useRouter } from "next/navigation";
import {HeaderContent, SideBarList} from "@/helpers/LayoutContent";
import useWindowWidth from "@/helpers/getWindowWidth";

export default function Header({ username, activeSection }: { username: string, activeSection: string }) {
  const [isMobileModalOpen, setIsMobileModalOpen] = React.useState(false);
  const router = useRouter();
  const windowWidth = useWindowWidth();

  let timerId: NodeJS.Timeout | null  = null;

  //cleaning up asynchronous callback timers
  React.useEffect(() => {
    return () => {
      if(timerId){
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  React.useEffect(() => {
    const mobileNav = document.querySelector('#mobile-nav') as HTMLElement;
    if (isMobileModalOpen && mobileNav) {
      mobileNav.classList.add('forward');
      mobileNav.classList.remove('backward');
    }
    
  }, [isMobileModalOpen]);

  const showModalHandler = () => {
    setIsMobileModalOpen(true);
  };

  const hideModalHandler = () => {
    const mobileNav = document.querySelector('#mobile-nav') as HTMLElement;
    if (mobileNav) {
      mobileNav.classList.remove('forward');
      mobileNav.classList.add('backward');
      timerId = setTimeout(() => {
        setIsMobileModalOpen(false);
      }, 300); 
    } else {
      setIsMobileModalOpen(false);
    }
  }

  React.useEffect(() => {
    if(windowWidth > 768){
      setIsMobileModalOpen(false);
    }else{
      setIsMobileModalOpen(false);
    }
    
  }, [setIsMobileModalOpen, windowWidth]);

  return (
    <nav className="xl:pl-0 pl-[5%] pr-[6%] xl:pr-[0.25%] py-[0.125%] flex flex-row items-center shadow-md justify-between w-full fixed h-[100px] top-0 left-0 z-20 bg-white">
      <div className="flex flex-row gap-x-24 items-center xl:w-[54%] w-full justify-between">
        <Logo reducer={1.3} />
        <SearchBar display='hidden'/>
        <span className="xl:hidden mt-3 cursor-pointer" onClick={showModalHandler} id='toggle-button'>
          <i className="fa-solid fa-bars text-primary-500 text-2xl"></i>
        </span>
      </div>
      {HeaderContent(ProfilePic, username)}
      {isMobileModalOpen && <MobileModal onClose={hideModalHandler}>
        <>
          {HeaderContent(ProfilePic, username, 'flex', 'justify-between', 'px-4')}
          <SearchBar display="flex"/>
          <ul className="inline-flex items-start flex-col w-full font-sans font-normal gap-y-8">
          {SideBarList(router, 'pl-[21px]', activeSection)}     
          </ul>
        </>
    </MobileModal>}
    </nav>
  );
}
