import Image from "next/image";
import Union from '../../../public/union.png';
import SplashImg from '../../../public/splash.png';
import Logo from '../../../public/lendsqr.png';

export default function SplashScreen(){
    return <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className="lg:w-[600px] w-full flex flex-col lg:items-start items-center lg:gap-y-24">
            <header className="flex flex-row gap-x-3 items-center justify-center lg:pl-8">
                <Image src={Union} alt='logo' width={32}/>
                <Image src={Logo} alt='logo' width={138.44} className="mt-2"/>
            </header>
            <Image src={SplashImg} alt='splash image' width={600} height={337.57} className="lg:block hidden"/>
        </div>
    </div>
}