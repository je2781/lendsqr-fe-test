import Image from "next/image";
import SplashImg from '../../../public/splash.png';
import Logo from "../logo/Logo";

export default function SplashScreen({src}: any){
    return <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className="lg:w-[600px] w-full flex flex-col lg:items-start items-center lg:gap-y-24">
            <Logo reducer={1}/>
            <Image src={src ?? SplashImg} alt='splash image' width={600} height={337.57} className="lg:block hidden bg-blend-soft-light"/>
        </div>
    </div>
}