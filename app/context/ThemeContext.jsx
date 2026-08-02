'use client';

import {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({children}) {

    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        const saved = window.localStorage.getItem('rm-theme');
        if (saved === 'light' || saved === 'dark') {
            setTheme(saved);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
        setMounted(true);
    }, []);

  
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        window.localStorage.setItem('rm-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme, mounted}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
