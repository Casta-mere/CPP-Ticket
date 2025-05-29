import { Container, Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CPP-Ticket",
  description: "CPP-Ticket by Castamere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme appearance="light" accentColor="violet">
          <Flex direction="column" className="min-h-screen">
            {/* <NavBar /> */}
            <main className="p-5">
              <Container>{children}</Container>
            </main>
            <Footer />
          </Flex>
        </Theme>
      </body>
    </html>
  );
}
