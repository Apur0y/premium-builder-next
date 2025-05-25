import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";


export default async function Home({searchParams} :{searchParams: Promise<{query: string} >
}) {

  const query = (await searchParams).query;

  const posts =[
    {
      createdAt: new Date(),
      title: "Divine Robotics",
      description: "This is a brief description of startup idea 1.",
      views: 10,
      _id:1,
      author:{_id:1, name:"John Doe"},
      category: "Robots",
      image:"https://mecaluxcom.cdnwm.com/img/logistics-articles/advancements-humanoid-robots-simulations.1.11.jpg"
    }
  ]


  return (
    < >
    <section className="bg-pink-700 h-[400px] flex  items-center justify-center text-white pattern  flex-col">
    <h1 className="heading">Pitch your startup, <br /> connect with entrepreneurs</h1>
    <p className="py-4">Submit Ideas, Get Votes, and Get Noticed By top tier Companies</p>

    <SearchForm query={query}></SearchForm>

    </section>

    <section className="w-11/12 mx-auto py-10">
      <p className="text-xl font-semibold">
        {
          query? `Search result for "${query}"` : "All Startups"
        }
      </p>

      <ul>
        {
          posts.length>0 ?(
            posts.map((post)=>(
              <StartupCard key={post?._id} post={post}></StartupCard>
            ))):(
              <p>No Startup Found</p>
            )
          
        }

      </ul>


    </section>
    </>
  );
}
