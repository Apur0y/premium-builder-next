import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StartupCard = ({ post }: { post: StractupTypeCard }) => {
  return (
    <li className="border-4 border-slate-800 rounded-lg  max-w-sm  p-2 flex flex-col gap-3">
      <div className="flex justify-between bg-red-300 px-4 py-1 rounded-lg ">
        <p>{formatDate(post?.createdAt)}</p>

        <div className="flex">
          <EyeIcon className="text-red-600"></EyeIcon>
          <span>{post.views}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <Link href={`/profile/${post.author._id}`}>
            <span>{post.author.name}</span>
          </Link>
          <Link href={`/posts/${post._id}`}>
            <h2 className="text-2xl font-semibold">{post.title}</h2>
          </Link>
        </div>

          <Link href={`/profile/${post.author._id}`}>
          <Image
          src={post.image}
          alt="post Image"
          width={48}
          height={148}
        ></Image>
          </Link>

     
      </div>

      <div>
        <p className="text-sm">{post.description}</p>

        <img src={post.image} alt="robo" className="w-96" />
      </div>
    </li>
  );
};

export default StartupCard;
