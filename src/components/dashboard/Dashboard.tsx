import Header from "../layout/header/Header";
import Sidebar from "../layout/Sidebar";
import Content from "./Content";

export default function Dashboard({userData, sectionName}: any) {
  const data = {userData, sectionName};
  return (
    <main className="bg-primary-500/1 z-0">
      <Header username="Ayo"/>
      <Sidebar />
      {data.userData ? <Content data={data}/> : <div className="w-full min-h-screen"></div>}
    </main>
  );
}
