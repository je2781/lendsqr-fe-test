import ReactDOM from "react-dom";
import React from "react";
import { BackDropProps, FilterModalOverlayProps, FilterModalProps, MobileModalOverlayProps, MobileModalProps, OptionsModalOverlayProps, OptionsModalProps } from "@/interfaces";

const BackDrop: React.FC<BackDropProps> = (props) => {
  return <div className='w-full h-[100vh] top-0 left-0 fixed bg-black/70 z-30' onClick={props.onClick}></div>;
};


const MobileModalOverlay: React.FC<MobileModalOverlayProps> = (props) => {
  return (
    <main
      id='mobile-nav'
      aria-orientation="vertical"
      aria-labelledby='toggle-button'
      className={`${props.classes ? props.classes : 'bg-white pt-[70px]'} z-[45] w-4/5 flex-col pb-12 gap-y-12 h-screen items-center flex fixed top-0 left-0 overflow-y-auto scrollbar-hidden hover:scrollbar-hover`}
    >
      {props.children}
      <i className="fa-solid fa-xmark text-xl absolute right-4 top-5 cursor-pointer text-gray-500" onClick={props.onClick}></i>
    </main>
  );
};


export const MobileModal: React.FC<MobileModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <MobileModalOverlay onClick={props.onClose} classes={props.classes}>
          {props.children}
        </MobileModalOverlay>,
        document.getElementById("mobile-modal")!
      )}
    </>
  );
};


const FilterModalOverlay: React.FC<FilterModalOverlayProps> = (props) => {
  return (
    <main
      id='filter-settings'
      aria-orientation="vertical"
      aria-labelledby='toggle-settings'
      className="z-20 bg-white w-[245px] xl:left-[37.5rem] left-[18rem] flex-col shadow-xl flex px-6 py-8 absolute xl:top-[29rem] top-[37rem] opacity-0 translate-x-[-100%] h-fit rounded-md"
    >
      {props.children}
      <i className="fa-solid fa-xmark text-xl absolute right-4 top-5 cursor-pointer text-gray-500" onClick={props.onClick}></i>
    </main>
  );
};

export const FilterModal: React.FC<FilterModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <FilterModalOverlay onClick={props.onClose}>
          {props.children}
        </FilterModalOverlay>,
        document.getElementById("filter-modal")!
      )}
    </>
  );
};

const OptionsModalOverlay: React.FC<OptionsModalOverlayProps> = (props) => {
  return (
    <main
      id='user-options'
      aria-orientation="vertical"
      aria-labelledby='toggle-options'
      className={`z-20 bg-white flex-col flex gap-y-5 shadow-xl flex px-6 pt-10 pb-6 absolute xl:top-[40rem] top-[60rem] xl:right-[207px] right-[2rem] ${props.styleClasses} opacity-0 translate-x-[100%] h-fit rounded-md`}
    >
      {props.children}
      <i className="fa-solid fa-xmark text-xl absolute right-4 top-5 cursor-pointer text-gray-500" onClick={props.onClick}></i>
    </main>
  );
};


export const OptionsModal: React.FC<OptionsModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OptionsModalOverlay onClick={props.onClose} styleClasses={props.styleClasses}>
          {props.children}
        </OptionsModalOverlay>,
        document.getElementById("options-modal")!
      )}
    </>
  );
};

const DetailsTabModalOverlay: React.FC<OptionsModalOverlayProps> = (props) => {
  return (
    <main
      id='user-details'
      aria-orientation="vertical"
      aria-labelledby='toggle-details-tab'
      className={`z-20 bg-white flex-col flex gap-y-5 shadow-xl flex px-6 pt-10 pb-6 absolute top-[8rem] right-[2px] ${props.styleClasses} opacity-0 translate-x-[100%] h-fit rounded-md`}
    >
      {props.children}
      <i className="fa-solid fa-xmark text-xl absolute right-4 top-5 cursor-pointer text-gray-500" onClick={props.onClick}></i>
    </main>
  );
};


export const DetailsTabModal: React.FC<OptionsModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <DetailsTabModalOverlay onClick={props.onClose} styleClasses={props.styleClasses}>
          {props.children}
        </DetailsTabModalOverlay>,
        document.getElementById("details-tab-modal")!
      )}
    </>
  );
};
