import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { title } from "node:process";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;

  console.log({ id });
  const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  if (!post) return notFound();

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
              <Link href={`/user/${post.author?._id}`}>
                <Image
                  src={post.author.image} // URL string
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
