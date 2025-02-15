import Navigation from "@/app/components/navigation";
import styles from "./gallery.module.css";

export default function Page() {
  return (
    <>
      <Navigation home={false} />
      <div className={styles.container}>
        <p> Gallery </p>
      </div>
    </>
  );
}
