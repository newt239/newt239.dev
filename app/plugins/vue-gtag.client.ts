import VueGtag, { trackRouter } from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  const optOutParam = new URLSearchParams(location.search).get("analytics");
  if (navigator.cookieEnabled) {
    if (optOutParam === "off") {
      sessionStorage.setItem("analytics", "off");
    } else if (optOutParam === "on") {
      sessionStorage.removeItem("analytics");
    }
  }

  const isTrackableVisitor =
    location.hostname === "newt239.dev" &&
    !navigator.webdriver &&
    !/HeadlessChrome|Playwright|Puppeteer|Electron|bot|crawler|spider/i.test(navigator.userAgent) &&
    optOutParam !== "off" &&
    !(navigator.cookieEnabled && sessionStorage.getItem("analytics") === "off");

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
