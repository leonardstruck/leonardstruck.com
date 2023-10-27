import type { Metadata } from "next";
import { Inter, JetBrains_Mono as Mono } from "next/font/google";
import "ui/tailwind.css"
import "./globals.css"
import type { NavigationLink } from "ui/components/navigation";
import { Navigation } from "../components/navigation";
import { getNavigation } from "../data/navigation";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetBrainsMono = Mono({ subsets: ["latin"], variable: "--font-mono" });

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
  const navigationData = await getNavigation();
  const links: NavigationLink[] = navigationData.links?.map((link) => ({
    text: link.link.label,
    href: "/"
  })) || [];


  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        <Navigation links={links} />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
