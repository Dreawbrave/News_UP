import styles from "./styles.module.css";
import { useState } from "react";

interface Props {
  image?: string;
}

const SvgPlaceholder = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', background: '#f2f4f5', borderRadius: 8 }}
  >
    <rect width="80" height="80" rx="8" fill="#f2f4f5" />
    <g>
      <rect x="16" y="50" width="48" height="14" rx="3" fill="#e0e3e8" />
      <rect x="16" y="36" width="32" height="8" rx="2" fill="#e0e3e8" />
      <rect x="16" y="24" width="48" height="8" rx="2" fill="#d1d5db" />
      <rect x="16" y="14" width="32" height="6" rx="2" fill="#d1d5db" />
      <circle cx="64" cy="44" r="6" fill="#d1d5db" />
    </g>
  </svg>
);

const Image = ({ image }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isValid = typeof image === 'string' && image.trim() !== '';
  const src = isValid ? image! : undefined;

  return (
    <div className={styles.wrapper} style={{ position: 'relative' }}>
      {/* SVG Placeholder всегда виден */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <SvgPlaceholder />
      </div>
      {/* Основное изображение, только если оно успешно загрузилось */}
      {isValid && !imgError && (
        <img
          className={styles.image}
          src={src}
          alt="news"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 0.2s' }}
          onLoad={() => setLoaded(true)}
          onError={() => setImgError(true)}
          draggable={false}
        />
      )}
    </div>
  );
};

export default Image;
