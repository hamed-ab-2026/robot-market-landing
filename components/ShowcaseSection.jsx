'use client';

import {useEffect, useState} from 'react';
import HorizontalShowcase from './HorizontalShowcase';
import MobileShowcase from './MobileShowcase';

const MOBILE_BREAKPOINT = 768;

export default function ShowcaseSection() {
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
        );

        const handleChange = (event) => setIsMobile(event.matches);

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    if (isMobile === null) return null;

    return isMobile ? <MobileShowcase/> : <HorizontalShowcase/>;
}