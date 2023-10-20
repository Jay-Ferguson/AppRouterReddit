import React from "react";
import { FC } from "react";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { notFound } from "next/navigation";
import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <div>
      page
      <h1 className="font-bold text-3xl md:text-4xl h-14">r/{subreddit.name}</h1>
      <MiniCreatePost session={session}/>
      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name}/>

      {/* show post in the user feed */}
    </div>
  );
};

export default page;
