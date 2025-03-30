import Link from "next/link";
import Logo from "../logo/Logo";
import SearchBar from "./Search";
import ProfilePic from "../../../public/profile.png";
import Image from "next/image";

export default function Header({username}: {username: string}) {
  return (
    <nav className="px-[10%] py-[5%] flex flex-row items-center justify-between">
      <div className="flex flex-row gap-x-24 items-center">
        <Logo/>
        <SearchBar/>
      </div>
      <div className="flex flex-row gap-x-4">
        <Link href='/docs' className='text-white text-sm font-roboto underline-offset-1 decoration-primary-500 font-normal'>Docs</Link>
        <div>
            <i className='fa-regular fa-bell text-lg text-primary-500'></i>
            <div className="flex flex-row gap-x-2">
                <span className="h-[48px] w-[48px] rounded-full ring-2 ring-primary-500">
                    <Image src={ProfilePic} width={48} height={48} alt='prodile pic' />
                </span>
                <div className="flex flex-row gap-x-2">
                    <h5 className="text-sm text-primary-500 font-medium">{username}</h5>
                    <i className='fa-solid fa-angle-down text-sm text-primary-500'></i>
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
}
