# AGENTS.md — The Ultimate Sports Quest

An educational adventure game for Year 4 ESL (sports vocabulary + superlative adjectives), built for EDUP6023.

## Hard constraints (from the product owner)
- **Plain static site:** HTML5 + CSS3 + vanilla JS only. **No frameworks, bundlers, CDN, external fonts/images/scripts, API keys or server backend.** Do not add a build step or package.json.
- All asset paths are **relative** (`assets/images|audio|video/...`). The game must work offline.
- **Honesty rules:** never fake media. Missing images show labelled placeholders, missing audio shows "AUDIO NOT YET AVAILABLE" and missing video shows "VIDEO NOT YET AVAILABLE". No online TTS substitutes, and no speech-recognition claims. Do not state DSKP standards (they are pending verification); the objectives are provisional.
- Keep `COMPLIANCE_AUDIT.md` truthful. Only mark something tested if it was actually tested.

## Files
- `index.html`: the shell only (background layers, HUD container, five `<section class="screen">` containers, modal root, toast, confetti canvas, print area).
- `script.js`: everything else, in one IIFE, ordered as: asset register → content data → state/localStorage → helpers → Web Audio SFX/music → AudioMgr → asset check → feedback/animation → HUD/screens → map → CP1–CP6 → modals → global events → init.
- `style.css`: design tokens in `:root`, then sections per screen/checkpoint, responsive breakpoints (1180/960/620px), reduced motion and print (the certificate only, via `#print-area`).

## Key conventions
- **Assets:** register every file in `ASSET_LIST` (type, key, filename, purpose). Use `imgTag(key, …)` for images (placeholder on error) and `audioCtl(key, label)` for narration buttons. `status[path]` tracks found/missing and feeds the Teacher Panel.
- **Scoring:** always use `award(qid, correct)`. It gives 10 on the first try and 5 after any wrong attempt, never more than once per `qid`. Use `complete(n)` to finish a checkpoint (+1 star once, unlock modal).
- **Re-entering checkpoints** rebuilds the UI from `state.answered`, so progress resumes mid-checkpoint.
- **Timers/async UI:** use `later(fn, ms)` (cancelled when the screen changes via `playToken`) and push teardown work to `cleanupFns`.
- **Events:** global delegated click handler on `[data-action]`, `[data-audio]`, `.note-card`, `.tab` and `.team-card`. Per-checkpoint listeners attach to freshly rendered inner elements, never to the persistent `#screen-play` section (that would stack listeners).
- Map hotspots: `CHECKPOINTS[].pos` in % of the board. The board aspect ratio is read from the image.
- localStorage key: `ultimateSportsQuest.v1`.

## Packaging
`ultimate-sports-quest-netlify.zip` is a convenience copy. Regenerate it after changes:
`zip -r ultimate-sports-quest-netlify.zip index.html style.css script.js netlify.toml assets README.md TEACHER_MANUAL.md STORYBOARD.md COMPLIANCE_AUDIT.md`

## Next work (see README roadmap)
Add the teacher's real media, tune the map hotspot positions to the real board, record test results in COMPLIANCE_AUDIT.md and record the verified DSKP standards.
