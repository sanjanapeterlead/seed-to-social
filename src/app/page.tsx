"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackEvent} from "@/src/lib/tracking";
import { captureUtm} from "@/src/lib/utm";

export default function Home() {

  useEffect(()=>{
    captureUtm();
    trackEvent({eventName: "page_view", metaData: {page: "home"}})
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <p className="mb-4 text-sm font-medium text-zinc-400">
          Seed-to-Social Growth Engine
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Turn one idea into a complete social content campaign.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          A Buffer-aligned growth engineering project that combines content
          generation, platform validation, CSV export, attribution tracking,
          A/B testing, and conversion analytics.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tool"
            className="rounded-xl bg-white px-5 py-3 font-medium text-black"
          >
            Try the generator
          </Link>

          <a
            href="https://github.com/"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-medium text-zinc-200"
          >
            View GitHub
          </a>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            "AI content repurposing",
            "Growth tracking",
            "A/B testing and analytics",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}