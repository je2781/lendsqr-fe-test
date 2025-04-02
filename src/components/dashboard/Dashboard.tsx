'use client';

import { usePathname } from "next/navigation";
import Header from "../layout/header/Header";
import Sidebar from "../layout/Sidebar";
import UserDetails from "./UserDetails";
import UsersContent from "./UsersContent";

export default function Dashboard() {
  const pathName = usePathname();
  
  const extractedData = localStorage.getItem('users');
  const data = {userData: JSON.parse(extractedData!), sectionName: pathName.slice(1)};
  return (
    <div className="bg-primary-500/1 relative">
      <Header username="Ayo" activeSection={data.sectionName}/>
      <Sidebar activeSection={data.sectionName}/>
      {data.sectionName  === 'users' ? <UsersContent data={data}/> : <UserDetails userData={data.userData} id={pathName.slice(1).split('/')[1]}/>}
    </div>
  );
}
