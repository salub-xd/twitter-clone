"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/user";
import { User } from "@/gql/graphql";

export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useCurrentUser();

  return (
    <nav className="flex justify-between items-center p-4 rounded-xl shadow-sm w-[350px] sm:w-[400px] lg:w-[600px] ">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">
            Settings
          </Link>
        </Button>
      </div>
      <UserButton data={user as User} />
    </nav>
  );
};