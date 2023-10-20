"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Link2 } from "lucide-react";
import { ImageIcon } from "lucide-react";
import { Session } from "@prisma/client";

interface MiniCreatePostProps {
  session: Session;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <li className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-full px-4 flex justify-between gap-6">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white"></span>
          <Input
            readOnly
            onClick={() => router.push(pathname + "/submit")}
            placeholder="create post"
          />

          <Button
            variant="ghost"
            onClick={() => router.push(pathname + "/submit")}
          >
            <ImageIcon className="text-zinc-600" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push(pathname + "/submit")}
          >
            <Link2 className="text-zinc-600"></Link2>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default MiniCreatePost;
