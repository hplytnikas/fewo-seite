import Link from 'next/link';
import styles from './card.module.css';

interface FewoCardProps {

    name: string;

}

export default function FewoCard({name} : FewoCardProps) {
    return (
        <div className={styles.container}>
            <div className={styles.cardBody}
            style={{ backgroundImage: "url('/schonbrunn.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
             }}>

            {/* <Image /> */}
                
            </div>
            <div className={styles.link}>
                <Link href="/requestform">{name}</Link>
            </div>
        </div>
    )
}