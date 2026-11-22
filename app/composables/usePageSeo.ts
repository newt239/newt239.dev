import { siteName } from "~/lib/constants";

export const usePageSeo = ({ title, ogImage }: { title: string; ogImage?: string }) => {
  useSeoMeta({
    title: `${title} - ${siteName}`,
    ogTitle: `${title} - ${siteName}`,
    ogImage,
    twitterImage: ogImage,
  });
};
