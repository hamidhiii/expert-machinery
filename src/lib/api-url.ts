/**
 * Admin API origin. Public: the browser posts request forms (with files) to it
 * directly, because Vercel functions reject bodies over 4.5 MB.
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://api.expertmachinery.kz").replace(
  /\/$/,
  "",
);
