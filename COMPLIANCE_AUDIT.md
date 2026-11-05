# EDUP6023 Compliance Audit — The Ultimate Sports Quest

**Audit date:** 4 November 2026 · **Version:** 1.0 (first build)

**Overall status: NOT YET FULLY COMPLIANT.** The interactive game is fully built, but the required **real audio (MP3)** and **real video (MP4)** files, and the original images, have **not been supplied yet**. The players and controls are built and ready, but the media requirements cannot honestly be marked as met until the files are added and tested.

Legend: ✅ Met · 🟡 Built, waiting for media or verification · ❌ Not met · ⬜ Not yet tested

## 1. EDUP6023 multimedia requirements

| # | Requirement | Where | Status | Notes |
|---|---|---|---|---|
| 1 | Learning introduction and objectives | Welcome + Objectives screens | ✅ (content) / 🟡 (verification) | Objectives are **provisional**; DSKP standards are pending verification. |
| 2 | Interactive notes (text + graphics) | 📒 Notes (top bar), Decoder Notes (CP3) | ✅ | Tap-to-flip note cards with icons, height-bar graphic, letter-change graphic and a superlative table. |
| 3 | Actual playable audio with play/pause | Listen buttons (welcome, objectives, 6 clues, grammar, model report) | 🟡 **Waiting for MP3s** | Play/pause/resume is built. Every button currently shows "AUDIO NOT YET AVAILABLE". No online text-to-speech is used. |
| 4 | Actual playable video with play/pause | CP4 Sports Replay Screen | 🟡 **Waiting for MP4** | Play, Pause, Replay, progress bar and volume are built. It currently shows "VIDEO NOT YET AVAILABLE". |
| 5 | Interactive animation requiring pupil actions | Card flips (CP1), drag-and-drop (CP2), padlock (CP3), referee + timer (CP4), studio (CP5), token/map, trophy/confetti | ✅ | All are triggered by pupil actions. |
| 6 | Formative assessment with immediate feedback | Every checkpoint; CP6 final assessment | ✅ | Instant right/wrong feedback, shake/pop animations, coach reactions, hints and 10/5 points. |

## 2. Brief requirements checklist

| Area | Status | Notes |
|---|---|---|
| HTML5 / CSS3 / vanilla JS, no frameworks, CDN, API keys or backend | ✅ | No external requests of any kind. |
| Relative asset paths; works offline with local media | ✅ (by design) / ⬜ tested | |
| Visual design (stadium, spotlights, clouds, stars, confetti, trophy, bold buttons) | ✅ | Pure CSS/SVG. |
| Uploaded images used as assets (board, covers, coach poses, equipment) | 🟡 | **Not supplied.** Labelled placeholders show the expected filenames. Missing files are listed in the Teacher Panel. |
| Welcome screen (title, spotlights, trophy, stars, coach, buttons, toggles) | ✅ | The coach is a placeholder until the image is added. |
| Team selection (4 teams, colours, mascots, shown throughout) | ✅ | |
| HUD (team, points, stars, checkpoints) + localStorage + Reset | ✅ | |
| Objectives screen + Listen (local MP3 only) | ✅ / 🟡 audio | |
| Stadium map: 6 % positioned markers, glow rings, locks, badges, moving token, progress bar, sounds, stars | ✅ | Uses the illustrated placeholder board until `sports-quest-board.png` is added. |
| Sequential unlocking | ✅ | Only CP1 is open at the start. |
| CP1 Sports Detective (6 cards, clues, flip, choices, feedback, tracker, Fact File prompt, clue audio) | ✅ / 🟡 audio | |
| CP2 Equipment Match (drag, touch, click-to-match, validation, animations) | ✅ | Pointer Events plus a tap-to-match/keyboard fallback. Every zone is checked before completion. |
| CP3 Grammar Decoder (7 sentences in order, Decoder Wheel step, typed answers, tolerant matching, lock animation) | ✅ | Ignores capitals, extra spaces, punctuation and a leading "the". |
| CP4 Virtual Referee (referee, whistle, timer, replay screen, questions, scoreboard, feedback) | ✅ / 🟡 video | |
| CP5 Sports Reporter (studio, desk, mic, coach, word cards, starters, editable text, model audio, speaking steps, teacher confirmation) | ✅ / 🟡 audio | Optional MediaRecorder recording with permission and a manual fallback. **No speech recognition is claimed.** |
| CP6 Champion Zone (5 question types, feedback, points, 6 badges, trophy, confetti, team, certificate, reflection) | ✅ | The certificate prints through the browser's print dialog. |
| Background music optional, autoplay respected | ✅ | Off by default. Uses `background-music.mp3` if present, otherwise an original Web Audio loop. |
| Scoring 10/5, 1 star per checkpoint, no repeat points | ✅ | Each item is scored once and stored by ID. |
| Documentation (README, Teacher Manual, Storyboard, this audit) | ✅ | |
| ZIP for Netlify | ✅ | `ultimate-sports-quest-netlify.zip` (contains no media yet). |

## 3. Asset register

| Asset filename | Source / creator | Educational purpose | Copyright / usage permission | AI-generated? | Teacher verification |
|---|---|---|---|---|---|
| `assets/images/sports-quest-board.png` | To be supplied by teacher (original) | Interactive checkpoint map | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/coach-welcome.png` | Teacher (original hijab coach character) | Welcoming pupils | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/coach-instructions.png` | Teacher | Giving instructions | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/coach-celebrate.png` | Teacher | Correct-answer feedback | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/coach-encourage.png` | Teacher | Encouragement after mistakes | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/coach-unlock.png` | Teacher | Checkpoint unlocking | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/coach-achievement.png` | Teacher | Achievements / Champion Hall | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/checkpoint-1-cover.png` … `checkpoint-6-cover.png` | Teacher | Checkpoint identity on the map | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/equipment-racket-shuttlecock.png` | Teacher | Equipment recognition (CP2, CP6) | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/equipment-football.png` | Teacher | Equipment recognition | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/equipment-goggles.png` | Teacher | Equipment recognition | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/equipment-bicycle-helmet.png` | Teacher | Equipment recognition | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/equipment-basketball.png` | Teacher | Equipment recognition | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/images/equipment-hockey-stick-puck.png` | Teacher | Equipment recognition (CP2, CP6) | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/audio/welcome-narration.mp3` | To be recorded by teacher | Welcome narration | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/audio/learning-objectives.mp3` | To be recorded | Objectives narration | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/audio/clue-*.mp3` (6 files) | To be recorded | Sports vocabulary listening | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/audio/grammar-explanation.mp3` | To be recorded | Superlative explanation | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/audio/reporter-model.mp3` | To be recorded | Speaking model | Teacher to confirm | Teacher to declare | ❌ Not supplied |
| `assets/audio/background-music.mp3` (optional) | To be supplied (royalty-free) | Optional atmosphere | Must be royalty-free / licensed | Teacher to declare | ❌ Not supplied (synth fallback used) |
| `assets/video/referee-replay.mp4` | To be produced by teacher | Sports replay for CP4 | Teacher to confirm (consent if pupils appear) | Teacher to declare | ❌ Not supplied |
| Stadium background, map placeholder, trophy, padlock, referee, microphone, studio (CSS/SVG in `style.css`/`script.js`) | Created in code for this project | Visual design, animation | Original to this project | Generated with AI coding assistance | ⬜ Teacher to review |
| Sound effects + fallback music loop (Web Audio synthesis in `script.js`) | Created in code for this project | Feedback sounds | Original to this project | Generated with AI coding assistance | ⬜ Teacher to review |
| Emoji icons (🏸 ⚽ 🏊 …) | Device's built-in emoji font | Icons and fallbacks | System font, appearance varies by device | No | ⬜ Teacher to review |

## 4. Incomplete or unverified elements

1. **Real MP3 narration:** not supplied (EDUP6023 item 3 is not yet met).
2. **Real MP4 video:** not supplied (EDUP6023 item 4 is not yet met).
3. **Original images** (board, coach poses, covers, equipment): not supplied; placeholders are in use.
4. **DSKP learning standards:** pending verification; none are stated.
5. **Learning objectives and the 30-minute duration:** provisional, awaiting teacher confirmation.
6. **Physical kit integration:** the game prompts for the kit but cannot detect its use. Teacher observation is needed.
7. **Speaking assessment:** teacher-confirmed only. No speech recognition exists.
8. **Browser and device testing:** not yet done (see below).

## 5. Testing record

**What was actually checked:** the JavaScript file was parsed for syntax errors (passed), and the logic was reviewed by reading the code.
**What was NOT done:** no one has played through the game in a browser or on a laptop or tablet. Please fill in this table during your own testing.

| Test | Laptop (Chrome/Edge) | Tablet (Safari/Chrome) | Notes |
|---|---|---|---|
| Every button responds | ⬜ | ⬜ | |
| Team selection + HUD shows team | ⬜ | ⬜ | |
| Only CP1 unlocked at start; unlocks in order | ⬜ | ⬜ | |
| CP1 card flip + answers | ⬜ | ⬜ | |
| CP2 mouse drag | ⬜ | n/a | |
| CP2 touch drag | n/a | ⬜ | |
| CP2 tap-to-match fallback | ⬜ | ⬜ | |
| CP3 typed answers (caps / spaces / "the") | ⬜ | ⬜ | |
| CP4 timer, whistle, scoreboard | ⬜ | ⬜ | |
| CP4 video controls (after MP4 added) | ⬜ | ⬜ | |
| CP5 builder, check, teacher confirm | ⬜ | ⬜ | |
| CP5 optional recording (permission flow) | ⬜ | ⬜ | |
| CP6 questions, badges, confetti, certificate print | ⬜ | ⬜ | |
| Audio play/pause (after MP3s added) | ⬜ | ⬜ | |
| "AUDIO/VIDEO NOT YET AVAILABLE" shown when missing | ⬜ | ⬜ | |
| Scoring 10/5, no repeat points on replay | ⬜ | ⬜ | |
| Progress saved after page reload | ⬜ | ⬜ | |
| Reset clears everything | ⬜ | ⬜ | |
| Layout fits without awkward scrolling | ⬜ | ⬜ | |
| Works offline (local files) | ⬜ | ⬜ | |
