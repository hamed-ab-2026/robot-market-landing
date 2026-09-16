'use client';

import type {ReactNode} from 'react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {Button} from 'antd';
import {DashboardOutlined, FileTextOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {useAuth} from '@/app/context/AuthContext';
import {useLanguage} from '@/app/context/LanguageContext';
import {accountCopy} from '@/data/account';

export default function DashboardShell({children}: {children: ReactNode}) {
    const pathname = usePathname();
    const router = useRouter();
    const auth = useAuth();
    const {locale} = useLanguage();
    const copy = accountCopy[locale];
    const links = [
        {href: '/dashboard', label: copy.dashboard, icon: <DashboardOutlined/>},
        {href: '/dashboard/orders', label: copy.orders, icon: <FileTextOutlined/>},
        {href: '/dashboard/profile', label: copy.profile, icon: <UserOutlined/>},
    ];
    const active = (href: string) => href === '/dashboard' ? pathname === href : pathname.startsWith(href);
    return (
        <main className="max-w-7xl mx-auto min-h-[75vh] px-5 md:px-8 pt-28 pb-20">
            <div className="grid lg:grid-cols-[240px,minmax(0,1fr)] gap-7 items-start">
                <aside className="lg:sticky lg:top-28 rounded-2xl border border-subtle bg-elevated p-4">
                    <div className="px-3 py-3 border-b border-subtle mb-3">
                        <p className="font-bold text-primary">{auth.session?.profile.firstName || copy.account}</p>
                        <p className="text-sm text-secondary mt-1" dir="ltr">{auth.session?.profile.phone}</p>
                    </div>
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar">
                        {links.map(link => <Link key={link.href} href={link.href}
                            className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 rounded-xl transition-colors ${active(link.href) ? 'bg-brand text-ink-950 font-bold' : 'text-secondary hover:bg-surface-strong hover:text-primary'}`}>
                            {link.icon}{link.label}
                        </Link>)}
                    </nav>
                    <Button className="mt-3" type="text" danger icon={<LogoutOutlined/>} onClick={() => {auth.logout(); router.push('/');}} block>{copy.logout}</Button>
                </aside>
                <section className="min-w-0">{children}</section>
            </div>
        </main>
    );
}
