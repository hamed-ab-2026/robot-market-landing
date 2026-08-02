'use client';

// هدر ثابت بالای صفحه: لوگو، منوی ناوبری، سوییچ زبان/تم، دکمه ورود به پنل کاربری و آیکون سبد خرید.

import {useState, useEffect} from 'react';
import Image from 'next/image';
import {Badge, Button} from 'antd';
import {ShoppingCartOutlined, MenuOutlined, CloseOutlined, UserOutlined} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import {selectCartCount, openDrawer} from '@/store/cartSlice';
import {useLanguage} from '@/app/context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function Header() {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const {t} = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        {href: '#hero', label: t.nav.home},
        {href: '#showcase', label: t.nav.showcase},
        {href: '#about', label: t.nav.about},
        {href: '#catalog', label: t.nav.catalog},
        {href: '#locations', label: t.nav.locations},
        {href: '#video', label: t.nav.video},
        {href: '#map', label: t.nav.map},
        {href: '#support', label: t.nav.support},
    ];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-page-85 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,166,147,0.25)]' : 'bg-transparent'
            }`}
        >
            <div className="mx-auto max-w-7xl px-5 md:px-8 h-20 flex items-center justify-between gap-4">
                <a href="#hero" className="flex items-center gap-2 shrink-0">
                    <Image src="/images/logo.png" alt="روبات مارکت" width={150} height={42} priority/>
                </a>

                <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-secondary hover:text-brand-300 transition-colors whitespace-nowrap"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2 md:gap-3">
                    <div className="hidden md:flex items-center gap-2">
                        <LanguageToggle/>
                        <ThemeToggle/>
                    </div>

                    <Button
                        className="hidden sm:inline-flex"
                        icon={<UserOutlined/>}
                        href="https://panel.my-rm.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t.nav.login}
                    </Button>

                    <Badge count={cartCount} size="small" offset={[-2, 2]}>
                        <Button
                            shape="circle"
                            size="large"
                            icon={<ShoppingCartOutlined/>}
                            onClick={() => dispatch(openDrawer())}
                            aria-label="cart"
                        />
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
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-secondary text-base"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="flex items-center gap-3 pt-2 border-t border-subtle">
                        <LanguageToggle/>
                        <ThemeToggle/>
                        <Button icon={<UserOutlined/>} className="flex-1">
                            {t.nav.login}
                        </Button>
                    </div>
                </nav>
            )}
        </header>
    );
}
