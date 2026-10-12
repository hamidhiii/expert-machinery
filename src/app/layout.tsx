import type { Metadata } from "next";
import type { Company } from "@/lib/catalog";
import "./globals.css";
import { getSiteData } from "@/lib/api";
import { LanguageProvider } from "@/lib/i18n";
import { SiteDataProvider } from "@/lib/site-data";
import { RequestModalProvider } from "@/components/request-modal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

const description =
  "Поставка промышленных редукторов, мотор-редукторов, насосов, муфт, компрессоров, фильтров и масел для предприятий Казахстана. Инженерный подбор по параметрам и замена импортных аналогов.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Expert Machinery Казахстан — редукторы, насосы и промышленные приводы",
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    "Expert Machinery",
    "Эксперт Машинери",
    "редукторы Казахстан",
    "мотор-редуктор купить",
    "промышленные насосы Казахстан",
    "гидромуфта",
    "фильтры Fleetguard",
    "редукторы Астана",
    "AOKMAN",
    "Yilmaz",
    "Standart Pompa",
    "компрессоры Denair",
  ],
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: SITE_NAME,
    url: "/",
    title: "Expert Machinery Казахстан — редукторы, насосы и промышленные приводы",
    description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Search Console / Yandex Webmaster "HTML tag" codes, set in Vercel env.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
  icons: { icon: "/favicon.svg" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();

  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">
        <JsonLd data={organizationLd(data.company)} />
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

/**
 * Who the site belongs to. LocalBusiness (a kind of Organization) adds hours and
 * a sales contact for local results; WebSite name/alternateName is what Google
 * shows as the site name above each result.
 */
function organizationLd(company: Company) {
  const organization = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": organization,
        name: "Expert Machinery",
        legalName: company.legalName,
        alternateName: ["EXPERT MACHINERY", "Эксперт Машинери", "Expert Machinery Казахстан"],
        description,
        url: SITE_URL,
        logo: `${SITE_URL}/expert-machinery-logo.jpg`,
        image: `${SITE_URL}/opengraph-image`,
        email: company.email,
        telephone: company.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.ru,
          addressLocality: "Астана",
          addressCountry: "KZ",
        },
        // Mon–Sat 09:00–18:00, as confirmed by the client.
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: company.phone,
          email: company.email,
          areaServed: "KZ",
          availableLanguage: ["Russian", "Kazakh", "English"],
        },
        areaServed: { "@type": "Country", name: "Kazakhstan" },
        sameAs: [company.instagramHref],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Expert Machinery",
        alternateName: ["Expert Machinery Казахстан", "expertmachinery.kz"],
        inLanguage: "ru",
        publisher: { "@id": organization },
      },
    ],
  };
}
