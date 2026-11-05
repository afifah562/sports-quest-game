# The Ultimate Sports Quest — Stadium Adventure

An interactive 2D cartoon sports adventure game for **Malaysian Year 4 ESL pupils**, built as a multimedia educational product for **EDUP6023**.

- **Subject:** English Language · **Year:** 4
- **Textbook context:** Get Smart Plus 4, Unit 9 — *Get Active!*
- **Topic:** Sports and Health
- **Language focus:** Sports vocabulary and superlative adjectives
- **Duration:** about 30 minutes (provisional)
- **Learning standards:** *Pending verification against the official DSKP. No standards are stated in the game.*

Pupils pick a team and explore a stadium map with six checkpoints (Sports Detective, Equipment Match, Grammar Decoder, Virtual Referee, Sports Reporter, Champion Zone), earning points and stars. At the end they get a printable Champion Certificate.

## Technology

- HTML5, CSS3 and vanilla JavaScript only. No frameworks, CDN, API keys, external fonts or external requests.
- Web Audio API for original synthesised sound effects (and a fallback music loop).
- HTML5 `<audio>` / `<video>` for your local MP3 and MP4 files.
- `localStorage` for saving progress (team, points, stars, completed checkpoints, current screen, answers).
- MediaRecorder API (optional; only with the pupil's permission) for speaking practice playback.

## Project structure

```
index.html            Game shell (all screens render inside it)
style.css             All visual design, animations, responsive + print styles
script.js             Game engine, content, scoring, audio/video, saving
netlify.toml          Static hosting config (publish the root, no build)
assets/images/        Your images (see ADD_IMAGES_HERE.txt for exact filenames)
assets/audio/         Your MP3 narration (see ADD_AUDIO_HERE.txt)
assets/video/         Your MP4 video (see ADD_VIDEO_HERE.txt)
README.md             This file
TEACHER_MANUAL.md     Step-by-step classroom instructions
STORYBOARD.md         Screen-by-screen learning design + narration scripts
COMPLIANCE_AUDIT.md   EDUP6023 checklist, asset register, known gaps
ultimate-sports-quest-netlify.zip   Packaged copy of the site for upload
```

## Adding your own media (important)

No images, audio or video were supplied when this version was built, so the game currently uses:

- **Images:** clearly labelled placeholders that show the expected filename (for example, the coach appears as a 🧕 placeholder card and the map uses an illustrated CSS board marked "Placeholder board").
- **Audio:** every Listen button shows **"AUDIO NOT YET AVAILABLE"**.
- **Video:** Checkpoint 4 shows **"VIDEO NOT YET AVAILABLE"** and the video controls are disabled.

To switch to your real assets, copy your files into `assets/images`, `assets/audio` and `assets/video` using the **exact filenames** listed in each folder's `ADD_…_HERE.txt` file. No code changes are needed: the game finds them automatically. The **Teacher Panel** (👩‍🏫 button) shows which assets were found or are missing.

If your Sports Quest Board needs different checkpoint positions, edit `pos: [x%, y%]` for each checkpoint in the `CHECKPOINTS` list near the top of `script.js`. The board's shape is read from the image automatically.

## Run locally

The game is a static site. Any of these will work:

1. **Double-click `index.html`.** Most features work straight from the file system. Some browsers limit media or `localStorage` on `file://`, so option 2 is more reliable.
2. **Use a simple local server** from the project folder, for example:
   - `python3 -m http.server 8000` and open <http://localhost:8000>
   - or `npx serve .`

It works offline once all the local media files are in the folder.

## Deploy to Netlify

**Option A: drag and drop**
1. Unzip `ultimate-sports-quest-netlify.zip` (or use the project folder itself, which has `index.html` at the root).
2. Add your media files to the `assets/` folders.
3. Go to <https://app.netlify.com/drop> and drag the folder onto the page.

**Option B: Git**
Push this folder to a Git repository and connect it in Netlify. `netlify.toml` already tells Netlify to publish the root folder with no build command.

> If you add media files, re-create the ZIP so it includes them: `zip -r ultimate-sports-quest-netlify.zip index.html style.css script.js netlify.toml assets *.md`.

## Scoring rules

- Correct on the first attempt: **10 points**
- Correct after a retry (or after the timer runs out in Checkpoint 4): **5 points**
- Each completed checkpoint: **1 star**
- Points are awarded only once per item, even if a checkpoint is replayed.
- Completing all six checkpoints unlocks **Champion status** and the certificate.

## Testing status

The JavaScript was checked for syntax errors, and the code paths were reviewed by reading them. **The game has not yet been played through in a real browser, laptop or tablet.** Please do the checklist in `COMPLIANCE_AUDIT.md` (section 5) before classroom use.

## Roadmap / what is left

1. Add the original images (board, coach poses, covers, equipment).
2. Record and add the MP3 narration files (scripts are in `STORYBOARD.md`).
3. Add the Checkpoint 4 MP4 replay video.
4. Check the provisional learning objectives against the DSKP and record the verified standards.
5. Run the browser and device test checklist and record the results in `COMPLIANCE_AUDIT.md`.
