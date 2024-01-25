export type Cast = {
  embeds: Embeds;
  hash: string;
  text: string;
  timestamp: Date;
  user: User;
};

export type User = {
  fid: string;
  pfp_url: string;
  display_name: string;
  bio: string;
  username: string;
};

export type Embeds = {
  casts: string[];
  images: string[];
  unknowns: string[];
  urls: string[];
  videos: string[];
};
