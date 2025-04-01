import Dashboard from "@/components/dashboard/Dashboard";

async function getuserData() {
  const res = await fetch(
    `https://run.mocky.io/v3/8ad69115-add1-408d-8ff5-35b5294e6bcc`,
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
