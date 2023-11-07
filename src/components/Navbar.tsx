"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Link } from "lucide-react";
import { Icons } from "../components/ui/Icons";
import { buttonVariants } from "./ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const sessionz = await getServerSession(authOptions);
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-350 z-[10] py-2">
      <header className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* {logo} */}
        <nav className="flex justify-between items-center px-10 py-4">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-8" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Breaddit
          </p>
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        </nav>

        {/* {session?.user ? (
                    <UserAccountNav user={session.user} />
               ) : (
                    <Link href="/sign-in" className={buttonVariants()}>Sign In</Link>
               )} */}
      </header>
    </div>
  );
};

export default Navbar;
