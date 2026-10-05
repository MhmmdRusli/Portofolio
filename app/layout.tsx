import type { Metadata } from "next";
import "./globals.css";

import Starfield from "@/app/components/Starfield";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="relative flex min-h-full flex-col overflow-x-hidden">
        <Starfield />
        <Navbar />
        {children}
      </body>
    </html>
  );
}