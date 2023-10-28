import type { Metadata } from "next";
import { GeistSans, GeistMono } from 'geist/font'
import "ui/tailwind.css"
import "./globals.css"
import { Navigation } from "../components/navigation";
import { getNavLinks } from "../data/navigation";


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


  return (
    <html lang="en">
      <body className={`${GeistMono.variable} ${GeistSans.variable}`}>
        <Navigation links={links} />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
