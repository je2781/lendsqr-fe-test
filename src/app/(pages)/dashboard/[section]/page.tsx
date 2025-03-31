import Dashboard from "@/components/dashboard/Dashboard";

async function getuserData() {
  const res = await fetch(
    `https://run.mocky.io/v3/abea8a1d-fa73-4a74-a16e-cb01bfaf5425`,
    {
      cache: "no-store", // Ensure the request isn't cached
    }
  );

  const data = await res.json();

  return data.data;
}

export default async function SectionPage({ params }: { params: { section: string } }) {
  const data = await getuserData();
  const {section} = await params;
  return <Dashboard userData={data} sectionName={section}/>;
}
