
export default function Content({data}: any){
    return <main className="pl-[238px] pr-12 bg-blend-soft-light pt-[200px] pb-12 min-h-screen">
        <header>
            {data.sectionName}
        </header>
    </main>
}