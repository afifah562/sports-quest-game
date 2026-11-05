# Storyboard — The Ultimate Sports Quest

Screen-by-screen learning design. Every screen shares the same animated cartoon stadium (sweeping spotlights, floodlights, drifting clouds, bouncing crowd, striped pitch and twinkling stars) and the same top bar (team, points, stars, checkpoints, Map, Notes, Music, Sound, Teacher, Reset).

---

## S0 · Welcome screen
- **Visuals:** animated bouncing title "THE ULTIMATE SPORTS QUEST", a "STADIUM ADVENTURE" ribbon, a floating glowing trophy, the Virtual Sports Coach (welcome pose) and bouncing sports balls.
- **Text:** "WELCOME TO THE ULTIMATE SPORTS QUEST!" · "Explore. Learn. Play. Become a Champion!"
- **Interaction:** Start Adventure · Continue (if saved) · How to Play · Music ON/OFF · Sound ON/OFF · Listen (welcome narration) · Teacher.
- **Audio file:** `welcome-narration.mp3`
- **Script:** *"Hello, champions! Welcome to the Ultimate Sports Quest! I am your Sports Coach. Today we will explore the stadium, learn about sports and become champions. Are you ready? Press Start Adventure!"*

## S1 · Team selection
- Four big team cards: ⚡ Blue Lightning, 🐉 Green Dragons, 🚀 Orange Rockets and 🐆 Purple Panthers, each with its own colour and mascot.
- Selecting a team gives a star burst and a sound. The team colour then themes the top bar and the map token.

## S2 · Learning objectives
- The coach (instructions pose) says: "Here is your mission!"
- "By the end of this adventure, you can:" followed by three tap-to-tick goal cards.
- **Audio file:** `learning-objectives.mp3`
- **Script:** *"By the end of this adventure, you can: one, identify different sports and their equipment. Two, use superlative adjectives correctly. Three, create simple sentences to talk about sports. Let's go to the stadium map!"*

## S3 · Stadium map
- The Sports Quest Board (your image, or an illustrated CSS pitch placeholder) has six percentage-positioned markers on an animated dashed path.
- Marker states: 🔒 locked (grey), glowing pulsing ring (unlocked) and ✔ badge (completed). The team token hops to the current checkpoint.
- An animated progress bar shows "x / 6 checkpoints". The side panel shows the coach, the checkpoint cover image, its focus, its status and an Enter button.
- Tapping a locked marker makes it shake and the coach explains why.

## S4 · Checkpoint 1 — Sports Detective (reading + vocabulary)
- Kit prompt: "Use your Sports Fact File to investigate!"
- There are six purple "?" Mystery Cards. Tapping one flips it to show the clue, and an investigation panel shows the clue, a Listen button and four sport choices.
- Correct: the card shows the sport icon and ✔ Solved, with +10/+5, a star burst and the coach celebrating. Wrong: the choice shakes and greys out, and the coach encourages.
- **Audio scripts:** `clue-badminton.mp3` "Players hit a shuttlecock over a net." · `clue-football.mp3` "Players kick a ball to score goals." · `clue-swimming.mp3` "People move through water using their arms and legs." · `clue-cycling.mp3` "People ride bicycles and wear helmets." · `clue-basketball.mp3` "Players shoot a ball into a hoop." · `clue-ice-hockey.mp3` "Players use sticks to hit a puck on ice."

## S5 · Checkpoint 2 — Equipment Match
- Six sport drop zones with court-style backgrounds (court, pitch, pool lanes, track, basketball court, ice rink) and an "Equipment Bag" tray.
- Interaction: drag with mouse or touch, OR tap the equipment, then tap the sport.
- A correct match snaps into the zone and pops; a wrong one makes the zone and card shake. When all six are matched, the game checks every zone, the zones pop in turn and the unlock celebration plays.

## S6 · Checkpoint 3 — Grammar Decoder (superlatives)
- Kit prompt: "Take a Sentence Card. Spin your Decoder Wheel. Unlock the correct superlative!"
- Left: 📒 Decoder Notes, four flip cards (short words + est, y → iest, most + long word, special words) with graphics (height bars, letter changes) and a grammar Listen button.
- Right: a secret mission panel with a row of seven locks, a big padlock, a sentence card (clue word chip + sentence with a blank), the "I have spun my Decoder Wheel" button, a text box and Unlock.
- Correct: the padlock opens, the blank fills in and the next card loads. Wrong: shake plus a rule hint.
- **Audio file:** `grammar-explanation.mp3`
- **Script:** *"We use superlatives to say which one is number one! For short words, add -est: tall, tallest. For words ending in y, change y to i and add -est: easy, easiest. For long words, use most: most difficult, most popular. Some words are special: good, best, and bad, worst. Remember to say 'the' before a superlative: the best!"*

## S7 · Checkpoint 4 — Virtual Referee (game show)
- Left: a TV "Sports Replay Screen" (MP4 with Play, Pause, Replay, progress bar and volume), an animated striped-shirt referee with whistle and card, and an LED scoreboard (team, correct, question, points).
- Right: a game show with lights, then six timed questions (20-second ring timer that turns red under 5 seconds and ticks). The whistle sounds at the start, when time is up and at full time.
- **Video file:** `referee-replay.mp4`. Suggested content: a 30–90 second clip of pupils or animated sports (badminton, football, swimming…) with narration using superlatives ("She is the fastest swimmer!").

## S8 · Checkpoint 5 — Sports Reporter (speaking)
- A cartoon broadcast studio: stadium window with crowd, ON AIR light, monitor showing the chosen sport, the coach as co-host, an orange news desk with a microphone and a news ticker.
- Builder: sentence starter → choose a sport → choose a superlative → choose a reason → live preview → "Put it in my report" → editable text box → "Check my report".
- Speaking practice steps, optional local recording with playback, and the **Teacher: confirm speaking** button.
- **Audio file:** `reporter-model.mp3`
- **Script:** *"Hello everyone! I am your sports reporter. I think badminton is the most exciting sport because it is fun to play. Thank you for watching!"*

## S9 · Checkpoint 6 — Champion Zone (final assessment)
- Five questions: vocabulary (water sport), equipment (hockey stick and puck image), superlative (bad → worst), sentence completion (the fastest runner) and reading comprehension (Mei Ling passage).
- Then the Champion Hall: the trophy spins in, confetti, team name, total points, stars, six achievement badges, the "What did you learn today?" reflection, a name entry and the printable Champion Certificate (A4 landscape).

## Coach expressions used

| Moment | Coach image |
|---|---|
| Welcome screen, team confirmed | `coach-welcome.png` |
| Instructions (team, objectives, map, checkpoints) | `coach-instructions.png` |
| Correct answers | `coach-celebrate.png` |
| Incorrect answers, time up, locked marker | `coach-encourage.png` |
| Checkpoint completed / next unlocked | `coach-unlock.png` |
| Champion Hall, all complete | `coach-achievement.png` |
