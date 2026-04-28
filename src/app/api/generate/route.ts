import { NextRequest, NextResponse } from "next/server";
import { mockGenerate } from "@/src/lib/mockGenerate";
import { buildCampaignPrompt } from "@/src/lib/prompts";
import type { CampaignOutput, Platform, Tone } from "@/src/types/campaign";

type GenerateRequestBody = {
    seed: string;
    audience: string;
    tone: Tone;
    platforms: Platform[];
};

function normalizeImagePrompts(imagePrompts: unknown): string[] {
    if (!Array.isArray(imagePrompts)) return [];

    return imagePrompts
        .map((item) => {
            if (typeof item === "string") return item;

            if (item && typeof item === "object") {
                const candidate = (item as { prompt?: unknown }).prompt;
                if (typeof candidate === "string") return candidate;
                return JSON.stringify(item);
            }

            return String(item);
        })
        .filter((value) => value.trim().length > 0);
}

function normalizeCampaignOutput(output: CampaignOutput): CampaignOutput {
    return {
        ...output,
        imagePrompts: normalizeImagePrompts(output.imagePrompts),
    };
}

async function generateWithOllama(prompt: string): Promise<CampaignOutput> {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama3.2",
            prompt,
            stream: false,
            format: "json",
        }),
    });

    if (!response.ok) {
        throw new Error(`Ollama API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.response);

    return parsed as CampaignOutput;
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as Partial<GenerateRequestBody>;

        const seed = (body.seed ?? "").trim();
        const audience = (body.audience ?? "").trim();
        const tone = body.tone;
        const platforms = body.platforms ?? [];

        if (!seed) {
            return NextResponse.json(
                { error: "Seed idea is required." },
                { status: 400 }
            );
        }

        if (!tone) {
            return NextResponse.json({ error: "Tone is required." }, { status: 400 });
        }

        if (!Array.isArray(platforms) || platforms.length === 0) {
            return NextResponse.json(
                { error: "Select at least one platform." },
                { status: 400 }
            );
        }

        const prompt = buildCampaignPrompt({
            seed,
            audience,
            tone,
            platforms,
            platform: platforms[0],
        });

        try {
            const output = normalizeCampaignOutput(await generateWithOllama(prompt));
            return NextResponse.json({ output }, { status: 200 });
        } catch {
            const output = normalizeCampaignOutput(
                mockGenerate({ seed, audience, tone, platforms })
            );
            return NextResponse.json(
                {
                    output,
                    warning: "Ollama unavailable. Returned mock output.",
                },
                { status: 200 }
            );
        }
    } catch {
        return NextResponse.json(
            { error: "Invalid request payload." },
            { status: 400 }
        );
    }
}

