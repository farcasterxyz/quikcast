import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { Loader } from '../loader/Loader';

type CastImageEmbedProps = {
  url: string;
};

export function CastImageEmbed({ url }: CastImageEmbedProps) {
  const [error, setError] = useState<unknown>();
  const [size, setSize] = useState<{ width: number; height: number }>();
  const [containerWidth, setContainerWidth] = useState<number>();

  useEffect(() => {
    Image.getSize(url, (width, height) => {
      setSize({ width, height });
    });
  }, [url]);

  if (error) {
    return null;
  }

  if (!size) {
    return <Loader />;
  }

  return (
    <View
      className="overflow-hidden rounded-lg border-[0.25px] border-gray-200"
      onLayout={(e) => {
        setContainerWidth(e.nativeEvent.layout.width);
      }}
    >
      {containerWidth && (
        <Image
          className="max-w-full"
          resizeMode="cover"
          source={{ uri: url }}
          width={size.width}
          height={containerWidth / (size.width / size.height)}
          onError={setError}
        />
      )}
    </View>
  );
}
