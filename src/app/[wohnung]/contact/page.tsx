"use client";

import Navigation from "@/app/components/navigation";
import styles from "./contact.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

export default function Page() {
  const { t } = useTranslation();
  process.env.GOOGLE_API;
  return (
    <>
      <Navigation home={false} />
      <div className={styles.container}>
        <h1 className={styles.title}> {t("contact title")}</h1>
        {/* <p> Contact of {wohnung}</p> */}
        <p> Name: </p>
        <p> Tel: </p>
        <p> Email: </p>
        <p> Addresse: </p>
        <APIProvider
          apiKey={process.env.GOOGLE_API as string}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <p> Google maps rein</p>
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          ></Map>
        </APIProvider>
      </div>
    </>
  );
}
