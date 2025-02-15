"use client"

import Navigation from "@/app/components/navigation";
import styles from "./contact.module.css";
import { useParams } from "next/navigation";

export default function Page() {
    const { wohnung } = useParams();
    return (
        <>
            <Navigation home={false}/>
            <div className={styles.container}>
                <p> Contact of {wohnung}</p>
            </div>
        </>
    )
}