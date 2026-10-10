"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { dictionary, locales, type Locale, type TranslationKey } from "@/lib/dictionary";

export { locales, type Locale, type TranslationKey };

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  kk: "KZ",
  en: "EN",
};

/**
 * Catalogue copy is authored in RU/EN; `kk` is optional and falls back to RU so
 * the product texts can be translated gradually without breaking the UI.
 */
export type Localized = { ru: string; en: string; kk?: string };

export function pick(locale: Locale, value: Localized): string {
  return value[locale] ?? value.ru;
}

const STORAGE_KEY = "expert-machinery-locale";

const itemForms: Record<Locale, [string, string, string]> = {
  ru: ["позиция", "позиции", "позиций"],
  kk: ["позиция", "позиция", "позиция"],
  en: ["item", "items", "items"],
};

/** "1 позиция / 2 позиции / 25 позиций" — Russian needs all three forms. */
export function pluralItems(locale: Locale, count: number): string {
  const forms = itemForms[locale];
  if (locale !== "ru") return count === 1 ? forms[0] : forms[1];

  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  tr: (value: Localized) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Copy edited in the admin (API ui-strings), per locale, layered over the built-in dictionary. */
export type UiStrings = Partial<Record<Locale, Record<string, string>>>;

export function LanguageProvider({
  children,
  strings,
}: {
  children: ReactNode;
  strings?: UiStrings;
}) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (locales as readonly string[]).includes(stored)) {
      setLocaleState(stored as Locale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: TranslationKey) =>
      strings?.[locale]?.[key] || dictionary[locale][key] || strings?.ru?.[key] || dictionary.ru[key],
    [locale, strings],
  );

  const tr = useCallback((value: Localized) => pick(locale, value), [locale]);

  const value = useMemo(() => ({ locale, setLocale, t, tr }), [locale, setLocale, t, tr]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
