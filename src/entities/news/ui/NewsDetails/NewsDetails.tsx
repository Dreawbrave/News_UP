import { formatTimeAgo } from "@/shared/helpers/formatTimeAgo";
import { INews } from "../..";
import styles from "./styles.module.css";
import Image from "@/shared/ui/Image/Image";

interface Props {
  item: INews;
}

// Удаляет все HTML-теги из строки
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

const NewsDetails = ({ item }: Props) => {
  // Check if content is truncated
  const isTruncated = item.content && /\[\+\d+ chars\]$/.test(item.content);
  const contentText = item.content ? stripHtml(item.content.replace(/\[\+\d+ chars\]$/, "...")) : "";

  return (
    <div className={styles.details}>
      <Image image={item.urlToImage} />
      <div className={styles.description}>
        <h2>{item.title}</h2>
        <p><b>Source:</b> {item.source.name}</p>
        <p><b>Author:</b> {item.author || 'Unknown'}</p>
        <p><b>Published:</b> {formatTimeAgo(item.publishedAt)}</p>
        {contentText && (
          <p><b>Content:</b> {contentText}</p>
        )}
        <a
          className={styles.readmore}
          target="_blank"
          rel="noopener noreferrer"
          href={item.url}
        >
          Read full article on the original website
        </a>
      </div>
    </div>
  );
};

export default NewsDetails;
