'use client';

// دکمه سوییچ حالت روشن/تیره.

import { Button, Tooltip } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '@/app/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
      <Button
        shape="circle"
        size="large"
        onClick={toggleTheme}
        aria-label="toggle theme"
        icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
      />
    </Tooltip>
  );
}
