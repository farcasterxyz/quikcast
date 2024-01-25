import { Embeds } from '@shared/types/models';

import { CastImageEmbed } from './CastImageEmbed';

type CastEmbedsProps = {
  embeds: Embeds;
};

export function CastEmbeds({ embeds }: CastEmbedsProps) {
  if (!embeds.images.length) {
    return null;
  }

  return (
    <div className="mt-2 flex flex-col items-start gap-2">
      {embeds.images.map((url) => (
        <CastImageEmbed key={url} url={url} />
      ))}
    </div>
  );
}
