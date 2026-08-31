import VueGtag, { trackRouter } from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  const optOutParam = new URLSearchParams(location.search).get("analytics");
  if (optOutParam === "off") {
    document.cookie = "analytics=off; path=/; max-age=31536000; samesite=lax";
  } else if (optOutParam === "on") {
    document.cookie = "analytics=off; path=/; max-age=0; samesite=lax";
  }

  const isTrackableVisitor =
    location.hostname === "newt239.dev" &&
    !navigator.webdriver &&
    !/HeadlessChrome|Playwright|Puppeteer|Electron|bot|crawler|spider/i.test(navigator.userAgent) &&
    !document.cookie.split("; ").includes("analytics=off");

  if (!isTrackableVisitor) {
    return;
  }

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-WP0FNML0VP",
    },
  });
  trackRouter(useRouter());
});
