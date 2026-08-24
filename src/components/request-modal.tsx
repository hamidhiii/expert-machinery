"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageCircle, X } from "lucide-react";
import { company } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

type RequestModalContextValue = {
  open: (subject?: string) => void;
  close: () => void;
};

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

export function useRequestModal() {
  const ctx = useContext(RequestModalContext);
  if (!ctx) {
    throw new Error("useRequestModal must be used within a RequestModalProvider");
  }
  return ctx;
}

const fieldClass =
  "h-12 w-full rounded-lg border border-line bg-paper/60 px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-flame focus:bg-white";

export function RequestModalProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [sent, setSent] = useState(false);

  const open = useCallback((nextSubject?: string) => {
    setSubject(nextSubject ?? "");
    setSent(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <RequestModalContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={t("form.modalTitle")}
          >
            <motion.div
              className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lift sm:p-10"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label={t("header.close")}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-paper hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>

              {sent ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-flame" />
                  <p className="display text-2xl text-ink">{t("form.success")}</p>
                  <p className="text-sm text-muted">{company.phone}</p>
                </div>
              ) : (
                <>
                  <p className="eyebrow text-flame">
                    <span className="text-flame/60">{company.name} / </span>
                    REQUEST
                  </p>
                  <h2 className="display mt-4 text-3xl text-ink">{t("form.modalTitle")}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{t("form.modalText")}</p>

                  <form
                    className="mt-8 grid gap-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSent(true);
                    }}
                  >
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
                        <input
                          type="email"
                          name="email"
                          placeholder="name@company.com"
                          className={fieldClass}
                        />
                      </label>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-xs font-semibold text-ink/70">{t("form.message")}</span>
                      <textarea
                        name="message"
                        rows={4}
                        defaultValue={subject}
                        placeholder={t("form.messagePlaceholder")}
                        className="w-full rounded-lg border border-line bg-paper/60 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-flame focus:bg-white"
                      />
                    </label>

                    <button
                      type="submit"
                      className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-flame text-sm font-semibold text-white transition hover:bg-flame-dark"
                    >
                      {t("form.submit")}
                    </button>
                    <a
                      href={company.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-line text-sm font-semibold text-ink transition hover:border-ink"
                    >
                      <MessageCircle className="h-4 w-4 text-flame" />
                      {t("common.whatsapp")}
                    </a>
                    <p className="text-center text-[11px] text-muted/80">{t("form.note")}</p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </RequestModalContext.Provider>
  );
}
