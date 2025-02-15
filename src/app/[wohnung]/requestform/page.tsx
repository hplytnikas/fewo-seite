import Navigation from "@/app/components/navigation";
import styles from "./requestform.module.css";

export default function Page() {
    return (
        <>
            <Navigation wohnungUrl="kaefer" home={false}/>
            <div className={styles.container}>
                <p> Request Form </p>
            </div>
        </>
    )
}