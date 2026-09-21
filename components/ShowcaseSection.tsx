'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {PhoneOutlined} from '@ant-design/icons';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';
import HorizontalShowcase from './HorizontalShowcase';
import MobileShowcase from './MobileShowcase';

const MOBILE_BREAKPOINT = 768;

export default function ShowcaseSection() {
    const {t, locale} = useLanguage();
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
    if (!isMobile)
        return (
            <>
                <HorizontalShowcase />
                <section className="px-6 md:px-16 py-14 bg-surface border-t border-subtle">
                    <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-subtle bg-elevated p-7">
                        <div className="max-w-2xl">
                            <h3 className="text-2xl font-bold text-primary">{copy.supportOrderTitle}</h3>
                            <p className="mt-3 text-secondary leading-7">{copy.supportOrderDescription}</p>
                        </div>
                        <a
                            href={`tel:${t.contactInfo.orderPhoneHref}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-ink-950 transition-colors hover:bg-brand-300"
                            dir="ltr"
                        >
                            <PhoneOutlined />
                            <span>{copy.callSupport}</span>
                            <span>{t.contactInfo.orderPhone}</span>
                        </a>
                    </div>
                </section>
            </>
        );

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
