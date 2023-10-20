import { getAuthSession } from "@/lib/auth";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { PostValidator } from "@/lib/validators/posts";
import { db } from "@/lib/db";
import z from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { subredditId, title, content } = PostValidator.parse(body);
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response("Sub to post", {
        status: 400,
      });
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subredditId,
      },
    });

    if (!subscriptionExists) {
      return new Response("You are not subscribed to this subreddit.", {
        status: 400,
      });
    }

    return new Response("ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("invalid Post data passed", { status: 422 });
    }
    return new Response("Could not post to subreddit at this time", {
      status: 500,
    });
  }
}
