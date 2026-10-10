import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Контакты",
  description:
    "Контакты Expert Machinery в Астане: телефон, WhatsApp, e-mail и адрес. Подбор редукторов, насосов и муфт по вашим параметрам.",
  path: "/contacts",
});

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
