import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "EXPERT MACHINERY — промышленные редукторы, насосы и приводы",
    template: "%s | EXPERT MACHINERY",
  },
  description:
    "Поставка промышленных редукторов, мотор-редукторов, насосов, муфт и приводных решений для предприятий Узбекистана. Инженерный подбор по параметрам и замена импортных аналогов.",
  keywords: [
    "редукторы Ташкент",
    "мотор-редуктор",
    "промышленные насосы",
    "гидромуфта",
    "EXPERT MACHINERY",
  ],
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">
        <LanguageProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
