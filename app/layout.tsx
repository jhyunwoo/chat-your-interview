import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Header from "@/app/components/header";
import Sidebar from "@/app/sidebar";

export const metadata: Metadata = {
  title: "Chat Your Interview",
  description: "Chat Your Interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
