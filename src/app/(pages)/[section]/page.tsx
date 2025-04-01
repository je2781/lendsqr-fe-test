import Dashboard from "@/components/dashboard/Dashboard";

async function getuserData() {
  const res = await fetch(
    `https://run.mocky.io/v3/360dc843-a4c1-47f0-a5c6-3b1d6badee64`,
    {
      cache: "no-store", // Ensure the request isn't cached
    }
  );

  const data = await res.json();

  return data.data;
}

export default async function UsersPage({ params }: { params: { section: string } }) {
  const data = await getuserData();
  const {section} = await params;

  return <Dashboard userData={data} route={section}/>;
}
