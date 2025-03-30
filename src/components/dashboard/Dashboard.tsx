import Header from "../header/Header";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full container">
      <Header username="Ayo"/>
      <Sidebar />
    </main>
  );
}
