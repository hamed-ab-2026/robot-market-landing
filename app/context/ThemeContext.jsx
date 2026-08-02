'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // پیش‌فرض سایت حالا «روشن» (light) است. اگر کاربر قبلاً تم را عوض کرده باشد
  // (ذخیره‌شده در localStorage) همان ترجیح رو حفظ می‌کنیم؛ در غیر این صورت فقط
  // اگر سیستم کاربر صراحتاً روی حالت تیره تنظیم شده باشد، تیره را انتخاب می‌کنیم.
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // On mount: read saved preference, else fall back to system preference
  // (but default stays light unless the OS explicitly prefers dark).
  useEffect(() => {
    const saved = window.localStorage.getItem('rm-theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    setMounted(true);
  }, []);

  // Reflect theme on <html> class + persist.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    window.localStorage.setItem('rm-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
