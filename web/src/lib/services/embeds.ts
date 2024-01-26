import Linkify from "linkify-it";

const imageExtensions = [".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"];
const videoExtensions = [
  ".mp4",
  ".avi",
  ".mov",
  ".mkv",
  ".wmv",
  ".flv",
  ".webm",
  ".m4v",
  ".ogg",
];

export function extractUrlsFromText(text: string): string[] {
  const li = new Linkify();
  li.set({ fuzzyEmail: false });
  li.add("mailto:", null);
  li.add("@", null);

  const matches = li.match(text) || [];

  return matches.map((match) => match.url);
}

export function hasExtension(url: string, extensions: string[]): boolean {
  const parsedUrl = new URL(url.toLowerCase());

  return extensions.some(
    (extension) =>
      parsedUrl.pathname.endsWith(extension) ||
      parsedUrl.search.endsWith(extension),
  );
}

export function hasImageExtension(url: string): boolean {
  return hasExtension(url, imageExtensions);
}

export function hasVideoExtension(url: string): boolean {
  return hasExtension(url, videoExtensions);
}

interface UrlEmbed {
  url: string;
}

interface CastEmbed {
  castId: {
    fid: number;
    hash: string;
  };
}

type Embed = UrlEmbed | CastEmbed;

export function formatCastEmbed(embed: CastEmbed) {
  return `${embed.castId.hash}`;
}

export function processEmbeds(embeds: Embed[]) {
  let urls: string[] = [];
  let images: string[] = [];
  let videos: string[] = [];
  let unknowns: string[] = [];
  let casts: string[] = [];

  for (const embed of embeds) {
    if ("castId" in embed) {
      casts.push(formatCastEmbed(embed));
      continue;
    }

    const { url } = embed;
    const match = extractUrlsFromText(url);
    if (match.length !== 1) {
      unknowns.push(url);
      continue;
    }

    if (hasImageExtension(url)) {
      images.push(url);
      continue;
    }

    if (hasVideoExtension(url)) {
      videos.push(url);
      continue;
    }

    urls.push(url);
  }

  return { urls, images, videos, casts, unknowns };
}
