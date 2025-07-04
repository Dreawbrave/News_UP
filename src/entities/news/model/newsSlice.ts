import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFilters } from "../../../shared/interfaces";
import { PAGE_SIZE } from "../../../shared/constants/constants";
import { INews } from "..";

interface State {
  news: INews[];
  filters: IFilters;
  currentNews: INews | null;
}

const loadCurrentNews = () => {
  try {
    const data = localStorage.getItem("currentNews");
    if (data) return JSON.parse(data);
  } catch {}
  return null;
};

const initialState: State = {
  news: [],
  currentNews: loadCurrentNews(),
  filters: {
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: "",
  },
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<INews[]>) => {
      state.news = action.payload;
    },
    setCurrentNews: (state, action: PayloadAction<INews | null>) => {
      state.currentNews = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem("currentNews", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("currentNews");
        }
      } catch {}
    },
    setFilters: (
      state,
      action: PayloadAction<{ key: string; value: string | null | number }>
    ) => {
      const { key, value } = action.payload;
      state.filters = { ...state.filters, [key]: value };
    },
  },
});

export const { setNews, setFilters, setCurrentNews } = newsSlice.actions;

export default newsSlice.reducer;
