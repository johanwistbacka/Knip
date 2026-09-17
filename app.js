const STORAGE_KEYS = {
  settings: "knip.settings",
  history: "knip.history",
  program: "knip.program"
};

const HISTORY_SCHEMA_VERSION = 1;
const PROGRAM_SCHEMA_VERSION = 1;
const QUALIFIED_DAYS_REQUIRED = 3;

const DEFAULT_SETTINGS = {
  prepDuration: 5,
  squeezeDuration: 5,
  restDuration: 5,
  vibrationEnabled: true,
  soundEnabled: false,
  soundVolume: 1
};

const PHASES = {
  prep: { label: "Gör dig redo", settingsKey: "prepDuration" },
  squeeze: { label: "Knip", settingsKey: "squeezeDuration" },
  rest: { label: "Vila", settingsKey: "restDuration" }
};

const EXERCISE_TYPES = {
  find: {
    label: "Känn in",
    instruction: "Börja med ett lätt knip och känn rörelsen inåt och uppåt."
  },
  strength: {
    label: "Stadiga knip",
    instruction: "Gör ett tydligt knip, fokusera på rörelsen inåt och uppåt och släpp sedan helt."
  },
  endurance: {
    label: "Håll kvar",
    instruction: "Håll ett jämnt knip inåt och uppåt utan att spänna mer än du behöver."
  },
  quick: {
    label: "Korta pulser",
    instruction: "Gör snabba, tydliga knip med full avslappning mellan varje."
  }
};

const EXERCISE_LEVELS = [
  {
    id: "exercise-1",
    title: "Steg 1",
    position: "Börja gärna liggande. Det går också bra att sitta eller stå.",
    sessionsPerDay: 3,
    recommendedPeriod: { days: 3, label: "3 dagar" },
    blocks: [{ type: "find", repetitions: 8 }]
  },
  {
    id: "exercise-2",
    title: "Steg 2",
    position: "Börja gärna liggande. Det går också bra att sitta eller stå.",
    sessionsPerDay: 3,
    recommendedPeriod: { days: 3, label: "3 dagar" },
    blocks: [
      { type: "find", repetitions: 6 },
      { type: "strength", repetitions: 2 }
    ]
  },
  {
    id: "exercise-3",
    title: "Steg 3",
    position: "Välj mellan att ligga, sitta eller stå.",
    sessionsPerDay: 3,
    recommendedPeriod: { days: 3, label: "3 dagar" },
    blocks: [
      { type: "find", repetitions: 5 },
      { type: "strength", repetitions: 5 }
    ]
  },
  {
    id: "exercise-4",
    title: "Steg 4",
    position: "Sitt eller stå, det som känns bäst.",
    sessionsPerDay: 3,
    recommendedPeriod: { minWeeks: 1, maxWeeks: 2, label: "1–2 veckor" },
    blocks: [
      { type: "strength", repetitions: 8 },
      { type: "endurance", repetitions: 1, durationSeconds: 15 }
    ]
  },
  {
    id: "exercise-5",
    title: "Steg 5",
    position: "Gör övningen stående.",
    sessionsPerDay: 3,
    recommendedPeriod: { minWeeks: 1, maxWeeks: 2, label: "1–2 veckor" },
    blocks: [
      { type: "strength", repetitions: 10 },
      { type: "endurance", repetitions: 1, durationSeconds: 25 }
    ]
  },
  {
    id: "exercise-6",
    title: "Steg 6",
    position: "Gör övningen stående.",
    sessionsPerDay: 3,
    recommendedPeriod: {
      minWeeks: 1,
      maxWeeks: 2,
      label: "1–2 veckor",
      note: "Fortsätt med rutinen tills du har tränat i tre månader."
    },
    blocks: [
      { type: "strength", repetitions: 10 },
      { type: "endurance", repetitions: 1, durationSeconds: 35 },
      { type: "quick", repetitions: 5 }
    ]
  }
];

const elements = {
  views: {
    home: document.getElementById("home-view"),
    program: document.getElementById("program-view"),
    session: document.getElementById("session-view"),
    complete: document.getElementById("complete-view"),
    stats: document.getElementById("stats-view"),
    settings: document.getElementById("settings-view")
  },
  navHomeButton: document.getElementById("nav-home-button"),
  startButton: document.getElementById("start-button"),
  openProgramButton: document.getElementById("open-program-button"),
  closeProgramButton: document.getElementById("close-program-button"),
  programLevels: document.getElementById("program-levels"),
  openStatsButton: document.getElementById("open-stats-button"),
  closeStatsButton: document.getElementById("close-stats-button"),
  openSettingsButton: document.getElementById("open-settings-button"),
  closeSettingsButton: document.getElementById("close-settings-button"),
  restartButton: document.getElementById("restart-button"),
  pauseButton: document.getElementById("pause-button"),
  cancelButton: document.getElementById("cancel-button"),
  phaseLabel: document.getElementById("phase-label"),
  timerCircle: document.querySelector(".timer-circle"),
  timerValue: document.getElementById("timer-value"),
  phaseBarFill: document.getElementById("phase-bar-fill"),
  repCounter: document.getElementById("rep-counter"),
  sessionSoundButton: document.getElementById("session-sound-button"),
  sessionSoundVolume: document.getElementById("session-sound-volume"),
  sessionVolumeOutput: document.getElementById("session-volume-output"),
  completeSummary: document.getElementById("complete-summary"),
  homeTotalSessions: document.getElementById("home-total-sessions"),
  homeProgramSummary: document.getElementById("home-program-summary"),
  homeSettingsSummary: document.getElementById("home-settings-summary"),
  statsTotal: document.getElementById("stats-total"),
  statsWeek: document.getElementById("stats-week"),
  statsLatest: document.getElementById("stats-latest"),
  exportHistoryButton: document.getElementById("export-history-button"),
  settingsForm: document.getElementById("settings-form"),
  squeezeDuration: document.getElementById("squeeze-duration"),
  restDuration: document.getElementById("rest-duration"),
  vibrationEnabled: document.getElementById("vibration-enabled"),
  soundEnabled: document.getElementById("sound-enabled"),
  settingsSoundVolume: document.getElementById("settings-sound-volume"),
  settingsVolumeOutput: document.getElementById("settings-volume-output"),
  previewSoundButton: document.getElementById("preview-sound-button")
};

const state = {
  settings: loadSettings(),
  history: loadHistory(),
  program: loadProgram(),
  session: null
};

let tickTimer = null;
let audioContext = null;

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEYS.settings);
  if (!saved) {
    return { ...DEFAULT_SETTINGS };
  }

  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
}

function loadHistory() {
  const saved = localStorage.getItem(STORAGE_KEYS.history);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));
}

function defaultProgram() {
  return {
    schemaVersion: PROGRAM_SCHEMA_VERSION,
    activeLevelId: EXERCISE_LEVELS[0].id,
    transition: null
  };
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return String(Date.now()) + "-" + Math.random().toString(16).slice(2);
}

function getLevel(levelId) {
  return EXERCISE_LEVELS.find((level) => level.id === levelId) || null;
}

function getNextLevel(levelId) {
  const currentIndex = EXERCISE_LEVELS.findIndex((level) => level.id === levelId);
  return currentIndex >= 0 ? EXERCISE_LEVELS[currentIndex + 1] || null : null;
}

function loadProgram() {
  const fallback = defaultProgram();
  const saved = localStorage.getItem(STORAGE_KEYS.program);

  if (!saved) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(saved);
    if (!parsed || !getLevel(parsed.activeLevelId)) {
      return fallback;
    }

    const transition = parsed.transition;
    const hasValidTransition = transition
      && getLevel(transition.fromLevelId)
      && getLevel(transition.toLevelId)
      && Array.isArray(transition.completedLocalDays);

    return {
      schemaVersion: PROGRAM_SCHEMA_VERSION,
      activeLevelId: parsed.activeLevelId,
      transition: hasValidTransition
        ? {
          id: transition.id || createId(),
          fromLevelId: transition.fromLevelId,
          toLevelId: transition.toLevelId,
          completedLocalDays: Array.from(
            new Set(transition.completedLocalDays.filter((day) => typeof day === "string"))
          ).slice(0, 3)
        }
        : null
    };
  } catch {
    return fallback;
  }
}

function saveProgram() {
  localStorage.setItem(STORAGE_KEYS.program, JSON.stringify(state.program));
}

function getLocalDay(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function getTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

function completedRecords() {
  return state.history.filter(
    (record) =>
      record.status === "completed" ||
      (!record.status && record.completed !== false && Boolean(record.completedAt))
  );
}

function getRequiredQualifiedDays(level) {
  return QUALIFIED_DAYS_REQUIRED;
}

function shiftLocalDay(localDay, offset) {
  const [year, month, day] = localDay.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12);
  date.setDate(date.getDate() + offset);
  return getLocalDay(date);
}

function getQualifiedDayStreak(levelId, referenceDate = new Date()) {
  const completedDays = new Set(
    completedRecords()
      .filter((record) => record.levelId === levelId)
      .map((record) => record.localDay || getLocalDay(new Date(record.completedAt)))
  );
  const today = getLocalDay(referenceDate);
  const yesterday = shiftLocalDay(today, -1);
  let cursor = completedDays.has(today) ? today : completedDays.has(yesterday) ? yesterday : null;
  let streak = 0;

  while (cursor && completedDays.has(cursor)) {
    streak += 1;
    cursor = shiftLocalDay(cursor, -1);
  }

  return streak;
}

function isLevelReadyToAdvance(level) {
  return Boolean(getNextLevel(level.id))
    && getQualifiedDayStreak(level.id) >= getRequiredQualifiedDays(level);
}

function getTransitionDay() {
  const transition = state.program.transition;
  if (!transition) {
    return null;
  }

  const completedToday = transition.completedLocalDays.includes(getLocalDay());
  return Math.min(3, transition.completedLocalDays.length + (completedToday ? 0 : 1));
}

function buildProgramBlocks(level, transitionDay) {
  const transition = state.program.transition;
  const sourceLevelIds = !transitionDay || !transition
    ? [level.id]
    : transitionDay === 1
      ? [level.id, transition.fromLevelId, transition.fromLevelId]
      : transitionDay === 2
        ? [level.id, level.id, transition.fromLevelId]
        : [level.id, level.id, level.id];

  return sourceLevelIds.flatMap((sourceLevelId, sourceIndex) => {
    const sourceLevel = getLevel(sourceLevelId);
    return sourceLevel.blocks.map((block) => ({
      ...block,
      sourceLevelId,
      transitionPosition: sourceIndex + 1
    }));
  });
}

function startTransition(levelId) {
  const level = getLevel(levelId);
  const nextLevel = getNextLevel(levelId);

  if (!level || !nextLevel || state.program.activeLevelId !== levelId || !isLevelReadyToAdvance(level)) {
    return;
  }

  state.program.transition = {
    id: createId(),
    fromLevelId: level.id,
    toLevelId: nextLevel.id,
    completedLocalDays: []
  };
  saveProgram();
  renderProgram();
  updateHomeSummary();
  startSession();
}

function updateProgramAfterCompletion(record) {
  const transition = state.program.transition;
  if (
    record.status !== "completed" ||
    !transition ||
    record.levelId !== transition.toLevelId ||
    !record.transitionDay
  ) {
    return false;
  }

  if (!transition.completedLocalDays.includes(record.localDay)) {
    transition.completedLocalDays.push(record.localDay);
  }

  if (transition.completedLocalDays.length >= 3) {
    state.program.activeLevelId = transition.toLevelId;
    state.program.transition = null;
    saveProgram();
    return true;
  }

  saveProgram();
  return false;
}

function getActiveSessionLevel() {
  const levelId = state.program.transition
    ? state.program.transition.toLevelId
    : state.program.activeLevelId;

  return getLevel(levelId) || EXERCISE_LEVELS[0];
}

function getProgramStatus(level) {
  const transition = state.program.transition;

  if (transition) {
    const transitionTexts = [
      "1 nytt pass och 2 pass från föregående steg.",
      "2 nya pass och 1 pass från föregående steg.",
      "3 nya pass.",
    ];
    const day = getTransitionDay();
    return `Övergång till ${level.title}: dag ${day} av 3. ${transitionTexts[day - 1]}`;
  }

  const nextLevel = getNextLevel(level.id);
  if (!nextLevel) {
    return "Fortsätt med rutinen tills du har tränat i tre månader.";
  }

  const requiredDays = getRequiredQualifiedDays(level);
  const streak = getQualifiedDayStreak(level.id);
  if (isLevelReadyToAdvance(level)) {
    return `Du har ${streak} av ${requiredDays} kvalificerande dagar i följd. Du kan starta övergången till ${nextLevel.title}.`;
  }

  return `${streak} av ${requiredDays} kvalificerande dagar i följd mot ${nextLevel.title}.`;
}

function showView(name) {
  Object.entries(elements.views).forEach(([key, view]) => {
    view.classList.toggle("active", key === name);
  });
}

function updateHomeSummary() {
  elements.homeTotalSessions.textContent = `${completedRecords().length} genomförda`;
  const level = getActiveSessionLevel();
  elements.homeSettingsSummary.textContent = `${level.title} · ${level.position}`;
  elements.homeProgramSummary.textContent = getProgramStatus(level);
}

function formatExerciseBlock(block, includeDuration = false) {
  const exerciseType = EXERCISE_TYPES[block.type];
  const duration = includeDuration && block.durationSeconds
    ? ` · ${block.durationSeconds} sekunder`
    : "";

  return `${block.repetitions} × ${exerciseType.label}${duration}`;
}

function renderTransitionPreview(level) {
  const transitionDay = getTransitionDay();
  const blocks = buildProgramBlocks(level, transitionDay);
  const preview = document.createElement("section");
  preview.className = "transition-preview";

  const heading = document.createElement("h3");
  heading.textContent = `Dagens övergång · dag ${transitionDay} av 3`;

  const blockList = document.createElement("ol");
  blockList.className = "transition-block-list";

  [1, 2, 3].forEach((position) => {
    const positionBlocks = blocks.filter((block) => block.transitionPosition === position);
    if (!positionBlocks.length) {
      return;
    }

    const sourceLevel = getLevel(positionBlocks[0].sourceLevelId);
    const item = document.createElement("li");
    item.className = "transition-block";

    const label = document.createElement("strong");
    label.className = "transition-block-label";
    label.textContent = sourceLevel?.id === level.id
      ? `Nytt: ${sourceLevel.title}`
      : `Föregående: ${sourceLevel?.title || "Okänt steg"}`;

    const detail = document.createElement("span");
    detail.className = "transition-block-detail";
    detail.textContent = positionBlocks
      .map((block) => formatExerciseBlock(block, true))
      .join(" + ");

    item.append(label, detail);
    blockList.append(item);
  });

  preview.append(heading, blockList);
  return preview;
}

function renderProgram() {
  elements.programLevels.replaceChildren();
  const activeLevel = getActiveSessionLevel();
  const transition = state.program.transition;

  EXERCISE_LEVELS.forEach((level) => {
    const details = document.createElement("details");
    details.className = "program-level";
    details.id = level.id;
    details.open = level.id === activeLevel.id;

    if (level.id === activeLevel.id) {
      details.classList.add("is-active");
    }

    const summary = document.createElement("summary");
    summary.className = "program-level-summary";

    const summaryText = document.createElement("span");
    summaryText.className = "program-level-summary-text";

    const title = document.createElement("span");
    title.className = "program-level-title";
    title.textContent = level.title;

    const preview = document.createElement("span");
    preview.className = "program-level-preview";
    preview.textContent = level.blocks.map((block) => formatExerciseBlock(block, true)).join(" + ");

    summaryText.append(title, preview);
    summary.append(summaryText);

    const content = document.createElement("div");
    content.className = "program-level-content";

    const blockList = document.createElement("ul");
    blockList.className = "exercise-block-list";

    level.blocks.forEach((block) => {
      const exerciseType = EXERCISE_TYPES[block.type];
      const item = document.createElement("li");
      item.className = "exercise-block";

      const blockTitle = document.createElement("strong");
      blockTitle.textContent = formatExerciseBlock(block, true);

      const instruction = document.createElement("p");
      instruction.textContent = exerciseType.instruction;

      item.append(blockTitle, instruction);
      blockList.append(item);
    });

    const metadata = document.createElement("dl");
    metadata.className = "program-metadata";

    const metadataEntries = [
      ["Läge", level.position],
      ["Pass per dag", String(level.sessionsPerDay)],
      ["Föreslagen period", level.recommendedPeriod.label]
    ];

    metadataEntries.forEach(([term, description]) => {
      const termElement = document.createElement("dt");
      termElement.textContent = term;
      const descriptionElement = document.createElement("dd");
      descriptionElement.textContent = description;
      metadata.append(termElement, descriptionElement);
    });

    content.append(blockList, metadata);

    if (level.recommendedPeriod.note) {
      const note = document.createElement("p");
      note.className = "program-note";
      note.textContent = level.recommendedPeriod.note;
      content.append(note);
    }

    if (level.id === activeLevel.id) {
      if (transition) {
        content.append(renderTransitionPreview(activeLevel));
      }

      const controls = document.createElement("div");
      controls.className = "program-controls";

      const status = document.createElement("p");
      status.className = "program-status";
      status.textContent = getProgramStatus(activeLevel);

      const action = document.createElement("button");
      action.type = "button";
      action.className = "primary-button";

      if (!transition && isLevelReadyToAdvance(level)) {
        action.textContent = `Starta övergång till ${getNextLevel(level.id).title}`;
        action.dataset.action = "start-transition";
        action.dataset.levelId = level.id;
      } else {
        action.textContent = "Starta dagens pass";
        action.dataset.action = "start-session";
      }

      controls.append(status, action);
      content.append(controls);
    }

    details.append(summary, content);
    elements.programLevels.append(details);
  });
}

function renderStats() {
  const records = completedRecords();
  const total = records.length;
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const weekCount = records.filter((entry) => new Date(entry.completedAt).getTime() >= sevenDaysAgo).length;
  const latest = records[0];

  elements.statsTotal.textContent = String(total);
  elements.statsWeek.textContent = String(weekCount);
  elements.statsLatest.textContent = latest
    ? new Date(latest.completedAt).toLocaleString("sv-SE", {
        dateStyle: "medium",
        timeStyle: "short"
      })
    : "Inte genomfört ännu";
}

function fillSettingsForm() {
  elements.squeezeDuration.value = state.settings.squeezeDuration;
  elements.restDuration.value = state.settings.restDuration;
  elements.vibrationEnabled.checked = Boolean(state.settings.vibrationEnabled);
  elements.soundEnabled.checked = Boolean(state.settings.soundEnabled);
  updateSoundVolumeControls();
}

function triggerVibration(pattern = 120) {
  if (state.settings.vibrationEnabled && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  audioContext ||= new AudioContextClass();
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

function playTones(tones, force = false) {
  if (!force && !state.settings.soundEnabled) {
    return;
  }

  const context = getAudioContext();
  if (!context) {
    return;
  }

  const startTime = context.currentTime + 0.02;
  const soundVolume = getSoundVolume();
  tones.forEach(({ frequency, offset = 0, duration = 0.12, volume = 0.12 }) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const toneStart = startTime + offset;
    const toneEnd = toneStart + duration;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, toneStart);
    gain.gain.setValueAtTime(0.0001, toneStart);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * soundVolume), toneStart + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, toneEnd);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(toneStart);
    oscillator.stop(toneEnd + 0.02);
  });
}

function triggerSound(cue, force = false) {
  const cues = {
    start: [
      { frequency: 440, duration: 0.1 },
      { frequency: 554, offset: 0.12, duration: 0.1 },
      { frequency: 659, offset: 0.24, duration: 0.16 }
    ],
    squeezeTick: [{ frequency: 554, duration: 0.08, volume: 0.1 }],
    complete: [
      { frequency: 523, duration: 0.16 },
      { frequency: 659, offset: 0.12, duration: 0.16 },
      { frequency: 784, offset: 0.24, duration: 0.3 }
    ]
  };

  playTones(cues[cue] || cues.start, force);
}

function triggerSqueezeSound() {
  triggerSound("squeezeTick");
}

function getSoundVolume() {
  const volume = Number(state.settings.soundVolume);
  return Number.isFinite(volume) ? Math.max(0, Math.min(3, volume)) : 1;
}

function updateSoundVolumeControls() {
  const percent = Math.round(getSoundVolume() * 100);
  elements.sessionSoundVolume.value = String(percent);
  elements.settingsSoundVolume.value = String(percent);
  elements.sessionVolumeOutput.textContent = `${percent} %`;
  elements.settingsVolumeOutput.textContent = `${percent} %`;
}

function setSoundVolume(percent) {
  state.settings.soundVolume = Math.max(0, Math.min(300, Number(percent) || 0)) / 100;
  saveSettings();
  updateSoundVolumeControls();
}

function updateSessionSoundControl() {
  const soundEnabled = Boolean(state.settings.soundEnabled);
  elements.sessionSoundButton.textContent = soundEnabled ? "Ljud på" : "Ljud av";
  elements.sessionSoundButton.setAttribute("aria-pressed", String(soundEnabled));
}

function getPhaseDuration(phaseName) {
  const phase = PHASES[phaseName];
  const block = getCurrentBlock();
  if (phaseName === "squeeze" && block?.durationSeconds) {
    return block.durationSeconds;
  }
  return state.settings[phase.settingsKey];
}

function buildSession() {
  const level = getActiveSessionLevel();
  const transitionDay = state.program.transition ? getTransitionDay() : null;

  return {
    id: createId(),
    startedAt: new Date().toISOString(),
    trainingMode: transitionDay ? "transition" : "program",
    levelId: level.id,
    transitionDay,
    blocks: buildProgramBlocks(level, transitionDay),
    blockIndex: 0,
    repIndex: 1,
    phaseName: "prep",
    phaseRemaining: state.settings.prepDuration,
    paused: false
  };
}

function getCurrentBlock() {
  return state.session?.blocks[state.session.blockIndex] || null;
}

function updateSessionUI() {
  if (!state.session) {
    return;
  }

  const block = getCurrentBlock();
  if (!block) {
    return;
  }

  const duration = getPhaseDuration(state.session.phaseName);
  const elapsed = duration - state.session.phaseRemaining;
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0;
  const exercise = EXERCISE_TYPES[block.type];
  const sessionParts = Math.max(...state.session.blocks.map((item) => item.transitionPosition));
  const partText = sessionParts > 1 ? ` · Passdel ${block.transitionPosition} av ${sessionParts}` : "";

  elements.phaseLabel.textContent = `${PHASES[state.session.phaseName].label} · ${exercise.label}`;
  elements.timerCircle.classList.toggle("is-squeeze", state.session.phaseName === "squeeze");
  elements.timerCircle.classList.toggle("is-rest", state.session.phaseName === "rest");
  elements.timerValue.textContent = String(state.session.phaseRemaining);
  elements.repCounter.textContent = `${exercise.label} ${state.session.repIndex} av ${block.repetitions}${partText}`;
  elements.phaseBarFill.style.width = `${Math.max(0, Math.min(progress, 100))}%`;
  elements.pauseButton.textContent = state.session.paused ? "Fortsätt" : "Pausa";
  updateSessionSoundControl();
}

function advancePhase() {
  if (!state.session) {
    return;
  }

  if (state.session.phaseName === "prep") {
    state.session.phaseName = "squeeze";
    state.session.phaseRemaining = getPhaseDuration("squeeze");
    triggerVibration(160);
    triggerSqueezeSound();
    return;
  }

  if (state.session.phaseName === "squeeze") {
    state.session.phaseName = "rest";
    state.session.phaseRemaining = state.settings.restDuration;
    triggerVibration([80, 60, 80]);
    return;
  }

  const block = getCurrentBlock();
  if (state.session.repIndex >= block.repetitions) {
    if (state.session.blockIndex >= state.session.blocks.length - 1) {
      completeSession();
      return;
    }

    state.session.blockIndex += 1;
    state.session.repIndex = 1;
    state.session.phaseName = "squeeze";
    state.session.phaseRemaining = getPhaseDuration("squeeze");
    triggerVibration(160);
    triggerSqueezeSound();
    return;
  }

  state.session.repIndex += 1;
  state.session.phaseName = "squeeze";
  state.session.phaseRemaining = getPhaseDuration("squeeze");
  triggerVibration(160);
  triggerSqueezeSound();
}

function tick() {
  if (!state.session || state.session.paused) {
    return;
  }

  if (state.session.phaseRemaining > 1) {
    state.session.phaseRemaining -= 1;
    updateSessionUI();
    if (state.session.phaseName === "squeeze") {
      triggerSqueezeSound();
    }
    return;
  }

  advancePhase();
  updateSessionUI();
}

function startSession() {
  clearInterval(tickTimer);
  getAudioContext();
  state.session = buildSession();
  showView("session");
  updateSessionUI();
  triggerSound("start");
  tickTimer = window.setInterval(tick, 1000);
}

function stopSession() {
  clearInterval(tickTimer);
  tickTimer = null;
  state.session = null;
}

function getCompletedRepetitions(blockIndex, status) {
  const session = state.session;
  const block = session.blocks[blockIndex];

  if (status === "completed" || blockIndex < session.blockIndex) {
    return block.repetitions;
  }

  if (blockIndex > session.blockIndex || session.phaseName === "prep") {
    return 0;
  }

  const completed = session.phaseName === "rest"
    ? session.repIndex
    : session.repIndex - 1;

  return Math.max(0, Math.min(block.repetitions, completed));
}

function createSessionRecord(status, timestamp) {
  const session = state.session;
  const record = {
    schemaVersion: HISTORY_SCHEMA_VERSION,
    id: session.id,
    startedAt: session.startedAt,
    endedAt: timestamp.toISOString(),
    status,
    completed: status === "completed",
    trainingMode: session.trainingMode,
    localDay: getLocalDay(timestamp),
    timeZone: getTimeZone(),
    levelId: session.levelId,
    transitionDay: session.transitionDay,
    blocks: session.blocks.map((block, blockIndex) => {
      const completedRepetitions = getCompletedRepetitions(blockIndex, status);
      return {
        type: block.type,
        repetitions: block.repetitions,
        completedRepetitions,
        completed: completedRepetitions === block.repetitions,
        durationSeconds: block.durationSeconds,
        sourceLevelId: block.sourceLevelId,
        transitionPosition: block.transitionPosition
      };
    }),
    settings: {
      prepDuration: state.settings.prepDuration,
      squeezeDuration: state.settings.squeezeDuration,
      restDuration: state.settings.restDuration,
      soundEnabled: state.settings.soundEnabled,
      soundVolume: getSoundVolume()
    }
  };

  if (status === "completed") {
    record.completedAt = timestamp.toISOString();
  } else {
    record.cancelledAt = timestamp.toISOString();
    record.progress = {
      blockIndex: session.blockIndex,
      repIndex: session.repIndex,
      phaseName: session.phaseName,
      phaseRemaining: session.phaseRemaining
    };
  }

  return record;
}

function completeSession() {
  const completedAt = new Date();
  const record = createSessionRecord("completed", completedAt);
  state.history.unshift(record);
  saveHistory();
  const transitionCompleted = updateProgramAfterCompletion(record);
  const completedLevel = getLevel(record.levelId);
  stopSession();

  elements.completeSummary.textContent = `Dagens pass sparades ${new Date(record.completedAt).toLocaleString("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short"
  })}.${transitionCompleted ? ` ${completedLevel?.title || "Nästa steg"} är nu ditt aktiva steg.` : ""}`;

  updateHomeSummary();
  renderProgram();
  renderStats();
  showView("complete");
  triggerVibration([120, 80, 180]);
  triggerSound("complete");
}

function cancelSession() {
  if (!state.session) {
    return;
  }

  const record = createSessionRecord("cancelled", new Date());
  stopSession();
  state.history.unshift(record);
  saveHistory();
  updateHomeSummary();
  renderProgram();
  renderStats();
  showView("home");
}

function exportHistory() {
  const exportedAt = new Date();
  const data = {
    schemaVersion: HISTORY_SCHEMA_VERSION,
    exportedAt: exportedAt.toISOString(),
    timeZone: getTimeZone(),
    program: state.program,
    records: state.history
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `knip-historik-${getLocalDay(exportedAt)}.json`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch((error) => {
        console.error("Service worker registration failed:", error);
      });
    });
  }
}

elements.startButton.addEventListener("click", startSession);
elements.openProgramButton.addEventListener("click", () => showView("program"));
elements.closeProgramButton.addEventListener("click", () => showView("home"));
elements.restartButton.addEventListener("click", startSession);
elements.pauseButton.addEventListener("click", () => {
  if (!state.session) {
    return;
  }

  state.session.paused = !state.session.paused;
  updateSessionUI();
});
elements.cancelButton.addEventListener("click", cancelSession);
elements.sessionSoundButton.addEventListener("click", () => {
  state.settings.soundEnabled = !state.settings.soundEnabled;
  saveSettings();
  fillSettingsForm();
  updateSessionSoundControl();

  if (state.settings.soundEnabled && state.session?.phaseName === "squeeze") {
    triggerSqueezeSound();
  }
});
elements.sessionSoundVolume.addEventListener("input", () => {
  setSoundVolume(elements.sessionSoundVolume.value);
});
elements.navHomeButton.addEventListener("click", () => {
  if (state.session) {
    cancelSession();
  }
  showView("home");
});

elements.openStatsButton.addEventListener("click", () => {
  renderStats();
  showView("stats");
});
elements.closeStatsButton.addEventListener("click", () => showView("home"));

elements.openSettingsButton.addEventListener("click", () => {
  fillSettingsForm();
  showView("settings");
});
elements.closeSettingsButton.addEventListener("click", () => showView("home"));
elements.previewSoundButton.addEventListener("click", () => triggerSound("squeezeTick", true));
elements.settingsSoundVolume.addEventListener("input", () => {
  setSoundVolume(elements.settingsSoundVolume.value);
});

elements.programLevels.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  if (button.dataset.action === "start-transition") {
    startTransition(button.dataset.levelId);
    return;
  }

  if (button.dataset.action === "start-session") {
    startSession();
  }
});

elements.exportHistoryButton.addEventListener("click", exportHistory);

elements.settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  state.settings.squeezeDuration = Math.max(1, Number(elements.squeezeDuration.value) || DEFAULT_SETTINGS.squeezeDuration);
  state.settings.restDuration = Math.max(1, Number(elements.restDuration.value) || DEFAULT_SETTINGS.restDuration);
  state.settings.vibrationEnabled = elements.vibrationEnabled.checked;
  state.settings.soundEnabled = elements.soundEnabled.checked;
  state.settings.soundVolume = Math.max(0, Math.min(300, Number(elements.settingsSoundVolume.value) || 0)) / 100;

  saveSettings();
  updateHomeSummary();
  renderStats();
  showView("home");
});

updateHomeSummary();
renderProgram();
renderStats();
fillSettingsForm();
registerServiceWorker();
