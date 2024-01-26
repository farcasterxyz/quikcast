import { Embeds } from '@shared/types/models';
import { View } from 'react-native';

import { CastImageEmbed } from './CastImageEmbed';

type CastEmbedsProps = {
  embeds: Embeds;
};

export function CastEmbeds({ embeds }: CastEmbedsProps) {
  if (embeds.images.length === 0) {
    return null;
  }

  return (
    <View className="mt-2">
      {embeds.images.map((url) => (
        <CastImageEmbed key={url} url={url} />
      ))}
    </View>
  );
}
