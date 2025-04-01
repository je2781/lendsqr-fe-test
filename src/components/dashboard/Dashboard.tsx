'use client';

import { usePathname } from "next/navigation";
import Header from "../layout/header/Header";
import Sidebar from "../layout/Sidebar";
import UserDetails from "./UserDetails";
import UsersContent from "./UsersContent";

export default function Dashboard({userData, route, userId}: any) {
  const pathName = usePathname();
  const data = {userData, sectionName: route ?? pathName.slice(1)};
  return (
    <div className="bg-primary-500/1 relative">
      <Header username="Ayo"/>
      <Sidebar />
      {data.sectionName  === 'users' ? <UsersContent data={data}/> : <UserDetails userData={data.userData} id={userId ?? ''}/>}
    </div>
  );
}
