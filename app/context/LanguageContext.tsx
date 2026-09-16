'use client';

import type {Dispatch, SetStateAction, ReactNode} from 'react';
import type {Locale, SiteContent, Direction} from '@/types/domain';
import {createContext, useContext, useEffect, useState} from 'react';
import {content} from '@/data/content';

interface LanguageContextValue {
    locale: Locale;
    setLocale: Dispatch<SetStateAction<Locale>>;
    toggleLocale: () => void;
    t: SiteContent;
    dir: Direction;
    mounted: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({children}: {children: ReactNode}) {
    const [locale, setLocale] = useState<Locale>('fa');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = window.localStorage.getItem('rm-locale');
        if (saved === 'fa' || saved === 'en') setLocale(saved);
        setMounted(true);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.lang = locale;
        root.dir = content[locale].dir;
        window.localStorage.setItem('rm-locale', locale);
    }, [locale]);

    const toggleLocale = () => setLocale(l => (l === 'fa' ? 'en' : 'fa'));

    return (
        <LanguageContext.Provider
            value={{locale, setLocale, toggleLocale, t: content[locale], dir: content[locale].dir, mounted}}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
