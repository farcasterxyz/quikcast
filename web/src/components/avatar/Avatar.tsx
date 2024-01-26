"use client";

import { User } from "@shared/types/models";
import { useMemo, useState } from "react";

const fallbackUrl = "/default-avatar.png";

type AvatarProps = {
  size?: "sm" | "md" | "lg";
  user: User;
};
export function Avatar({ size = "md", user }: AvatarProps) {
  const [src, setSrc] = useState(user.pfp_url || fallbackUrl);

  const diameter = useMemo(() => {
    switch (size) {
      case "sm":
        return 32;
      case "md":
        return 46;
      default:
        return 86;
    }
  }, [size]);

  return (
    <div
      className="shrink-0 overflow-hidden rounded-full border border-gray-200"
      style={{
        width: diameter,
        height: diameter,
      }}
    >
      <img
        src={src}
        className="object-cover"
        width={diameter}
        height={diameter}
        style={{ height: diameter }}
        onError={() => {
          setSrc(fallbackUrl);
        }}
      />
    </div>
  );
}
