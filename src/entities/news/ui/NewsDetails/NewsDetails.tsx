import { formatTimeAgo } from "@/shared/helpers/formatTimeAgo";
import { INews } from "../..";
import styles from "./styles.module.css";
import Image from "@/shared/ui/Image/Image";

interface Props {
  item: INews;
}

const NewsDetails = ({ item }: Props) => {
  // Проверяем, обрезан ли контент
  const isTruncated = item.content && /\[\+\d+ chars\]$/.test(item.content);
  const contentText = item.content ? item.content.replace(/\[\+\d+ chars\]$/, "...") : "";

  return (
    <div className={styles.details}>
      <Image image={item.urlToImage} />
      <div className={styles.description}>
        <h2>{item.title}</h2>
        <p><b>Источник:</b> {item.source.name}</p>
        <p><b>Автор:</b> {item.author || 'Неизвестен'}</p>
        <p><b>Опубликовано:</b> {formatTimeAgo(item.publishedAt)}</p>
        {contentText && (
          <p><b>Контент:</b> {contentText} {isTruncated && <span>... <a className={styles.readmore} target="_blank" rel="noopener noreferrer" href={item.url}>Читать полностью</a></span>}</p>
        )}
        {!contentText && (
          <a
            className={styles.readmore}
            target="_blank"
            rel="noopener noreferrer"
            href={item.url}
          >
            Читать полностью на оригинальном сайте
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsDetails;
