import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PostHogProvider } from "@/components/posthog-provider";

export const metadata: Metadata = {
  title: "BrandonCantrell.ai",
  description:
    "An AI-powered professional experience layer for Brandon Cantrell's analytics engineering, AI product, and data platform work."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
