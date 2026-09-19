declare global {
  interface Window {
    Typekit: { load: (options: { async: boolean }) => void };
  }
}

export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        src: "https://use.typekit.net/ylu0yhm.js",
        defer: true,
        onload: () => window.Typekit.load({ async: true }),
      },
    ],
  });
});
