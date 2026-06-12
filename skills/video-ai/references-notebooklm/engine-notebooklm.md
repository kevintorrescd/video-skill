# NotebookLM Video Generation Guide

> **Isolation Notice:** This module is **self-contained**. To remove NotebookLM support from the video-ai skill, simply delete the entire `references-notebooklm/` directory. No other files in the skill depend on this module — it is referenced from `SKILL.md` only as an optional engine path. Removing this directory requires no edits to any other file unless you also want to remove the NotebookLM row from the Supported Engines table in SKILL.md.

---

## Overview

NotebookLM is Google's AI-powered research and content tool. Its **Video Overview** feature uses **Gemini** (large language model) combined with **Veo** (video generation model) to produce cinematic, narrated video summaries from uploaded source documents.

Unlike HyperFrames and Remotion — which give you frame-level control over every pixel — NotebookLM generates video autonomously. You provide the source material and high-level style instructions; the AI decides the visual composition, pacing, narration, and motion graphics.

This makes NotebookLM ideal for rapid prototyping and documentary-style educational overviews, but unsuitable for projects that require exact brand fidelity at the pixel level.

---

## When to Use NotebookLM

| Scenario | Fit |
|---|---|
| Quick video summary of an existing document, PDF, or article | ✅ Excellent |
| Cinematic / documentary-style educational content | ✅ Excellent |
| Rapid prototyping of a video concept before investing in HyperFrames/Remotion | ✅ Good |
| Content where visual determinism is not critical | ✅ Good |
| Projects requiring exact GOLGOTHA ACADEMY brand fidelity (colors, fonts, layout) | ❌ Not recommended |
| Frame-by-frame animation control | ❌ Not possible |
| Videos longer than 3 minutes | ❌ Not supported |
| Data-driven visualizations or interactive elements | ❌ Not supported |

**Summary:** Use NotebookLM when speed matters more than pixel-perfect brand control, and when the source material is text-heavy and well-structured.

---

## Limitations

1. **No frame-level control.** You cannot specify exact layouts, positions, or animations. The AI composes each frame autonomously.
2. **Duration cap.** Videos are limited to approximately 1–3 minutes.
3. **Subscription required.** The Video Overview feature requires a **Google AI Ultra** subscription (part of Google One AI Premium).
4. **Brand guidelines are best-effort.** You can provide custom instructions that reference the GOLGOTHA ACADEMY palette and style, but the AI may not follow them precisely. Light backgrounds and clean aesthetics are generally respected; exact hex colors are not guaranteed.
5. **Limited iteration.** You can regenerate the video, but you cannot edit specific sections or frames. Each generation is a full re-render.
6. **Narration language.** The AI-generated narration defaults to English. Spanish narration can be requested via custom instructions but results vary.
7. **No direct API.** All interaction is through the NotebookLM web interface. There is no programmatic pipeline.

---

## Source Preparation

The quality of the generated video depends heavily on the quality of the input sources. Follow these guidelines to get the best results:

### Document Structure

- **Use clear headings** (H1, H2, H3) to define sections. NotebookLM uses these to segment the video into logical chapters.
- **Front-load key concepts.** Place the most important information at the beginning of each section.
- **Keep paragraphs short** (3–5 sentences). Dense blocks of text produce rushed narration.
- **Include definitions** for technical terms. The AI will incorporate them naturally into the narration.

### Content Optimization

- **Highlight key terms** using bold or italic formatting. These signal importance to the model.
- **Use numbered lists** for sequential processes or steps. The AI tends to visualize these as progressive reveals.
- **Include concrete examples.** Abstract concepts without examples produce vague visuals.
- **Add context sentences** like "This is important because…" or "The key takeaway is…" to guide emphasis.

### What to Avoid

- Very long documents (> 20 pages). Split into focused chapters instead.
- Tables with many columns. The AI struggles to visualize complex tabular data.
- Heavily formatted documents with complex layouts. Plain text with headings works best.
- Multiple conflicting sources. Keep sources consistent to avoid contradictory narration.

### Recommended Source Formats

| Format | Suitability |
|---|---|
| Google Docs | ✅ Best — native integration |
| PDF (text-based) | ✅ Good |
| Plain text / Markdown | ✅ Good |
| Web URLs (public) | ✅ Good |
| Scanned PDFs (image-based) | ⚠️ OCR quality varies |
| Spreadsheets | ❌ Not recommended |

---

## Custom Instructions Template

When creating a Video Overview in NotebookLM, paste the following into the **custom instructions** field. Modify the bracketed sections to match your specific video topic.

```
=== GOLGOTHA ACADEMY EDUCATIONAL VIDEO — CUSTOM INSTRUCTIONS ===

VISUAL STYLE:
- Use clean, light backgrounds. Avoid dark themes or heavy textures.
- Prefer white or very light gray (#f8fafc) as the base background.
- Use green (#059669) as the primary accent color for highlights, icons, and key visual elements.
- Use blue (#2563eb) as a secondary accent for informational callouts.
- Use amber/yellow (#d97706) sparingly for warnings or important notes.
- Avoid neon colors, decorative gradients, or visually cluttered compositions.
- Maintain generous whitespace and clear visual hierarchy.

TYPOGRAPHY PREFERENCES:
- Use clean, modern sans-serif fonts.
- Titles should be bold and large.
- Body text should be readable and well-spaced.

TONE AND DELIVERY:
- Educational and professional, like a university tutor explaining to students.
- Confident but approachable. Not overly casual, not stiff.
- Explain concepts step by step. Do not rush through complex ideas.
- Use analogies and real-world examples to make abstract concepts tangible.

CONTENT STRUCTURE:
- Open with a clear statement of what the viewer will learn.
- Break the content into 3-5 logical sections.
- End with a concise summary of key takeaways.

FORMAT:
- Style: [Cinematic / Explainer / Brief]
  - Cinematic: Polished, documentary-like. Best for overviews and introductions.
  - Explainer: Step-by-step walkthrough. Best for tutorials and how-tos.
  - Brief: Quick summary. Best for recaps and highlights.

LANGUAGE:
- Narration in [Spanish / English].
- Use clear, precise vocabulary appropriate for [beginner / intermediate / advanced] learners.

TOPIC:
- [Describe the specific topic, e.g., "Introduction to neural network architectures, focusing on CNNs and RNNs, for undergraduate computer science students."]

BRANDING:
- This video is part of the GOLGOTHA ACADEMY educational brand.
- If possible, incorporate the brand name in the opening and closing segments.

=== END INSTRUCTIONS ===
```

### Format Options Explained

| Format | Duration | Best For |
|---|---|---|
| **Cinematic** | 2–3 min | Course introductions, topic overviews, motivational openers |
| **Explainer** | 1–2 min | Step-by-step tutorials, process walkthroughs, concept breakdowns |
| **Brief** | 30–60 s | Quick recaps, chapter summaries, social media teasers |

---

## Step-by-Step: Generating a Video with NotebookLM

1. **Open NotebookLM** at [notebooklm.google.com](https://notebooklm.google.com).
2. **Create a new notebook** (or open an existing one).
3. **Upload sources** — Add the documents, PDFs, or URLs that contain your educational content. Follow the Source Preparation guidelines above.
4. **Open the Studio panel** — Click on "Studio" or "Audio Overview" (the panel that offers generated media).
5. **Select "Video Overview"** — Choose the video generation option.
6. **Paste custom instructions** — Use the template above, filling in the bracketed sections for your topic.
7. **Select format** — Choose Cinematic, Explainer, or Brief.
8. **Generate** — Click generate and wait. Generation typically takes 2–5 minutes.
9. **Review** — Watch the generated video. Check for:
   - Accurate content (no hallucinated facts)
   - Appropriate pacing (not too rushed, not too slow)
   - Visual style alignment (light backgrounds, clean composition)
   - Narration quality and language
10. **Regenerate if needed** — If the result is unsatisfactory, adjust your custom instructions and regenerate. Each generation is independent; previous results are not carried over.
11. **Download** — Once satisfied, download the MP4 file.

---

## Post-Processing Recommendations

Since NotebookLM does not guarantee brand-exact output, consider these post-processing steps:

1. **Add GOLGOTHA ACADEMY intro/outro** — Pre-render a 3–5 s Intro and 3–5 s Closing scene using HyperFrames or Remotion, then concatenate them with the NotebookLM video using FFmpeg:
   ```bash
   ffmpeg -i intro.mp4 -i notebooklm_output.mp4 -i outro.mp4 \
     -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1" \
     final_output.mp4
   ```
2. **Add subtitle overlay** — Generate an SRT file from the narration and burn it in with FFmpeg or a subtitle tool.
3. **Add lower third** — If speaker identification is needed, composite a lower-third graphic in post.
4. **Color grade** — Apply a subtle color correction to align the NotebookLM output closer to the GOLGOTHA ACADEMY palette.

---

## Quality Checklist for NotebookLM Videos

Before delivering a NotebookLM-generated video, verify:

- [ ] Content is factually accurate (no AI hallucinations).
- [ ] Narration language matches the user's request.
- [ ] Visual style is generally clean and light (no dark/neon backgrounds).
- [ ] Video duration is within the expected range.
- [ ] GOLGOTHA ACADEMY branding is present (either in the generated video or added via post-processing).
- [ ] Audio quality is clear and well-paced.
- [ ] Key concepts from the source material are covered.
- [ ] A subtitle file (SRT) is available or can be generated.

---

## Comparison with Other Engines

| Capability | NotebookLM | HyperFrames | Remotion |
|---|---|---|---|
| Brand color fidelity | ⚠️ Best-effort | ✅ Exact | ✅ Exact |
| Frame-level control | ❌ None | ✅ Full | ✅ Full |
| Speed to first video | ✅ Minutes | 🔶 Hours | 🔶 Hours |
| Narration included | ✅ AI-generated | ❌ Manual | ❌ Manual |
| Max duration | ~3 min | Unlimited | Unlimited |
| Programmatic pipeline | ❌ Web UI only | ✅ CLI/API | ✅ CLI/API |
| Reusable components | ❌ No | 🔶 Templates | ✅ React components |
| Data-driven visuals | ❌ No | 🔶 Limited | ✅ Full |

---

## Removal Instructions

To completely remove NotebookLM support from the video-ai skill:

1. Delete the `references-notebooklm/` directory.
2. *(Optional)* Remove the NotebookLM row from the "Supported Engines" table in `SKILL.md`.
3. *(Optional)* Remove the NotebookLM bullet from the "Engine-Specific Instructions" section in `SKILL.md`.
4. *(Optional)* Remove the NotebookLM mention from `agents/agent.yaml`.

No other files depend on this module. Steps 2–4 are cosmetic cleanup only.
