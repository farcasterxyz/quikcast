'use client';

import { Embed } from '@shared/types/models';
import { useState } from 'react';

type CastEmbedProps = {
  embed: Embed;
};

export function CastEmbed({ embed }: CastEmbedProps) {
  const [error, setError] = useState<unknown>();

  if (error) {
    return null;
  }

  return (
    <div className="aspect-auto max-h-[280px] max-w-full overflow-hidden rounded-lg border border-gray-200">
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
