import { auth, signIn, signOut } from "@/auth";
import { GithubIcon, Reply, Upload } from "lucide-react";

import Link from "next/link";

import React from "react";

async function Navbar() {
  const session = await auth();
  // const session = useSession();

  return (
    <header className="bg-purple-700 text-white p-4 font-work-sans fixed z-50 w-full">
      <nav className="container mx-auto flex justify-between items-center">
        <Link className="font-bold" href="/">BuilderZ</Link>

        <div className="flex gap-5 font-semibold">
             <Link href="/create-projects">
              Create Project
              </Link>
             <Link href="/create-projects">
              Find One
              </Link>
             <Link href="/about">
             About
              </Link>
             <Link className="flex bg-slate-800 py-1 px-3 rounded-lg gap-2" href="/upload">
              Upload<Upload></Upload> 
              </Link>
             <Link className="flex bg-slate-800 py-1 px-3 rounded-lg gap-2" href="/reply">
              Reply <Reply></Reply>
              </Link>
        </div>

        <div >
          {session && session?.user ? (
            <div>
             

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="flex gap-5"
            >
           

                <Link href={`/profile/${session?.user?.id}`}>
              <span>{session?.user?.name}</span>
              </Link>
              <button className="py-1 px-3 bg-sky-600 rounded-lg" type="submit">LogOut</button>
            
            </form>
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button className="flex bg-gray-800 py-1 px-3 rounded-lg" type="submit"><GithubIcon></GithubIcon> GitHub</button>
            </form>
          )}
        </div>


      </nav>
    </header>
  );
}

export default Navbar;
