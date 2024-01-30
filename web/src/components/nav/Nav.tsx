"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  const isFeed = pathname === "/";

  return (
    <div className="flex flex-row justify-evenly border-b border-gray-200 pt-2 font-bold">
      <div className={`${isFeed ? "border-b-4 border-violet-400 pb-2" : ""}`}>
        <Link href="/">Following</Link>
      </div>
      <div className={`${isFeed ? "" : "border-b-4 border-violet-400 pb-2"}`}>
        <Link href="/casts">My Casts</Link>
      </div>
    </div>
  );
}
