'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { ConfigProvider, theme as antdThemeApi } from 'antd';
import faIR from 'antd/locale/fa_IR';
import enUS from 'antd/locale/en_US';
import { store } from '@/store/store';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AntdBridge({ children }) {
  const { theme } = useTheme();
  const { locale, dir } = useLanguage();

  const antdTheme = {
    algorithm: theme === 'dark' ? antdThemeApi.darkAlgorithm : antdThemeApi.defaultAlgorithm,
    token: {
      colorPrimary: '#00a693',
      colorInfo: '#00a693',
      borderRadius: 10,
      fontFamily: 'var(--font-vazirmatn), Tahoma, sans-serif',
      colorBgContainer: theme === 'dark' ? '#0c2b24' : '#ffffff',
      colorBgElevated: theme === 'dark' ? '#0f332b' : '#ffffff',
      colorBorder: theme === 'dark' ? '#0b3d38' : '#c0ebe3',
      colorText: theme === 'dark' ? '#e6f7f4' : '#04231f',
      colorTextSecondary: theme === 'dark' ? 'rgba(230,247,244,0.7)' : 'rgba(4,35,31,0.65)',
    },
    components: {
      Button: { controlHeight: 44, fontWeight: 600 },
      Badge: { colorError: '#ff6b57' },
      Modal: {
        contentBg: theme === 'dark' ? '#0c2b24' : '#ffffff',
        headerBg: theme === 'dark' ? '#0c2b24' : '#ffffff',
        titleColor: theme === 'dark' ? '#e6f7f4' : '#04231f',
      },
      Drawer: {
        colorBgElevated: theme === 'dark' ? '#0c2b24' : '#ffffff',
      },
    },
  };

  return (
    <ConfigProvider direction={dir} locale={locale === 'fa' ? faIR : enUS} theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
}

export default function Providers({ children }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <AntdBridge>{children}</AntdBridge>
        </LanguageProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
