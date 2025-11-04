import SearchForm from "@/components/SearchForm";

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

  return (
    <section className="pink_container pattern">
      <h1 className="heading">
        Pitch Your Startup, <br /> Connect with Entrepreneurs
      </h1>

      <p className="sub-heading bg-amber-400 !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
      </p>

      <SearchForm query={query} />
    </section>
  );
}
