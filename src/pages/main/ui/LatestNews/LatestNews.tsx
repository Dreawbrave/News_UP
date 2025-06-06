import { useGetLatestNewsQuery } from "@/entities/news/api/newsApi";
import styles from "./styles.module.css";
import { NewsList } from "@/widgets/news";
import { INews } from "@/entities/news";
import { useAppDispatch } from "@/app/appStore";
import { setCurrentNews } from "@/entities/news/model/newsSlice";
import { useNavigate } from "react-router-dom";

const LatestNews = () => {
  const { data, isLoading } = useGetLatestNewsQuery(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateTo = (news: INews) => {
    dispatch(setCurrentNews(news));
    navigate(`/news/${news.title.replace(/[^a-zA-Z0-9]/g, "-")}`);
  };

  const articles: INews[] = (data && Array.isArray(data.articles)) ? data.articles : [];

  return (
    <section className={styles.section}>
      <NewsList
        type="banner"
        direction="row"
        news={articles}
        isLoading={isLoading}
        viewNewsSlot={(news: INews) => (
          <p onClick={() => navigateTo(news)} style={{ cursor: "pointer", color: "#6b4eff" }}>View more...</p>
        )}
      />
    </section>
  );
};

export default LatestNews;
