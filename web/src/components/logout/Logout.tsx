"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return <button type="button" className="px-4 py-2 text-white bg-fc-purple rounded cursor-pointer" onClick={() => signOut()}>Sign out</button>;
}
