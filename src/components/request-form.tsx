"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const fieldClass =
  "h-12 w-full rounded-lg border border-line bg-cream/50 px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-flame focus:bg-white";

export function RequestForm({ defaultType = "" }: { defaultType?: string }) {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  // Prototype: no backend yet, submitting only switches to the success state.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl bg-white p-10">
        <CheckCircle2 className="h-11 w-11 text-flame" />
        <p className="display text-2xl text-ink">{t("form.success")}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm font-semibold text-flame underline underline-offset-4"
        >
          {t("form.submit")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 sm:p-9">
      <h3 className="display text-2xl text-ink">{t("form.title")}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{t("form.text")}</p>

      <div className="mt-8 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-semibold text-ink/70">{t("form.name")}</span>
            <input required name="name" placeholder={t("form.name")} className={fieldClass} />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold text-ink/70">{t("form.phone")}</span>
            <input required name="phone" placeholder="+998 00 000 00 00" className={fieldClass} />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold text-ink/70">{t("form.company")}</span>
            <input name="company" placeholder={t("form.company")} className={fieldClass} />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold text-ink/70">{t("form.email")}</span>
            <input type="email" name="email" placeholder="name@company.com" className={fieldClass} />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-ink/70">{t("form.message")}</span>
          <textarea
            name="details"
            rows={4}
            defaultValue={defaultType}
            placeholder={t("form.details")}
            className="w-full rounded-lg border border-line bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-flame focus:bg-white"
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-flame text-sm font-semibold text-white transition hover:bg-flame-dark"
      >
        {t("form.submit")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="mt-3 text-center text-[11px] text-muted/80">{t("form.note")}</p>
    </form>
  );
}
