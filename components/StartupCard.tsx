import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Startup, Author } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & {
  author?: Author;
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    _id,
    image,
    description,
    category,
  } = post;

  return (
    <li className="startup-card group w-full max-w-[360px]">
      {/* --- Date + Views --- */}
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      {/* --- Author + Title --- */}
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium">{author?.name}</p>
          </Link>

          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-2">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image}
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      {/* --- Description + Thumbnail (YouTube style) --- */}
      <Link href={`/startup/${_id}`}>
        <p className="startup-card-desc line-clamp-2 mt-3">{description}</p>

        <div className="relative w-full aspect-video mt-3">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </Link>

      {/* --- Category + Details Button --- */}
      <div className="flex-between gap-3 mt-5">
        <Link href={`/query/${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>

        <button className="startup-card-btn">
          <Link href={`/startup/${_id}`}>Details</Link>
        </button>
      </div>
    </li>
  );
};

export default StartupCard;

export const StartupCardSkeleton = () => (
  <>
    {
      [0,1,2,3,4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton"/>

        </li>
      )
    ) 
    }
  </>
)
