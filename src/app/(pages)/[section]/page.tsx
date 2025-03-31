import Dashboard from "@/components/dashboard/Dashboard";

async function getuserData() {
  const res = await fetch(
    `https://run.mocky.io/v3/a71a621c-e792-429a-b423-bde741cba703`,
    {
      cache: "no-store", // Ensure the request isn't cached
    }
  );

  const data = await res.json();

  return data.data;
}

export default async function SectionPage({ params }: { params: { section: string } }) {
  const data = await getuserData();
  console.log(data);
  const {section} = await params;
  return <Dashboard userData={data} sectionName={section}/>;
}
