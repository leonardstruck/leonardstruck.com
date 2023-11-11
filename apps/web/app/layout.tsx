import type { Metadata } from "next";
import { GeistSans, GeistMono } from 'geist/font'
import "ui/tailwind.css"
import "./globals.css"
import { Footer } from "ui"
import { Anchor, Navigation } from "@/components/navigation";
import { getNavLinks } from "@/data/navigation";
import { getFooterLinks } from "@/data/footer";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Leonard Struck",
    default: "Leonard Struck",
  }
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: RootLayoutProps): Promise<JSX.Element> {
  const links = await getNavLinks();
  const footerLinks = await getFooterLinks();

  return (
    <html lang="en">
      <body className={`${GeistMono.variable} ${GeistSans.variable} flex flex-col`}>
        <Providers>
          <Navigation links={links} />
          <main className="container flex-1">
            {children}
          </main>
          <Footer asAnchor={Anchor} links={footerLinks} />
        </Providers>
      </body>
    </html>
  );
}