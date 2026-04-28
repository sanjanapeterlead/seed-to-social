import type {Platform, Tone } from '@/src/types/campaign';

type PromptInput = {
    seed: string;
    platform: Platform;
    tone: Tone; 
    platforms: Platform[];
    audience?: string;
}

export function buildCampaignPrompt(input: PromptInput) {
  return `
You are a growth-focused content strategist.

Turn this seed idea into platform-specific social content.

Seed idea:
${input.seed}

Audience:
${input.audience || "creators"}

Tone:
${input.tone}

Platforms:
${input.platforms.join(", ")}

Return ONLY valid JSON. No markdown. No explanation.

JSON shape:
{
  "x": { "post": "", "characterCount": 0 },
  "linkedin": { "hook": "", "post": "", "cta": "" },
  "instagram": { "caption": "", "hashtags": [] },
  "tiktok": { "hook": "", "caption": "" },
  "pinterest": { "title": "", "description": "", "keywords": [] },
  "imagePrompts": []
}

Rules:
- Only include selected platforms.
- X post must be under 280 characters.
- LinkedIn should be useful and not cringe.
- Pinterest title should be SEO-friendly.
- Hashtags should be relevant, not spammy.
- Image prompts should be clear and visual.
`;
}