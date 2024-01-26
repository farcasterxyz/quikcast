export type RootParamList = {
  Feed: NoParams;
  Profile: { displayName: string; fid: string };
};

export type ScreenName = keyof RootParamList;

type NoParams = Record<string, never>;
