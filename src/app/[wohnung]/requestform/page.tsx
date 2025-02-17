"use client"

import Navigation from "@/app/components/navigation";
import styles from "./requestform.module.css";
import { useParams } from "next/navigation";

export default function Page() {
    //logic to check which wohnung it is - automatically knows which one it is 
    const { wohnung } = useParams();


    //info for request:
    /*
    * Name, Lastname
    * Email
    * ??
    * 
    */
    return (
        <>
            <Navigation home={false}/>
            <div className={styles.container}>
                <p> Request Form </p>
            </div>
        </>
    )
}