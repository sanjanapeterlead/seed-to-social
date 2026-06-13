import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Seed-to-Social",
  description: "Turn one content idea into platform-specific social posts with Ollama and Supabase analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-sm font-semibold tracking-wide text-zinc-100">
              Seed-to-Social
            </Link>

            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="rounded-lg px-3 py-1.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/tool"
                className="rounded-lg px-3 py-1.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                Generator
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-1.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                Dashboard
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
