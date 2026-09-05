"use client";

import Link from "next/link";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { InnerHero, Reveal } from "@/components/ui";
import { company, siteImages } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function ContactsPage() {
  const { t, tr } = useLanguage();

  const cards = [
    { icon: Phone, label: t("contacts.phone"), value: company.phone, href: company.phoneHref },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: company.phone,
      href: company.whatsappHref,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@expertmachinery.kz",
      href: company.instagramHref,
    },
    { icon: Mail, label: t("contacts.email"), value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: t("contacts.address"), value: tr(company.address), href: undefined },
    { icon: Clock, label: t("contacts.hours"), value: t("contacts.hoursValue"), href: undefined },
  ];

  return (
    <>
      <InnerHero
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("nav.contacts") }]}
        eyebrow={`Contact / ${company.name}`}
        title={t("contacts.hero.title")}
        text={t("contacts.hero.text")}
        image={siteImages.meeting}
      />

      <section className="bg-paper py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 2xl:px-12">
          <div className="divide-y divide-line border-y border-line">
            {cards.map((card, index) => {
              const content = (
                <span className="flex items-center gap-5 py-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-flame-soft text-flame">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{card.label}</span>
                    <span className="block truncate text-lg font-semibold tracking-display text-ink">
                      {card.value}
                    </span>
                  </span>
                </span>
              );

              return (
                <Reveal key={card.label} delay={index * 0.03}>
                  {card.href ? (
                    <Link
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                      className="block transition hover:text-flame"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div>{content}</div>
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
