'use client';

import { User } from '@shared/types/models';
import { useState } from 'react';

const pfpDiameter = 46;
const fallbackUrl = '/default-avatar.png';

type AvatarProps = {
  user: User;
};

export function Avatar({ user }: AvatarProps) {
  const [src, setSrc] = useState(user.pfp_url || fallbackUrl);

  return (
    <div
      className="shrink-0 overflow-hidden rounded-full border border-gray-200"
      style={{
        width: pfpDiameter,
        height: pfpDiameter,
      }}
    >
      <img
        src={src}
        className="object-cover"
        width={pfpDiameter}
        height={pfpDiameter}
        style={{ height: pfpDiameter }}
        onError={() => {
          console.log('error?');
          setSrc(fallbackUrl);
        }}
      />
    </div>
  );
}
