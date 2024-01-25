'use client';

import { Embed } from '@shared/types/models';
import { useState } from 'react';

type CastEmbedProps = {
  embed: Embed;
};

export function CastEmbed({ embed }: CastEmbedProps) {
  const [error, setError] = useState<unknown>();
  console.log(embed);

  if (error) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 max-h-[280px] max-w-full aspect-auto">
      <img
        key={embed.url}
        src={embed.url}
        alt={embed.url}
        className="h-auto max-h-[280px]"
        onError={(e) => setError(e)}
      />
    </div>
  );
}
