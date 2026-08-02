'use client';

// دکمه سوییچ زبان فارسی/انگلیسی.

import { Button, Tooltip } from 'antd';
import { useLanguage } from '@/app/context/LanguageContext';

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <Tooltip title={locale === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}>
      <Button shape="circle" size="large" onClick={toggleLocale} aria-label="toggle language">
        {locale === 'fa' ? 'EN' : 'فا'}
      </Button>
    </Tooltip>
  );
}
