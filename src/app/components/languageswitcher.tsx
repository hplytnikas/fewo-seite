import { useTranslation } from "react-i18next";
import styles from "./languagesswitcher.module.css";

export default function LangSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng); // Persist language choice
        document.documentElement.setAttribute('lang', lng);
    };

  return (
    <div className={styles.langContainer}>
      <button onClick={() => changeLanguage('de')} className={styles.langButton}>DE</button>
      <button onClick={() => changeLanguage('en')} className={styles.langButton}>EN</button>
    </div>
  );
}
