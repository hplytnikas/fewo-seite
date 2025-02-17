"use client";

import Navigation from "@/app/components/navigation";
import styles from "./contact.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();
  
  return (
    <>
      <Navigation home={false} />
      <div className={styles.container}>
        <h1 className={styles.title}> {t("contact title")}</h1>
        {/* <p> Contact of {wohnung}</p> */}
        <p> Tel: </p>
        <p> Email: </p>
      </div>
    </>
  );
}
