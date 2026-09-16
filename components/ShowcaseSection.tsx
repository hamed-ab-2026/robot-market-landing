'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';
import HorizontalShowcase from './HorizontalShowcase';
import MobileShowcase from './MobileShowcase';

const MOBILE_BREAKPOINT = 768;

export default function ShowcaseSection() {
    const {locale} = useLanguage();
    const copy = commerceCopy[locale];
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    if (isMobile === null) return null;
    if (!isMobile) return <HorizontalShowcase />;

    return (
        <>
            <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-primary">{copy.featuredProducts}</h2>
                <Link href="/products" className="text-brand-400 hover:underline">
                    {copy.allProducts}
                </Link>
            </div>
            <MobileShowcase />
        </>
    );
}
