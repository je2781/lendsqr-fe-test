import Dashboard from "@/components/dashboard/Dashboard";

async function getuserData() {
  const res = await fetch(
    `https://run.mocky.io/v3/12a58f53-766f-4359-b15d-8b1bea8bdc9e`,
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
