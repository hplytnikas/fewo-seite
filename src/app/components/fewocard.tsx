import Link from "next/link";
import styles from "./card.module.css";

interface FewoCardProps {
  name: string;
  image: string;
  wohnungUrl: string;
}

export default function FewoCard({ name, image, wohnungUrl }: FewoCardProps) {
  return (
    <div>
      <Link href={wohnungUrl} className={styles.container}>
        <div
          className={styles.cardBody}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center", 
          }}
        >
        </div>
        <div className={styles.link}>{name}</div>
      </Link>
    </div>
  );
}
