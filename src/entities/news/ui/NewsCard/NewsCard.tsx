import { formatTimeAgo } from "@/shared/helpers/formatTimeAgo";
import { INews } from "../..";
import styles from "./styles.module.css";
import Image from "@/shared/ui/Image/Image";
import { ReactNode } from "react";

interface Props {
  item: INews;
  type: "banner" | "item";
  viewNewsSlot?: (news: INews) => ReactNode;
  onImageError?: () => void;
}

const NewsCard = ({ item, type = "item", viewNewsSlot, onImageError }: Props) => {
  // Не рендерим карточку, если urlToImage невалидный
  const isValid = typeof item.urlToImage === 'string' && item.urlToImage.trim() !== '' && item.urlToImage.startsWith('http');
  if (!isValid) return null;

  return (
    <li className={`${styles.card} ${type === "banner" && styles.banner}`}>
      {type === "banner" ? (
        <Image image={item.urlToImage} onError={onImageError} />
      ) : (
        <div className={styles.wrapper}>
          <Image image={item.urlToImage} onError={onImageError} />
        </div>
      )}

      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.extra}>
          {formatTimeAgo(item.publishedAt)} by {item.author || item.source.name}
        </p>
      </div>

      {viewNewsSlot ? viewNewsSlot(item) : null}
    </li>
  );
};

export default NewsCard;
