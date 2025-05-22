import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/common/Header";
import { ThemeProvider } from "next-themes";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Saaransh - AI-Powered PDF Summarizer",
  description: "Saaransh is a next app for summarizing PDFs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/Trans_logo.svg" type="image/svg+xml" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main>{children}</main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
