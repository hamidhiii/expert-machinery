"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { company, navItems } from "@/lib/catalog";
import { LogoLockup } from "@/components/logo";
import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { t, tr } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="blueprint-dark absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute -right-20 top-0 h-64 w-64 rotate-12 bg-flame/20 wedge blur-2xl" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.7fr_1fr] lg:px-8">
        <div>
          <LogoLockup dark />
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{t("footer.about")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={company.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-flame px-5 py-3 text-sm font-black transition hover:bg-flame-dark"
            >
              <Phone className="h-4 w-4" />
              {t("common.call")}
            </Link>
            <Link
              href={company.telegramHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              <Send className="h-4 w-4" />
              Telegram
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-flame">
            {t("footer.sections")}
          </p>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-flame">
            {t("footer.contacts")}
          </p>
          <div className="mt-5 grid gap-4 text-sm font-semibold text-slate-300">
            <Link href={company.phoneHref} className="flex items-start gap-3 text-white">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
              {company.phone}
            </Link>
            <span className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
              {tr(company.address)}
            </span>
            <Link href={`mailto:${company.email}`} className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
              {company.email}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {company.legalName}. {t("footer.rights")}
          </span>
          <span>{company.name}</span>
        </div>
      </div>
    </footer>
  );
}
