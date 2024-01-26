"use client";

import { useState } from "react";

type CastImageEmbedProps = {
  url: string;
};

export function CastImageEmbed({ url }: CastImageEmbedProps) {
  const [error, setError] = useState<unknown>();

  if (error) {
    return null;
  }

  return (
    <div className="aspect-auto max-h-[280px] max-w-full overflow-hidden rounded-lg border border-gray-200">
      <img
        key={url}
        src={url}
        alt={url}
        className="h-auto max-h-[280px]"
        onError={(e) => setError(e)}
      />
    </div>
  );
}
