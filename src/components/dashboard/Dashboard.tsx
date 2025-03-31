import Header from "../header/Header";
import Sidebar from "../layout/Sidebar";
import Content from "./Content";

export default function Dashboard({userData, sectionName}: any) {
  const data = {userData, sectionName};
  console.log(data);
  return (
    <div className="min-h-screen container">
      <Header username="Ayo"/>
      <Sidebar />
      <Content data={data}/>
    </div>
  );
}
