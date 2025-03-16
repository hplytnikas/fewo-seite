"use client";

import FewoCard from "./fewocard";
import styles from "./card.module.css";
import { useTranslation } from "react-i18next";
import Navigation from "./navigation";

export default function Homepage() {
  const { t } = useTranslation();

  return (
    <>
     <Navigation home={true}/>
     <div
      className="bg-white-500 w-full h-screen flex flex-col"
      style={{
        // backgroundImage: "url('/schonbrunn.webp')"
        backgroundColor: "#768a76",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-4rem",
        padding: "4rem",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      <h1 className="lg:mt-5 lg:mb-2 mb-5 text-3xl text-white ">{t("welcome")}</h1>
      <div className={styles.cardContainer}>
        <FewoCard name="Villa for You" image="/schrutka_profile.webp" wohnungUrl="/villaforyou"/>
        <FewoCard name="Apartment Unter der Linde" image="/kefergasse_profile.webp" wohnungUrl="/linde"/>
      </div>
    </div>
    </>
  );
}
