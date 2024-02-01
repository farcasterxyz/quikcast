"use client";

export default function Logout() {
  return (
    <button
      type="button"
      className="bg-fc-purple cursor-pointer rounded px-4 py-2 text-white"
      onClick={async () => {
        await fetch("/api/auth/sign-out", { method: "POST" });
        window.location.reload();
      }}
    >
      Sign out
    </button>
  );
}
