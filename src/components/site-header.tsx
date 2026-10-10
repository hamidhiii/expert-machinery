"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Instagram, Menu, Phone, X } from "lucide-react";
import { navItems } from "@/lib/catalog";
import { LogoLockup } from "@/components/logo";
import { useRequestModal } from "@/components/request-modal";
import { localeLabels, locales, useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";

export function SiteHeader() {
  const { locale, setLocale, t } = useLanguage();
  const { open } = useRequestModal();
  const { company } = useSiteData();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] items-center justify-between gap-4 xl:gap-6 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <Link href="/" aria-label={company.name} className="shrink-0">
          <LogoLockup />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap text-sm font-medium transition ${
                  active ? "text-flame" : "text-ink/70 hover:text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3 xl:gap-4">
          <div
            className="hidden items-center gap-2 sm:flex"
            role="group"
            aria-label={t("header.lang")}
          >
            {locales.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={`text-xs font-bold uppercase transition ${
                  locale === code ? "text-ink" : "text-muted/60 hover:text-ink"
                }`}
              >
                {localeLabels[code]}
              </button>
            ))}
          </div>

          <Link
            href={company.instagramHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition hover:border-flame hover:text-flame sm:inline-flex lg:hidden xl:inline-flex"
          >
            <Instagram className="h-4 w-4" />
          </Link>

          <Link
            href={company.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-medium text-ink transition hover:text-flame 2xl:flex"
          >
            <Phone className="h-4 w-4 text-flame" />
            {company.phone}
          </Link>

          <button
            type="button"
            onClick={() => open()}
            className="group hidden h-11 items-center gap-2.5 whitespace-nowrap rounded-lg bg-flame px-4 xl:px-5 text-sm font-semibold text-white transition hover:bg-flame-dark sm:inline-flex"
          >
            {t("common.request")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? t("header.close") : t("header.menu")}
            aria-expanded={menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line bg-paper lg:hidden">
          <div className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface"
              >
                {t(item.key)}
              </Link>
            ))}

            <div className="mt-3 flex items-center justify-between border-t border-line px-3 pt-4">
              <div className="flex items-center gap-3">
                {locales.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLocale(code)}
                    className={`text-xs font-bold uppercase ${
                      locale === code ? "text-ink" : "text-muted/60"
                    }`}
                  >
                    {localeLabels[code]}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => open()}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-flame px-4 text-sm font-semibold text-white"
              >
                {t("common.request")}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
