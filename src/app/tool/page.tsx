"use client";

import { useState } from "react";
import type { CampaignOutput, Platform, Tone} from "@/src/types/campaign";
import { downloadCsv } from "@/src/lib/csv";
import { validateCampaign } from "@/src/lib/validation";
import { trackEvent } from "@/src/lib/tracking";

const platforms: Platform[] = ["x", "linkedin", "instagram", "tiktok", "pinterest"];

export default function ToolPage() {
    const [seed, setSeed] = useState("")
    const [audience, setAudience] = useState("");
    const [tone, setTone] = useState<Tone>("educational");
    const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([
        "x",
        "linkedin",
        "instagram",
    ]);

    const [output, setOutput] = useState<CampaignOutput | null>(null);
    const [loading, setLoading] = useState(false);

    const [feedback, setFeedback] = useState<"yes" | "maybe" | "no" | null>(null);
    const [feedbackNote, setFeedbackNote] = useState("");

    async function generateCampaign() {
        setLoading(true);
        setOutput(null);

        trackEvent({
          eventName: "generator_started",
          metaData: {
            tone,
            platforms: selectedPlatforms,
          },
        });

        const response = await fetch("/api/generate", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                seed, audience, tone, platforms: selectedPlatforms,
            }),
        });

        let data: { error?: string; output?: CampaignOutput } = {};
        try {
          data = (await response.json()) as { error?: string; output?: CampaignOutput };
        } catch {
          data = {};
        }

        setLoading(false);

        if(!response.ok){
            alert(data.error || "An error occurred while generating the campaign");
            return;
        }

        if (!data.output) {
          alert("No campaign output was returned.");
          return;
        }

        setOutput(data.output);
        const warnings = validateCampaign(data.output);
        if (warnings.length > 0) {
            alert("Warnings:\n" + warnings.join("\n"));
            trackEvent({
              eventName: "generation_completed",
              metaData: { tone, platforms: selectedPlatforms },
            });        
        }

        trackEvent({
          eventName: "generation_completed",
          metaData: {
            tone,
            platforms: selectedPlatforms,
          },
        });
    }

    function togglePlatform(platform: Platform) {
        setSelectedPlatforms((current) =>
        current.includes(platform)? current.filter((p) => p !== platform) : [...current, platform]
        );
    }

    function submitFeedback(answer: "yes" | "maybe" | "no") {
      setFeedback(answer);

      trackEvent({
        eventName: "feedback_submitted",
        metaData: {
          answer,
          note: feedbackNote,
        },
      });
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium text-zinc-400">
            Seed-to-Social Growth Engine
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Turn one raw idea into a multi-platform content campaign.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Built as a growth engineering project: AI content generation,
            platform validation, CSV export, analytics, and experimentation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="text-sm font-medium">Seed idea</label>
            <textarea
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Paste a rough thought, paragraph, or content idea..."
              className="mt-2 min-h-36 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm outline-none focus:border-zinc-400"
            />

            <label className="mt-5 block text-sm font-medium">Audience</label>
            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. junior developers, creators, founders"
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm outline-none focus:border-zinc-400"
            />

            <label className="mt-5 block text-sm font-medium">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm outline-none focus:border-zinc-400"
            >
              <option value="educational">Educational</option>
              <option value="professional">Professional</option>
              <option value="persuasive">Persuasive</option>
            </select>

            <div className="mt-5">
              <p className="text-sm font-medium">Platforms</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`rounded-full border px-3 py-1 text-sm capitalize ${
                      selectedPlatforms.includes(platform)
                        ? "border-white bg-white text-black"
                        : "border-zinc-700 text-zinc-300"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateCampaign}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-medium text-black disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate campaign"}
            </button>
          </div>

          <div className="space-y-4">
            {!output && (
              <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 p-6 text-zinc-400">
                Your generated campaign will appear here.
              </div>
            )}

            {output?.x && (
              <OutputCard
                title="X / Twitter"
                items={[
                  ["Post", output.x.post],
                  ["Characters", `${output.x.characterCount}/280`],
                ]}
              />
            )}

            {output?.linkedin && (
              <OutputCard
                title="LinkedIn"
                items={[
                  ["Hook", output.linkedin.hook],
                  ["Post", output.linkedin.post],
                  ["CTA", output.linkedin.cta],
                ]}
              />
            )}

            {output?.instagram && (
              <OutputCard
                title="Instagram"
                items={[
                  ["Caption", output.instagram.caption],
                  ["Hashtags", output.instagram.hashtags.join(" ")],
                ]}
              />
            )}

            {output?.tiktok && (
              <OutputCard
                title="TikTok"
                items={[
                  ["Hook", output.tiktok.hook],
                  ["Caption", output.tiktok.caption],
                ]}
              />
            )}

            {output?.pinterest && (
              <OutputCard
                title="Pinterest"
                items={[
                  ["Title", output.pinterest.title],
                  ["Description", output.pinterest.description],
                  ["Keywords", output.pinterest.keywords.join(", ")],
                ]}
              />
            )}

            {output?.imagePrompts?.length ? (
              <OutputCard
                title="Visual Prompts"
                items={output.imagePrompts.map((prompt, index) => [
                  `Prompt ${index + 1}`,
                  prompt,
                ])}
              />
            ) : null}

            {output && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h2 className="text-lg font-semibold">Quick feedback</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Was this useful enough that you would use it again?
                </p>

                <textarea
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="Optional: what would make this better?"
                  className="mt-4 min-h-24 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm outline-none focus:border-zinc-400"
                />

                <div className="mt-4 flex gap-2">
                  {(["yes", "maybe", "no"] as const).map((answer) => (
                    <button
                      key={answer}
                      onClick={() => submitFeedback(answer)}
                      className={`rounded-xl border px-4 py-2 text-sm capitalize ${
                        feedback === answer
                          ? "border-white bg-white text-black"
                          : "border-zinc-700 text-zinc-300"
                      }`}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {output && (
                <button
                onClick={() => {
                  downloadCsv(output);
                  trackEvent({ eventName: "csv_exported" , metaData: { tone, platforms: selectedPlatforms } });
                }}
                className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-medium text-black"
            >
              Download Buffer-ready CSV
            </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function OutputCard({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="space-y-4">
        {items.map(([label, value]) => (
          <div key={label}>
            <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
              {label}
            </p>
            <p className="whitespace-pre-wrap text-sm text-zinc-200">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}