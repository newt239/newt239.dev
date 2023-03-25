export interface ZennAPIResponse {
  articles: Article[];
  next_page: any;
}

export interface Article {
  id: number;
  post_type: string;
  title: string;
  slug: string;
  published: boolean;
  comments_count: number;
  liked_count: number;
  body_letters_count: number;
  article_type: string;
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string;
  source_repo_updated_at: string;
  path: string;
  user: User;
  publication: any;
}

export interface User {
  id: number;
  username: string;
  name: string;
  avatar_small_url: string;
}

export const fetchZennArticles = async () => {
  const { data } = await useFetch<ZennAPIResponse>(
    "https://zenn.dev/api/articles?username=newt_st21&count=100&order=latest"
  );
  if (!data.value) return [];
  return data.value.articles.map((article) => {
    return {
      title: article.title,
      url: "https://zenn.dev" + article.path,
      date: article.published_at,
    };
  });
};
