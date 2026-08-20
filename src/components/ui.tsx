"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-flame">
      <span className="h-px w-8 bg-flame" aria-hidden />
      <span className={light ? "text-flame" : "text-flame"}>{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
        {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
        <h2
          className={`mt-4 text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-[42px] ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {text ? (
          <p className={`mt-4 text-base leading-7 ${light ? "text-slate-300" : "text-steel"}`}>
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
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "ghost" | "light";
  target?: string;
}) {
  const styles = {
    primary: "bg-flame text-white hover:bg-flame-dark",
    dark: "bg-ink text-white hover:bg-ink-700",
    ghost: "border border-slate-300 text-ink hover:border-ink hover:bg-white",
    light: "bg-white text-ink hover:bg-slate-100",
  }[variant];

  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className={`inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-black uppercase tracking-wide transition ${styles}`}
    >
      {children}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  stats,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25 duotone"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/60" aria-hidden />
      <div className="blueprint-dark absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute -bottom-10 right-0 h-56 w-72 rotate-6 bg-flame/25 wedge blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{text}</p>

        {stats?.length ? (
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-ink/80 px-6 py-5">
                <p className="text-3xl font-black text-flame">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function ArrowPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-black text-flame">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </span>
  );
}
