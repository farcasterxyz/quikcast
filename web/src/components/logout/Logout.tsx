'use client';

import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <button
      type="button"
      // eslint-disable-next-line tailwindcss/no-custom-classname,tailwindcss/classnames-order
      className="bg-fc-purple cursor-pointer rounded px-4 py-2 text-white"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
