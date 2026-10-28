import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import { CONTENT, LANGS, isLang } from "@/content";
import { SITE_URL } from "@/site";
import "../globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"] });

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1a2b" },
  ],
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { meta } = CONTENT[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    icons: { icon: "/favicon.ico" },
    alternates: { canonical: `/${lang}`, languages: { "pt-BR": "/pt", en: "/en" } },
    openGraph: {
      type: "profile",
      title: meta.title,
      description: meta.description,
      url: `/${lang}`,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      images: ["/projects/helpdesk-tickets.png"],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"}>
      <body className={`${bricolage.variable} ${sourceSerif.variable} antialiased`}>{children}</body>
    </html>
  );
}
