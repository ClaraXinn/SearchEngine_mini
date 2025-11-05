import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  // Next 15: searchParams is a Promise
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  // pull ?query=... from the URL safely
  const q = sp?.query;
  const query = Array.isArray(q) ? q[0] : q ?? "";

  const posts=[{
    _createdAt : new Date(),
    views: 55,
    author: {_id: 1, name: 'Elon'},
    _id: 1,
    description: "This is a description",
    image: "/weRobot.png",
    category: "Robots",
    title: "We Robots",
  }

  ]

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container ">
        <p className="text-30-semibold" >
          {query ? `Search results for "${query}"` : 'All Startups' }
        </p>

        <ul className="mt-7 card-grid">
          {
            posts?.length > 0 ? (
              posts.map(( post: StartupCardType, index: number) =>
                <StartupCard key={post?._id} post={post}/>
            )
            ): (
              <p className="no-results">No startups found</p>
            )
          }

        </ul>

      </section>


    </>
  );
}
