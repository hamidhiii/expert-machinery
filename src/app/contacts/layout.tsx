import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с EXPERT MACHINERY: подбор редукторов, мотор-редукторов, насосов и муфт по вашим параметрам. Телефон +998 99 198 51 98.",
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
