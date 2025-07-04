import { NewsCard } from "@/entities/news";
import { INews } from "@/entities/news";
import styles from "./styles.module.css";
import { ReactNode } from "react";
import { useAppDispatch } from "@/app/appStore";
import { setCurrentNews } from "@/entities/news/model/newsSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  news: INews[];
  type?: "banner" | "item";
  viewNewsSlot?: (news: INews) => ReactNode;
  direction?: "row" | "column";
  isLoading?: boolean;
}

const NewsList = ({ news, type = "item", viewNewsSlot }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (item: INews) => {
    dispatch(setCurrentNews(item));
    navigate(`/news/${item.title.replace(/[^a-zA-Z0-9]/g, "-")}`);
  };

  // Фильтруем только новости с валидной картинкой ДО рендера
  const filteredNews = news.filter(
    (item) => typeof item.urlToImage === 'string' && item.urlToImage.trim() !== '' && item.urlToImage.startsWith('http')
  );

  return (
    <ul className={`${type === "item" ? styles.items : styles.banners}`}>
      {filteredNews.map((item) => {
        return (
          <li
            key={item.url}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(item)}
          >
            <NewsCard
              item={item}
              type={type}
              viewNewsSlot={viewNewsSlot}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default NewsList;
