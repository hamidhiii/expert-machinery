"use client";

import type { FormEvent, InputHTMLAttributes } from "react";
import { useLanguage, type TranslationKey } from "@/lib/i18n";
import { formatPhone, isValidPhone } from "@/lib/phone";

/**
 * Request-form inputs with validation and localized messages. Limits mirror
 * the admin API (LeadCreate), so a request the browser accepts is never
 * rejected as a whole by the server.
 */

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type">;

/** Shows our message instead of the browser's generic one, per failed rule. */
function useMessages(messages: Partial<Record<"missing" | "pattern" | "type" | "short", TranslationKey>>) {
  const { t } = useLanguage();

  return {
    onInvalid(event: FormEvent<HTMLInputElement>) {
      const input = event.currentTarget;
      const { validity } = input;
      const key =
        (validity.valueMissing && messages.missing) ||
        (validity.tooShort && messages.short) ||
        (validity.typeMismatch && messages.type) ||
        (validity.patternMismatch && messages.pattern);
      if (key) input.setCustomValidity(t(key));
    },
    // Clear it on edit, or the field would stay invalid forever.
    onInput(event: FormEvent<HTMLInputElement>) {
      event.currentTarget.setCustomValidity("");
    },
  };
}

/** At least one letter, no digits: "Иван", "Anna-Maria", "Айгерім". */
export function NameInput(props: InputProps) {
  const messages = useMessages({ missing: "form.error.required", pattern: "form.error.name" });
  return (
    <input
      {...props}
      {...messages}
      required
      name="name"
      autoComplete="name"
      maxLength={150}
      pattern="[^0-9]*\p{L}[^0-9]*"
    />
  );
}

/** Digits only, formatted while typing; letters can't be entered at all. */
export function PhoneInput(props: InputProps) {
  const { t } = useLanguage();

  function check(input: HTMLInputElement) {
    const message = !input.value
      ? t("form.error.required")
      : isValidPhone(input.value)
        ? ""
        : t("form.error.phone");
    input.setCustomValidity(message);
  }

  return (
    <input
      {...props}
      required
      name="phone"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      maxLength={20}
      placeholder="+7 700 000 00 00"
      onFocus={(event) => {
        if (!event.currentTarget.value) event.currentTarget.value = "+7 ";
      }}
      onBlur={(event) => {
        // A bare prefix counts as empty, so "required" still catches it.
        if (event.currentTarget.value.replace(/\D/g, "") === "7") event.currentTarget.value = "";
      }}
      onChange={(event) => {
        const input = event.currentTarget;
        // Kazakh numbers are +7 7xx: an 8 right after the pre-filled "+7 " is the
        // habit of dialling 8 instead of +7, not part of the number.
        const typed = input.value.replace(/\D/g, "") === "78" ? "+7 " : input.value;
        input.value = typed === "+7 " ? typed : formatPhone(typed);
        check(input);
      }}
      onInvalid={(event) => check(event.currentTarget)}
    />
  );
}

/** Requires a domain with a dot: the browser alone accepts "a@b", the API does not. */
export function EmailInput(props: InputProps) {
  const messages = useMessages({ type: "form.error.email", pattern: "form.error.email" });
  return (
    <input
      {...props}
      {...messages}
      name="email"
      type="email"
      inputMode="email"
      autoComplete="email"
      maxLength={254}
      pattern="[^@\s]+@[^@\s]+\.[^@\s]{2,}"
      placeholder="name@company.com"
    />
  );
}

export function CompanyInput(props: InputProps) {
  return <input {...props} name="company" autoComplete="organization" maxLength={200} />;
}

/** Same cap as /api/request, the e-mail fallback. */
export const MESSAGE_MAX_LENGTH = 2000;
