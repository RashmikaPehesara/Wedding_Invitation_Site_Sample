import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond, Montserrat } from "next/font/google";
import { clientData } from "@/config/clientData";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${clientData.couple.groom.name} & ${clientData.couple.bride.name} - Wedding Invitation`,
  description: `Join us in celebrating the wedding of ${clientData.couple.groom.fullName} and ${clientData.couple.bride.fullName}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inject theme variables from clientData
  const themeVars = {
    "--primary": clientData.theme.primary,
    "--secondary": clientData.theme.secondary,
    "--accent": clientData.theme.accent,
    "--text": clientData.theme.text,
    "--background": clientData.theme.background,
  } as React.CSSProperties;

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${montserrat.variable} antialiased`}
        style={themeVars}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
