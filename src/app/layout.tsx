import type { Metadata } from "next";
import "./globals.css";
import { getSiteData } from "@/lib/api";
import { LanguageProvider } from "@/lib/i18n";
import { SiteDataProvider } from "@/lib/site-data";
import { RequestModalProvider } from "@/components/request-modal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "EXPERT MACHINERY — промышленные редукторы, насосы и приводы",
    template: "%s | EXPERT MACHINERY",
  },
  description:
    "Поставка промышленных редукторов, мотор-редукторов, насосов, муфт и приводных решений для предприятий Казахстана. Инженерный подбор по параметрам и замена импортных аналогов.",
  keywords: [
    "редукторы Казахстан",
    "мотор-редуктор",
    "промышленные насосы",
    "гидромуфта",
    "EXPERT MACHINERY",
  ],
  icons: { icon: "/favicon.svg" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();

  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">
        <SiteDataProvider data={data}>
          <LanguageProvider strings={data.strings}>
            <RequestModalProvider>
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
            </RequestModalProvider>
          </LanguageProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
