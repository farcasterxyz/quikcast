import { Cast, User } from './models';

export type FeedApiResponse = {
  feed: Cast[];
};

export type ProfileCastsApiResponse = {
  casts: Cast[];
};

export type ProfileApiResponse = {
  profile: User;
};
