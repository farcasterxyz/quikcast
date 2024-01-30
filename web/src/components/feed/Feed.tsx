import { Cast } from "@components/feed/Cast";
import type { Cast as CastItem } from "@shared/types/models";

type Feed = {
  casts: CastItem[];
};

export async function Feed({ casts }: Feed) {
  return (
    <div className="container m-auto max-w-[660px] border-b border-gray-200">
      {casts.slice(0, 50).map((cast) => (
        <Cast key={cast.hash} cast={cast} />
      ))}
    </div>
  );
}
