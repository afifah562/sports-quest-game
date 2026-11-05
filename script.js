/* =====================================================================
   THE ULTIMATE SPORTS QUEST — STADIUM ADVENTURE
   Vanilla JavaScript · no frameworks · no CDN · no external requests
   Year 4 ESL · Get Smart Plus 4 · Unit 9 Get Active!
   ===================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. ASSET REGISTER (relative paths only)
     Add your files with these exact names to switch placeholders off.
     ------------------------------------------------------------------ */
  var DIR = { image: 'assets/images/', audio: 'assets/audio/', video: 'assets/video/' };
  var ASSET_LIST = [
    ['image', 'board', 'sports-quest-board.png', 'Sports Quest Board — interactive checkpoint map'],
    ['image', 'coach_welcome', 'coach-welcome.png', 'Virtual Sports Coach — welcoming pupils'],
    ['image', 'coach_instruct', 'coach-instructions.png', 'Virtual Sports Coach — giving instructions'],
    ['image', 'coach_celebrate', 'coach-celebrate.png', 'Virtual Sports Coach — celebrating correct answers'],
    ['image', 'coach_encourage', 'coach-encourage.png', 'Virtual Sports Coach — encouraging after mistakes'],
    ['image', 'coach_unlock', 'coach-unlock.png', 'Virtual Sports Coach — unlocking checkpoints'],
    ['image', 'coach_achieve', 'coach-achievement.png', 'Virtual Sports Coach — presenting achievements'],
    ['image', 'cover1', 'checkpoint-1-cover.png', 'Checkpoint 1 cover — Sports Detective'],
    ['image', 'cover2', 'checkpoint-2-cover.png', 'Checkpoint 2 cover — Equipment Match'],
    ['image', 'cover3', 'checkpoint-3-cover.png', 'Checkpoint 3 cover — Grammar Decoder'],
    ['image', 'cover4', 'checkpoint-4-cover.png', 'Checkpoint 4 cover — Virtual Referee'],
    ['image', 'cover5', 'checkpoint-5-cover.png', 'Checkpoint 5 cover — Sports Reporter'],
    ['image', 'cover6', 'checkpoint-6-cover.png', 'Checkpoint 6 cover — Champion Zone'],
    ['image', 'eq_badminton', 'equipment-racket-shuttlecock.png', 'Equipment — racket and shuttlecock'],
    ['image', 'eq_football', 'equipment-football.png', 'Equipment — football'],
    ['image', 'eq_swimming', 'equipment-goggles.png', 'Equipment — goggles'],
    ['image', 'eq_cycling', 'equipment-bicycle-helmet.png', 'Equipment — bicycle and helmet'],
    ['image', 'eq_basketball', 'equipment-basketball.png', 'Equipment — basketball'],
    ['image', 'eq_icehockey', 'equipment-hockey-stick-puck.png', 'Equipment — hockey stick and puck'],
    ['audio', 'welcome', 'welcome-narration.mp3', 'Welcome narration'],
    ['audio', 'objectives', 'learning-objectives.mp3', 'Learning objectives narration'],
    ['audio', 'clue_badminton', 'clue-badminton.mp3', 'Sports vocabulary clue — badminton'],
    ['audio', 'clue_football', 'clue-football.mp3', 'Sports vocabulary clue — football'],
    ['audio', 'clue_swimming', 'clue-swimming.mp3', 'Sports vocabulary clue — swimming'],
    ['audio', 'clue_cycling', 'clue-cycling.mp3', 'Sports vocabulary clue — cycling'],
    ['audio', 'clue_basketball', 'clue-basketball.mp3', 'Sports vocabulary clue — basketball'],
    ['audio', 'clue_icehockey', 'clue-ice-hockey.mp3', 'Sports vocabulary clue — ice hockey'],
    ['audio', 'grammar', 'grammar-explanation.mp3', 'Superlative adjectives explanation'],
    ['audio', 'reporter', 'reporter-model.mp3', 'Speaking example — model sports report'],
    ['audio', 'music', 'background-music.mp3', 'Optional background music'],
    ['video', 'referee', 'referee-replay.mp4', 'Checkpoint 4 sports replay video']
  ];
  var A = {};
  ASSET_LIST.forEach(function (r) { A[r[1]] = DIR[r[0]] + r[2]; });
  var status = {}; // path -> true (found) | false (missing) | undefined (unchecked)

  /* ------------------------------------------------------------------
     2. GAME CONTENT
     ------------------------------------------------------------------ */
  var TEAMS = [
    { id: 'blue', name: 'Blue Lightning', mascot: '⚡', color: '#1f6bff', dark: '#0b3bb0', cheer: 'Fast as lightning!' },
    { id: 'green', name: 'Green Dragons', mascot: '🐉', color: '#22b04b', dark: '#127030', cheer: 'Brave as dragons!' },
    { id: 'orange', name: 'Orange Rockets', mascot: '🚀', color: '#ff7a1a', dark: '#b84c00', cheer: 'Blast off to win!' },
    { id: 'purple', name: 'Purple Panthers', mascot: '🐆', color: '#8a3ffc', dark: '#5317b3', cheer: 'Quick and clever!' }
  ];

  // Map hotspot positions in % of the board (x, y). Adjust to fit your Sports Quest Board.
  var CHECKPOINTS = [
    { n: 1, name: 'Sports Detective', focus: 'Reading & sports vocabulary', icon: '🔍', pos: [13, 78] },
    { n: 2, name: 'Equipment Match', focus: 'Matching sports equipment', icon: '🧩', pos: [37, 66] },
    { n: 3, name: 'Grammar Decoder', focus: 'Superlative adjectives', icon: '🔐', pos: [24, 33] },
    { n: 4, name: 'Virtual Referee', focus: 'Quick-fire game show', icon: '🟨', pos: [52, 22] },
    { n: 5, name: 'Sports Reporter', focus: 'Building & speaking a report', icon: '🎙️', pos: [72, 52] },
    { n: 6, name: 'Champion Zone', focus: 'Final assessment', icon: '🏆', pos: [87, 22] }
  ];

  var SPORTS = {
    badminton: { name: 'Badminton', icon: '🏸', clue: 'Players hit a shuttlecock over a net.' },
    football: { name: 'Football', icon: '⚽', clue: 'Players kick a ball to score goals.' },
    swimming: { name: 'Swimming', icon: '🏊', clue: 'People move through water using their arms and legs.' },
    cycling: { name: 'Cycling', icon: '🚴', clue: 'People ride bicycles and wear helmets.' },
    basketball: { name: 'Basketball', icon: '🏀', clue: 'Players shoot a ball into a hoop.' },
    icehockey: { name: 'Ice Hockey', icon: '🏒', clue: 'Players use sticks to hit a puck on ice.' }
  };
  var SPORT_IDS = Object.keys(SPORTS);

  var EQUIP = {
    badminton: { label: 'Racket and Shuttlecock', icon: '🏸' },
    football: { label: 'Football', icon: '⚽' },
    swimming: { label: 'Goggles', icon: '🥽' },
    cycling: { label: 'Bicycle and Helmet', icon: '🚲' },
    basketball: { label: 'Basketball', icon: '🏀' },
    icehockey: { label: 'Hockey Stick and Puck', icon: '🏒' }
  };
  var TRAY_ORDER = ['icehockey', 'swimming', 'badminton', 'basketball', 'cycling', 'football'];

  var RULE_HINT = {
    short: 'Short word: add -est.',
    y: 'Word ends in -y: change y to i, then add -est.',
    long: 'Long word: use "most" before the word.',
    good: 'Special word! GOOD changes completely.',
    bad: 'Special word! BAD changes completely.'
  };
  var CP3 = [
    { adj: 'TALL', answer: 'tallest', sentence: 'He is the ______ basketball player.', rule: 'short' },
    { adj: 'FAST', answer: 'fastest', sentence: 'I think cycling is the ______ sport.', rule: 'short' },
    { adj: 'EASY', answer: 'easiest', sentence: 'I think swimming is the ______ sport.', rule: 'y' },
    { adj: 'GOOD', answer: 'best', sentence: 'I think badminton is the ______ sport.', rule: 'good' },
    { adj: 'BAD', answer: 'worst', sentence: 'I think football is the ______ sport for me.', rule: 'bad' },
    { adj: 'DIFFICULT', answer: 'most difficult', sentence: 'I think ice hockey is the ______ sport.', rule: 'long' },
    { adj: 'POPULAR', answer: 'most popular', sentence: 'I think football is the ______ sport.', rule: 'long' }
  ];

  var CP4_Q = [
    { q: 'Which equipment do you need to play badminton?', opts: ['Racket and shuttlecock', 'Goggles', 'Hockey stick and puck'], a: 0 },
    { q: 'Swimming is the ______ sport for me. (EASY)', opts: ['easyest', 'easiest', 'most easy'], a: 1 },
    { q: 'In which sport do players hit a puck on ice?', opts: ['Football', 'Ice hockey', 'Cycling'], a: 1 },
    { q: 'GOOD → the ______', opts: ['goodest', 'most good', 'best'], a: 2 },
    { q: 'Players shoot a ball into a hoop. Which sport is it?', opts: ['Basketball', 'Badminton', 'Swimming'], a: 0 },
    { q: 'Ice hockey is the ______ sport. (DIFFICULT)', opts: ['difficultest', 'most difficult', 'more difficult'], a: 1 }
  ];
  var CP4_TIME = 20;

  var CP5 = {
    sport: SPORT_IDS.map(function (id) { return SPORTS[id].name; }),
    sup: ['most exciting', 'best', 'fastest', 'easiest', 'most popular', 'healthiest', 'most difficult'],
    reason: ['it is fun to play', 'it keeps me healthy', 'I can play with my friends', 'it is very fast', 'it makes me strong']
  };

  var CP6_Q = [
    { type: 'Sports Vocabulary', q: 'Which sport do people do in water?', opts: ['Cycling', 'Swimming', 'Basketball', 'Football'], a: 1 },
    { type: 'Equipment', q: 'Look at the equipment. Which sport needs it?', visual: 'icehockey', opts: ['Badminton', 'Football', 'Ice hockey', 'Swimming'], a: 2 },
    { type: 'Superlatives', q: 'BAD → the ______', opts: ['baddest', 'worst', 'most bad', 'badest'], a: 1 },
    { type: 'Sentence Completion', q: 'Ali runs very fast. He is the ______ runner in our class.', opts: ['fast', 'faster', 'fastest', 'most fast'], a: 2 },
    { type: 'Reading', passage: 'Mei Ling loves sports. She plays badminton on Monday and goes swimming on Saturday. She thinks swimming is the most relaxing sport because she enjoys the cool water.', q: 'Why does Mei Ling think swimming is the most relaxing sport?', opts: ['Because she plays on Monday', 'Because she enjoys the cool water', 'Because she likes shuttlecocks', 'Because it is the fastest sport'], a: 1 }
  ];

  var PRAISE = ['Brilliant!', 'Super star!', 'Fantastic!', 'Well done, champion!', 'Amazing!', 'You got it!', 'Excellent work!'];
  var ENCOURAGE = ['Nice try! Look again.', 'Almost! Try once more.', 'Keep going — you can do it!', 'Don\'t give up, champion!'];

  /* ------------------------------------------------------------------
     3. STATE + localStorage
     ------------------------------------------------------------------ */
  var STORE_KEY = 'ultimateSportsQuest.v1';
  var storageOK = true;
  function defaultState() {
    return {
      team: null, points: 0, stars: 0, completed: [], answered: {}, attempts: {},
      screen: 'welcome', reportText: '', reportChecked: false, teacherConfirmed: false,
      reflection: '', pupilName: '', sound: true
    };
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) { var s = defaultState(), p = JSON.parse(raw); for (var k in p) s[k] = p[k]; return s; }
    } catch (e) { storageOK = false; }
    return defaultState();
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); storageOK = true; } catch (e) { storageOK = false; }
  }
  var state = load();
  var music = false;

  function teamObj() { for (var i = 0; i < TEAMS.length; i++) if (TEAMS[i].id === state.team) return TEAMS[i]; return null; }
  function isDone(n) { return state.completed.indexOf(n) !== -1; }
  function isUnlocked(n) { return n === 1 || isDone(n - 1); }
  function currentCP() { for (var i = 1; i <= 6; i++) if (!isDone(i)) return i; return 6; }
  function answered(qid) { return state.answered[qid] !== undefined; }

  /* Scoring: 10 on first try, 5 after a retry, never twice for the same item. */
  function award(qid, correct) {
    if (answered(qid)) return { already: true, pts: 0 };
    if (correct) {
      var pts = (state.attempts[qid] || 0) === 0 ? 10 : 5;
      state.answered[qid] = pts; state.points += pts; save(); updateHUD(true);
      return { pts: pts, retry: pts === 5 };
    }
    state.attempts[qid] = (state.attempts[qid] || 0) + 1; save();
    return { pts: 0 };
  }

  /* ------------------------------------------------------------------
     4. HELPERS
     ------------------------------------------------------------------ */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var playToken = 0;
  function later(fn, ms) { var t = playToken; return setTimeout(function () { if (t === playToken) fn(); }, ms); }

  function fileOf(p) { return p.split('/').pop(); }

  /* Image with an honest, clearly-labelled placeholder if the file is missing. */
  function phHTML(cls, icon, label, src) {
    return '<div class="placeholder ' + cls + '" title="Missing asset: ' + esc(src) + '"><span class="ph-icon">' + icon + '</span><span class="ph-label">' + esc(label) + '</span><span class="ph-file">' + esc(fileOf(src)) + '</span></div>';
  }
  function imgTag(key, alt, cls, icon, label) {
    var src = A[key];
    if (status[src] === false) return phHTML(cls, icon, label, src);
    return '<img class="' + cls + '" src="' + src + '" alt="' + esc(alt) + '" data-ph-icon="' + esc(icon) + '" data-ph-label="' + esc(label) + '" onload="SQ.imgOk(this)" onerror="SQ.imgFail(this)" draggable="false">';
  }
  window.SQ = {
    imgOk: function (img) { status[img.getAttribute('src')] = true; },
    imgFail: function (img) {
      var src = img.getAttribute('src');
      status[src] = false;
      var d = document.createElement('div');
      d.innerHTML = phHTML(img.className, img.dataset.phIcon || '🖼️', img.dataset.phLabel || 'Image placeholder', src);
      img.replaceWith(d.firstChild);
      refreshTeacher();
    },
    boardOk: function (img) {
      status[img.getAttribute('src')] = true;
      var b = img.closest('.board');
      if (b) {
        b.classList.add('has-board');
        if (img.naturalWidth && img.naturalHeight) b.style.setProperty('--ar', (img.naturalWidth / img.naturalHeight).toFixed(4));
      }
    },
    boardFail: function (img) {
      status[img.getAttribute('src')] = false;
      var b = img.closest('.board'); if (b) b.classList.add('no-board');
      img.remove(); refreshTeacher();
    }
  };

  function coachImg(mood, cls) {
    var labels = { welcome: 'Coach: welcome', instruct: 'Coach: instructions', celebrate: 'Coach: celebrate', encourage: 'Coach: encourage', unlock: 'Coach: unlock', achieve: 'Coach: achievement' };
    return '<div class="coach ' + (cls || '') + '">' + imgTag('coach_' + mood, 'Virtual Sports Coach', 'coach-img', '🧕', (labels[mood] || 'Coach') + ' placeholder') + '</div>';
  }

  function audioCtl(key, label) {
    var missing = status[A[key]] === false;
    return '<span class="audio-ctl' + (missing ? ' missing' : '') + '"><button type="button" class="btn-audio" data-audio="' + key + '" data-label="' + esc(label) + '"><span class="ab-icon">' + (missing ? '🔇' : '▶') + '</span><span class="ab-text">' + esc(label) + '</span></button><span class="audio-status" role="status">' + (missing ? 'AUDIO NOT YET AVAILABLE' : '') + '</span></span>';
  }

  var TROPHY = '<svg class="trophy-svg" viewBox="0 0 200 230" aria-hidden="true"><defs><linearGradient id="tg" x1="0" x2="1"><stop offset="0" stop-color="#ffb300"/><stop offset=".45" stop-color="#ffe27a"/><stop offset="1" stop-color="#e09200"/></linearGradient></defs>' +
    '<path d="M48 40 H20 a8 8 0 0 0-8 8 c0 34 18 58 46 62" fill="none" stroke="#e09200" stroke-width="12" stroke-linecap="round"/>' +
    '<path d="M152 40 H180 a8 8 0 0 1 8 8 c0 34-18 58-46 62" fill="none" stroke="#e09200" stroke-width="12" stroke-linecap="round"/>' +
    '<path d="M44 22 H156 V70 c0 38-25 66-56 66 s-56-28-56-66z" fill="url(#tg)" stroke="#b87400" stroke-width="5"/>' +
    '<rect x="88" y="134" width="24" height="34" fill="#e09200"/><rect x="58" y="166" width="84" height="22" rx="6" fill="url(#tg)" stroke="#b87400" stroke-width="4"/>' +
    '<rect x="44" y="188" width="112" height="30" rx="8" fill="#5420b0" stroke="#2c0c66" stroke-width="4"/><text x="100" y="209" text-anchor="middle" font-size="15" font-weight="900" fill="#ffc928" font-family="Trebuchet MS, sans-serif">CHAMPION</text>' +
    '<path d="M100 46 l8 17 19 3-14 13 4 19-17-9-17 9 4-19-14-13 19-3z" fill="#fff" opacity=".95"/><path class="trophy-shine" d="M62 32 h14 l-10 70 h-10z" fill="#fff" opacity=".45"/></svg>';

  var PADLOCK = '<svg viewBox="0 0 100 120" aria-hidden="true"><path class="shackle" d="M28 56 V36 a22 22 0 0 1 44 0 V56" fill="none" stroke="#a8b2d6" stroke-width="11" stroke-linecap="round"/><rect x="14" y="52" width="72" height="60" rx="14" fill="#ffc928" stroke="#c98a00" stroke-width="5"/><circle cx="50" cy="76" r="9" fill="#1a1f4a"/><rect x="45.5" y="79" width="9" height="19" rx="3" fill="#1a1f4a"/></svg>';

  var REFEREE = '<svg class="ref-svg" viewBox="0 0 140 170" aria-hidden="true"><defs><pattern id="refStripes" width="16" height="10" patternUnits="userSpaceOnUse"><rect width="8" height="10" fill="#1a1f4a"/><rect x="8" width="8" height="10" fill="#fff"/></pattern></defs>' +
    '<g class="ref-waves" stroke="#ffc928" stroke-width="4" fill="none" stroke-linecap="round"><path d="M104 38 q8 8 0 16"/><path d="M112 32 q14 14 0 28"/><path d="M120 26 q20 20 0 40"/></g>' +
    '<rect x="34" y="78" width="72" height="70" rx="18" fill="url(#refStripes)" stroke="#1a1f4a" stroke-width="3"/>' +
    '<rect x="48" y="146" width="16" height="20" rx="5" fill="#1a1f4a"/><rect x="76" y="146" width="16" height="20" rx="5" fill="#1a1f4a"/>' +
    '<g class="ref-card-arm"><rect x="12" y="84" width="14" height="44" rx="7" fill="#f2c29b" transform="rotate(20 19 106)"/><rect class="ref-card" x="2" y="54" width="22" height="30" rx="4" fill="#ffc928" stroke="#c98a00" stroke-width="2"/></g>' +
    '<circle cx="70" cy="50" r="28" fill="#f2c29b" stroke="#c98a6a" stroke-width="2"/>' +
    '<path d="M42 44 a28 28 0 0 1 56 0 z" fill="#1a1f4a"/><rect x="40" y="40" width="64" height="7" rx="3" fill="#1a1f4a"/>' +
    '<circle cx="60" cy="54" r="3.5" fill="#1a1f4a"/><circle cx="80" cy="54" r="3.5" fill="#1a1f4a"/><path class="ref-mouth" d="M62 66 q8 6 16 0" stroke="#1a1f4a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<g class="ref-whistle"><rect x="80" y="62" width="20" height="10" rx="5" fill="#c0c8e0" stroke="#5a6488" stroke-width="2"/><circle cx="98" cy="67" r="7" fill="#c0c8e0" stroke="#5a6488" stroke-width="2"/></g>' +
    '<rect x="104" y="80" width="14" height="40" rx="7" fill="#f2c29b" transform="rotate(-25 111 100)"/></svg>';

  var MIC = '<svg class="mic-svg" viewBox="0 0 60 120" aria-hidden="true"><rect x="27" y="54" width="6" height="50" fill="#3c4266"/><rect x="10" y="102" width="40" height="10" rx="5" fill="#262a4a"/><rect x="15" y="6" width="30" height="52" rx="15" fill="#d7ddf0" stroke="#5a6488" stroke-width="3"/><g stroke="#8b94b8" stroke-width="2"><line x1="17" y1="18" x2="43" y2="18"/><line x1="16" y1="27" x2="44" y2="27"/><line x1="16" y1="36" x2="44" y2="36"/></g><rect x="13" y="44" width="34" height="12" rx="4" fill="#ff7a1a"/><text x="30" y="53.5" text-anchor="middle" font-size="8" font-weight="900" fill="#fff" font-family="sans-serif">SQ</text></svg>';

  /* ------------------------------------------------------------------
     5. SOUND (Web Audio API — original synthesised effects)
     ------------------------------------------------------------------ */
  var actx = null;
  function ac() {
    if (!actx) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; try { actx = new C(); } catch (e) { return null; } }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  function tone(freq, dur, type, vol, when, slideTo, force) {
    if (!state.sound && !force) return;
    var c = ac(); if (!c) return;
    var t = c.currentTime + (when || 0);
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }
  var SFX = {
    click: function () { tone(700, 0.07, 'triangle', 0.12); },
    flip: function () { tone(320, 0.12, 'triangle', 0.12, 0, 720); },
    correct: function () { tone(523, 0.12, 'triangle', 0.2); tone(784, 0.25, 'triangle', 0.2, 0.1); },
    wrong: function () { tone(220, 0.3, 'sawtooth', 0.1, 0, 130); },
    star: function () { [1046, 1318, 1568, 2093].forEach(function (f, i) { tone(f, 0.16, 'sine', 0.12, i * 0.06); }); },
    unlock: function () { [523, 659, 784, 1046].forEach(function (f, i) { tone(f, 0.2, 'square', 0.07, i * 0.09); }); },
    drop: function () { tone(440, 0.12, 'triangle', 0.15, 0, 880); },
    tick: function () { tone(1250, 0.04, 'square', 0.05); },
    fanfare: function () {
      [[523, 0], [659, 0.15], [784, 0.3], [1046, 0.45], [784, 0.62], [1046, 0.75]].forEach(function (n) { tone(n[0], 0.3, 'square', 0.07, n[1]); tone(n[0] / 2, 0.3, 'triangle', 0.08, n[1]); });
    },
    whistle: function () {
      if (!state.sound) return;
      var c = ac(); if (!c) return;
      var t = c.currentTime, o = c.createOscillator(), lfo = c.createOscillator(), lg = c.createGain(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = 2900; lfo.frequency.value = 28; lg.gain.value = 180;
      lfo.connect(lg); lg.connect(o.frequency);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.03);
      g.gain.setValueAtTime(0.16, t + 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      o.connect(g); g.connect(c.destination);
      o.start(t); lfo.start(t); o.stop(t + 0.75); lfo.stop(t + 0.75);
    }
  };

  /* Background music: uses background-music.mp3 if present, otherwise an
     original synthesised loop. Only starts after the pupil presses the button. */
  var Music = {
    el: null, timer: null, step: 0, usingSynth: false,
    start: function () {
      var self = this, src = A.music;
      if (status[src] === false) { self.synth(); return; }
      if (!self.el) {
        self.el = new Audio(src); self.el.loop = true; self.el.volume = 0.35;
        self.el.addEventListener('error', function () { status[src] = false; self.el = null; if (music) self.synth(); refreshTeacher(); });
      }
      self.el.play().then(function () { status[src] = true; }).catch(function (e) {
        if (e && e.name === 'NotSupportedError') { status[src] = false; self.el = null; if (music) self.synth(); }
      });
    },
    synth: function () {
      if (this.timer) return;
      this.usingSynth = true;
      var mel = [523, 659, 784, 659, 587, 698, 880, 698, 523, 659, 784, 1046, 988, 784, 659, 587];
      var bass = [131, 175, 131, 196];
      var self = this;
      this.timer = setInterval(function () {
        if (!ac()) return;
        var s = self.step++;
        if (s % 2 === 0 || s % 7 === 3) tone(mel[s % mel.length], 0.22, 'triangle', 0.035, 0, null, true);
        if (s % 4 === 0) tone(bass[(s / 4 | 0) % bass.length], 0.5, 'sine', 0.06, 0, null, true);
      }, 260);
    },
    stop: function () {
      if (this.el) this.el.pause();
      clearInterval(this.timer); this.timer = null; this.usingSynth = false;
    }
  };
  function toggleMusic() { music = !music; if (music) Music.start(); else Music.stop(); updateToggles(); }

  /* Narration / clue / model audio — real local MP3 files only. */
  var AudioMgr = {
    cur: null, key: null, ctl: null,
    toggle: function (key, ctl) {
      var self = this, src = A[key];
      if (self.cur && self.key === key) {
        if (self.cur.paused) { self.cur.play().then(function () { setCtl(ctl, 'playing'); }).catch(function () {}); }
        else { self.cur.pause(); setCtl(ctl, 'paused'); }
        return;
      }
      self.stop();
      if (status[src] === false) { setCtl(ctl, 'missing'); return; }
      var a = new Audio(src);
      self.cur = a; self.key = key; self.ctl = ctl;
      var fail = function () {
        status[src] = false; setCtl(ctl, 'missing');
        if (self.cur === a) { self.cur = null; self.key = null; self.ctl = null; }
        refreshTeacher();
      };
      a.addEventListener('error', fail);
      a.addEventListener('ended', function () { setCtl(ctl, 'idle'); if (self.cur === a) { self.cur = null; self.key = null; self.ctl = null; } });
      setCtl(ctl, 'loading');
      a.play().then(function () { status[src] = true; setCtl(ctl, 'playing'); }).catch(function (e) {
        if (e && e.name === 'NotSupportedError') fail();
        else if (e && e.name === 'NotAllowedError') setCtl(ctl, 'idle');
      });
    },
    stop: function () {
      if (this.cur) { this.cur.pause(); if (this.ctl) setCtl(this.ctl, 'idle'); }
      this.cur = null; this.key = null; this.ctl = null;
    }
  };
  function setCtl(ctl, st) {
    if (!ctl || !ctl.isConnected) return;
    var btn = $('.btn-audio', ctl);
    ctl.classList.remove('playing', 'missing', 'loading');
    if (st === 'playing' || st === 'missing' || st === 'loading') ctl.classList.add(st);
    $('.ab-icon', btn).textContent = st === 'playing' ? '⏸' : st === 'missing' ? '🔇' : '▶';
    $('.ab-text', btn).textContent = st === 'playing' ? 'Pause' : st === 'paused' ? 'Resume' : btn.dataset.label;
    $('.audio-status', ctl).textContent = { missing: 'AUDIO NOT YET AVAILABLE', loading: 'Loading…', playing: 'Playing', paused: 'Paused' }[st] || '';
  }

  /* Asset check — honest report shown in the Teacher panel. */
  function checkAssets() {
    ASSET_LIST.forEach(function (r) {
      var src = A[r[1]];
      if (status[src] !== undefined) return;
      var done = function (ok) { if (status[src] === undefined) status[src] = ok; refreshTeacher(); };
      if (r[0] === 'image') {
        var im = new Image(); im.onload = function () { done(true); }; im.onerror = function () { done(false); }; im.src = src;
      } else {
        var m = document.createElement(r[0] === 'video' ? 'video' : 'audio');
        m.preload = 'metadata'; m.muted = true;
        m.addEventListener('loadedmetadata', function () { done(true); });
        m.addEventListener('error', function () { done(false); });
        m.src = src;
      }
    });
  }

  /* ------------------------------------------------------------------
     6. FEEDBACK + ANIMATION
     ------------------------------------------------------------------ */
  var toastTimer = null;
  function coachSay(mood, text, ms) {
    var t = $('#coach-toast');
    t.innerHTML = coachImg(mood, 'toast-coach') + '<div class="bubble">' + text + '</div>';
    t.className = 'coach-toast show mood-' + mood;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, ms || 3000);
  }
  function floatText(el, text) {
    if (!el) return;
    var r = el.getBoundingClientRect(), f = document.createElement('div');
    f.className = 'float-pts'; f.textContent = text;
    f.style.left = (r.left + r.width / 2) + 'px'; f.style.top = (r.top + r.height / 2) + 'px';
    document.body.appendChild(f); setTimeout(function () { f.remove(); }, 1300);
  }
  function starBurst(el) {
    if (!el || reduceMotion) return;
    var r = el.getBoundingClientRect();
    for (var i = 0; i < 8; i++) {
      var s = document.createElement('span'), ang = (i / 8) * Math.PI * 2;
      s.className = 'burst-star'; s.textContent = '★';
      s.style.left = (r.left + r.width / 2) + 'px'; s.style.top = (r.top + r.height / 2) + 'px';
      s.style.setProperty('--dx', Math.cos(ang) * 70 + 'px'); s.style.setProperty('--dy', Math.sin(ang) * 70 + 'px');
      document.body.appendChild(s);
      (function (n) { setTimeout(function () { n.remove(); }, 900); })(s);
    }
  }
  function restartAnim(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function good(res, el, extra) {
    SFX.correct();
    if (el) { restartAnim(el, 'pop'); floatText(el, res.pts ? '+' + res.pts : '✓'); starBurst(el); }
    var msg = pick(PRAISE) + (res.pts ? ' <b>+' + res.pts + ' points</b>' + (res.retry ? ' (second try)' : '') : '') + (extra ? ' ' + extra : '');
    coachSay('celebrate', msg);
  }
  function bad(el, hint) {
    SFX.wrong();
    restartAnim(el, 'shake');
    coachSay('encourage', pick(ENCOURAGE) + (hint ? ' ' + hint : ''));
  }

  /* Confetti (canvas) */
  var conf = { parts: [], running: false };
  function confetti(n) {
    var cv = $('#confetti'), ctx = cv.getContext('2d');
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    var cols = ['#ffc928', '#ff7a1a', '#2fbf4a', '#8a3ffc', '#1f6bff', '#ffffff', '#ff4d8d'];
    n = reduceMotion ? 30 : (n || 180);
    for (var i = 0; i < n; i++) conf.parts.push({ x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.6, vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4, s: 6 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: pick(cols), circ: Math.random() < 0.35 });
    if (conf.running) return;
    conf.running = true;
    (function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      conf.parts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        if (p.circ) { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 7); ctx.fill(); } else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      });
      conf.parts = conf.parts.filter(function (p) { return p.y < cv.height + 30; });
      if (conf.parts.length) requestAnimationFrame(loop); else { conf.running = false; ctx.clearRect(0, 0, cv.width, cv.height); }
    })();
  }

  function spawnStars() {
    var box = $('#stars-float'), html = '';
    for (var i = 0; i < 22; i++) {
      html += '<span style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (Math.random() * 60).toFixed(1) + '%;font-size:' + (10 + Math.random() * 22).toFixed(0) + 'px;animation-delay:-' + (Math.random() * 6).toFixed(1) + 's;animation-duration:' + (4 + Math.random() * 5).toFixed(1) + 's">★</span>';
    }
    box.innerHTML = html;
  }

  /* ------------------------------------------------------------------
     7. HUD + SCREENS
     ------------------------------------------------------------------ */
  function renderHUD() {
    $('#hud').innerHTML =
      '<div class="hud-team"><span class="hud-mascot" id="hud-mascot"></span><span class="hud-team-text"><small>TEAM</small><b id="hud-name"></b></span></div>' +
      '<div class="hud-stats">' +
        '<div class="stat" id="stat-points"><span class="stat-ico">🪙</span><b id="hud-points">0</b><small>points</small></div>' +
        '<div class="stat" id="stat-stars"><span class="stat-ico">⭐</span><b id="hud-stars">0</b><small>stars</small></div>' +
        '<div class="stat"><span class="stat-ico">🏁</span><b id="hud-cp">0/6</b><small>checkpoints</small></div>' +
      '</div>' +
      '<nav class="hud-btns">' +
        '<button class="hbtn" data-action="map" title="Stadium Map">🗺️<span>Map</span></button>' +
        '<button class="hbtn" data-action="notes" title="Interactive notes">📒<span>Notes</span></button>' +
        '<button class="hbtn" data-action="music" title="Music on/off">🎵<span class="state">OFF</span></button>' +
        '<button class="hbtn" data-action="sound" title="Sound effects on/off">🔊<span class="state">ON</span></button>' +
        '<button class="hbtn" data-action="teacher" title="Teacher panel">👩‍🏫<span>Teacher</span></button>' +
        '<button class="hbtn hbtn-reset" data-action="reset" title="Reset game">↺<span>Reset</span></button>' +
      '</nav>';
  }
  function updateHUD(bump) {
    var t = teamObj();
    if (t) {
      document.documentElement.style.setProperty('--team', t.color);
      document.documentElement.style.setProperty('--team-d', t.dark);
      $('#hud-mascot').textContent = t.mascot; $('#hud-name').textContent = t.name;
    }
    var p = $('#hud-points'); if (!p) return;
    p.textContent = state.points; $('#hud-stars').textContent = state.stars; $('#hud-cp').textContent = state.completed.length + '/6';
    if (bump) restartAnim($('#stat-points'), 'bump');
  }
  function updateToggles() {
    $$('[data-action="music"] .state').forEach(function (e) { e.textContent = music ? 'ON' : 'OFF'; });
    $$('[data-action="sound"] .state').forEach(function (e) { e.textContent = state.sound ? 'ON' : 'OFF'; });
    $$('[data-action="music"]').forEach(function (e) { e.classList.toggle('on', music); });
    $$('[data-action="sound"]').forEach(function (e) { e.classList.toggle('on', state.sound); });
  }

  var cleanupFns = [];
  function cleanup() { cleanupFns.forEach(function (f) { try { f(); } catch (e) {} }); cleanupFns = []; }

  function show(id) {
    playToken++;
    cleanup(); AudioMgr.stop();
    $$('.screen').forEach(function (s) { s.classList.toggle('active', s.id === 'screen-' + id); });
    document.body.dataset.screen = id;
    var hud = !!state.team && id !== 'welcome' && id !== 'team';
    $('#hud').classList.toggle('hidden', !hud);
    document.body.classList.toggle('has-hud', hud);
    if (id === 'objectives' || id === 'map') { state.screen = id; save(); }
    updateHUD(); updateToggles();
    var s = $('#screen-' + id); if (s) s.scrollTop = 0;
  }

  function letters(str, cls) {
    return str.split('').map(function (ch, i) { return ch === ' ' ? '<span class="sp"> </span>' : '<span class="ltr ' + (cls || '') + '" style="--i:' + i + '">' + esc(ch) + '</span>'; }).join('');
  }

  /* ---------- WELCOME ---------- */
  function renderWelcome() {
    var t = teamObj();
    $('#screen-welcome').innerHTML =
      '<div class="welcome">' +
        '<div class="welcome-left">' +
          '<div class="pill-badge">Get Smart Plus 4 · Unit 9 · Get Active!</div>' +
          '<h1 class="game-title"><span class="t1">' + letters('THE ULTIMATE') + '</span><span class="t2">' + letters('SPORTS QUEST') + '</span><span class="t3">★ STADIUM ADVENTURE ★</span></h1>' +
          '<p class="tagline">Explore. Learn. Play. Become a Champion!</p>' +
          '<div class="welcome-btns">' +
            '<button class="btn btn-gold btn-xl glow" data-action="start">▶ Start Adventure</button>' +
            (t ? '<button class="btn btn-green btn-lg" data-action="continue">⏩ Continue: ' + t.mascot + ' ' + esc(t.name) + '</button>' : '') +
            '<button class="btn btn-purple btn-lg" data-action="howto">❓ How to Play</button>' +
          '</div>' +
          '<div class="welcome-toggles">' +
            '<button class="toggle" data-action="music">🎵 Music: <span class="state">OFF</span></button>' +
            '<button class="toggle" data-action="sound">🔊 Sound: <span class="state">ON</span></button>' +
            audioCtl('welcome', 'Welcome message') +
            '<button class="toggle" data-action="teacher">👩‍🏫 Teacher</button>' +
          '</div>' +
        '</div>' +
        '<div class="welcome-right">' +
          '<div class="trophy-wrap">' + TROPHY + '<div class="trophy-glow"></div></div>' +
          '<div class="coach-stand">' + coachImg('welcome', 'coach-big') +
            '<div class="bubble bubble-big">WELCOME TO THE ULTIMATE SPORTS QUEST!</div>' +
          '</div>' +
          '<div class="ball-row" aria-hidden="true"><span>⚽</span><span>🏀</span><span>🏸</span><span>🏒</span><span>🚴</span><span>🏊</span></div>' +
        '</div>' +
      '</div>';
    updateToggles();
  }

  /* ---------- TEAM ---------- */
  function renderTeam() {
    $('#screen-team').innerHTML =
      '<div class="team-screen">' +
        '<div class="screen-head"><button class="btn btn-small btn-navy" data-action="home">⬅ Back</button><h2 class="screen-title">Choose Your Team!</h2><span></span></div>' +
        '<div class="team-grid">' + TEAMS.map(function (t) {
          return '<button class="team-card' + (state.team === t.id ? ' selected' : '') + '" data-team="' + t.id + '" style="--c:' + t.color + ';--d:' + t.dark + '">' +
            '<span class="team-mascot">' + t.mascot + '</span><span class="team-name">' + t.name + '</span><span class="team-cheer">' + t.cheer + '</span><span class="team-tick">✔ Selected</span></button>';
        }).join('') + '</div>' +
        '<div class="team-foot">' + coachImg('instruct', 'coach-small') + '<div class="bubble">Pick a team, then press <b>Let\'s Go!</b></div>' +
        '<button class="btn btn-gold btn-xl" data-action="team-go" ' + (state.team ? '' : 'disabled') + '>Let\'s Go! ➜</button></div>' +
      '</div>';
  }

  /* ---------- OBJECTIVES ---------- */
  function renderObjectives() {
    var t = teamObj();
    var objs = [
      ['🏸', 'Identify different sports and their equipment.'],
      ['🔤', 'Use superlative adjectives correctly.'],
      ['💬', 'Create simple sentences to talk about sports.']
    ];
    $('#screen-objectives').innerHTML =
      '<div class="objectives panel">' +
        '<div class="obj-coach">' + coachImg('instruct', 'coach-mid') + '<div class="bubble">Here is your mission, <b>' + esc(t ? t.name : 'champion') + '</b>! Tap each goal when you are ready.</div></div>' +
        '<div class="obj-main">' +
          '<h2 class="obj-title">By the end of this adventure, you can:</h2>' +
          '<div class="obj-list">' + objs.map(function (o, i) {
            return '<button class="obj-card" style="--i:' + i + '"><span class="obj-num">' + (i + 1) + '</span><span class="obj-ico">' + o[0] + '</span><span class="obj-text">' + o[1] + '</span><span class="obj-tick">✅ I\'m ready!</span></button>';
          }).join('') + '</div>' +
          '<div class="obj-actions">' + audioCtl('objectives', 'Listen') +
            '<button class="btn btn-gold btn-lg glow" data-action="map">🗺️ Go to the Stadium Map</button></div>' +
        '</div>' +
      '</div>';
    $$('.obj-card').forEach(function (b) { b.addEventListener('click', function () { b.classList.toggle('ticked'); if (b.classList.contains('ticked')) { SFX.star(); starBurst(b); } }); });
  }

  /* ---------- MAP ---------- */
  var lastTokenCP = null, mapSel = null;
  function goMap() { renderMap(); show('map'); }
  function renderMap() {
    var cur = currentCP(), done = state.completed.length, t = teamObj() || TEAMS[0];
    if (mapSel === null || !isUnlocked(mapSel)) mapSel = cur;
    var from = lastTokenCP || cur;
    var pts = CHECKPOINTS.map(function (c) { return c.pos.join(','); }).join(' ');
    var markers = CHECKPOINTS.map(function (c) {
      var st = isDone(c.n) ? 'done' : isUnlocked(c.n) ? 'open' : 'locked';
      return '<button class="marker ' + st + (mapSel === c.n ? ' sel' : '') + '" data-marker="' + c.n + '" style="left:' + c.pos[0] + '%;top:' + c.pos[1] + '%" aria-label="Checkpoint ' + c.n + ': ' + c.name + ' (' + st + ')">' +
        '<span class="m-ring"></span><span class="m-core"><span class="m-num">' + c.n + '</span><span class="m-ico">' + (st === 'locked' ? '🔒' : c.icon) + '</span></span>' +
        (st === 'done' ? '<span class="m-badge">✔</span>' : '') +
        '<span class="m-label">' + c.name + '</span></button>';
    }).join('');
    var fp = CHECKPOINTS[from - 1].pos;
    $('#screen-map').innerHTML =
      '<div class="map-wrap">' +
        '<div class="map-main">' +
          '<div class="map-top"><h2>🏟️ Stadium Map</h2><div class="progress"><div class="progress-fill" style="width:' + (done / 6 * 100) + '%"></div><span>' + done + ' / 6 checkpoints</span></div></div>' +
          '<div class="board" id="board">' +
            '<div class="board-art"><div class="ba-track"></div><div class="ba-centre"></div><div class="ba-goal ba-goal-l"></div><div class="ba-goal ba-goal-r"></div>' +
              '<svg class="ba-path" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="' + pts + '" /></svg>' +
              '<span class="ba-deco d1">🏸</span><span class="ba-deco d2">⚽</span><span class="ba-deco d3">🏀</span><span class="ba-deco d4">🏒</span><span class="ba-deco d5">🚴</span><span class="ba-deco d6">🏊</span>' +
              '<div class="ba-plaque">SPORTS QUEST BOARD</div></div>' +
            (status[A.board] === false ? '' : '<img class="board-img" src="' + A.board + '" alt="Sports Quest Board" onload="SQ.boardOk(this)" onerror="SQ.boardFail(this)" draggable="false">') +
            '<div class="board-missing">Placeholder board — add <code>' + fileOf(A.board) + '</code></div>' +
            markers +
            '<div class="token" id="token" style="left:' + fp[0] + '%;top:' + fp[1] + '%;--tc:' + t.color + '"><span>' + t.mascot + '</span></div>' +
          '</div>' +
        '</div>' +
        '<aside class="map-side panel" id="map-side"></aside>' +
      '</div>';
    if (status[A.board] === false) $('#board').classList.add('no-board');
    renderMapSide();
    $('#board').addEventListener('click', function (e) {
      var m = e.target.closest('.marker'); if (!m) return;
      var n = +m.dataset.marker;
      if (!isUnlocked(n)) { bad(m, 'Complete Checkpoint ' + (n - 1) + ' first to unlock ' + CHECKPOINTS[n - 1].name + '.'); return; }
      SFX.click(); mapSel = n;
      $$('.marker').forEach(function (x) { x.classList.toggle('sel', +x.dataset.marker === n); });
      renderMapSide();
    });
    // move the team token
    var to = CHECKPOINTS[cur - 1].pos;
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      var tk = $('#token'); if (!tk) return;
      tk.style.left = to[0] + '%'; tk.style.top = to[1] + '%';
      if (from !== cur) { tk.classList.add('moving'); setTimeout(function () { tk.classList.remove('moving'); SFX.star(); }, 1300); }
    }); });
    lastTokenCP = cur;
  }
  function renderMapSide() {
    var c = CHECKPOINTS[mapSel - 1], st = isDone(c.n) ? 'done' : isUnlocked(c.n) ? 'open' : 'locked';
    var all = state.completed.length === 6;
    var msg = all ? 'You completed every checkpoint! Visit the Champion Hall.' : st === 'done' ? 'Great job on this one! You can review it any time.' : 'Tap a glowing marker, then press <b>Enter</b>.';
    $('#map-side').innerHTML =
      '<div class="side-coach">' + coachImg(all ? 'achieve' : 'instruct', 'coach-small') + '<div class="bubble">' + msg + '</div></div>' +
      '<div class="cp-card ' + st + '">' +
        '<div class="cp-cover">' + imgTag('cover' + c.n, c.name + ' cover', 'cover-img', c.icon, 'Checkpoint ' + c.n + ' cover placeholder') + '</div>' +
        '<small>CHECKPOINT ' + c.n + '</small><h3>' + c.icon + ' ' + c.name + '</h3><p>' + c.focus + '</p>' +
        '<div class="cp-status">' + (st === 'done' ? '✅ Completed · ⭐ earned' : st === 'open' ? '▶ Ready to play' : '🔒 Locked') + '</div>' +
        '<button class="btn btn-gold btn-lg glow" data-action="enter" data-n="' + c.n + '">' + (st === 'done' ? '🔁 Review' : '▶ Enter Checkpoint') + '</button>' +
      '</div>' +
      (all ? '<button class="btn btn-purple" data-action="enter" data-n="6">🏆 Champion Hall</button>' : '');
  }

  function openCheckpoint(n) {
    if (!isUnlocked(n)) { coachSay('encourage', 'Complete Checkpoint ' + (n - 1) + ' first!'); return; }
    show('play');
    state.screen = 'cp' + n; save();
    var root = $('#screen-play');
    root.innerHTML = '';
    [null, renderCP1, renderCP2, renderCP3, renderCP4, renderCP5, renderCP6][n](root);
    SFX.unlock();
  }

  function cpHeader(n, trackerHTML) {
    var c = CHECKPOINTS[n - 1];
    return '<div class="cp-head"><button class="btn btn-small btn-navy" data-action="map">⬅ Map</button>' +
      '<div class="cp-title"><span class="cp-ico">' + c.icon + '</span><div><small>CHECKPOINT ' + n + ' OF 6</small><h2>' + c.name + '</h2></div></div>' +
      '<div class="cp-tracker" id="cp-tracker">' + trackerHTML + '</div></div>';
  }
  function tracker(done, total, label) {
    var dots = ''; for (var i = 0; i < total; i++) dots += '<span class="' + (i < done ? 'on' : '') + '"></span>';
    return '<div class="tracker"><div class="tracker-dots">' + dots + '</div><b>' + done + ' / ' + total + '</b><small>' + label + '</small></div>';
  }
  function setTracker(done, total, label) { var t = $('#cp-tracker'); if (t) t.innerHTML = tracker(done, total, label); }
  function doneBanner(n) {
    return '<div class="done-banner">✅ Checkpoint complete! You earned the <b>' + CHECKPOINTS[n - 1].name + '</b> badge. <button class="btn btn-small btn-gold" data-action="map">🗺️ Back to Map</button></div>';
  }

  function complete(n) {
    var first = !isDone(n);
    if (first) { state.completed.push(n); state.stars++; save(); updateHUD(); restartAnim($('#stat-stars'), 'bump'); }
    if (n === 6) return;
    var c = CHECKPOINTS[n - 1], next = CHECKPOINTS[n];
    SFX.unlock(); setTimeout(SFX.star, 400); confetti(120);
    openModal(
      '<div class="unlock-modal">' + coachImg('unlock', 'coach-mid') +
        '<div class="um-body"><div class="big-star">⭐</div><h2>Checkpoint ' + n + ' complete!</h2>' +
        '<p>You earned the <b>' + c.icon + ' ' + c.name + '</b> badge' + (first ? ' and <b>+1 star</b>!' : '!') + '</p>' +
        (next ? '<div class="unlocked-next"><span class="padlock small open">' + PADLOCK + '</span><span>Checkpoint ' + next.n + ': <b>' + next.name + '</b> is now unlocked!</span></div>' : '') +
        '<button class="btn btn-gold btn-lg glow" data-action="map">🗺️ Back to the Stadium Map</button></div></div>', 'modal-unlock');
  }

  /* ------------------------------------------------------------------
     CHECKPOINT 1 — SPORTS DETECTIVE
     ------------------------------------------------------------------ */
  function choicesFor(id) {
    var others = SPORT_IDS.filter(function (x) { return x !== id; });
    var i = SPORT_IDS.indexOf(id);
    var arr = [others[i % 5], others[(i + 2) % 5], others[(i + 4) % 5]];
    arr.splice(i % 4, 0, id);
    return arr;
  }
  function solvedFace(s) { return '<span class="mc-icon">' + s.icon + '</span><span class="mc-name">' + s.name + '</span><span class="mc-check">✔ Solved</span>'; }
  function renderCP1(root) {
    var solved = SPORT_IDS.filter(function (id) { return answered('cp1-' + id); }).length;
    root.innerHTML = cpHeader(1, tracker(solved, 6, 'mysteries solved')) +
      '<div class="kit-banner"><span class="kb-ico">📁</span><span>Use your <b>Sports Fact File</b> to investigate!</span></div>' +
      (solved === 6 ? doneBanner(1) : '') +
      '<div class="cp1-layout">' +
        '<div class="mystery-grid">' + SPORT_IDS.map(function (id, i) {
          var s = SPORTS[id], d = answered('cp1-' + id);
          return '<button class="mystery-card' + (d ? ' flipped solved' : '') + '" data-card="' + id + '" aria-label="Mystery card ' + (i + 1) + '">' +
            '<span class="mc-inner"><span class="mc-front"><span class="mc-q">?</span><span class="mc-label">Mystery Card ' + (i + 1) + '</span><span class="mc-tap">Tap to flip</span></span>' +
            '<span class="mc-back">' + (d ? solvedFace(s) : '<span class="mc-clue-ico">🔍</span><span class="mc-clue">“' + s.clue + '”</span>') + '</span></span></button>';
        }).join('') + '</div>' +
        '<div class="panel investigate" id="cp1-panel">' +
          '<div class="inv-intro">' + coachImg('instruct', 'coach-mid') + '<h3>Detective Mission</h3><p>Flip a <b>Mystery Card</b>, read the clue and find the correct sport.</p><p class="small">Correct first time = <b>10 points</b>. After a retry = <b>5 points</b>.</p></div>' +
        '</div>' +
      '</div>';
    $('.mystery-grid', root).addEventListener('click', function (e) {
      var card = e.target.closest('.mystery-card'); if (card) openMystery(card.dataset.card);
    });
  }
  function openMystery(id) {
    var s = SPORTS[id], card = $('.mystery-card[data-card="' + id + '"]'), panel = $('#cp1-panel');
    $$('.mystery-card').forEach(function (c) { c.classList.toggle('active', c === card); });
    if (!card.classList.contains('flipped')) { card.classList.add('flipped'); SFX.flip(); }
    var num = SPORT_IDS.indexOf(id) + 1;
    if (answered('cp1-' + id)) {
      panel.innerHTML = '<div class="inv-solved"><span class="big-ico">' + s.icon + '</span><h3>Case closed: ' + s.name + '!</h3><p>“' + s.clue + '”</p>' + audioCtl('clue_' + id, 'Listen to the clue') + nextMysteryBtn() + '</div>';
      return;
    }
    panel.innerHTML =
      '<small class="inv-tag">MYSTERY CARD ' + num + '</small>' +
      '<div class="inv-clue">🔍 “' + s.clue + '”</div>' +
      audioCtl('clue_' + id, 'Listen to the clue') +
      '<h4>Which sport is it?</h4>' +
      '<div class="choices">' + choicesFor(id).map(function (c) { return '<button class="choice" data-c="' + c + '"><span>' + SPORTS[c].name + '</span></button>'; }).join('') + '</div>';
    $('.choices', panel).addEventListener('click', function (e) {
      var b = e.target.closest('.choice'); if (!b || b.disabled) return;
      if (b.dataset.c === id) {
        var res = award('cp1-' + id, true);
        b.classList.add('right');
        $$('.choice', panel).forEach(function (x) { x.disabled = true; });
        $('.mc-back', card).innerHTML = solvedFace(s); card.classList.add('solved');
        good(res, card);
        var solved = SPORT_IDS.filter(function (x) { return answered('cp1-' + x); }).length;
        setTracker(solved, 6, 'mysteries solved');
        later(function () {
          panel.innerHTML = '<div class="inv-solved"><span class="big-ico">' + s.icon + '</span><h3>Yes! It\'s ' + s.name + '!</h3><p>“' + s.clue + '”</p>' + nextMysteryBtn() + '</div>';
          if (solved === 6) later(function () { complete(1); }, 900);
        }, 700);
      } else {
        award('cp1-' + id, false);
        b.disabled = true; b.classList.add('wrong');
        bad(b, 'Read the clue again and check your Sports Fact File.');
      }
    });
  }
  function nextMysteryBtn() {
    var next = SPORT_IDS.filter(function (x) { return !answered('cp1-' + x); })[0];
    if (!next) return '<p class="all-done">🎉 All mysteries solved!</p>';
    setTimeout(function () { var b = $('#next-mystery'); if (b) b.onclick = function () { SFX.click(); openMystery(next); }; }, 0);
    return '<button class="btn btn-orange" id="next-mystery">Next mystery ➜</button>';
  }

  /* ------------------------------------------------------------------
     CHECKPOINT 2 — EQUIPMENT MATCH (pointer drag + click-to-match)
     ------------------------------------------------------------------ */
  function equipCard(id, matched) {
    var e = EQUIP[id];
    return '<button class="equip' + (matched ? ' matched' : '') + '" data-eq="' + id + '" aria-label="' + e.label + '">' +
      imgTag('eq_' + id, e.label, 'equip-img', e.icon, 'image placeholder') + '<span class="equip-label">' + e.label + '</span></button>';
  }
  function cp2Count() { return SPORT_IDS.filter(function (id) { return answered('cp2-' + id); }).length; }
  function renderCP2(root) {
    var n = cp2Count();
    root.innerHTML = cpHeader(2, tracker(n, 6, 'matches')) +
      '<div class="kit-banner green"><span class="kb-ico">🧩</span><span><b>Drag</b> each piece of equipment to its sport — or <b>tap</b> the equipment, then <b>tap</b> the sport.</span></div>' +
      (n === 6 ? doneBanner(2) : '') +
      '<div class="cp2-layout">' +
        '<div class="zones">' + SPORT_IDS.map(function (id) {
          var m = answered('cp2-' + id);
          return '<div class="dropzone court-' + id + (m ? ' filled' : '') + '" data-sport="' + id + '" tabindex="0" role="button" aria-label="Drop zone: ' + SPORTS[id].name + '">' +
            '<div class="dz-name">' + SPORTS[id].name + '</div><div class="dz-slot">' + (m ? equipCard(id, true) : '<span class="dz-hint">Drop equipment here</span>') + '</div></div>';
        }).join('') + '</div>' +
        '<div class="tray panel"><h3>🎒 Equipment Bag</h3><div class="tray-items" id="tray">' +
          TRAY_ORDER.filter(function (id) { return !answered('cp2-' + id); }).map(function (id) { return equipCard(id, false); }).join('') +
          (n === 6 ? '<p class="all-done">🎉 Every item matched!</p>' : '') +
        '</div></div>' +
      '</div>';
    wireDrag($('.cp2-layout', root));
  }
  function wireDrag(root) {
    var drag = null, selected = null, suppress = false;
    function clearHi() { $$('.dropzone.hover', root).forEach(function (z) { z.classList.remove('hover'); }); }
    function zoneAt(x, y) { var el = document.elementFromPoint(x, y); return el && el.closest('.dropzone'); }
    function select(card) {
      if (selected) selected.classList.remove('selected');
      selected = (selected === card) ? null : card;
      if (selected) { selected.classList.add('selected'); SFX.click(); }
      root.classList.toggle('picking', !!selected);
    }
    root.addEventListener('pointerdown', function (e) {
      var card = e.target.closest('.equip'); if (!card || card.classList.contains('matched') || e.button > 0) return;
      drag = { card: card, x: e.clientX, y: e.clientY, ghost: null, id: e.pointerId };
      try { card.setPointerCapture(e.pointerId); } catch (err) {}
    });
    root.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.ghost && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8) {
        var r = drag.card.getBoundingClientRect();
        drag.ghost = drag.card.cloneNode(true); drag.ghost.classList.add('ghost');
        drag.ghost.style.width = r.width + 'px'; drag.ghost.style.height = r.height + 'px';
        drag.offX = drag.x - r.left; drag.offY = drag.y - r.top;
        document.body.appendChild(drag.ghost); drag.card.classList.add('dragging');
        if (selected) select(selected);
      }
      if (drag.ghost) {
        e.preventDefault();
        drag.ghost.style.left = (e.clientX - drag.offX) + 'px'; drag.ghost.style.top = (e.clientY - drag.offY) + 'px';
        clearHi(); var z = zoneAt(e.clientX, e.clientY); if (z && !z.classList.contains('filled')) z.classList.add('hover');
      }
    });
    function end(e, cancel) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      if (d.ghost) {
        suppress = true; setTimeout(function () { suppress = false; }, 50);
        var z = cancel ? null : zoneAt(e.clientX, e.clientY);
        d.ghost.remove(); d.card.classList.remove('dragging'); clearHi();
        if (z) tryMatch(d.card, z);
      }
    }
    root.addEventListener('pointerup', function (e) { end(e, false); });
    root.addEventListener('pointercancel', function (e) { end(e, true); });
    root.addEventListener('click', function (e) {
      if (suppress) return;
      var card = e.target.closest('.equip');
      if (card && !card.classList.contains('matched')) { select(card); return; }
      var z = e.target.closest('.dropzone');
      if (z && selected) { var c = selected; select(c); tryMatch(c, z); }
      else if (z && !z.classList.contains('filled')) coachSay('instruct', 'First tap a piece of equipment from the bag, then tap its sport.');
    });
    root.addEventListener('keydown', function (e) {
      var z = e.target.closest('.dropzone');
      if (z && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); z.click(); }
    });
    cleanupFns.push(function () { $$('.equip.ghost').forEach(function (g) { g.remove(); }); });
  }
  function tryMatch(card, zone) {
    if (card.classList.contains('matched') || zone.classList.contains('filled')) { if (zone.classList.contains('filled')) bad(zone, 'This sport already has its equipment.'); return; }
    var eq = card.dataset.eq, sport = zone.dataset.sport;
    if (eq === sport) {
      var res = award('cp2-' + eq, true);
      var slot = $('.dz-slot', zone); slot.innerHTML = '';
      card.classList.remove('selected'); card.classList.add('matched'); slot.appendChild(card);
      zone.classList.add('filled'); SFX.drop(); good(res, zone, EQUIP[eq].label + ' → ' + SPORTS[sport].name + '!');
      var n = cp2Count(); setTracker(n, 6, 'matches');
      if (n === 6) {
        // validate every match before awarding completion
        var valid = $$('.dropzone').every(function (z) { var c = $('.equip', z); return c && c.dataset.eq === z.dataset.sport; });
        if (valid) {
          $('#tray').innerHTML = '<p class="all-done">🎉 Every item matched!</p>';
          $$('.dropzone').forEach(function (z, i) { setTimeout(function () { restartAnim(z, 'pop'); }, i * 120); });
          later(function () { complete(2); }, 1500);
        }
      }
    } else {
      award('cp2-' + eq, false);
      bad(zone, EQUIP[eq].label + ' is not used for ' + SPORTS[sport].name + '. Try again!'); restartAnim(card, 'shake');
    }
  }

  /* ------------------------------------------------------------------
     CHECKPOINT 3 — GRAMMAR DECODER
     ------------------------------------------------------------------ */
  function norm(s) { return String(s).toLowerCase().replace(/[.,!?"“”']/g, ' ').replace(/\s+/g, ' ').trim().replace(/^the /, ''); }
  function superlativeNotes() {
    return '<div class="note-cards">' +
      noteCard('📏', 'Short words', '<b>add -est</b><div class="bars"><span style="height:35%">tall</span><span style="height:60%">taller</span><span style="height:92%">tallest</span></div><p>tall → tallest · fast → fastest</p>') +
      noteCard('🔤', 'Words ending in -y', '<b>y → i + est</b><div class="morph">eas<s>y</s><em>i</em>est</div><p>easy → easiest</p>') +
      noteCard('📚', 'Long words', '<b>most + word</b><div class="morph"><em>most</em> difficult</div><p>difficult → most difficult<br>popular → most popular</p>') +
      noteCard('⭐', 'Special words', '<b>they change!</b><div class="morph">good → <em>best</em><br>bad → <em>worst</em></div>') +
      '</div><p class="note-tip">💡 Use <b>the</b> before a superlative: <i>the tallest</i>, <i>the best</i>, <i>the most popular</i>.</p>';
  }
  function noteCard(ico, title, back) {
    return '<div class="note-card" role="button" tabindex="0"><div class="nc-inner"><div class="nc-front"><span class="nc-ico">' + ico + '</span><b>' + title + '</b><small>Tap to learn</small></div><div class="nc-back">' + back + '</div></div></div>';
  }
  function renderCP3(root) {
    var done = CP3.filter(function (c, i) { return answered('cp3-' + i); }).length;
    root.innerHTML = cpHeader(3, tracker(done, 7, 'locks opened')) +
      '<div class="kit-banner purple"><span class="kb-ico">🎡</span><span>Take a <b>Sentence Card</b>. Spin your <b>Decoder Wheel</b>. Unlock the correct superlative!</span></div>' +
      '<div class="cp3-layout">' +
        '<div class="panel notes-panel"><div class="np-head"><h3>📒 Decoder Notes</h3>' + audioCtl('grammar', 'Listen') + '</div>' + superlativeNotes() + '</div>' +
        '<div class="panel mission" id="cp3-mission"></div>' +
      '</div>';
    drawMission();
  }
  function cp3Index() { for (var i = 0; i < CP3.length; i++) if (!answered('cp3-' + i)) return i; return -1; }
  function lockRow(cur) {
    return '<div class="lock-row">' + CP3.map(function (c, j) { var o = answered('cp3-' + j); return '<span class="mini-lock' + (o ? ' open' : '') + (j === cur ? ' current' : '') + '">' + (o ? '🔓' : '🔒') + '<small>' + (j + 1) + '</small></span>'; }).join('') + '</div>';
  }
  function drawMission() {
    var m = $('#cp3-mission'); if (!m) return;
    var i = cp3Index();
    if (i === -1) {
      m.innerHTML = lockRow(-1) + '<div class="mission-done"><div class="padlock big open">' + PADLOCK + '</div><h3>Secret mission complete!</h3><p>You decoded all 7 superlatives.</p>' +
        '<ul class="decoded">' + CP3.map(function (c) { return '<li><b>' + c.adj + '</b> → ' + c.answer + '</li>'; }).join('') + '</ul>' +
        (isDone(3) ? '<button class="btn btn-gold" data-action="map">🗺️ Back to Map</button>' : '') + '</div>';
      if (!isDone(3)) later(function () { complete(3); }, 1400);
      return;
    }
    var c = CP3[i];
    m.innerHTML = lockRow(i) +
      '<div class="mission-body"><div class="padlock" id="padlock">' + PADLOCK + '</div>' +
        '<div class="secret-card"><small>SENTENCE CARD ' + (i + 1) + ' OF 7</small><div class="clue-chip">' + c.adj + '</div>' +
        '<p class="sentence">' + esc(c.sentence).replace('______', '<span class="blank" id="blank">______</span>') + '</p></div></div>' +
      '<button class="btn btn-orange wheel-btn" id="wheel-btn">🎡 I have spun my Decoder Wheel</button>' +
      '<form class="decode-form" id="decode-form" autocomplete="off"><input id="decode-input" type="text" spellcheck="false" autocapitalize="off" placeholder="Type the superlative…" disabled aria-label="Type the superlative"><button class="btn btn-green" id="decode-go" disabled>🔓 Unlock</button></form>' +
      '<div class="hint" id="cp3-hint"></div>';
    $('#wheel-btn').addEventListener('click', function () {
      var b = $('#wheel-btn'); b.classList.add('ready'); b.textContent = '✅ Decoder Wheel ready — type your answer!';
      $('#decode-input').disabled = false; $('#decode-go').disabled = false; $('#decode-input').focus(); SFX.flip();
    });
    $('#decode-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var inp = $('#decode-input'), val = inp.value;
      if (!norm(val)) { bad(inp, 'Type your answer first.'); return; }
      if (norm(val) === c.answer) {
        var res = award('cp3-' + i, true);
        inp.disabled = true; $('#decode-go').disabled = true;
        $('#blank').textContent = c.answer; $('#blank').classList.add('filled');
        $('#padlock').classList.add('open'); SFX.unlock();
        good(res, $('#padlock'));
        setTracker(CP3.filter(function (x, j) { return answered('cp3-' + j); }).length, 7, 'locks opened');
        later(drawMission, 1700);
      } else {
        award('cp3-' + i, false);
        bad(inp, RULE_HINT[c.rule]);
        $('#cp3-hint').innerHTML = '💡 Hint: ' + RULE_HINT[c.rule];
        inp.select();
      }
    });
  }

  /* ------------------------------------------------------------------
     CHECKPOINT 4 — VIRTUAL REFEREE
     ------------------------------------------------------------------ */
  var cp4Timer = null;
  function videoPlayer() {
    var missing = status[A.referee] === false;
    return '<div class="tv"><div class="tv-top"><span class="live">● REPLAY</span><span>Sports Replay Screen</span></div>' +
      '<div class="tv-screen">' + (missing ? '' : '<video id="ref-video" preload="metadata" playsinline src="' + A.referee + '"></video>') +
        '<div class="video-missing' + (missing ? '' : ' hidden') + '" id="video-missing"><span>🎬</span><b>VIDEO NOT YET AVAILABLE</b><small>Add <code>' + A.referee + '</code> to enable the replay.</small></div></div>' +
      '<div class="vcontrols' + (missing ? ' disabled' : '') + '" id="vcontrols">' +
        '<button class="vbtn" data-v="play" aria-label="Play">▶ Play</button><button class="vbtn" data-v="pause" aria-label="Pause">⏸ Pause</button><button class="vbtn" data-v="replay" aria-label="Replay">↺ Replay</button>' +
        '<input class="vprogress" id="vprogress" type="range" min="0" max="1000" value="0" aria-label="Video progress">' +
        '<span class="vtime" id="vtime">0:00 / 0:00</span>' +
        '<label class="vvol">🔊<input id="vvol" type="range" min="0" max="1" step="0.05" value="0.8" aria-label="Volume"></label></div></div>';
  }
  function fmt(t) { t = isFinite(t) ? t : 0; var m = Math.floor(t / 60), s = Math.floor(t % 60); return m + ':' + (s < 10 ? '0' : '') + s; }
  function wireVideo(root) {
    var v = $('#ref-video', root), ctl = $('#vcontrols', root);
    var setDisabled = function () { ctl.classList.add('disabled'); $$('button,input', ctl).forEach(function (x) { x.disabled = true; }); };
    if (!v) { setDisabled(); return; }
    var missing = function () { status[A.referee] = false; $('#video-missing').classList.remove('hidden'); v.remove(); setDisabled(); refreshTeacher(); };
    v.addEventListener('error', missing);
    v.addEventListener('loadedmetadata', function () { status[A.referee] = true; $('#vtime').textContent = '0:00 / ' + fmt(v.duration); });
    v.addEventListener('timeupdate', function () {
      if (v.duration) $('#vprogress').value = Math.round(v.currentTime / v.duration * 1000);
      $('#vtime').textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration);
    });
    v.volume = 0.8;
    ctl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-v]'); if (!b) return;
      if (b.dataset.v === 'play') v.play().catch(function () {});
      if (b.dataset.v === 'pause') v.pause();
      if (b.dataset.v === 'replay') { v.currentTime = 0; v.play().catch(function () {}); }
    });
    $('#vprogress').addEventListener('input', function (e) { if (v.duration) v.currentTime = e.target.value / 1000 * v.duration; });
    $('#vvol').addEventListener('input', function (e) { v.volume = +e.target.value; v.muted = v.volume === 0; });
    cleanupFns.push(function () { v.pause(); });
  }
  function cp4Stats() {
    var c = 0, p = 0; CP4_Q.forEach(function (q, i) { if (answered('cp4-' + i)) { c++; p += state.answered['cp4-' + i]; } });
    return { correct: c, pts: p };
  }
  function cp4Index() { for (var i = 0; i < CP4_Q.length; i++) if (!answered('cp4-' + i)) return i; return -1; }
  function updateScoreboard(i) {
    var s = cp4Stats();
    if ($('#sb-correct')) { $('#sb-correct').textContent = s.correct; $('#sb-pts').textContent = s.pts; $('#sb-q').textContent = (i === -1 ? 6 : i + 1) + '/6'; }
    setTracker(s.correct, 6, 'calls made');
  }
  function refBlow(mood) {
    var r = $('#referee'); if (!r) return;
    r.classList.remove('blow', 'happy'); void r.offsetWidth; r.classList.add(mood || 'blow');
  }
  function renderCP4(root) {
    var t = teamObj() || TEAMS[0], s = cp4Stats(), qi = cp4Index();
    root.innerHTML = cpHeader(4, tracker(s.correct, 6, 'calls made')) +
      '<div class="kit-banner orange"><span class="kb-ico">🟨</span><span>Watch the replay, listen for the whistle and make the right call before time runs out!</span></div>' +
      '<div class="cp4-layout">' +
        '<div class="cp4-left">' + videoPlayer() +
          '<div class="ref-row"><div class="referee" id="referee">' + REFEREE + '</div>' +
          '<div class="scoreboard"><div class="sb-title">SCOREBOARD</div><div class="sb-grid">' +
            '<div class="sb-team"><small>TEAM</small><b>' + t.mascot + ' ' + t.name + '</b></div>' +
            '<div><small>CORRECT</small><b id="sb-correct">' + s.correct + '</b></div>' +
            '<div><small>QUESTION</small><b id="sb-q">' + (qi === -1 ? 6 : qi + 1) + '/6</b></div>' +
            '<div><small>POINTS</small><b id="sb-pts">' + s.pts + '</b></div></div></div></div>' +
        '</div>' +
        '<div class="panel cp4-show" id="cp4-show"></div>' +
      '</div>';
    wireVideo(root);
    cleanupFns.push(function () { clearInterval(cp4Timer); cp4Timer = null; });
    var show4 = $('#cp4-show');
    if (qi === -1) { cp4Finished(); return; }
    show4.innerHTML = '<div class="gs-start"><div class="gs-lights"><span></span><span></span><span></span><span></span><span></span></div><h3>🎙️ The Referee Game Show!</h3>' +
      '<p>6 quick calls about <b>sports</b>, <b>equipment</b> and <b>superlatives</b>. You have <b>' + CP4_TIME + ' seconds</b> for each question.</p>' +
      '<button class="btn btn-orange btn-xl glow" id="gs-go">🟨 Blow the whistle & start!</button></div>';
    $('#gs-go').addEventListener('click', function () { SFX.whistle(); refBlow(); askCP4(cp4Index()); });
  }
  function askCP4(i) {
    var q = CP4_Q[i], box = $('#cp4-show'); if (!box) return;
    updateScoreboard(i);
    box.innerHTML = '<div class="gs-q"><div class="gs-top"><small>QUESTION ' + (i + 1) + ' OF 6</small>' +
      '<div class="timer" id="timer"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="t-bg"/><circle cx="22" cy="22" r="19" class="t-fg" id="t-fg"/></svg><b id="t-num">' + CP4_TIME + '</b></div></div>' +
      '<h3 class="gs-question">' + esc(q.q) + '</h3><div class="choices big" id="gs-choices">' +
      q.opts.map(function (o, j) { return '<button class="choice" data-j="' + j + '"><span class="ch-letter">' + 'ABC'[j] + '</span><span>' + esc(o) + '</span></button>'; }).join('') +
      '</div><div class="gs-feedback" id="gs-fb"></div></div>';
    startTimer(i);
    $('#gs-choices').addEventListener('click', function (e) {
      var b = e.target.closest('.choice'); if (!b || b.disabled) return;
      if (+b.dataset.j === q.a) {
        clearInterval(cp4Timer);
        var res = award('cp4-' + i, true);
        b.classList.add('right'); $$('#gs-choices .choice').forEach(function (x) { x.disabled = true; });
        $('#gs-fb').innerHTML = '✅ Good call!'; refBlow('happy'); good(res, b); updateScoreboard(i);
        var n = cp4Index();
        later(function () { if (n === -1) { SFX.whistle(); refBlow(); cp4Finished(); } else askCP4(n); }, 1500);
      } else {
        award('cp4-' + i, false);
        b.disabled = true; b.classList.add('wrong'); $('#gs-fb').innerHTML = '❌ Not that one — try again!';
        bad(b);
      }
    });
  }
  function startTimer(i) {
    if (answered('cp4-' + i) || !$('#t-fg')) return;
    clearInterval(cp4Timer);
    var t = CP4_TIME, fg = $('#t-fg'), C = 2 * Math.PI * 19;
    var draw = function () { if (!fg) return; fg.style.strokeDasharray = C; fg.style.strokeDashoffset = C * (1 - t / CP4_TIME); $('#t-num').textContent = t; $('#timer').classList.toggle('low', t <= 5); };
    draw();
    cp4Timer = setInterval(function () {
      t--; draw(); if (t > 0 && t <= 5) SFX.tick();
      if (t <= 0) {
        clearInterval(cp4Timer);
        award('cp4-' + i, false);
        SFX.whistle(); refBlow();
        var fb = $('#gs-fb'); if (fb) fb.innerHTML = '⏰ Time\'s up! The referee gives you another try.';
        coachSay('encourage', 'Time\'s up! Read carefully and try again.');
        later(function () { startTimer(i); }, 1600);
      }
    }, 1000);
  }
  function cp4Finished() {
    var s = cp4Stats(), box = $('#cp4-show');
    box.innerHTML = '<div class="gs-end"><span class="big-ico">🏅</span><h3>Full time!</h3><p>You made <b>' + s.correct + ' / 6</b> correct calls and scored <b>' + s.pts + ' points</b> in the game show.</p>' +
      (isDone(4) ? '<button class="btn btn-gold" data-action="map">🗺️ Back to Map</button>' : '') + '</div>';
    updateScoreboard(-1);
    if (!isDone(4)) later(function () { complete(4); }, 1400);
  }

  /* ------------------------------------------------------------------
     CHECKPOINT 5 — SPORTS REPORTER
     ------------------------------------------------------------------ */
  var pick5 = {}, rec = null, recStream = null, recChunks = [], recUrl = null;
  function renderCP5(root) {
    pick5 = { sport: null, sup: null, reason: null };
    var tasks = (state.reportChecked ? 1 : 0) + (state.teacherConfirmed ? 1 : 0);
    var group = function (g, title) {
      return '<div class="word-group"><h4>' + title + '</h4><div class="words" data-group="' + g + '">' + CP5[g].map(function (w) { return '<button class="word" data-val="' + esc(w) + '">' + esc(w) + '</button>'; }).join('') + '</div></div>';
    };
    root.innerHTML = cpHeader(5, tracker(tasks, 2, 'tasks')) +
      '<div class="kit-banner green"><span class="kb-ico">🎤</span><span>Build your report, practise with your <b>microphone prop</b> and read it aloud to your group!</span></div>' +
      (isDone(5) ? doneBanner(5) : '') +
      '<div class="cp5-layout">' +
        '<div class="studio">' +
          '<div class="studio-window"><div class="sw-crowd"></div><div class="sw-field"></div></div>' +
          '<div class="on-air">● ON AIR</div>' +
          '<div class="studio-monitor"><span id="monitor-icon">📺</span><small id="monitor-text">Choose a sport</small></div>' +
          '<div class="studio-coach">' + coachImg('instruct', 'coach-mid') + '</div>' +
          '<div class="desk"><div class="desk-mic">' + MIC + '</div><div class="desk-logo">SPORTS QUEST NEWS</div></div>' +
          '<div class="ticker"><span>BREAKING: Year 4 reporters share their favourite sports! ⚽ 🏀 🏸 🏒 🚴 🏊 · </span></div>' +
        '</div>' +
        '<div class="panel builder">' +
          '<div class="starter"><small>SENTENCE STARTER</small>“Hello everyone! I am your sports reporter.”</div>' +
          group('sport', '1 · Choose a sport') + group('sup', '2 · Choose a superlative') + group('reason', '3 · Choose a reason') +
          '<div class="preview" id="preview"></div>' +
          '<div class="row"><button class="btn btn-gold" id="build-btn">📝 Put it in my report</button>' + audioCtl('reporter', 'Model report') + '</div>' +
          '<label class="ta-label" for="report-text">✏️ My sports report (you can edit it):</label>' +
          '<textarea id="report-text" rows="3" placeholder="Hello everyone! I am your sports reporter. I think …">' + esc(state.reportText) + '</textarea>' +
          '<div class="row"><button class="btn btn-green" id="check-report">✅ Check my report</button><span class="report-ok" id="report-ok">' + (state.reportChecked ? '✔ Report checked' : '') + '</span></div>' +
          '<div class="speak-box"><h4>🗣️ Speaking practice</h4><ol><li>Listen to the <b>model report</b>.</li><li>Hold your <b>microphone prop</b>.</li><li>Read your report <b>aloud</b>, clearly and slowly.</li><li>Ask your <b>teacher</b> to listen and confirm.</li></ol>' +
            '<div class="rec"><button class="btn btn-small btn-orange" id="rec-start">⏺ Record (optional)</button><button class="btn btn-small btn-navy" id="rec-stop" disabled>⏹ Stop</button><audio id="rec-play" controls class="hidden"></audio></div>' +
            '<p class="rec-note" id="rec-note">Optional: recording only works if your browser supports it and you allow the microphone. It stays on this device and is not uploaded. There is no speech recognition — your teacher listens and confirms.</p></div>' +
          '<button class="btn btn-purple btn-lg" id="teacher-confirm">' + (state.teacherConfirmed ? '✔ Teacher confirmed' : '👩‍🏫 Teacher: confirm speaking') + '</button>' +
        '</div>' +
      '</div>';
    updatePreview();
    $$('.words', root).forEach(function (w) {
      w.addEventListener('click', function (e) {
        var b = e.target.closest('.word'); if (!b) return;
        $$('.word', w).forEach(function (x) { x.classList.toggle('on', x === b); });
        pick5[w.dataset.group] = b.dataset.val; SFX.click(); updatePreview();
      });
    });
    $('#build-btn').addEventListener('click', function () {
      if (!pick5.sport || !pick5.sup || !pick5.reason) { bad($('#build-btn'), 'Choose a sport, a superlative and a reason first.'); return; }
      var txt = 'Hello everyone! I am your sports reporter. I think ' + pick5.sport.toLowerCase() + ' is the ' + pick5.sup + ' sport because ' + pick5.reason + '.';
      $('#report-text').value = txt; state.reportText = txt; save(); SFX.drop(); restartAnim($('#report-text'), 'pop');
    });
    $('#report-text').addEventListener('input', function (e) { state.reportText = e.target.value; save(); });
    $('#check-report').addEventListener('click', function () {
      var txt = $('#report-text').value.toLowerCase();
      var hasSport = SPORT_IDS.some(function (id) { return txt.indexOf(SPORTS[id].name.toLowerCase()) !== -1; });
      var hasSup = /\bthe\s+(most\s+[a-z]+|best|worst|[a-z]+est)\b/.test(txt);
      var res = award('cp5-report', hasSport && hasSup);
      if (hasSport && hasSup) {
        state.reportChecked = true; save();
        $('#report-ok').textContent = '✔ Report checked'; good(res, $('#check-report'), 'Now read it aloud!');
        setTracker(1 + (state.teacherConfirmed ? 1 : 0), 2, 'tasks');
      } else {
        bad($('#report-text'), !hasSport ? 'Include a sport, e.g. badminton.' : 'Include a superlative, e.g. "the most exciting".');
      }
    });
    $('#teacher-confirm').addEventListener('click', function () {
      if (state.teacherConfirmed) { coachSay('celebrate', 'Your teacher has already confirmed your speaking!'); return; }
      if (!state.reportChecked) { coachSay('instruct', 'First build your report and press <b>Check my report</b>.'); return; }
      if (!window.confirm('TEACHER CHECK\n\nHas this pupil read the sports report aloud clearly?\n\nPress OK to confirm.')) return;
      var res = award('cp5-speaking', true);
      state.teacherConfirmed = true; save();
      $('#teacher-confirm').textContent = '✔ Teacher confirmed';
      setTracker(2, 2, 'tasks'); good(res, $('#teacher-confirm'), 'Great speaking!');
      later(function () { complete(5); }, 1200);
    });
    wireRecorder();
  }
  function updatePreview() {
    var p = $('#preview'); if (!p) return;
    var f = function (v) { return v ? '<b>' + esc(v) + '</b>' : '<span class="gap">____</span>'; };
    p.innerHTML = '🎙️ I think ' + f(pick5.sport && pick5.sport.toLowerCase()) + ' is the ' + f(pick5.sup) + ' sport because ' + f(pick5.reason) + '.';
    var id = null; SPORT_IDS.forEach(function (x) { if (pick5.sport === SPORTS[x].name) id = x; });
    $('#monitor-icon').textContent = id ? SPORTS[id].icon : '📺';
    $('#monitor-text').textContent = id ? SPORTS[id].name : 'Choose a sport';
  }
  function wireRecorder() {
    var note = $('#rec-note'), start = $('#rec-start'), stop = $('#rec-stop'), play = $('#rec-play');
    var supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    if (!supported) { start.disabled = true; note.textContent = 'Recording is not supported in this browser. Please read your report aloud to your teacher instead.'; return; }
    start.addEventListener('click', function () {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        recStream = stream; recChunks = [];
        rec = new MediaRecorder(stream);
        rec.ondataavailable = function (e) { if (e.data && e.data.size) recChunks.push(e.data); };
        rec.onstop = function () {
          var blob = new Blob(recChunks, { type: rec.mimeType || 'audio/webm' });
          if (recUrl) URL.revokeObjectURL(recUrl);
          recUrl = URL.createObjectURL(blob); play.src = recUrl; play.classList.remove('hidden');
          stopStream(); note.textContent = 'Recording ready — press play to listen to yourself. (Saved on this device only, until you leave this screen.)';
        };
        rec.start(); start.disabled = true; stop.disabled = false; start.classList.add('recording');
        note.textContent = '🔴 Recording… read your report aloud, then press Stop.';
      }).catch(function () { note.textContent = 'Microphone permission was not given. That is OK — read your report aloud to your teacher instead.'; });
    });
    stop.addEventListener('click', function () {
      if (rec && rec.state !== 'inactive') rec.stop();
      start.disabled = false; stop.disabled = true; start.classList.remove('recording');
    });
    cleanupFns.push(function () { if (rec && rec.state !== 'inactive') { rec.onstop = null; rec.stop(); } stopStream(); });
  }
  function stopStream() { if (recStream) { recStream.getTracks().forEach(function (t) { t.stop(); }); recStream = null; } }

  /* ------------------------------------------------------------------
     CHECKPOINT 6 — CHAMPION ZONE + CERTIFICATE
     ------------------------------------------------------------------ */
  function cp6Index() { for (var i = 0; i < CP6_Q.length; i++) if (!answered('cp6-' + i)) return i; return -1; }
  function renderCP6(root) {
    var qi = cp6Index();
    if (qi === -1) { if (!isDone(6)) complete(6); renderFinale(root); return; }
    root.innerHTML = cpHeader(6, tracker(qi, 5, 'questions')) +
      '<div class="kit-banner gold"><span class="kb-ico">🏆</span><span>Final challenge! Answer <b>5 questions</b> to become a <b>Champion</b>.</span></div>' +
      '<div class="cp6-layout"><div class="panel cp6-q" id="cp6-q"></div>' +
      '<div class="cp6-side">' + coachImg('instruct', 'coach-mid') + '<div class="bubble">Read carefully. You can do it, champion!</div>' +
      '<div class="cp6-types">' + CP6_Q.map(function (q, i) { return '<span class="' + (answered('cp6-' + i) ? 'on' : '') + '">' + (i + 1) + '. ' + q.type + '</span>'; }).join('') + '</div></div></div>';
    askCP6(qi);
  }
  function askCP6(i) {
    var q = CP6_Q[i], box = $('#cp6-q'); if (!box) return;
    box.innerHTML = '<small class="q-type">QUESTION ' + (i + 1) + ' OF 5 · ' + q.type.toUpperCase() + '</small>' +
      (q.passage ? '<div class="passage">📖 ' + esc(q.passage) + '</div>' : '') +
      (q.visual ? '<div class="q-visual">' + imgTag('eq_' + q.visual, EQUIP[q.visual].label, 'equip-img', EQUIP[q.visual].icon, 'image placeholder') + '<span>' + EQUIP[q.visual].label + '</span></div>' : '') +
      '<h3 class="cz-question">' + esc(q.q) + '</h3>' +
      '<div class="choices grid2" id="cz-choices">' + q.opts.map(function (o, j) { return '<button class="choice" data-j="' + j + '"><span class="ch-letter">' + 'ABCD'[j] + '</span><span>' + esc(o) + '</span></button>'; }).join('') + '</div>' +
      '<div class="gs-feedback" id="cz-fb"></div>';
    $('#cz-choices').addEventListener('click', function (e) {
      var b = e.target.closest('.choice'); if (!b || b.disabled) return;
      if (+b.dataset.j === q.a) {
        var res = award('cp6-' + i, true);
        b.classList.add('right'); $$('#cz-choices .choice').forEach(function (x) { x.disabled = true; });
        $('#cz-fb').innerHTML = '✅ Correct! ' + (res.pts ? '+' + res.pts + ' points' : '');
        good(res, b);
        var n = cp6Index(); setTracker(n === -1 ? 5 : n, 5, 'questions');
        var types = $$('.cp6-types span'); if (types[i]) types[i].classList.add('on');
        later(function () {
          if (n === -1) { complete(6); renderFinale($('#screen-play')); } else askCP6(n);
        }, 1400);
      } else {
        award('cp6-' + i, false);
        b.disabled = true; b.classList.add('wrong'); $('#cz-fb').innerHTML = '❌ Not quite. Try again!';
        bad(b);
      }
    });
  }
  function badgesHTML() {
    return CHECKPOINTS.map(function (c) { var e = isDone(c.n); return '<div class="badge' + (e ? ' earned' : '') + '" style="--i:' + c.n + '"><span class="bd-ico">' + (e ? c.icon : '🔒') + '</span><span class="bd-name">' + c.name + '</span></div>'; }).join('');
  }
  function certificateHTML() {
    var t = teamObj() || TEAMS[0];
    var d = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return '<div class="certificate"><div class="cert-inner">' +
      '<div class="cert-trophy">' + TROPHY + '</div>' +
      '<div class="cert-kicker">THE ULTIMATE SPORTS QUEST — STADIUM ADVENTURE</div>' +
      '<h2 class="cert-title">Champion Certificate</h2>' +
      '<p>This certificate is proudly presented to</p>' +
      '<div class="cert-name" id="cert-name">' + (state.pupilName ? esc(state.pupilName) : '______________________') + '</div>' +
      '<p>of team <b>' + t.mascot + ' ' + t.name + '</b> for completing all six checkpoints<br>of the Sports and Health adventure (Year 4 English).</p>' +
      '<div class="cert-stats"><span>🪙 ' + state.points + ' points</span><span>⭐ ' + state.stars + ' stars</span><span>🏁 ' + state.completed.length + '/6 checkpoints</span></div>' +
      '<div class="cert-badges">' + CHECKPOINTS.map(function (c) { return '<span>' + c.icon + '<small>' + c.name + '</small></span>'; }).join('') + '</div>' +
      '<div class="cert-foot"><span>Date: ' + d + '</span><span>Teacher: ____________________</span></div>' +
      '</div></div>';
  }
  function renderFinale(root) {
    var t = teamObj() || TEAMS[0], champ = state.completed.length === 6;
    root.innerHTML =
      '<div class="cp-head"><button class="btn btn-small btn-navy" data-action="map">⬅ Map</button><div class="cp-title"><span class="cp-ico">🏆</span><div><small>CHAMPION HALL</small><h2>' + (champ ? 'Champion Status Unlocked!' : 'Champion Zone') + '</h2></div></div><span></span></div>' +
      '<div class="finale">' +
        '<div class="finale-top panel">' +
          '<div class="finale-trophy">' + TROPHY + '<div class="trophy-glow"></div></div>' +
          '<div class="finale-text"><small>' + t.mascot + ' TEAM ' + t.name.toUpperCase() + '</small><h2>You are a Sports Quest Champion!</h2>' +
            '<div class="finale-stats"><div><b>' + state.points + '</b><small>Total points</small></div><div><b>' + state.stars + '</b><small>Stars</small></div><div><b>' + state.completed.length + '/6</b><small>Checkpoints</small></div></div></div>' +
          coachImg('achieve', 'coach-mid') +
        '</div>' +
        '<div class="badges">' + badgesHTML() + '</div>' +
        '<div class="finale-bottom">' +
          '<div class="panel reflect"><h3>💭 What did you learn today?</h3><textarea id="reflection" rows="4" placeholder="Today I learned…">' + esc(state.reflection) + '</textarea>' +
            '<div class="row"><button class="btn btn-green" id="save-reflect">💾 Save my reflection</button><span id="reflect-saved" class="report-ok"></span></div></div>' +
          '<div class="panel cert-panel"><h3>📜 Champion Certificate</h3>' +
            '<div class="row"><label class="name-label">Your name: <input id="pupil-name" maxlength="40" value="' + esc(state.pupilName) + '" placeholder="Type your name"></label>' +
            '<button class="btn btn-gold" id="print-cert">🖨️ Print certificate</button></div>' +
            '<div class="cert-preview" id="cert-preview">' + certificateHTML() + '</div></div>' +
        '</div>' +
      '</div>';
    SFX.fanfare(); confetti(220); setTimeout(function () { confetti(120); }, 1200);
    coachSay('achieve', '🏆 Congratulations, ' + esc(t.name) + '! You are CHAMPIONS!', 4000);
    $('#save-reflect').addEventListener('click', function () {
      state.reflection = $('#reflection').value; save();
      $('#reflect-saved').textContent = state.reflection.trim() ? '✔ Saved!' : 'Write something first!';
      if (state.reflection.trim()) SFX.star();
    });
    $('#pupil-name').addEventListener('input', function (e) {
      state.pupilName = e.target.value; save();
      $('#cert-preview').innerHTML = certificateHTML();
    });
    $('#print-cert').addEventListener('click', function () {
      $('#print-area').innerHTML = certificateHTML();
      window.print();
    });
  }

  /* ------------------------------------------------------------------
     8. MODALS: How to Play · Notes · Teacher
     ------------------------------------------------------------------ */
  function openModal(html, cls) {
    $('#modal-root').innerHTML = '<div class="modal-backdrop"><div class="modal panel ' + (cls || '') + '" role="dialog" aria-modal="true"><button class="modal-x" data-action="close-modal" aria-label="Close">✕</button>' + html + '</div></div>';
  }
  function closeModal() { $('#modal-root').innerHTML = ''; }
  function openHowTo() {
    var steps = [['👥', 'Choose your team', 'Pick Blue Lightning, Green Dragons, Orange Rockets or Purple Panthers.'], ['🗺️', 'Explore the Stadium Map', 'Start at Checkpoint 1. Finish one checkpoint to unlock the next.'], ['🪙', 'Earn points', 'Correct first try = 10 points. Correct after a retry = 5 points.'], ['⭐', 'Collect stars', 'Every completed checkpoint gives you 1 star.'], ['🧰', 'Use your learning kit', 'Use your Sports Fact File, Decoder Wheel, Sentence Cards and microphone prop when the coach asks.'], ['🏆', 'Become a Champion', 'Complete all 6 checkpoints to unlock Champion status and your certificate.']];
    openModal('<h2 class="modal-title">❓ How to Play</h2><div class="howto">' + steps.map(function (s, i) { return '<div class="how-step" style="--i:' + i + '"><span class="hs-ico">' + s[0] + '</span><div><b>' + s[1] + '</b><p>' + s[2] + '</p></div></div>'; }).join('') + '</div>' +
      '<div class="modal-actions"><button class="btn btn-gold btn-lg" data-action="close-modal">Got it! 👍</button></div>', 'modal-wide');
  }
  function openNotes() {
    var sportsTab = '<div class="note-cards six">' + SPORT_IDS.map(function (id) {
      var s = SPORTS[id];
      return '<div class="note-card" role="button" tabindex="0"><div class="nc-inner"><div class="nc-front"><span class="nc-ico">' + s.icon + '</span><b>' + s.name + '</b><small>Tap to learn</small></div>' +
        '<div class="nc-back"><b>Equipment:</b><span class="nc-eq">' + EQUIP[id].icon + ' ' + EQUIP[id].label + '</span><p>' + s.clue + '</p>' + audioCtl('clue_' + id, 'Listen') + '</div></div></div>';
    }).join('') + '</div>';
    openModal('<h2 class="modal-title">📒 Interactive Notes</h2><div class="tabs"><button class="tab on" data-tab="t-sports">🏅 Sports & Equipment</button><button class="tab" data-tab="t-sup">🔤 Superlatives</button></div>' +
      '<div class="tab-panel" id="t-sports">' + sportsTab + '</div><div class="tab-panel hidden" id="t-sup"><div class="np-head">' + audioCtl('grammar', 'Listen to the grammar notes') + '</div>' + superlativeNotes() +
      '<table class="sup-table"><tr><th>Adjective</th><th>Superlative</th></tr>' + CP3.map(function (c) { return '<tr><td>' + c.adj.toLowerCase() + '</td><td>the ' + c.answer + '</td></tr>'; }).join('') + '</table></div>', 'modal-wide');
  }
  function openTeacher() { openModal('<div id="teacher-body"></div>', 'modal-wide modal-teacher'); refreshTeacher(); }
  function refreshTeacher() {
    var body = $('#teacher-body'); if (!body) return;
    var found = 0, missing = 0, unk = 0;
    var rows = ASSET_LIST.map(function (r) {
      var s = status[A[r[1]]], label;
      if (s === true) { found++; label = '<span class="st ok">✅ Found</span>'; }
      else if (s === false) { missing++; label = '<span class="st no">❌ Missing</span>'; }
      else { unk++; label = '<span class="st un">⏳ Checking / not confirmed</span>'; }
      return '<tr><td>' + r[0] + '</td><td><code>' + A[r[1]] + '</code></td><td>' + r[3] + '</td><td>' + label + '</td></tr>';
    }).join('');
    body.innerHTML = '<h2 class="modal-title">👩‍🏫 Teacher Panel</h2>' +
      '<div class="teacher-grid"><div class="t-box"><b>' + found + '</b><small>assets found</small></div><div class="t-box bad"><b>' + missing + '</b><small>assets missing</small></div><div class="t-box"><b>' + unk + '</b><small>not confirmed</small></div><div class="t-box"><b>' + (storageOK ? 'Yes' : 'No') + '</b><small>progress saving</small></div></div>' +
      '<p class="t-note">⚠️ <b>Learning objectives are provisional</b> and need teacher confirmation. DSKP learning standards are <b>pending verification</b> and are not stated in the game.</p>' +
      '<p class="t-note">Missing images show labelled placeholders. Missing audio shows “AUDIO NOT YET AVAILABLE”. Missing video shows “VIDEO NOT YET AVAILABLE”. Background music uses an original synthesised loop when <code>background-music.mp3</code> is missing.</p>' +
      '<p class="t-note">Pupil progress: <b>' + state.points + '</b> points · <b>' + state.stars + '</b> stars · checkpoints completed: <b>' + (state.completed.slice().sort().join(', ') || 'none') + '</b>' + (state.reflection ? '<br>Reflection: “' + esc(state.reflection) + '”' : '') + '</p>' +
      '<div class="t-table-wrap"><table class="asset-table"><tr><th>Type</th><th>File</th><th>Purpose</th><th>Status</th></tr>' + rows + '</table></div>' +
      '<div class="modal-actions"><button class="btn btn-orange" data-action="reset">↺ Reset game for a new pupil</button><button class="btn btn-gold" data-action="close-modal">Close</button></div>';
  }

  function doReset() {
    if (!window.confirm('Reset the game?\n\nThis clears the team, points, stars and all checkpoint progress on this device.')) return;
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    state = defaultState(); save();
    lastTokenCP = null; mapSel = null;
    closeModal(); AudioMgr.stop();
    renderWelcome(); show('welcome');
    coachSay('welcome', 'The game has been reset. Ready for a new adventure!');
  }
  function resume() {
    var s = state.screen || '';
    if (!state.team) { renderTeam(); show('team'); return; }
    if (s.indexOf('cp') === 0) { var n = +s.slice(2); if (n >= 1 && n <= 6 && isUnlocked(n)) { openCheckpoint(n); return; } }
    if (s === 'objectives') { renderObjectives(); show('objectives'); return; }
    goMap();
  }

  /* ------------------------------------------------------------------
     9. GLOBAL EVENTS
     ------------------------------------------------------------------ */
  document.addEventListener('click', function (e) {
    var au = e.target.closest('[data-audio]');
    if (au) { AudioMgr.toggle(au.dataset.audio, au.closest('.audio-ctl')); return; }
    var nc = e.target.closest('.note-card');
    if (nc) { nc.classList.toggle('flipped'); SFX.flip(); return; }
    var tab = e.target.closest('.tab');
    if (tab) {
      $$('.tab').forEach(function (x) { x.classList.toggle('on', x === tab); });
      $$('.tab-panel').forEach(function (p) { p.classList.toggle('hidden', p.id !== tab.dataset.tab); });
      SFX.click(); return;
    }
    var tc = e.target.closest('.team-card');
    if (tc) {
      state.team = tc.dataset.team; save(); SFX.star(); starBurst(tc);
      $$('.team-card').forEach(function (x) { x.classList.toggle('selected', x === tc); });
      var go = $('[data-action="team-go"]'); if (go) go.disabled = false;
      updateHUD(); return;
    }
    if (e.target.classList.contains('modal-backdrop')) { closeModal(); return; }
    var t = e.target.closest('[data-action]');
    if (!t || t.disabled) return;
    SFX.click();
    switch (t.dataset.action) {
      case 'start': renderTeam(); show('team'); break;
      case 'continue': resume(); break;
      case 'home': renderWelcome(); show('welcome'); break;
      case 'howto': openHowTo(); break;
      case 'teacher': openTeacher(); break;
      case 'music': toggleMusic(); break;
      case 'sound': state.sound = !state.sound; save(); updateToggles(); break;
      case 'team-go': if (state.team) { renderObjectives(); show('objectives'); coachSay('welcome', 'Welcome, ' + esc(teamObj().name) + '! ' + teamObj().cheer); } break;
      case 'map': closeModal(); goMap(); break;
      case 'notes': openNotes(); break;
      case 'reset': doReset(); break;
      case 'close-modal': closeModal(); break;
      case 'enter': closeModal(); openCheckpoint(+t.dataset.n); break;
    }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.note-card')) { e.preventDefault(); e.target.click(); }
    if (e.key === 'Escape' && $('.modal-backdrop')) closeModal();
  });

  /* ------------------------------------------------------------------
     10. START
     ------------------------------------------------------------------ */
  renderHUD();
  renderWelcome();
  spawnStars();
  show('welcome');
  checkAssets();
})();
