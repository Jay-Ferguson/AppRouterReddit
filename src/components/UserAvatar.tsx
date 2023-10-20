import { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
import React from "react";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile-pic"
            referrerPolicy="no-referrer"
          ></Image>
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export default UserAvatar;
