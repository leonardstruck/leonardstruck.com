import type { Metadata } from "next";
import { GeistSans, GeistMono } from 'geist/font'
import "ui/tailwind.css"
import "./globals.css"
import { Footer } from "ui"
import Script from "next/script";
import { Anchor, Navigation } from "../components/navigation";
import { getNavLinks } from "../data/navigation";
import { getFooterLinks } from "../data/footer";
import env from "../lib/env";


export const metadata: Metadata = {
  title: {
    template: "%s | Leonard Struck",
    default: "Leonard Struck",
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const links = await getNavLinks();
  const footerLinks = await getFooterLinks();

  return (
    <html lang="en">
      <body className={`${GeistMono.variable} ${GeistSans.variable} flex flex-col`}>
        <Navigation links={links} />
        <main className="container flex-1">
          {children}
        </main>
        <Footer asAnchor={Anchor} links={footerLinks} />
        {env.NODE_ENV === "production" && (
          <Script data-domain="leonardstruck.com" src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
