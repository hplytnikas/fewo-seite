"use client";

import Link from "next/link";
import styles from "./navigation.module.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import LangSwitcher from "./languageswitcher";
import { useTranslation } from "react-i18next";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { useEffect, useState } from "react";

interface NavigationProps {
  home: boolean;
}

export default function Navigation({ home }: NavigationProps) {
  const isHome = usePathname() === "/" || home;
  // console.log(isHome);
  const { wohnung } = useParams();
  const wohnungUrl = usePathname().split("/")[1] || "";
  console.log(wohnungUrl);
  // const wohnungUrl = wohnung ? wohnung : "";

  //Object for translation
  const { t } = useTranslation();

  //check if device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
      document.documentElement.style.setProperty(
        "--window-width",
        `${window.innerWidth}px`
      );
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //navigation menu on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isMobile ? (
        isHome ? (
          <Navbar
          className={`${styles.navigation} ${
            !isHome ? styles.otherBg : styles.homeBg
          }`}
          // className={styles.navigation}
          maxWidth="full"
          position="static"
          // isBlurred={false}
        >
          <NavbarMenuItem>
            <LangSwitcher />
          </NavbarMenuItem>
        </Navbar>
        ) : (

        <Navbar
          className={`${styles.navigation} ${
            !isHome ? styles.otherBg : styles.homeBg
          }`}
          
          maxWidth="full"
          position="sticky"
          onMenuOpenChange={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          isBlurred={false}
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
          </NavbarContent>
          <NavbarContent>
            <NavbarItem
              className={`${styles.requestButton} ${isHome ? styles.homeNone : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={`/${wohnungUrl}/requestform`}>
                {t("request now")}
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu className={styles.menu}>
            <NavbarMenuItem
              className={`${styles.navButton} ${styles.menuNavButton} ${
                isHome ? styles.homeNone : styles.otherNav
              }`}
            >
              <Link
                color="foreground"
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </NavbarMenuItem>

            <NavbarMenuItem
              className={` ${styles.navButton} ${styles.menuNavButton} ${
                isHome ? styles.homeNone : styles.otherNav
              }`}
            >
              <Link
                href={`/${wohnungUrl}/availability`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("availability")}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem
              className={`${styles.navButton} ${styles.menuNavButton} ${
                isHome ? styles.homeNone : styles.otherNav
              }`}
            >
              <Link
                href={`/${wohnungUrl}/gallery`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("gallery")}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem
              className={`${styles.navButton} ${styles.menuNavButton} ${
                isHome ? styles.homeNone : styles.otherNav
              }`}
            >
              <Link
                href={`/${wohnungUrl}/contact`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("contact")}
              </Link>
            </NavbarMenuItem>

            <NavbarMenuItem
                className={` ${styles.menuNavButton}`}>
              <LangSwitcher />
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      ) ): (
        <Navbar
          className={`${styles.navigation} ${
            !isHome ? styles.otherBg : styles.homeBg
          }`}
          // className={styles.navigation}
          maxWidth="full"
          position="static"
          // isBlurred={false}
        >
          <NavbarContent className={styles.langContent} justify="start">
            <NavbarBrand>
              <LangSwitcher />
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className={`${styles.mainContent}`} justify="end">
            <NavbarItem
              className={`${isHome ? styles.homeNone : ""} ${styles.navButton}`}
            >
              <Link color="foreground" href="/">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem
              className={`${isHome ? styles.homeNone : ""} ${styles.navButton}`}
            >
              <Link href={`/${wohnungUrl}/availability`}>
                {t("availability")}
              </Link>
            </NavbarItem>
            <NavbarItem
              className={`${isHome ? styles.homeNone : ""} ${styles.navButton}`}
            >
              <Link href={`/${wohnungUrl}/gallery`}>{t("gallery")}</Link>
            </NavbarItem>
            <NavbarItem
              className={`${isHome ? styles.homeNone : ""} ${styles.navButton}`}
            >
              <Link href={`/${wohnungUrl}/contact`}>{t("contact")}</Link>
            </NavbarItem>
            <NavbarItem
              className={`${isHome ? styles.homeNone : ""} ${
                styles.requestButton
              }`}
            >
              <Link href={`/${wohnungUrl}/requestform`}>
                {t("request now")}
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )}
    </>
  );
}
