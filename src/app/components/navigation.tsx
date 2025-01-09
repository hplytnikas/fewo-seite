"use client";

import Link from "next/link";
import styles from "./navigation.module.css";
import { usePathname, useRouter } from "next/navigation";
import LangSwitcher from "./languageswitcher";
import { useTranslation } from "react-i18next";

export default function Navigation() {
    // const router = useRouter();
    const isHome = usePathname() === "/";
    console.log(isHome);
    const { t } = useTranslation();

    return (
        <nav className={`${styles.navigation} ${!isHome ? styles.otherBg : styles.homeBg}`}>
            <LangSwitcher />
            <Link href="/" className={styles.navButton}>
                Home
            </Link>
            <Link href="/availability" className={styles.navButton}>
                {t('availability')}
            </Link>
            <Link href="/gallery" className={styles.navButton}> 
                {t('gallery')}
            </Link>
            <Link href="/contact" className={styles.navButton}>
                {t('contact')}
            </Link>
            <Link href="/requestform" className={styles.requestButton}>
                {t('request now')}
            </Link>
        </nav>
    )
}
