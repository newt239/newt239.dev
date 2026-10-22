import { siteName, siteUrl } from "~/libs/site";

// https://docs.discord.com/developers/link-previews/component-embeds
// メディアの url は / 始まりのパスで渡し、絶対 URL への解決はここで行う
type UnfurledMedia = { url: string };
type TextDisplay = { type: 10; content: string };
type Thumbnail = { type: 11; media: UnfurledMedia; description: string };
type Section = { type: 9; components: TextDisplay[]; accessory: Thumbnail };
type MediaGallery = { type: 12; items: { media: UnfurledMedia; description: string }[] };
type Separator = { type: 14 };
// 許可されたキー以外を含むとペイロード全体が無効になる
type LinkButton = { type: 2; style: 5; label: string; url: string };
type ActionRow = { type: 1; components: LinkButton[] };
type ContainerChild = TextDisplay | Section | MediaGallery | Separator | ActionRow;

// --highlight の既定値 oklch(0.625 0.118 90)。Discord のライトとダークの両テーマで 3:1 を超える
const accentColor = 0xa3841f;

export const useDiscordEmbed = (components: ContainerChild[]) => {
  const { discordEmbedAssetOrigin } = useRuntimeConfig().public;
  const resolveMedia = (media: UnfurledMedia) => ({ url: `${discordEmbedAssetOrigin}${media.url}` });

  const footer: ContainerChild[] = [
    { type: 14 },
    {
      type: 9,
      components: [{ type: 10, content: `-# [${siteName}](${siteUrl}/)` }],
      accessory: { type: 11, media: { url: "/logo.png" }, description: `${siteName} のロゴ` },
    },
  ];

  const payload = {
    component: {
      type: 17,
      accent_color: accentColor,
      components: [...components, ...footer]
        .map((component) => {
          switch (component.type) {
            case 1:
              return { ...component, components: component.components.filter((button) => button.url) };
            case 9:
              return { ...component, accessory: { ...component.accessory, media: resolveMedia(component.accessory.media) } };
            case 12:
              return { ...component, items: component.items.map((item) => ({ ...item, media: resolveMedia(item.media) })) };
            default:
              return component;
          }
        })
        .filter((component) => component.type !== 1 || component.components.length > 0),
    },
  };

  useHead({
    script: [
      {
        key: "discord-component-embed",
        id: "discord:component-embed",
        type: "application/json",
        innerHTML: JSON.stringify(payload).replaceAll("<", "\\u003c"),
      },
    ],
  });
};
