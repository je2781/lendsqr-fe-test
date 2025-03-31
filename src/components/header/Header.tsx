import Link from "next/link";
import Logo from "../logo/Logo";
import SearchBar from "./Search";
import ProfilePic from "../../../public/profile.png";
import Image from "next/image";

export default function Header({ username }: { username: string }) {
  async function openMobileModal(){

  }
  return (
    <nav className="lg:pl-0 pl-[5%] pr-[6%] lg:pr-[3%] py-[0.125%] flex flex-row items-center shadow-md justify-between w-full fixed h-[100px] top-0 left-0 z-20 bg-white">
      <div className="flex flex-row gap-x-28 items-center lg:w-[55%] w-full justify-between">
        <Logo reducer={1.3} />
        <SearchBar />
        <span className="lg:hidden mt-3 cursor-pointer" onClick={openMobileModal}>
          <i className="fa-solid fa-bars text-primary-500 text-2xl"></i>
        </span>
      </div>
      <div className="lg:flex hidden flex-row gap-x-10 w-[20%] items-center mt-3">
        <Link
          href="/docs"
          className="text-sm font-roboto underline-offset-1 decoration-primary-500 font-normal"
        >
          Docs
        </Link>
        <div className="flex flex-row gap-x-8 items-center">
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
            <div className="flex flex-row gap-x-3 items-center cursor-pointer">
              <h5 className="text-sm text-primary-500 font-medium">
                {username}
              </h5>
              <i className="fa-solid fa-angle-down text-sm text-primary-500"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
