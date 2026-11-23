export type LinkCard = {
  kind: "generic" | "youtube" | "x";
  title: string;
  description?: string;
  domain: string;
  image?: string;
  icon?: string;
  youtube?: { channelName?: string; durationSeconds?: number };
  x?: { authorName: string; authorHandle: string };
};
