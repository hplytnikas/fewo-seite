import FewoCard from "./fewocard";
import Navigation from "./navigation";
import styles from './card.module.css';

export default function Homepage() {
    return (
        <div className="bg-white-500 w-full h-screen flex flex-col"
        style={{ backgroundImage: "url('/schonbrunn.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginTop: "-4rem",
            padding: "4rem",
            justifyContent: "center",
            alignItems: "center"
            // marginBottom: "0.5rem"
         }}>
            <h1 className="mt-5">Willkommen, wähle eine Unterkunft oder so</h1>
            <div className={styles.cardContainer}>
                <FewoCard name="Villa for You"/>
                <FewoCard name="Linde"/>
            </div>
        </div>
    )
}