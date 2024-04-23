import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "../components/Navbar";
import { useTranslations } from "next-intl";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App List",
  description:
    "List of upcoming Movie with the details release, rating, actors",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const t = useTranslations("Index");

  const links = [
    { name: t("home"), href: "/" },
    { name: t("favorite"), href: "/favorites", key: "favorites" },
  ];

  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Navbar links={links} locale={locale} />
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </>
  );
}
