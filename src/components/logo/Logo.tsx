'use client';

import Union from '../../../public/union.png';
import Name from '../../../public/lendsqr.png';
import Image from "next/image";

const Logo = ({reducer}: {reducer: number}) => {
    return(<header className="flex flex-row gap-x-3 items-center justify-center lg:pl-8">
    <Image src={Union} alt='logo' width={32/reducer} height={25/reducer}/>
    <Image src={Name} alt='logo' width={138.44/reducer} height={36/reducer} className="mt-2"/>
</header>);
}

export default Logo;