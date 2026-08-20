"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function RequestForm({
  defaultType = "",
  compact = false,
}: {
  defaultType?: string;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  // Prototype: no backend yet, the submit only shows the success state.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-flame/30 bg-flame-soft p-8">
        <CheckCircle2 className="h-10 w-10 text-flame" />
        <p className="text-lg font-black text-ink">{t("form.success")}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm font-black text-flame underline underline-offset-4"
        >
          {t("form.submit")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"
    >
      {!compact ? (
        <>
          <h3 className="text-xl font-black uppercase tracking-tight text-ink">{t("form.title")}</h3>
          <p className="mt-2 text-sm leading-6 text-steel">{t("form.text")}</p>
        </>
      ) : null}

      <div className={`grid gap-4 ${compact ? "" : "mt-6"}`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            name="name"
            placeholder={t("form.name")}
            className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:border-flame focus:bg-white"
          />
          <input
            required
            name="phone"
            placeholder={t("form.phone")}
            className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:border-flame focus:bg-white"
          />
        </div>
        <input
          name="type"
          defaultValue={defaultType}
          placeholder={t("form.typePlaceholder")}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:border-flame focus:bg-white"
        />
        <textarea
          name="details"
          rows={4}
          placeholder={t("form.details")}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-ink outline-none transition placeholder:text-slate-400 focus:border-flame focus:bg-white"
        />
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-flame px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-flame-dark"
      >
        <Send className="h-4 w-4" />
        {t("form.submit")}
      </button>
      <p className="mt-3 text-center text-[11px] font-semibold text-slate-400">{t("form.note")}</p>
    </form>
  );
}
