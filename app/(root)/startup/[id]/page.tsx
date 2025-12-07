import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PLAYLIST_BY_SLUG_QUERY, STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { title } from "node:process";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();

const page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;

  const [post, {select: editorPosts} ] = await Promise.all([
    client.fetch(STARTUPS_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new" })
  ]);



  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <div className="max-w-4xl mx-auto">
          <Image
            src={
              typeof post.image === "string"
                ? post.image
                : urlFor(post.image).url()
            }
            alt={post.title}
            width={800}
            height={500}
            className="rounded-xl w-full h-auto"
          />

          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
              <Link
                href={`/user/${post.author?._id}`}
                className="flex gap-2 items-center mb-3"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-20-medium">{post.author.name}</p>
                  <p className="text-16-medium !text-black-300">
                    {post.author.username}
                  </p>
                </div>
              </Link>

              <p className="category-tag">{post.category}</p>
            </div>

            <h3 className="text-30-bold">Pitch Details</h3>

            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </div>
        </div>

        <hr className="divider" />
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        {/* ToDO: Editor Selected Startups */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
