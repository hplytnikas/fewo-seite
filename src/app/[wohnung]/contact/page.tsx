"use client";

import Navigation from "@/app/components/navigation";
import styles from "./contact.module.css";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
} from "@vis.gl/react-google-maps";

export default function Page() {
  const { t } = useTranslation();
  // console.log("key: " + process.env.GOOGLE_API as string);
  const { wohnung } = useParams();
  const addr = wohnung === "linde" ? "Kefergasse 8, 1140 Wien" : "Schrutkagasse 22, 1130 Wien";
  const addrCoords = wohnung === "linde" ? { lat: 48.19485100446728, lng: 16.278777968050015 } : { lat: 48.18312662439454, lng: 16.27837281349389 };

  return (
    <>
      <Navigation home={false} />
      <div className={styles.container}>
        {/* <p> Contact of {wohnung}</p> */}
        <div className={styles.contact}>
        <h1 className={styles.title}> {t("contact title")}</h1>
          <p> Name: Klaudia Schäfer</p>
          <p> {t("phone")}: +43 650 2176406</p>
          <p> {t("email")}: fewo@gmail.com (fake) </p>
          <p> {t("address")}: {addr} </p>
        </div>

        <APIProvider
          apiKey={"AIzaSyD6l-5_KdHbA_qooSj7qsMiwCS0WQdzV90"} //{process.env.GOOGLE_API as string}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <div className={styles.map}>
            <Map
              style={{ width: "100%", height: "100%" }}
              className={styles.map}
              
              defaultZoom={16}
              defaultCenter={{
                lat: addrCoords.lat,
                lng: addrCoords.lng,
              }}
              onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log(
                  "camera changed:",
                  ev.detail.center,
                  "zoom:",
                  ev.detail.zoom
                )
              }
            >
              <Marker
                position={{ lat: addrCoords.lat, lng: addrCoords.lng }}
              />
            </Map>
          </div>
        </APIProvider>
      </div>
    </>
  );
}
