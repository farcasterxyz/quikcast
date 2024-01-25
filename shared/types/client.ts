export type Cast = {
  embeds: Embed[];
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

export type Embed = {
  url: string;
};
