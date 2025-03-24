"use client"

import { motion } from "framer-motion";
import HomeCard from "../components/homecard";
import Navigation from "../components/navigation";
import styles from "./linde.module.css"
import { image } from "@heroui/react";

export default function Page() {
    const image1 = "/esszimmer.webp";
    const title1 = "Apartment Stuff"
    const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices turpis consectetur nulla viverra dignissim. Maecenas a magna sem. Vivamus in elit non lacus bibendum faucibus sit amet sed mauris. Suspendisse potenti. Cras rutrum enim quis augue volutpat vehicula. Sed quis fringilla quam. Praesent elit sem, ultricies ac interdum non, ultrices eget augue. Fusce a dui quis lorem cursus volutpat nec at mi. Donec consequat neque eu posuere sagittis."
    
    const image2 = "/schlafzimmer1.webp"
    const title2 = "More Apartment Stuff"

    return(
        <>
            <Navigation home={false}/>
            <div className={styles.container}>
            <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className={styles.titleContainer}
          >
                <h1 className={styles.title}>Apartment "Unter der Linde"</h1>
            </motion.div>
                <div className={styles.homecard}>
                    <HomeCard image={image1} text = {text1} textTitle={title1} altText="Esszimmer1 Foto" imageLeft/> 
                </div>
                <div className={styles.homecard}>
                    <HomeCard image={image2} text = {text1} textTitle={title2} altText="Esszimmer1 Foto" imageLeft = {false}/> 
                </div>
                <div className={styles.homecard}>
                    <HomeCard image="/schrutka_profile.webp" text = {text1} textTitle="Title of text" altText="Esszimmer1 Foto" imageLeft/> 
                </div>
                
            </div>
        </>
    )
}