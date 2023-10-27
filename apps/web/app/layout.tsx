import type { Metadata } from "next";
import { Inter, JetBrains_Mono as Mono } from "next/font/google";
import "ui/tailwind.css"
import "./globals.css"
import { Navigation } from "../components/navigation";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetBrainsMono = Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    template: "%s | Leonard Struck",
    default: "Leonard Struck",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        <Navigation />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
