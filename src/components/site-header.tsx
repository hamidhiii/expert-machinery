"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { company, navItems } from "@/lib/catalog";
import { LogoLockup } from "@/components/logo";
import { localeLabels, locales, useLanguage } from "@/lib/i18n";

export function SiteHeader() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="EXPERT MACHINERY">
          <LogoLockup />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  active ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-1 sm:flex"
            role="group"
            aria-label={t("header.lang")}
          >
            {locales.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={`rounded-full px-2.5 py-1.5 text-xs font-black transition ${
                  locale === code ? "bg-ink text-white" : "text-slate-500 hover:text-ink"
                }`}
              >
                {localeLabels[code]}
              </button>
            ))}
          </div>

          <Link
            href={company.phoneHref}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-flame px-4 text-sm font-black text-white transition hover:bg-flame-dark"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{company.phone}</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? t("header.close") : t("header.menu")}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-bold text-ink hover:bg-slate-100"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 px-4 pb-2 sm:hidden">
              {locales.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`rounded-full px-3 py-2 text-xs font-black ${
                    locale === code ? "bg-ink text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {localeLabels[code]}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
