import ReactDOM from "react-dom";

const BackDrop = (props: any) => {
  return <div className='w-full h-[100vh] top-0 left-0 fixed bg-black/70 z-30' onClick={props.onClick}></div>;
};


const MobileModalOverlay = (props: any) => {
  return (
    <main id='mobile-nav' aria-orientation="vertical" aria-labelledby='toggle-button' className={`${props.classes ? props.classes : 'bg-white px-3 pt-[70px]'} z-[45] w-4/5 flex-col pb-12 gap-y-12 h-screen items-center flex fixed top-0 left-0 overflow-y-auto scrollbar-hidden hover:scrollbar-hover`}>
      {props.children}
      <i className="fa-solid fa-xmark text-xl absolute right-4 top-5 cursor-pointer text-gray-500" onClick={props.onClick}></i>
    </main>
  );
};


export const MobileModal = (props: any) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClose}/>,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <MobileModalOverlay onClick={props.onClose} classes={props.classes}>{props.children}</MobileModalOverlay>,
        document.getElementById("mobile-modal")!
      )}
    </>
  );
};

const FilterModalOverlay = (props: any) => {
    return (
      <main id='filter-settings' aria-orientation="vertical" aria-labelledby='toggle-settings' className="z-20 bg-white w-[245px] flex-col shadow-xl flex px-6 py-8 absolute top-[31rem] opacity-0 translate-x-[-100%] h-fit">
        {props.children}
        <i className="fa-solid fa-xmark text-xl absolute right-4 top-5 cursor-pointer text-gray-500" onClick={props.onClick}></i>
      </main>
    );
  };

export const FilterModal = (props: any) => {
    return (
      <>
        {ReactDOM.createPortal(
          <FilterModalOverlay onClick={props.onClose}>{props.children}</FilterModalOverlay>,
          document.getElementById("filter-modal")!
        )}
      </>
    );
  };





