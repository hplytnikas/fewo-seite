"use client";

import { Image } from "@heroui/react";
import styles from "./homecard.module.css";
import NextImage from "next/image";
import { motion } from "framer-motion";

interface FewoCardProps {
  text: string;
  textTitle: string;
  image: string;
  altText: string;
  imageLeft: boolean;
}

export default function HomeCard({
  text,
  image,
  altText,
  imageLeft,
  textTitle,
}: FewoCardProps) {
  return (
    <div className={styles.container}>
      {imageLeft ? (
        <>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            exit={{ opacity: 0, x: -100 }}
            viewport={{ once: false, amount: 0.15 }}
            className={styles.motionDiv}
          >
            <div className={styles.image}>
                <NextImage
                    className={styles.accImage}
                    alt={altText}
                    src={image}
                    fill
                />
            </div>

            <div className={styles.text}>
              <h2 className={styles.textTitle}> {textTitle}</h2>
              <p>{text}</p>
            </div>
          </motion.div>
        </>
      ) : (
        <>
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.15 }}
            exit={{ opacity: 0, x: 100 }}
            className={styles.motionDiv}
          >
          <div className={styles.text}>
            <h2 className={styles.textTitle}> {textTitle}</h2>
            <p>{text}</p>
          </div>
          <div className={styles.image}>
            <NextImage
              className={styles.accImage}
              alt={altText}
              src={image}
              fill
            />
          </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
