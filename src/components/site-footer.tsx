"use client";

import Link from "next/link";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { navItems } from "@/lib/catalog";
import { LogoLockup } from "@/components/logo";
import { useRequestModal } from "@/components/request-modal";
import { useLanguage } from "@/lib/i18n";
import { useSiteData } from "@/lib/site-data";

export function SiteFooter() {
  const { t, tr } = useLanguage();
  const { open } = useRequestModal();
  const { company } = useSiteData();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr] lg:px-8 2xl:px-12">
        <div>
          <LogoLockup dark />
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/50">{t("footer.about")}</p>
        </div>

        <div>
          <p className="eyebrow text-white/40">{t("footer.sections")}</p>
          <div className="mt-6 grid gap-3.5 text-sm text-white/80">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-flame">
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-white/40">{t("footer.contacts")}</p>
          <div className="mt-6 grid gap-3">
            <Link href={company.phoneHref} className="text-xl font-semibold transition hover:text-flame">
              {company.phone}
            </Link>
            <Link href={`mailto:${company.email}`} className="text-xl font-semibold transition hover:text-flame">
              {company.email}
            </Link>
            <p className="mt-2 text-sm text-white/50">{tr(company.address)}</p>
            <p className="text-sm text-white/50">{t("contacts.hoursValue")}</p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-white/40">{t("form.title")}</p>
          <p className="mt-6 text-sm leading-7 text-white/50">{t("form.text")}</p>
          <button
            type="button"
            onClick={() => open()}
            className="group mt-6 inline-flex h-12 items-center gap-2.5 rounded-lg bg-flame px-6 text-sm font-semibold text-white transition hover:bg-flame-dark"
          >
            {t("common.request")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] flex-col gap-2 px-4 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 2xl:px-12">
          <span>
            © {new Date().getFullYear()} {company.legalName}. {t("footer.rights")}
          </span>
          <span className="flex items-center gap-5">
            <Link
              href={company.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-flame"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Link>
            <Link
              href={company.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-flame"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
