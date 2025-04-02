import Dashboard from "@/components/dashboard/Dashboard";

export default async function SectionPage({
  params,
}: {
  params: { id: string };
}) {
  return <Dashboard  />;
}
