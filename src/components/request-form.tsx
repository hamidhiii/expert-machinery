"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useRequestSubmit } from "@/lib/submit-request";

const fieldClass =
  "h-12 w-full rounded-lg border border-line bg-paper/50 px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-flame focus:bg-white";

export function RequestForm({ defaultType = "" }: { defaultType?: string }) {
  const { t } = useLanguage();
  const { status, onSubmit, reset } = useRequestSubmit();

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl bg-white p-10">
        <CheckCircle2 className="h-11 w-11 text-flame" />
        <p className="display text-2xl text-ink">{t("form.success")}</p>
        <button
          type="button"
          onClick={reset}
          className="text-sm font-semibold text-flame underline underline-offset-4"
        >
          {t("form.submit")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 sm:p-9">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
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
            <input required name="phone" placeholder="+7 700 000 00 00" className={fieldClass} />
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
            name="message"
            rows={4}
            defaultValue={defaultType}
            placeholder={t("form.details")}
            className="w-full rounded-lg border border-line bg-paper/50 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-flame focus:bg-white"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-flame text-sm font-semibold text-white transition hover:bg-flame-dark disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? t("form.sending") : t("form.submit")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      {status === "error" ? (
        <p role="alert" className="mt-3 text-center text-sm text-flame-dark">
          {t("form.error")}
        </p>
      ) : null}
    </form>
  );
}
