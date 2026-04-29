import type { Metadata } from "next";
import DynamicProvider from "@/components/DynamicProvider";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentFlow",
  description: "Agentic Workflow Architecture & Automation Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} dark antialiased h-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <DynamicProvider>
          {children}
        </DynamicProvider>
      </body>
    </html>
  );
}
