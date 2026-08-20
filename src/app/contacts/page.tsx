"use client";

import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { PageHero, Reveal } from "@/components/ui";
import { company, siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function ContactsPage() {
  const { t, tr } = useLanguage();

  const cards = [
    {
      icon: Phone,
      label: t("contacts.phone"),
      value: company.phone,
      href: company.phoneHref,
      accent: true,
    },
    {
      icon: Send,
      label: "Telegram",
      value: company.phone,
      href: company.telegramHref,
      accent: false,
    },
    {
      icon: Mail,
      label: t("contacts.email"),
      value: company.email,
      href: `mailto:${company.email}`,
      accent: false,
    },
    {
      icon: MapPin,
      label: t("contacts.address"),
      value: tr(company.address),
      href: undefined,
      accent: false,
    },
    {
      icon: Clock,
      label: t("contacts.hours"),
      value: t("contacts.hoursValue"),
      href: undefined,
      accent: false,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("contacts.hero.eyebrow")}
        title={t("contacts.hero.title")}
        text={t("contacts.hero.text")}
        image={siteImages.welding}
      />

      <section className="blueprint py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="grid gap-4 self-start">
            {cards.map((card, index) => {
              const content = (
                <span className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      card.accent ? "bg-flame text-white" : "bg-ink text-white"
                    }`}
                  >
                    <card.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                      {card.label}
                    </span>
                    <span className="block truncate text-base font-black text-ink">
                      {card.value}
                    </span>
                  </span>
                </span>
              );

              return (
                <Reveal key={card.label} delay={index * 0.04}>
                  {card.href ? (
                    <Link
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                      className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-flame hover:shadow-card"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.08}>
            <RequestForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
