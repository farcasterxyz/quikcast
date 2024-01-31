import { baseApiUrl } from '@mobile/constants/api';
import { ProfileCastsApiResponse } from '@shared/types/api';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

function buildProfileCastsKey({ fid }: { fid: string }) {
  return ['profileCasts', fid];
}

function buildProfileCastsFetcher({ fid }: { fid: string }) {
  return async (): Promise<ProfileCastsApiResponse> => {
    const res = await fetch(`${baseApiUrl}/profiles/${fid}/casts`);
    return res.json();
  };
}

export function useProfileCasts({ fid }: { fid: string }) {
  return useSuspenseQuery({
    queryKey: buildProfileCastsKey({ fid }),
    queryFn: buildProfileCastsFetcher({ fid }),
  }).data;
}

export function useFetchProfileCasts() {
  const queryClient = useQueryClient();

  return async ({ fid }: { fid: string }) => {
    const data = buildProfileCastsFetcher({ fid })();
    queryClient.setQueryData(buildProfileCastsKey({ fid }), data);
    return data;
  };
}
