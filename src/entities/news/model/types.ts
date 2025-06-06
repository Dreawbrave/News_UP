import { CategoriesType } from "@/entities/category";

export interface INews {
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    id: string | null;
    name: string;
  };
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: INews[];
}
