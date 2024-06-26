"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="p-4 shadow-sm text-black">
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold transition-transform transform hover:scale-105">
          ANONMESSAGE
        </a>
        {session ? (
          <>
            <span className="mr-4">Welcome, {user.username || user.email}</span>
            <Button
              onClick={handleSignOut}
              className="w-full sm:px-8 hover:bg-black/85 hover:text-white rounded-lg md:w-auto bg-black text-white transition-transform transform hover:scale-105"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full sm:px-8 hover:bg-black/85 hover:text-white rounded-lg md:w-auto bg-black text-white transition-transform transform hover:scale-105"
              variant={"outline"}
            >
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;