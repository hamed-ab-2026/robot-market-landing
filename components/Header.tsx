'use client';

// Fixed navigation with language, theme, account, and cart controls.

import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Badge, Button} from 'antd';
import {ShoppingCartOutlined, MenuOutlined, CloseOutlined, UserOutlined} from '@ant-design/icons';
import {useAppSelector} from '@/store/hooks';
import {selectCartCount} from '@/store/cartSlice';
import {useLanguage} from '@/app/context/LanguageContext';
import {commerceCopy} from '@/data/commerce';
import {accountCopy} from '@/data/account';
import {useAuth} from '@/app/context/AuthContext';
import ProtectedLink from './auth/ProtectedLink';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function Header() {
    const pathname = usePathname();
    const cartCount = useAppSelector(selectCartCount);
    const {t, locale} = useLanguage();
    const auth = useAuth();
    const account = accountCopy[locale];
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        {href: '/#hero', label: t.nav.home},
        {href: '/products', label: commerceCopy[locale].allProducts},
        {href: '/#about', label: t.nav.about},
        {href: '/#locations', label: t.nav.locations},
    ];
    const accountLabel = auth.session?.profile.firstName
        ? `${auth.session.profile.firstName} ${auth.session.profile.lastName}`.trim()
        : auth.session?.profile.phone || account.login;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    console.log(
        "%c👋 Hamed Abdollahzade · Frontend Developer",
        "font-size:14px;font-weight:600;"
    );

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled || pathname !== '/' ? 'bg-page-85 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,166,147,0.25)]' : 'bg-transparent'
            }`}
        >
            <div className="mx-auto max-w-7xl px-5 md:px-8 h-20 flex items-center justify-between gap-4">
                <Link href="/#hero" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 shrink-0">
                    <Image src="/images/icons/logo.png" alt="روبات مارکت" width={150} height={42} priority/>
                </Link>

                <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-secondary hover:text-brand-300 transition-colors whitespace-nowrap"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2 md:gap-3">
                    <div className="hidden md:flex items-center gap-2">
                        <LanguageToggle/>
                        <ThemeToggle/>
                    </div>

                    {auth.isAuthenticated ? (
                        <Button className="hidden sm:inline-flex" icon={<UserOutlined/>} href="/dashboard">{accountLabel}</Button>
                    ) : (
                        <Button className="hidden sm:inline-flex" icon={<UserOutlined/>} onClick={() => auth.openLogin()}>{account.login}</Button>
                    )}

                    <Badge count={cartCount} size="small" offset={[-2, 2]}>
                        <ProtectedLink href="/cart" onClick={() => setMobileOpen(false)}
                              className="w-11 h-11 rounded-full border border-subtle bg-elevated inline-flex items-center justify-center text-xl text-primary hover:text-brand-400">
                            <ShoppingCartOutlined/>
                        </ProtectedLink>
                    </Badge>

                    <button
                        className="xl:hidden text-brand-400 text-2xl"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="menu"
                    >
                        {mobileOpen ? <CloseOutlined/> : <MenuOutlined/>}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <nav
                    className="xl:hidden bg-elevated-95 backdrop-blur-md border-t border-subtle px-5 py-4 flex flex-col gap-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-secondary text-base"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex items-center gap-3 pt-2 border-t border-subtle">
                        <LanguageToggle/>
                        <ThemeToggle/>
                        {auth.isAuthenticated ? (
                            <Button icon={<UserOutlined/>} className="flex-1" href="/dashboard" onClick={() => setMobileOpen(false)}>{accountLabel}</Button>
                        ) : (
                            <Button icon={<UserOutlined/>} className="flex-1" onClick={() => {setMobileOpen(false); auth.openLogin();}}>{account.login}</Button>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
