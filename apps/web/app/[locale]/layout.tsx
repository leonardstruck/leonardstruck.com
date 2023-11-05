import type { Metadata } from "next";
import { GeistSans, GeistMono } from 'geist/font'
import "ui/tailwind.css"
import "../globals.css"
import { Footer } from "ui"
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Anchor, Navigation } from "@/components/navigation";
import { getNavLinks } from "@/data/navigation";
import { getFooterLinks } from "@/data/footer";
import Providers from "@/components/providers";
import { isLocale, locales, setRequestLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    template: "%s | Leonard Struck",
    default: "Leonard Struck",
  }
};

interface RootLayoutParams {
  locale: string;
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: RootLayoutParams;
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps): Promise<JSX.Element> {
  if (!isLocale(locale)) return notFound();
  setRequestLocale(locale);

  const links = await getNavLinks();
  const footerLinks = await getFooterLinks();

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={`${GeistMono.variable} ${GeistSans.variable} flex flex-col`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navigation links={links} />
            <main className="container flex-1">
              {children}
            </main>
            <Footer asAnchor={Anchor} links={footerLinks} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams(): RootLayoutParams[] {
  return locales.map((locale) => ({ locale }));
}