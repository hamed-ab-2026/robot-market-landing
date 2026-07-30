"use client";

import { ConfigProvider } from "antd";
import { COLORS } from "@/constants/theme";

/**
 * Single place where Ant Design's design tokens are mapped onto
 * the Robot Market palette, and where the whole component library
 * is switched to RTL. Any Ant component used anywhere in the app
 * (Drawer, Button, Form, etc.) automatically inherits this.
 */
export default function AntThemeProvider({ children }) {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          colorPrimary: COLORS.primary,
          colorLink: COLORS.primary,
          colorInfo: COLORS.primary,
          borderRadius: 14,
          fontFamily: "var(--font-vazirmatn), Tahoma, sans-serif",
        },
        components: {
          Button: {
            controlHeight: 46,
            borderRadius: 999,
          },
          Drawer: {
            colorBgElevated: COLORS.background,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
