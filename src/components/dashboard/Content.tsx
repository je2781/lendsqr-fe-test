
export default function Content({data}: any){
    return <section className="pl-[340px] pr-12 pt-[180px] pb-12 min-h-screen">
        <header className="font-medium text-2xl text-primary-500 font-sans">
            {data.sectionName[0].toUpperCase() + data.sectionName.slice(1)}
        </header>
        <div></div>
    </section>
}