"use client";

import { useState, type ChangeEvent } from "react";
import { Paperclip } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/** The admin API's limit for lead attachments. */
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif,application/pdf";

/** "Nameplate photo or file" input; posted as `attachment` with the request. */
export function AttachmentField() {
  const { t } = useLanguage();
  const [fileName, setFileName] = useState("");
  const [tooBig, setTooBig] = useState(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    const oversized = Boolean(file && file.size > MAX_BYTES);
    // Blocks submission through native form validation.
    input.setCustomValidity(oversized ? t("form.fileTooBig") : "");
    setTooBig(oversized);
    setFileName(file?.name ?? "");
  }

  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-ink/70">{t("form.file")}</span>
      <span
        className={`flex h-12 cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 text-sm transition focus-within:border-flame hover:border-flame ${
          tooBig ? "border-flame-dark text-flame-dark" : "border-line text-muted"
        }`}
      >
        <Paperclip className="h-4 w-4 shrink-0 text-flame" />
        <span className="truncate">{fileName || t("form.fileHint")}</span>
        <input type="file" name="attachment" accept={ACCEPT} onChange={onChange} className="sr-only" />
      </span>
      {tooBig ? (
        <span role="alert" className="text-xs text-flame-dark">
          {t("form.fileTooBig")}
        </span>
      ) : null}
    </label>
  );
}
