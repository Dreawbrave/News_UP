import { ParamsType } from "@/shared/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsApiResponse } from "..";
import { setNews } from "../model/newsSlice";

// Временно используем хардкод для тестирования
const BASE_URL = "https://newsapi.org/v2/";
const API_KEY = "93dcebac131b41a2a4c567c1c9f0a626"; // Замените на ваш реальный ключ

// Отладочный вывод
console.log('API Configuration:', {
  BASE_URL,
  API_KEY: API_KEY ? 'present' : 'undefined'
});

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsApiResponse, ParamsType>({
      keepUnusedDataFor: 0,
      query: (params) => {
        const {
          page_number = 1,
          page_size = 10,
          category,
          keywords,
        } = params || {};
        
        const queryParams = {
          q: keywords || 'news',
          pageSize: page_size,
          page: page_number,
          language: 'en',
          sortBy: 'publishedAt',
          apiKey: API_KEY,
          ...(category && { category })
        };

        console.log('Making request with params:', {
          url: "everything",
          params: queryParams
        });
        
        return {
          url: "everything",
          params: queryParams,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const data = result.data;
          console.log('Received data:', data);
          dispatch(setNews(data.articles));
        } catch (error: any) {
          console.error('Error fetching news:', {
            status: error?.error?.status,
            data: error?.error?.data,
            message: error?.error?.message,
            originalStatus: error?.error?.originalStatus
          });
        }
      },
    }),
    getLatestNews: builder.query<NewsApiResponse, null>({
      query: () => {
        return {
          url: "top-headlines",
          params: {
            country: 'us',
            pageSize: 10,
            apiKey: API_KEY
          },
        };
      },
    }),
  }),
});

export const { useGetNewsQuery, useGetLatestNewsQuery } = newsApi;
