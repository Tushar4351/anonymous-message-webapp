"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const getInitial = (name: any) => {
    return name ? name[0].toUpperCase() : "?";
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const userInitial = getInitial(user?.username || user?.email);
  const backgroundColor = React.useMemo(() => getRandomColor(), []);

  return (
    <nav className="p-4 shadow-sm text-black">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a
            href="#"
            className="sm:text-xl font-bold transition-transform transform hover:scale-105"
          >
            ANONMESSAGE
          </a>
        </div>

        {session && (
          <h1 className="text-center my-2 md:my-0 sm:text-xl">
            Welcome, {user.username || user.email}
          </h1>
        )}

        {session ? (
          <div className="flex items-center space-x-4">
           <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-400 text-white font-bold cursor-pointer"
                    //style={{ backgroundColor }}
                  >
                    {userInitial}
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  className="bg-black text-white px-4 py-2 rounded-md shadow-lg"
                >
                  <p>{user.email}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              onClick={handleSignOut}
              className="hover:bg-black/85 hover:text-white rounded-lg bg-black text-white transition-transform transform hover:scale-105"
              variant="outline"
            >
              Logout
            </Button>
          </div>
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
