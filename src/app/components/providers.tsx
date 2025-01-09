"use client";

import { ReactNode, useEffect } from 'react';
import Navigation from './navigation';
import { useTranslation } from 'react-i18next';
import '@/app/i18n';

// import '../../i18n'; // Import i18next configuration';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const { i18n } = useTranslation();

    useEffect(() => {
        const language = localStorage.getItem('i18nextLng') || 'en';
        i18n.changeLanguage(language);
        document.documentElement.lang = language;
      }, [i18n]);

    return (
        <>
            {/* <Navigation /> */}
            {children}
        </>
    )
  }