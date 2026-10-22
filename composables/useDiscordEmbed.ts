// https://docs.discord.com/developers/link-previews/component-embeds
type UnfurledMedia = { url: string };
type TextDisplay = { type: 10; content: string };
type Thumbnail = { type: 11; media: UnfurledMedia; description: string };
type Section = { type: 9; components: TextDisplay[]; accessory: Thumbnail };
type MediaGallery = { type: 12; items: { media: UnfurledMedia; description: string }[] };
type Separator = { type: 14 };
// 許可されたキー以外を含むとペイロード全体が無効になる
type LinkButton = { type: 2; style: 5; label: string; url: string };
type ActionRow = { type: 1; components: LinkButton[] };

// --highlight の既定値 oklch(0.625 0.118 90)。Discord のライトとダークの両テーマで 3:1 を超える
const accentColor = 0xa3841f;

export const useDiscordEmbed = (components: (TextDisplay | Section | MediaGallery | Separator | ActionRow)[]) => {
  const payload = {
    component: {
      type: 17,
      accent_color: accentColor,
      components: components
        .map((component) =>
          component.type === 1
            ? { ...component, components: component.components.filter((button) => button.url) }
            : component
        )
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
