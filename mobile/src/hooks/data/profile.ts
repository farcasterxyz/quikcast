import { baseApiUrl } from '@mobile/constants/api';
import { ProfileApiResponse } from '@shared/types/api';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

function buildProfileKey({ fid }: { fid: string }) {
  return ['profile', fid];
}

function buildProfileFetcher({ fid }: { fid: string }) {
  return async (): Promise<ProfileApiResponse> => {
    const res = await fetch(`${baseApiUrl}/profiles/${fid}`);
    return res.json();
  };
}

export function useProfile({ fid }: { fid: string }) {
  return useSuspenseQuery({
    queryKey: buildProfileKey({ fid }),
    queryFn: buildProfileFetcher({ fid }),
  }).data;
}

export function useFetchProfile() {
  const queryClient = useQueryClient();

  return useCallback(
    async ({ fid }: { fid: string }) => {
      const data = buildProfileFetcher({ fid })();
      queryClient.setQueryData(buildProfileKey({ fid }), data);
      return data;
    },
    [queryClient],
  );
}
