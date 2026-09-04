export const usePageSeo = ({ title, ogImage }: { title: string; ogImage?: string }) => {
  useSeoMeta({ title: `${title} - newt239.dev`, ogTitle: `${title} - newt239.dev` });
  if (ogImage) {
    useSeoMeta({ ogImage, twitterImage: ogImage });
  }
};
