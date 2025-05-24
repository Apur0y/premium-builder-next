import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

import React from "react";

async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-gray-800 text-white p-4 font-work-sans">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/">BuilderMe</Link>

        <div>
          {session && session?.user ? (
            <div>
              <Link href="/">Create Project</Link>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit">LogOut</button>
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
