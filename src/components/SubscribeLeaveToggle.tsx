"use client";

import React, { startTransition } from "react";
import { FC } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import axios from "axios";
import { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Familjen_Grotesk } from "next/font/google";

interface SubscribeLeaveToggleProps {
isSubscribed: boolean;
subredditId: string;
subredditName: string | null;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subredditId,
  subredditName,
}:SubscribeLeaveToggleProps) => {

  const isSubscribed = false
  const { toast } = useToast()
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "there was a problem",
        description: "Something went wrong please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      


      return toast({
        title: "subscribed",
        description: `You are now subed to r/${subredditName}`,
      });
    },
  });


  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave community</Button>
  ) : (
    <Button onClick={() => subscribe()} isLoading={isSubLoading} className="w-full mt-1 mb-4">Join to post</Button>
  );
};

export default SubscribeLeaveToggle;
