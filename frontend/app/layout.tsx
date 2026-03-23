import type { Metadata } from "next";
import { Raleway, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Kiri – Property management, simplified.",
  description:
    "A centralized platform for landlords to manage properties and automate tenant communication.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
      <Toaster richColors position="bottom-right" />
    </html>
  );
}
