import { baseApiUrl } from '@mobile/constants/api';
import { FeedApiResponse } from '@shared/types/api';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

function buildFeedKey({ fid }: { fid: string }) {
  return ['feed', fid];
}

function buildFeedFetcher({ fid }: { fid: string }) {
  return async (): Promise<FeedApiResponse> => {
    const res = await fetch(`${baseApiUrl}/feed/${fid}`);
    return res.json();
  };
}

export function useFeed({ fid }: { fid: string }) {
  return useSuspenseQuery({
    queryKey: buildFeedKey({ fid }),
    queryFn: buildFeedFetcher({ fid }),
  }).data;
}

export function useFetchFeed() {
  const queryClient = useQueryClient();

  return async ({ fid }: { fid: string }) => {
    const data = buildFeedFetcher({ fid })();
    queryClient.setQueryData(buildFeedKey({ fid }), data);
    return data;
  };
}
