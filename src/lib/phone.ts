/** Phone helpers shared by the request forms and the /api/request route. */

/** "8 700…" / "7700…" / "+7 700…" → "+7 700 000 00 00"; other countries keep "+<digits>". */
export function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits[0] === "8") digits = `7${digits.slice(1)}`;
  // "8 701…" typed or pasted after the "+7 " the field pre-fills: drop the trunk 8.
  if (digits.startsWith("78") && digits.length === 12) digits = `7${digits.slice(2)}`;
  if (digits[0] !== "7") return `+${digits.slice(0, 15)}`;

  const rest = digits.slice(1, 11);
  return ["+7", rest.slice(0, 3), rest.slice(3, 6), rest.slice(6, 8), rest.slice(8, 10)]
    .filter(Boolean)
    .join(" ");
}

/** A full +7 number (11 digits) or any international one of 10–15 digits. */
export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("7") ? digits.length === 11 : digits.length >= 10 && digits.length <= 15;
}
