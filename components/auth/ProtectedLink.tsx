'use client';

import type {MouseEvent, ReactNode} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/app/context/AuthContext';

export default function ProtectedLink({href, children, className, onClick}: {href: string; children: ReactNode; className?: string; onClick?: () => void}) {
    const auth = useAuth();
    const router = useRouter();
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.();
        if (!auth.isAuthenticated) {
            event.preventDefault();
            auth.openLogin(() => router.push(href));
        }
    };
    return <Link href={href} className={className} onClick={handleClick}>{children}</Link>;
}
