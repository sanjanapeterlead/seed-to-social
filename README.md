# Seed-to-Social Growth Engine

A growth-focused content platform that turns one raw idea into platform-ready social media posts and tracks how users interact with the tool.

---

## 🚀 Overview

Seed-to-Social solves a real creator problem:

> People don’t struggle to come up with ideas — they struggle to **turn one idea into consistent, multi-platform content** and understand what actually works.

This project is built as a **growth engineering system**, not just an AI tool.

It combines:

* AI content generation
* platform validation
* export workflows
* user analytics
* attribution tracking
* feedback collection

---

## 🧠 Problem

Creators often:

* Start from a blank page every time
* Don’t repurpose content effectively
* Have no feedback loop on what works
* Don’t track how users interact with their content

---

## 💡 Solution

Seed-to-Social:

1. Takes a single “seed idea”
2. Generates platform-specific content for:

   * X (Twitter)
   * LinkedIn
   * Instagram
   * TikTok
   * Pinterest
3. Validates content against platform constraints
4. Exports a scheduling-ready CSV
5. Tracks user actions and feedback
6. Captures acquisition source using UTM parameters

---

## ⚙️ Features

### ✨ AI Content Generation

* Uses local LLM via Ollama (zero API cost)
* Generates structured content per platform
* Includes hooks, captions, hashtags, and prompts

---

### 🧪 Platform Validation

* X character limit checks (280)
* Pinterest title/description limits
* Missing CTA detection
* Hashtag quality checks

---

### 📤 CSV Export (Buffer-aligned)

* Converts generated content into structured CSV
* Ready for scheduling workflows

---

### 📊 Event Tracking

Tracks user behavior:

* `page_viewed`
* `generator_started`
* `generation_completed`
* `csv_exported`
* `feedback_submitted`

---

### 🔗 UTM Attribution

Captures:

* `utm_source`
* `utm_medium`
* `utm_campaign`

Example:

```
/?utm_source=instagram_story&utm_campaign=test
```

This enables tracking:

> Where users came from and how they convert

---

### 🗣️ User Feedback Loop

After generation:

* “Was this useful?” → Yes / Maybe / No
* Optional feedback notes

---

### 📈 Dashboard

Displays:

* Generations
* Exports
* Conversion rates
* Feedback breakdown
* Recent activity

---

### 🗄️ Supabase Integration

* Stores events and generations
* Enables persistent analytics
* Ready for future growth features

---

## 🧱 Tech Stack

* **Frontend:** Next.js, React, TypeScript
* **AI:** Ollama (local LLM)
* **Database:** Supabase (PostgreSQL)
* **Analytics:** Custom event tracking
* **Styling:** Tailwind CSS

---

## 🔄 User Flow

```
Landing Page
↓
User enters seed idea
↓
Selects tone + platforms
↓
AI generates content
↓
Validation feedback shown
↓
User exports CSV
↓
Event + UTM tracked
↓
User submits feedback
↓
Dashboard updates
```

---

## 🎯 Growth Engineering Angle

This project demonstrates:

* Building **user-facing marketing tools**
* Designing **activation flows**
* Tracking **user behavior and conversion**
* Capturing **acquisition sources (UTM)**
* Creating a **feedback loop**
* Making **data-driven product decisions**

---

## ▶️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sanjanapeterlead/seed-to-social.git
cd seed-to-social
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

Run `src/database/initial.sql` in your Supabase SQL editor before starting the app.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

### 4. Run the app

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

### 5. Run Ollama (for AI)

```bash
ollama run llama3.2
```

---

## 🧪 Example Test URL

```
http://localhost:3000/?utm_source=instagram_story&utm_campaign=first_user_test
```

---
## 🧭 Future Improvements

* A/B testing infrastructure
* SEO programmatic pages
* Real-time analytics (PostHog)
* User authentication
* Direct Buffer API integration

---

## 🧨 Key Insight

> This is not just a content generator.
> It is a **growth system** that connects idea → content → user action → feedback → analytics.

---

## 📌 Why This Project

Built to align with the **Growth Engineering** mindset:
* Ship fast
* Measure everything
* Learn from users
* Iterate based on data

---

