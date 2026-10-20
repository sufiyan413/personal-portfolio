"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

declare global {
  interface Window {
    __a11yWidgetBootstrapped?: boolean;
    __a11yLocale?: string;
    a11yWidget?: {
      setLocale: (locale: string) => void;
    };
  }
}

export default function AccessibilityWidget() {
  const locale = useLocale();

  useEffect(() => {
    window.__a11yLocale = locale;
    window.a11yWidget?.setLocale(locale);

    if (window.__a11yWidgetBootstrapped) return;
    window.__a11yWidgetBootstrapped = true;

    const script = document.createElement("script");
    script.id = "a11y-widget-loader";
    script.type = "module";
    script.src = "/accessibility/accessibilityScript.js";
    script.async = true;
    document.head.appendChild(script);
  }, [locale]);

  return null;
}
