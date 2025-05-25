import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

import React from "react";

async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-white text-black p-4 font-work-sans">
      <nav className="container mx-auto flex justify-between items-center">
        <Link className="font-bold" href="/">BuilderZ</Link>

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
              <Link href="/crete-project">
              Create Project
              </Link>

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
              <button type="submit">Signin with GitHub</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
