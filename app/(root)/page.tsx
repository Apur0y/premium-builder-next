import SearchForm from "../components/SearchForm";


export default async function Home({searchParams} :{searchParams: Promise<{query: string} >
}) {

  const query = (await searchParams).query


  return (
    < >
    <section className="bg-pink-700 h-[400px] flex  items-center justify-center text-white pattern  flex-col">
    <h1 className="heading">Pitch your startup, <br /> connect with entrepreneurs</h1>
    <p className="py-4">Submit Ideas, Get Votes, and Get Noticed By top tier Companies</p>

    <SearchForm query={query}></SearchForm>

    </section>
    </>
  );
}
