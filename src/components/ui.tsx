"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Small orange label above a heading, e.g. "04 / INDUSTRIES". */
export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="eyebrow text-flame">
      {index ? <span className="text-flame/60">{index} / </span> : null}
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  text,
  light = false,
  action,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
        <h2
          className={`display mt-5 text-4xl sm:text-5xl ${light ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
        {text ? (
          <p
            className={`mt-5 max-w-2xl text-[15px] leading-7 ${
              light ? "text-white/60" : "text-muted"
            }`}
          >
            {text}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  target,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-light" | "dark";
  target?: string;
  onClick?: () => void;
}) {
  const styles = {
    primary: "bg-flame text-white hover:bg-flame-dark",
    dark: "bg-ink text-white hover:bg-ink-800",
    outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
    "outline-light": "border border-white/40 text-white hover:bg-white hover:text-ink",
  }[variant];

  const className = `group inline-flex h-12 items-center gap-2.5 rounded-lg px-6 text-sm font-semibold transition ${styles}`;

  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </>
  );

  if (!href) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {inner}
      </button>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className={className}
    >
      {inner}
    </Link>
  );
}

/** Underlined text link with an arrow, used inside cards and section headers. */
export function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold transition ${
        light ? "text-white hover:text-flame" : "text-flame hover:text-flame-dark"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {index > 0 ? <ChevronRight className="h-3 w-3 text-muted/60" /> : null}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-flame">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink/70">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/**
 * Inner-page hero. Every section page uses the same band: a stretched
 * background photo under a translucent white panel, so the site stays on a
 * white base while the photography still shows through.
 */
export function InnerHero({
  breadcrumbs,
  eyebrow,
  title,
  text,
  image,
  action,
  counter,
}: {
  breadcrumbs: { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  action?: ReactNode;
  counter?: string;
}) {
  return (
    <section className="relative isolate border-b border-line bg-paper">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/70"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-12 max-w-3xl rounded-2xl bg-white/70 p-6 backdrop-blur-sm sm:p-9">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display mt-5 text-4xl sm:text-5xl lg:text-[60px]">{title}</h1>
          <p className="mt-6 max-w-xl text-[15px] leading-8 text-muted">{text}</p>
          {action ? <div className="mt-9 flex flex-wrap gap-3">{action}</div> : null}
        </div>

        {counter ? (
          <p className="mt-8 text-right text-xs font-semibold text-muted/70">{counter}</p>
        ) : null}
      </div>
    </section>
  );
}

/** Dark band of key figures, mirroring the reference layout under the hero. */
export function StatsBand({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-ink px-2 py-10 sm:px-8">
            <p className="text-3xl font-bold tracking-display text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs leading-5 text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
