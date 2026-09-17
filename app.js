const STORAGE_KEYS = {
  settings: "knip.settings",
  history: "knip.history",
  program: "knip.program"
};

const HISTORY_SCHEMA_VERSION = 1;
const PROGRAM_SCHEMA_VERSION = 2;
const QUALIFIED_DAYS_REQUIRED = 3;
const SESSION_AUDIO_SAMPLE_RATE = 8000;
const APP_CACHE_VERSION = "v28";
// Produktbeslut 2026-09-17; referensbilderna anger inga exakta pulstider.
const QUICK_TIMING = { squeeze: 1, rest: 2 };
const TRANSITION_EXPLANATION = "Övergångspasset kör tre passdelar i följd. Dag 1: en ny + två gamla. Dag 2: två nya + en gammal. Dag 3: tre nya. Alla tre delarna räknas som ett komplett pass.";

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
    instruction: "Använd liten kraft. Slut lätt kring ändtarmsöppningen och urinröret och känn ett lyft inåt och uppåt. Släpp sedan knipet helt."
  },
  strength: {
    label: "Stadiga knip",
    instruction: "Knip med mer kraft än när du känner in: slut kring ändtarmsöppningen och urinröret och lyft inåt och uppåt. Håll under kniptiden och släpp helt när vilan börjar."
  },
  endurance: {
    label: "Håll kvar",
    instruction: "Slut kring ändtarmsöppningen och urinröret och behåll lyftet inåt och uppåt under en längre stund. Du behöver inte ta i maximalt. Släpp helt när tiden är slut."
  },
  quick: {
    label: "Korta pulser",
    instruction: "Slut snabbt kring ändtarmsöppningen och urinröret och lyft inåt och uppåt. Släpp direkt efter det korta knipet och låt musklerna slappna av helt före nästa puls."
  }
};

// Referens B07–B12: ordningen är en del av programmet, även för återkommande typer.
const MOVEMENT_INSTRUCTIONS = {
  lift: "Stå med fötterna isär och tårna lite utåt. Knip och böj knän och höfter tills händerna når strax nedanför knäna, som när du ska ta upp två matkassar. Res dig med knipet kvar och släpp först när du står rak.",
  walk: "Behåll knipet medan du går runt i rummet. Stanna mot slutet och stå stilla innan du släpper. Lägg märke till hur bäckenbotten sänks när du slappnar av.",
  cough: "Knip snabbt och hosta kraftigt en gång medan du håller knipet uppe. Släpp sedan helt och vila före nästa puls."
};

const ADVANCED_LEVELS = [
  {
    blocks: [
      { type: "strength", repetitions: 10 },
      { type: "endurance", repetitions: 1, durationSeconds: 35 },
      { type: "strength", repetitions: 10 },
      { type: "quick", repetitions: 5 }
    ]
  },
  {
    blocks: [
      { type: "strength", repetitions: 10 },
      { type: "endurance", repetitions: 1, durationSeconds: 35 },
      { type: "strength", repetitions: 10 },
      { type: "quick", repetitions: 10 }
    ]
  },
  {
    blocks: [
      { type: "strength", repetitions: 10, movement: "lift" },
      { type: "endurance", repetitions: 1, durationSeconds: 45 }
    ]
  },
  {
    blocks: [
      { type: "strength", repetitions: 10 },
      { type: "endurance", repetitions: 1, durationSeconds: 45, movement: "walk" }
    ]
  },
  {
    blocks: [
      { type: "strength", repetitions: 10 },
      { type: "endurance", repetitions: 1, durationSeconds: 60 },
      { type: "strength", repetitions: 10 },
      { type: "quick", repetitions: 10, movement: "cough" }
    ]
  },
  {
    note: "Det här passet kombinerar alla rörelser och ställer höga krav på styrka, uthållighet och koncentration. Blockföljden görs två gånger.",
    blocks: Array.from({ length: 2 }, () => [
      { type: "strength", repetitions: 10, movement: "lift", alternatingMovement: true },
      { type: "endurance", repetitions: 1, durationSeconds: 60, movement: "walk" },
      { type: "strength", repetitions: 10, movement: "lift", alternatingMovement: true },
      { type: "quick", repetitions: 10, movement: "cough", alternatingMovement: true }
    ]).flat()
  }
].map((level, index) => ({
  ...level,
  id: `advanced-${index + 1}`,
  title: `Avancerad ${index + 1}`,
  advanced: true,
  position: "Gör övningen stående.",
  sessionsPerDay: index < 4 ? 3 : 2,
  recommendedPeriod: { minWeeks: 1, maxWeeks: 2, label: "1–2 veckor" }
}));

const EXERCISE_LEVELS = [
  {
    id: "exercise-1",
    title: "Steg 1",
    position: "Prova att ligga på rygg, mage eller sida. Du kan också sitta eller stå.",
    sessionsPerDay: 3,
    recommendedPeriod: { days: 3, label: "3 dagar" },
    blocks: [{ type: "find", repetitions: 8 }]
  },
  {
    id: "exercise-2",
    title: "Steg 2",
    position: "Prova att ligga på rygg, mage eller sida. Du kan också sitta eller stå.",
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
      note: "Du kan fortsätta här tills du har tränat i tre månader eller välja Avancerad 1."
    },
    blocks: [
      { type: "strength", repetitions: 10 },
      { type: "endurance", repetitions: 1, durationSeconds: 35 },
      { type: "quick", repetitions: 5 }
    ]
  },
  ...ADVANCED_LEVELS
];

const elements = {
  views: {
    home: document.getElementById("home-view"),
    program: document.getElementById("program-view"),
    help: document.getElementById("help-view"),
    session: document.getElementById("session-view"),
    complete: document.getElementById("complete-view"),
    stats: document.getElementById("stats-view"),
    settings: document.getElementById("settings-view")
  },
  navHomeButton: document.getElementById("nav-home-button"),
  cacheVersion: document.getElementById("cache-version"),
  startButton: document.getElementById("start-button"),
  homeSessionDuration: document.getElementById("home-session-duration"),
  homeTransitionSummary: document.getElementById("home-transition-summary"),
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
  sessionInstruction: document.getElementById("session-instruction"),
  timerCircle: document.querySelector(".timer-circle"),
  timerValue: document.getElementById("timer-value"),
  phaseBarFill: document.getElementById("phase-bar-fill"),
  repCounter: document.getElementById("rep-counter"),
  sessionSoundButton: document.getElementById("session-sound-button"),
  sessionSoundVolume: document.getElementById("session-sound-volume"),
  sessionVolumeOutput: document.getElementById("session-volume-output"),
  completeSummary: document.getElementById("complete-summary"),
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

// Preserve unreadable originals before replacing a partially recovered value.
const storageIssues = new Map();
const storageOriginals = new Map();
const unreadableStorage = new Set();
const pendingStorage = new Set();

const state = {
  settings: loadSettings(),
  history: loadHistory(),
  program: loadProgram(),
  session: null
};

let tickTimer = null;
let audioContext = null;
let sessionAudio = null;
let sessionAudioUrl = null;

function renderStorageStatus() {
  const messages = [...new Set(storageIssues.values())];
  if (pendingStorage.size) messages.push("Ändringar är inte sparade på enheten. Behåll appen öppen, försök spara igen eller exportera historiken nu.");
  document.getElementById("storage-message").textContent = messages.join(" ");
  document.getElementById("storage-notice").hidden = messages.length === 0;
  document.getElementById("retry-storage-button").hidden = pendingStorage.size === 0;
}

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    storageOriginals.set(key, raw);
    const parsed = JSON.parse(raw);
    if (parsed === null) noteInvalidStorage(key);
    return parsed;
  } catch {
    if (!storageOriginals.has(key)) unreadableStorage.add(key);
    storageIssues.set(key, "Lokal data kunde inte läsas. Originalet lämnas orört. Exportera nya pass före omladdning.");
    return null;
  }
}

function noteInvalidStorage(key) {
  storageIssues.set(key, "Felaktig lokal data hittades. Giltiga uppgifter används; originalet bevaras för återhämtning och följer med i exporten.");
}

function writeStorage(key, value) {
  pendingStorage.add(key);
  try {
    // A failed read must never be followed by overwriting unknown training data.
    if (unreadableStorage.has(key)) throw new Error("Unreadable original");
    if (storageIssues.has(key) && storageOriginals.has(key)) {
      const backupKey = `${key}.recovery`;
      const original = storageOriginals.get(key);
      const existing = localStorage.getItem(backupKey);
      if (existing !== null && existing !== original) throw new Error("Existing recovery data");
      localStorage.setItem(backupKey, original);
    }
    localStorage.setItem(key, JSON.stringify(value));
    pendingStorage.delete(key);
    renderStorageStatus();
    return true;
  } catch {
    renderStorageStatus();
    return false;
  }
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validTimestamp(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)
    && validLocalDay(value.slice(0, 10)) && Number.isFinite(Date.parse(value));
}

function validLocalDay(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function normalizeSettings(saved) {
  const result = { ...DEFAULT_SETTINGS };
  if (!isObject(saved)) return result;
  for (const key of ["prepDuration", "squeezeDuration", "restDuration"]) {
    if (Number.isInteger(saved[key]) && saved[key] >= 1 && saved[key] <= 120) result[key] = saved[key];
  }
  for (const key of ["soundEnabled", "vibrationEnabled"]) {
    if (typeof saved[key] === "boolean") result[key] = saved[key];
  }
  if (typeof saved.soundVolume === "number" && Number.isFinite(saved.soundVolume)
    && saved.soundVolume >= 0 && saved.soundVolume <= 8) result.soundVolume = saved.soundVolume;
  return result;
}

function loadSettings() {
  const saved = readStorage(STORAGE_KEYS.settings);
  const settings = normalizeSettings(saved);
  if (saved !== null && (!isObject(saved) || Object.keys(DEFAULT_SETTINGS).some(
    (key) => key in saved && saved[key] !== settings[key]
  ))) noteInvalidStorage(STORAGE_KEYS.settings);
  return settings;
}

function saveSettings() {
  return writeStorage(STORAGE_KEYS.settings, state.settings);
}

function normalizeRecord(record) {
  if (!isObject(record)) return null;
  const status = record.status ?? (record.completed === false ? "cancelled" : "completed");
  if (!["completed", "cancelled"].includes(status)) return null;
  const timestamp = status === "completed" ? record.completedAt : record.cancelledAt || record.endedAt;
  if (!validTimestamp(timestamp)) return null;
  if (record.startedAt != null && !validTimestamp(record.startedAt)) return null;
  if (record.transitionDay != null && ![1, 2, 3].includes(record.transitionDay)) return null;
  // Older records may lack level/block metadata. Keep them in statistics/export.
  if (record.schemaVersion != null && record.schemaVersion !== HISTORY_SCHEMA_VERSION) return null;
  if (record.levelId != null && !getLevel(record.levelId)) return null;
  if (record.blocks != null && (!Array.isArray(record.blocks) || !record.blocks.every((block) =>
    isObject(block) && Object.hasOwn(EXERCISE_TYPES, block.type)
    && Number.isInteger(block.repetitions) && block.repetitions > 0
    && (block.durationSeconds == null || (Number.isInteger(block.durationSeconds) && block.durationSeconds >= 1 && block.durationSeconds <= 120))
    && (block.sourceLevelId == null || getLevel(block.sourceLevelId))
    && (block.transitionPosition == null || [1, 2, 3].includes(block.transitionPosition))
    && (status !== "completed" || (block.completed !== false
      && (block.completedRepetitions == null || block.completedRepetitions === block.repetitions)))
    && (block.completedRepetitions == null || (Number.isInteger(block.completedRepetitions)
      && block.completedRepetitions >= 0 && block.completedRepetitions <= block.repetitions))
  ))) return null;
  if (record.completed === false && status === "completed") return null;
  return {
    ...record, status,
    localDay: validLocalDay(record.localDay) ? record.localDay : getLocalDay(new Date(timestamp))
  };
}

function loadHistory() {
  const saved = readStorage(STORAGE_KEYS.history);
  if (saved === null) return [];
  if (!Array.isArray(saved)) {
    noteInvalidStorage(STORAGE_KEYS.history);
    return [];
  }
  const records = saved.map(normalizeRecord).filter(Boolean);
  if (records.length !== saved.length || saved.some((record, index) =>
    records[index]?.localDay !== record?.localDay && record?.localDay != null
  )) noteInvalidStorage(STORAGE_KEYS.history);
  return records.sort((a, b) => Date.parse(b.completedAt || b.cancelledAt || b.endedAt)
    - Date.parse(a.completedAt || a.cancelledAt || a.endedAt));
}

function saveHistory() {
  return writeStorage(STORAGE_KEYS.history, state.history);
}

function defaultProgram() {
  return {
    schemaVersion: PROGRAM_SCHEMA_VERSION,
    activeLevelId: EXERCISE_LEVELS[0].id,
    levelStatuses: {},
    events: [],
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
  return currentIndex >= 0
    ? EXERCISE_LEVELS.slice(currentIndex + 1).find((level) => !isLevelSkipped(level.id)) || null
    : null;
}

function isLevelSkipped(levelId) {
  return state.program.levelStatuses[levelId] === "skipped";
}

function loadProgram() {
  const fallback = defaultProgram();
  const saved = readStorage(STORAGE_KEYS.program);

  if (saved === null) return fallback;

  try {
    const parsed = saved;
    if (!isObject(parsed) || !getLevel(parsed.activeLevelId)
      || (parsed.schemaVersion != null && ![1, PROGRAM_SCHEMA_VERSION].includes(parsed.schemaVersion))) {
      noteInvalidStorage(STORAGE_KEYS.program);
      return fallback;
    }

    const levelStatuses = Object.fromEntries(
      EXERCISE_LEVELS
        .filter((level) => parsed.levelStatuses?.[level.id] === "skipped")
        .map((level) => [level.id, "skipped"])
    );
    // An active level must remain available, including when loading older data.
    delete levelStatuses[parsed.activeLevelId];
    const transition = parsed.transition;
    const hasValidTransition = transition
      && getLevel(transition.fromLevelId)
      && getLevel(transition.toLevelId)
      && !levelStatuses[transition.fromLevelId]
      && !levelStatuses[transition.toLevelId]
      && transition.fromLevelId === parsed.activeLevelId
      && EXERCISE_LEVELS.findIndex((level) => level.id === transition.toLevelId)
        > EXERCISE_LEVELS.findIndex((level) => level.id === transition.fromLevelId)
      && typeof transition.id === "string" && transition.id.length > 0
      && Array.isArray(transition.completedLocalDays);
    const events = Array.isArray(parsed.events) ? parsed.events.filter((event) =>
      isObject(event) && ["level_skipped", "level_reactivated", "level_selected", "level_advanced"].includes(event.type)
      && validTimestamp(event.timestamp) && getLevel(event.fromLevelId) && getLevel(event.toLevelId)
    ) : [];
    if ((transition && (!hasValidTransition || transition.completedLocalDays.some((day) => !validLocalDay(day))))
      || (parsed.events != null && (!Array.isArray(parsed.events) || events.length !== parsed.events.length))) {
      noteInvalidStorage(STORAGE_KEYS.program);
    }

    return {
      schemaVersion: PROGRAM_SCHEMA_VERSION,
      activeLevelId: parsed.activeLevelId,
      levelStatuses,
      events,
      transition: hasValidTransition
        ? {
          id: transition.id || createId(),
          fromLevelId: transition.fromLevelId,
          toLevelId: transition.toLevelId,
          completedLocalDays: Array.from(
            new Set(transition.completedLocalDays.filter(validLocalDay))
          ).slice(0, 3)
        }
        : null
    };
  } catch {
    noteInvalidStorage(STORAGE_KEYS.program);
    return fallback;
  }
}

function saveProgram() {
  // Do not persist progression ahead of the training record that earned it.
  if (pendingStorage.has(STORAGE_KEYS.history)) {
    pendingStorage.add(STORAGE_KEYS.program);
    renderStorageStatus();
    return false;
  }
  return writeStorage(STORAGE_KEYS.program, state.program);
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

function buildProgramBlocks(level, transitionDay, transition = state.program.transition) {
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

function changeProgramLevel(type, fromLevelId, toLevelId) {
  state.program.events.push({
    type,
    timestamp: new Date().toISOString(),
    fromLevelId,
    toLevelId
  });
  state.program.activeLevelId = toLevelId;
  state.program.transition = null;
  saveProgram();
  renderProgram();
  updateHomeSummary();
  document.getElementById(toLevelId).querySelector("summary").focus();
}

function skipLevel(levelId) {
  const level = getActiveSessionLevel();
  const nextLevel = getNextLevel(levelId);
  if (state.session || level.id !== levelId || !nextLevel) {
    return;
  }

  const transitionText = state.program.transition ? " Den pågående övergången avbryts." : "";
  if (!window.confirm(`Hoppa över ${level.title} och gå till ${nextLevel.title}? Steget räknas inte som genomfört och ger ingen träningsdag.${transitionText} Du kan återaktivera det senare.`)) {
    return;
  }

  state.program.levelStatuses[levelId] = "skipped";
  changeProgramLevel("level_skipped", levelId, nextLevel.id);
}

function reactivateLevel(levelId) {
  const level = getLevel(levelId);
  if (state.session || !level || !isLevelSkipped(levelId)) {
    return;
  }

  const transitionText = state.program.transition ? " Den pågående övergången avbryts." : "";
  if (!window.confirm(`Återaktivera ${level.title} och göra det till ditt aktiva steg?${transitionText} Din träningshistorik behålls.`)) {
    return;
  }

  const previousLevelId = getActiveSessionLevel().id;
  delete state.program.levelStatuses[levelId];
  changeProgramLevel("level_reactivated", previousLevelId, levelId);
}

function selectLevel(levelId) {
  const level = getLevel(levelId);
  const current = getActiveSessionLevel();
  if (state.session || !level || levelId === current.id) return;
  const transitionText = state.program.transition ? " Den pågående övergången avbryts." : "";
  if (!window.confirm(`Välj ${level.title} som aktiv nivå?${transitionText} Historiken behålls. Valet räknas inte som ett genomfört pass.`)) return;
  delete state.program.levelStatuses[levelId];
  changeProgramLevel("level_selected", current.id, levelId);
}

function startTransition(levelId) {
  const level = getLevel(levelId);
  const nextLevel = getNextLevel(levelId);

  if (state.session || state.program.transition || !level || !nextLevel || isLevelSkipped(levelId) || state.program.activeLevelId !== levelId || !isLevelReadyToAdvance(level)) {
    return;
  }

  if (nextLevel.advanced) {
    changeProgramLevel("level_advanced", level.id, nextLevel.id);
    startSession();
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
      "En ny passdel, sedan två från föregående steg.",
      "Två nya passdelar, sedan en från föregående steg.",
      "Tre nya passdelar i följd.",
    ];
    const day = getTransitionDay();
    return `Övergång till ${level.title}: dag ${day} av 3. ${transitionTexts[day - 1]}`;
  }

  const nextLevel = getNextLevel(level.id);
  if (!nextLevel) {
    return "Du är på sista tillgängliga nivån. Fortsätt här eller välj en annan nivå i programmet.";
  }

  const requiredDays = getRequiredQualifiedDays(level);
  const streak = getQualifiedDayStreak(level.id);
  if (isLevelReadyToAdvance(level)) {
    return `Du har ${streak} av ${requiredDays} kvalificerande dagar i följd. Du kan ${nextLevel.advanced ? "byta direkt" : "starta övergången"} till ${nextLevel.title}.`;
  }

  return `${streak} av ${requiredDays} kvalificerande dagar i följd mot ${nextLevel.title}.`;
}

function showView(name) {
  elements.navHomeButton.hidden = name === "home";
  Object.entries(elements.views).forEach(([key, view]) => {
    view.classList.toggle("active", key === name);
  });
  const heading = document.getElementById(elements.views[name].getAttribute("aria-labelledby"));
  if (heading) {
    heading.tabIndex = -1;
    heading.focus();
  }
}

let helpReturnButton = null;
document.querySelectorAll("[data-open-help]").forEach((button) => {
  button.addEventListener("click", () => {
    helpReturnButton = button;
    showView("help");
  });
});
document.getElementById("close-help-button").addEventListener("click", () => {
  showView(helpReturnButton?.dataset.openHelp || "home");
  helpReturnButton?.focus();
});
Object.values(EXERCISE_TYPES).forEach((type) => {
  const item = document.createElement("li");
  item.className = "exercise-block";
  const title = document.createElement("h3");
  title.textContent = type.label;
  const description = document.createElement("p");
  description.textContent = type.instruction;
  item.append(title, description);
  document.getElementById("help-exercise-types").append(item);
});

function updateHomeSummary() {
  const level = getActiveSessionLevel();
  document.getElementById("home-title").textContent = level.title;
  const movementHost = document.getElementById("home-movement");
  if (movementHost.dataset.levelId !== level.id) {
    const instructions = renderMovementInstructions(level);
    if (instructions) instructions.querySelector("summary").textContent = "Inför passet";
    movementHost.replaceChildren(...(instructions ? [instructions] : []));
    movementHost.dataset.levelId = level.id;
  }
  elements.homeSessionDuration.textContent = formatSessionDuration(buildProgramBlocks(level, getTransitionDay()), true);
  elements.homeTransitionSummary.hidden = !state.program.transition;
  elements.homeTransitionSummary.textContent = state.program.transition
    ? `Övergång · dag ${getTransitionDay()} av 3 · tre passdelar`
    : "";
}

function formatSessionDuration(blocks, compact = false) {
  const seconds = Math.ceil(buildSessionTimeline({ blocks }).duration);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  const time = minutes ? `${minutes} min${remainder ? ` ${remainder} sek` : ""}` : `${remainder} sek`;
  if (compact) return time;
  return `Passlängd: ${time} utan pauser · ${seconds < 180 ? "Kort pass" : seconds < 300 ? "Normalt pass" : "Långt pass"}`;
}

function formatExerciseBlock(block, includeDuration = false) {
  const exerciseType = EXERCISE_TYPES[block.type];
  const duration = includeDuration && block.type === "quick"
    ? ` · ${QUICK_TIMING.squeeze} sek knip / ${QUICK_TIMING.rest} sek vila`
    : includeDuration && block.durationSeconds
    ? ` · ${block.durationSeconds} sekunder`
    : "";

  const movement = block.movement ? ` · ${{ lift: "lyft", walk: "gång", cough: "hosta" }[block.movement]}${block.alternatingMovement ? " på vartannat knip" : ""}` : "";
  return `${block.repetitions} × ${exerciseType.label}${duration}${movement}`;
}

function renderMovementInstructions(level) {
  const movements = [...new Set(level.blocks.map((block) => block.movement).filter(Boolean))];
  if (!level.advanced) return null;
  const details = document.createElement("details");
  details.className = "movement-instructions";
  details.dataset.instructionLevel = level.id;
  const summary = document.createElement("summary");
  summary.textContent = movements.length ? "Så gör du rörelsen" : "Så gör du knipen";
  details.append(summary);
  [...new Set(level.blocks.map((block) => block.type))].forEach((type) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${EXERCISE_TYPES[type].label}: ${EXERCISE_TYPES[type].instruction}`;
    details.append(paragraph);
  });
  if (level.note) {
    const note = document.createElement("p");
    note.textContent = level.note;
    details.append(note);
  }
  movements.forEach((movement) => {
    const paragraph = document.createElement("p");
    const alternating = level.blocks.some((block) => block.movement === movement && block.alternatingMovement);
    paragraph.textContent = MOVEMENT_INSTRUCTIONS[movement]
      + (alternating ? " Gör rörelsen på repetition 2, 4, 6, 8 och 10. Räkningen börjar om i varje block." : "")
      + (movement === "cough" ? " Hostan sker under pulsens enda knipsekund; därefter följer två sekunders vila." : "");
    details.append(paragraph);
  });
  return details;
}

function getMovementCue(block, repetition) {
  if (!block.movement || (block.alternatingMovement && repetition % 2 !== 0)) return "";
  return {
    lift: "Lyft – stå rak innan du släpper.",
    walk: "Gå – stanna innan du släpper.",
    cough: "Hosta en gång under knipet."
  }[block.movement];
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
  const focused = document.activeElement;
  const focusedLevel = focused?.closest(".program-level")?.id;
  const focusedAction = focused?.dataset.action;
  const focusedInstruction = focused?.closest(".movement-instructions")?.dataset.instructionLevel;
  const openInstructions = [...elements.programLevels.querySelectorAll(".movement-instructions[open]")]
    .map((item) => `${item.closest(".program-level").id}/${item.dataset.instructionLevel}`);
  const openLevels = [...elements.programLevels.querySelectorAll("details[open]")].map((item) => item.id);
  elements.programLevels.replaceChildren();
  const activeLevel = getActiveSessionLevel();
  const transition = state.program.transition;

  EXERCISE_LEVELS.forEach((level) => {
    const details = document.createElement("details");
    details.className = "program-level";
    details.id = level.id;
    details.open = level.id === activeLevel.id || openLevels.includes(level.id);

    if (level.id === activeLevel.id) {
      details.classList.add("is-active");
    }

    const summary = document.createElement("summary");
    summary.className = "program-level-summary";

    const summaryText = document.createElement("span");
    summaryText.className = "program-level-summary-text";

    const title = document.createElement("span");
    title.className = "program-level-title";
    title.textContent = isLevelSkipped(level.id) ? `${level.title} · Överhoppad` : level.title;

    const preview = document.createElement("span");
    preview.className = "program-level-preview";
    preview.textContent = level.advanced
      ? `${level.blocks.length} block · ${formatSessionDuration(buildProgramBlocks(level, null)).replace("Passlängd: ", "")}`
      : level.blocks.map((block) => formatExerciseBlock(block, true)).join(" + ");

    summaryText.append(title, preview);
    summary.append(summaryText);

    const content = document.createElement("div");
    content.className = "program-level-content";

    const blockList = document.createElement("ol");
    blockList.className = "exercise-block-list";

    level.blocks.forEach((block) => {
      const exerciseType = EXERCISE_TYPES[block.type];
      const item = document.createElement("li");
      item.className = "exercise-block";

      const blockTitle = document.createElement("strong");
      blockTitle.textContent = formatExerciseBlock(block, true);

      const instruction = document.createElement("p");
      instruction.textContent = exerciseType.instruction;

      item.append(blockTitle);
      if (!level.advanced) item.append(instruction);
      blockList.append(item);
    });

    const metadata = document.createElement("dl");
    metadata.className = "program-metadata";

    const metadataEntries = [
      ["Läge", level.position],
      ["Rekommenderat", `${level.sessionsPerDay} pass per dag`],
      ["Vanligt pass", formatSessionDuration(buildProgramBlocks(level, null))],
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
    const movementInstructions = renderMovementInstructions(level);
    if (movementInstructions) content.append(movementInstructions);

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
      let plannedBlocks = buildProgramBlocks(level, getTransitionDay());

      if (!transition && isLevelReadyToAdvance(level)) {
        const nextLevel = getNextLevel(level.id);
        plannedBlocks = buildProgramBlocks(nextLevel, nextLevel.advanced ? null : 1, { fromLevelId: level.id });
        const explanation = document.createElement("p");
        explanation.className = "program-status";
        explanation.textContent = nextLevel.advanced
          ? `Du byter direkt till ${nextLevel.title}, utan blandade passdelar. Du kan också fortsätta på din nuvarande nivå via startsidan.`
          : TRANSITION_EXPLANATION;
        controls.append(explanation);
        const nextInstructions = renderMovementInstructions(nextLevel);
        if (nextInstructions) controls.append(nextInstructions);
        action.textContent = nextLevel.advanced ? `Byt till ${nextLevel.title} och starta pass` : `Starta övergång till ${nextLevel.title}`;
        action.dataset.action = "start-transition";
        action.dataset.levelId = level.id;
      } else {
        action.textContent = "Starta dagens pass";
        action.dataset.action = "start-session";
      }

      const duration = document.createElement("p");
      duration.className = "session-duration";
      duration.textContent = formatSessionDuration(plannedBlocks);
      controls.append(status, duration, action);
      if (getNextLevel(level.id)) {
        const skipButton = document.createElement("button");
        skipButton.type = "button";
        skipButton.className = "secondary-button";
        skipButton.textContent = "Hoppa över nivå";
        skipButton.dataset.action = "skip-level";
        skipButton.dataset.levelId = level.id;
        controls.append(skipButton);
      }
      content.append(controls);
    }

    if (isLevelSkipped(level.id)) {
      const controls = document.createElement("div");
      controls.className = "program-controls";
      const status = document.createElement("p");
      status.className = "program-status";
      status.textContent = "Det här steget är överhoppat och räknas inte som genomfört.";
      const action = document.createElement("button");
      action.type = "button";
      action.className = "secondary-button";
      action.textContent = `Återaktivera ${level.title}`;
      action.dataset.action = "reactivate-level";
      action.dataset.levelId = level.id;
      controls.append(status, action);
      content.append(controls);
    }

    if (level.id !== activeLevel.id && !isLevelSkipped(level.id)) {
      const select = document.createElement("button");
      select.type = "button";
      select.className = "secondary-button";
      select.textContent = `Välj ${level.title}`;
      select.dataset.action = "select-level";
      select.dataset.levelId = level.id;
      content.append(select);
    }

    details.append(summary, content);
    elements.programLevels.append(details);
  });
  elements.programLevels.querySelectorAll(".movement-instructions").forEach((item) => {
    item.open = openInstructions.includes(`${item.closest(".program-level").id}/${item.dataset.instructionLevel}`);
  });
  if (focusedLevel) {
    const level = document.getElementById(focusedLevel);
    const target = focusedInstruction
      ? level?.querySelector(`[data-instruction-level="${focusedInstruction}"] summary`)
      : focusedAction
      ? level?.querySelector(`[data-action="${focusedAction}"]`) : level?.querySelector("summary");
    (target || level?.querySelector("summary"))?.focus({ preventScroll: true });
  }
}

function renderStats() {
  const records = completedRecords().sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt));
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
  updateSessionSoundControl();
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
    squeezeTick: [
      { frequency: 880, duration: 0.18, volume: 0.1 },
      { frequency: 1320, duration: 0.18, volume: 0.08 }
    ],
    complete: [
      { frequency: 523, duration: 0.16 },
      { frequency: 659, offset: 0.18, duration: 0.16 },
      { frequency: 784, offset: 0.36, duration: 0.3 }
    ]
  };

  playTones(cues[cue] || cues.start, force);
}

function triggerSqueezeSound() {
  triggerSound("squeezeTick");
}

function getSoundVolume() {
  const volume = Number(state.settings.soundVolume);
  return Number.isFinite(volume) ? Math.max(0, Math.min(8, volume)) : 1;
}

function formatSoundVolume(percent) {
  if (percent === 0) {
    return "Tyst";
  }

  if (percent === 100) {
    return "100 %";
  }

  const decibels = Math.round(20 * Math.log10(percent / 100));
  return `${percent} % (${decibels > 0 ? "+" : ""}${decibels} dB)`;
}

function updateSoundVolumeControls() {
  const percent = Math.round(getSoundVolume() * 100);
  elements.sessionSoundVolume.value = String(percent);
  elements.settingsSoundVolume.value = String(percent);
  const label = formatSoundVolume(percent);
  elements.sessionVolumeOutput.textContent = label;
  elements.settingsVolumeOutput.textContent = label;
}

function setSoundVolume(percent) {
  state.settings.soundVolume = Math.max(0, Math.min(800, Number(percent) || 0)) / 100;
  saveSettings();
  updateSoundVolumeControls();
  updateSessionAudioVolume();
}

function updateSessionSoundControl() {
  const soundEnabled = Boolean(state.settings.soundEnabled);
  elements.sessionSoundVolume.closest(".volume-control").hidden = !soundEnabled;
  elements.settingsSoundVolume.closest(".volume-control").hidden = !soundEnabled;
  elements.sessionSoundButton.textContent = soundEnabled ? "Ljud på" : "Ljud av";
  elements.sessionSoundButton.setAttribute("aria-pressed", String(soundEnabled));
  elements.previewSoundButton.textContent = soundEnabled ? "Testa ljudet" : "Testa och slå på ljud";
}

function setSoundEnabled(soundEnabled) {
  state.settings.soundEnabled = Boolean(soundEnabled);
  elements.soundEnabled.checked = state.settings.soundEnabled;
  saveSettings();
  updateSessionSoundControl();
}

function getPhaseDuration(phaseName) {
  return getBlockPhaseDuration(getCurrentBlock(), phaseName);
}

function getBlockPhaseDuration(block, phaseName) {
  if (block?.type === "quick" && phaseName !== "prep") return QUICK_TIMING[phaseName];
  if (phaseName === "squeeze" && block?.durationSeconds) return block.durationSeconds;
  return state.settings[PHASES[phaseName].settingsKey];
}

function buildSessionTimeline(session) {
  const segments = [];
  let cursor = 0;
  const addSegment = (phaseName, duration, blockIndex, repIndex) => {
    const start = cursor;
    cursor += duration;
    segments.push({ phaseName, start, end: cursor, blockIndex, repIndex });
  };

  addSegment("prep", state.settings.prepDuration, 0, 1);
  session.blocks.forEach((block, blockIndex) => {
    for (let repIndex = 1; repIndex <= block.repetitions; repIndex += 1) {
      addSegment("squeeze", getBlockPhaseDuration(block, "squeeze"), blockIndex, repIndex);
      addSegment("rest", getBlockPhaseDuration(block, "rest"), blockIndex, repIndex);
    }
  });

  return { segments, duration: cursor };
}

function buildSession() {
  const level = getActiveSessionLevel();
  const transitionDay = state.program.transition ? getTransitionDay() : null;
  const session = {
    id: createId(),
    startedAt: new Date().toISOString(),
    trainingMode: transitionDay ? "transition" : "program",
    levelId: level.id,
    transitionDay,
    transitionId: state.program.transition?.id || null,
    blocks: buildProgramBlocks(level, transitionDay),
    blockIndex: 0,
    repIndex: 1,
    phaseName: "prep",
    phaseRemaining: state.settings.prepDuration,
    paused: false,
    elapsedSeconds: 0,
    lastClockTime: performance.now(),
    timelineIndex: 0,
    usesMediaAudio: false,
    fallbackCueKey: null
  };

  session.timeline = buildSessionTimeline(session);
  return session;
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

  const phaseText = `${state.session.paused ? "Pausat · " : ""}${PHASES[state.session.phaseName].label} · ${exercise.label}`;
  if (elements.phaseLabel.textContent !== phaseText) elements.phaseLabel.textContent = phaseText;
  const instruction = state.session.phaseName === "rest"
    ? "Släpp knipet helt. Låt mage, skinkor och lår vara avspända."
    : state.session.phaseName === "squeeze" && getLevel(state.session.levelId)?.advanced
      ? getMovementCue(block, state.session.repIndex) || (block.type === "quick" ? "Knip kort och släpp helt." : "Behåll knipet tills vilan börjar.")
      : exercise.instruction;
  if (elements.sessionInstruction.textContent !== instruction) elements.sessionInstruction.textContent = instruction;
  elements.timerCircle.classList.toggle("is-squeeze", state.session.phaseName === "squeeze");
  elements.timerCircle.classList.toggle("is-rest", state.session.phaseName === "rest");
  elements.timerValue.textContent = String(state.session.phaseRemaining);
  elements.timerCircle.setAttribute("aria-label", `${state.session.phaseRemaining} sekunder kvar i fasen`);
  const announcementKey = `${state.session.timelineIndex}:${state.session.paused}`;
  if (state.session.announcementKey !== announcementKey) {
    state.session.announcementKey = announcementKey;
    document.getElementById("session-announcement").textContent = `${phaseText}. ${state.session.phaseRemaining} sekunder. Repetition ${state.session.repIndex} av ${block.repetitions}${partText}. ${state.session.phaseName === "squeeze" ? getMovementCue(block, state.session.repIndex) : ""}`;
  }
  elements.repCounter.textContent = `${exercise.label} ${state.session.repIndex} av ${block.repetitions}${partText}`;
  elements.phaseBarFill.style.width = `${Math.max(0, Math.min(progress, 100))}%`;
  elements.pauseButton.textContent = state.session.paused ? "Fortsätt" : "Pausa";
  updateSessionSoundControl();
}

function writeWaveHeader(view, sampleCount) {
  const writeText = (offset, value) => {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  };

  writeText(0, "RIFF");
  view.setUint32(4, 36 + sampleCount, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, SESSION_AUDIO_SAMPLE_RATE, true);
  view.setUint32(28, SESSION_AUDIO_SAMPLE_RATE, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  writeText(36, "data");
  view.setUint32(40, sampleCount, true);
}

function addTrackCue(samples, startSeconds, duration = 0.2) {
  const startSample = Math.max(0, Math.floor(startSeconds * SESSION_AUDIO_SAMPLE_RATE));
  const cueSamples = Math.floor(duration * SESSION_AUDIO_SAMPLE_RATE);

  for (let index = 0; index < cueSamples && startSample + index < samples.length; index += 1) {
    const time = index / SESSION_AUDIO_SAMPLE_RATE;
    const attack = Math.min(1, index / (SESSION_AUDIO_SAMPLE_RATE * 0.008));
    const release = Math.min(1, (cueSamples - index) / (SESSION_AUDIO_SAMPLE_RATE * 0.025));
    const envelope = Math.min(attack, release);
    const combined = Math.sin(2 * Math.PI * 880 * time) + 0.65 * Math.sin(2 * Math.PI * 1320 * time);
    const sample = Math.tanh(combined * 1.8) * envelope;
    samples[startSample + index] = Math.max(1, Math.min(255, 128 + Math.round(sample * 122)));
  }
}

function createSessionAudioBlob(session) {
  const sampleCount = Math.ceil(session.timeline.duration * SESSION_AUDIO_SAMPLE_RATE);
  const buffer = new ArrayBuffer(44 + sampleCount);
  const view = new DataView(buffer);
  const samples = new Uint8Array(buffer, 44);
  samples.fill(128);
  writeWaveHeader(view, sampleCount);

  addTrackCue(samples, 0.08, 0.28);
  session.timeline.segments.forEach((segment) => {
    if (segment.phaseName !== "squeeze") {
      return;
    }

    const duration = segment.end - segment.start;
    for (let second = 0; second < duration; second += 1) {
      addTrackCue(samples, segment.start + second + 0.03);
    }
  });

  return new Blob([buffer], { type: "audio/wav" });
}

function getSessionAudioVolume() {
  return Math.max(0, Math.min(1, getSoundVolume() / 8));
}

function updateSessionAudioVolume() {
  if (sessionAudio) {
    sessionAudio.volume = getSessionAudioVolume();
  }
}

function updateMediaSessionState(playbackState = "none") {
  if (!("mediaSession" in navigator)) {
    return;
  }

  navigator.mediaSession.playbackState = playbackState;
}

function clearSessionAudio() {
  if (state.session) {
    state.session.usesMediaAudio = false;
  }

  if (sessionAudio) {
    sessionAudio.pause();
    sessionAudio.removeAttribute("src");
    sessionAudio.load();
    sessionAudio.remove();
    sessionAudio = null;
  }

  if (sessionAudioUrl) {
    URL.revokeObjectURL(sessionAudioUrl);
    sessionAudioUrl = null;
  }

  updateMediaSessionState();
}

function configureMediaSession() {
  if (!("mediaSession" in navigator)) {
    return;
  }

  if ("MediaMetadata" in window) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Pågående knippass",
      artist: "Knip",
      album: "Träningspass"
    });
  }

  try {
    navigator.mediaSession.setActionHandler("pause", () => setSessionPaused(true));
    navigator.mediaSession.setActionHandler("play", () => setSessionPaused(false));
  } catch {
    // Äldre Safari-versioner kan ha Media Session utan alla action handlers.
  }
}

function setAudioNotice(message = "") {
  document.getElementById("audio-notice").textContent = message;
}

function playSessionAudioElement(session) {
  const audio = sessionAudio;
  session.audioStarting = true;
  const playPromise = audio.play();
  if (!playPromise) {
    session.audioStarting = false;
    updateMediaSessionState("playing");
    return;
  }

  playPromise.then(() => {
    if (state.session !== session || sessionAudio !== audio) return;
    session.audioStarting = false;
    if (!session.paused) {
      setAudioNotice();
      updateMediaSessionState("playing");
    }
  }).catch(() => {
    if (state.session !== session || sessionAudio !== audio || session.paused) {
      return;
    }
    session.audioStarting = false;
    session.elapsedSeconds = Math.max(session.elapsedSeconds, audio.currentTime || 0);
    session.paused = true;
    clearSessionAudio();
    setAudioNotice("Ljudet kunde inte starta. Passet är pausat. Tryck Fortsätt för att försöka igen, eller stäng av ljudet och fortsätt med timern.");
    updateSessionUI();
  });
}

function startSessionAudio() {
  const session = state.session;
  if (!session || session.paused || !state.settings.soundEnabled) {
    return;
  }

  clearSessionAudio();
  sessionAudioUrl = URL.createObjectURL(createSessionAudioBlob(session));
  sessionAudio = document.createElement("audio");
  sessionAudio.hidden = true;
  sessionAudio.preload = "auto";
  sessionAudio.setAttribute("playsinline", "");
  sessionAudio.src = sessionAudioUrl;
  sessionAudio.volume = getSessionAudioVolume();
  document.body.append(sessionAudio);
  try {
    sessionAudio.currentTime = Math.min(session.elapsedSeconds, session.timeline.duration);
  } catch {
    const audio = sessionAudio;
    audio.addEventListener("loadedmetadata", () => {
      if (sessionAudio === audio) {
        audio.currentTime = Math.min(session.elapsedSeconds, session.timeline.duration);
      }
    }, { once: true });
  }
  session.usesMediaAudio = true;
  configureMediaSession();

  const audio = sessionAudio;
  audio.addEventListener("error", () => {
    if (state.session !== session || sessionAudio !== audio) return;
    session.elapsedSeconds = Math.max(session.elapsedSeconds, audio.currentTime || 0);
    session.paused = true;
    clearSessionAudio();
    setAudioNotice("Ljudet kunde inte spelas. Passet är pausat. Försök med Fortsätt eller stäng av ljudet.");
    updateSessionUI();
  });
  audio.addEventListener("ended", () => {
    if (state.session === session && sessionAudio === audio && !session.paused) {
      session.elapsedSeconds = session.timeline.duration;
      syncSessionProgress();
    }
  });
  audio.addEventListener("pause", () => {
    if (state.session !== session || sessionAudio !== audio || !session.usesMediaAudio || session.paused || audio.ended) {
      return;
    }

    session.elapsedSeconds = sessionAudio.currentTime;
    session.paused = true;
    setAudioNotice("Ljuduppspelningen avbröts och passet pausades. Tryck Fortsätt när du är redo.");
    updateMediaSessionState("paused");
    updateSessionUI();
  });

  playSessionAudioElement(session);
}

function syncSessionClock() {
  const session = state.session;
  if (!session || session.paused) {
    return;
  }

  const now = performance.now();
  if (session.usesMediaAudio && sessionAudio) {
    session.elapsedSeconds = sessionAudio.currentTime;
  } else {
    session.elapsedSeconds += Math.max(0, now - session.lastClockTime) / 1000;
  }
  session.lastClockTime = now;
}

function syncSessionProgress() {
  const session = state.session;
  if (!session) {
    return;
  }

  syncSessionClock();
  if (session.elapsedSeconds >= session.timeline.duration) {
    completeSession();
    return;
  }

  const timelineIndex = session.timeline.segments.findIndex((segment) => session.elapsedSeconds < segment.end);
  const segment = session.timeline.segments[Math.max(0, timelineIndex)];
  const previousTimelineIndex = session.timelineIndex;
  const previousRemaining = session.phaseRemaining;

  session.timelineIndex = Math.max(0, timelineIndex);
  session.blockIndex = segment.blockIndex;
  session.repIndex = segment.repIndex;
  session.phaseName = segment.phaseName;
  session.phaseRemaining = Math.max(1, Math.ceil(segment.end - session.elapsedSeconds));

  if (!session.usesMediaAudio && state.settings.soundEnabled && segment.phaseName === "squeeze") {
    const cueSecond = Math.floor(session.elapsedSeconds - segment.start);
    const cueKey = `${session.timelineIndex}:${cueSecond}`;
    if (session.fallbackCueKey !== cueKey) {
      session.fallbackCueKey = cueKey;
      triggerSqueezeSound();
    }
  } else {
    session.fallbackCueKey = null;
  }

  if (session.timelineIndex !== previousTimelineIndex) {
    if (segment.phaseName === "squeeze") {
      triggerVibration(160);
    } else if (segment.phaseName === "rest") {
      triggerVibration([80, 60, 80]);
    }
  }

  if (session.timelineIndex !== previousTimelineIndex || session.phaseRemaining !== previousRemaining) {
    updateSessionUI();
  }
}

function tick() {
  if (!state.session || state.session.paused) {
    return;
  }

  syncSessionProgress();
}

function setSessionPaused(paused) {
  const session = state.session;
  if (!session || session.paused === paused) {
    return;
  }

  if (paused) {
    syncSessionProgress();
    if (!state.session) {
      return;
    }
    session.paused = true;
    if (sessionAudio) {
      sessionAudio.pause();
    }
    updateMediaSessionState("paused");
  } else {
    session.paused = false;
    session.lastClockTime = performance.now();
    if (state.settings.soundEnabled) {
      if (sessionAudio) {
        session.usesMediaAudio = true;
        playSessionAudioElement(session);
      } else {
        startSessionAudio();
      }
    }
  }

  updateSessionUI();
}

function startSession() {
  clearInterval(tickTimer);
  clearSessionAudio();
  state.session = buildSession();
  setAudioNotice();
  showView("session");
  updateSessionUI();
  if (state.settings.soundEnabled) {
    startSessionAudio();
  }
  tickTimer = window.setInterval(tick, 250);
}

function stopSession() {
  clearInterval(tickTimer);
  tickTimer = null;
  clearSessionAudio();
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
    transitionId: session.transitionId,
    blocks: session.blocks.map((block, blockIndex) => {
      const completedRepetitions = getCompletedRepetitions(blockIndex, status);
      return {
        type: block.type,
        repetitions: block.repetitions,
        completedRepetitions,
        completed: completedRepetitions === block.repetitions,
        durationSeconds: block.durationSeconds,
        ...(block.movement ? { movement: block.movement, alternatingMovement: Boolean(block.alternatingMovement) } : {}),
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
  const saved = saveHistory();
  const transitionCompleted = updateProgramAfterCompletion(record);
  const completedLevel = getLevel(record.levelId);
  stopSession();

  const parts = [...new Set(record.blocks.map((block) => block.transitionPosition))];
  const partLabels = parts.map((position) => {
    const blocks = record.blocks.filter((block) => block.transitionPosition === position);
    return `Passdel ${position}: ${getLevel(blocks[0].sourceLevelId).title} – ${blocks.map((block) => formatExerciseBlock(block, true)).join(" + ")}`;
  });
  elements.completeSummary.textContent = `${completedLevel.title} genomfört${record.transitionDay ? `, övergångsdag ${record.transitionDay} av 3` : ""}. ${parts.length} av ${parts.length} ${parts.length === 1 ? "passdel klar" : "passdelar klara"}.`;
  document.getElementById("complete-parts").replaceChildren(...partLabels.map((label) => {
    const item = document.createElement("li");
    item.textContent = label;
    return item;
  }));
  document.getElementById("complete-progression").textContent = transitionCompleted
    ? `${completedLevel.title} är nu ditt aktiva steg. ${getProgramStatus(completedLevel)}`
    : getProgramStatus(getActiveSessionLevel());
  document.getElementById("complete-saved").textContent = saved
    ? `Passet sparades ${completedAt.toLocaleString("sv-SE", { dateStyle: "medium", timeStyle: "short" })}.`
    : "Passet är genomfört men kunde inte sparas på enheten. Exportera historiken eller försök spara igen.";

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
    records: state.history,
    unsavedChanges: [...pendingStorage],
    recovery: getRecoveryData()
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
    let reloadingForUpdate = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloadingForUpdate || state.session || pendingStorage.size) {
        return;
      }

      reloadingForUpdate = true;
      window.location.reload();
    });

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch((error) => {
        console.error("Service worker registration failed:", error);
      });
    });
  }
}

elements.startButton.addEventListener("click", startSession);
elements.openProgramButton.addEventListener("click", () => showView("program"));
elements.closeProgramButton.addEventListener("click", () => {
  showView("home");
  elements.openProgramButton.focus();
});
elements.restartButton.addEventListener("click", startSession);
elements.pauseButton.addEventListener("click", () => {
  if (!state.session) {
    return;
  }

  setSessionPaused(!state.session.paused);
});
elements.cancelButton.addEventListener("click", cancelSession);
elements.sessionSoundButton.addEventListener("click", () => {
  if (state.session && !state.session.paused) {
    syncSessionProgress();
  }

  setSoundEnabled(!state.settings.soundEnabled);
  setAudioNotice();
  if (!state.session) {
    return;
  }

  state.session.lastClockTime = performance.now();
  if (state.settings.soundEnabled && !state.session.paused) {
    startSessionAudio();
  } else {
    state.session.usesMediaAudio = false;
    clearSessionAudio();
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
elements.closeStatsButton.addEventListener("click", () => {
  showView("home");
  elements.openStatsButton.focus();
});

elements.openSettingsButton.addEventListener("click", () => {
  fillSettingsForm();
  showView("settings");
});
elements.closeSettingsButton.addEventListener("click", () => {
  showView("home");
  elements.openSettingsButton.focus();
});
elements.soundEnabled.addEventListener("input", () => {
  setSoundEnabled(elements.soundEnabled.checked);
});
elements.previewSoundButton.addEventListener("click", () => {
  setSoundEnabled(true);
  triggerSound("squeezeTick");
});
elements.settingsSoundVolume.addEventListener("input", () => {
  setSoundVolume(elements.settingsSoundVolume.value);
});

elements.programLevels.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  if (button.dataset.action === "select-level") {
    selectLevel(button.dataset.levelId);
    return;
  }

  if (button.dataset.action === "skip-level") {
    skipLevel(button.dataset.levelId);
    return;
  }

  if (button.dataset.action === "reactivate-level") {
    reactivateLevel(button.dataset.levelId);
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

  state.settings.squeezeDuration = normalizeSettings({ squeezeDuration: Number(elements.squeezeDuration.value) }).squeezeDuration;
  state.settings.restDuration = normalizeSettings({ restDuration: Number(elements.restDuration.value) }).restDuration;
  state.settings.vibrationEnabled = elements.vibrationEnabled.checked;
  state.settings.soundEnabled = elements.soundEnabled.checked;
  state.settings.soundVolume = Math.max(0, Math.min(800, Number(elements.settingsSoundVolume.value) || 0)) / 100;

  saveSettings();
  updateHomeSummary();
  renderProgram();
  renderStats();
  showView("home");
});

function getRecoveryData() {
  const recovery = {};
  for (const key of Object.values(STORAGE_KEYS)) {
    if (storageIssues.has(key) && storageOriginals.has(key)) recovery[key] = storageOriginals.get(key);
    try {
      const backup = localStorage.getItem(`${key}.recovery`);
      if (backup !== null) recovery[`${key}.recovery`] = backup;
    } catch { /* Current in-memory records remain exportable without storage access. */ }
  }
  return recovery;
}

document.getElementById("retry-storage-button").addEventListener("click", () => {
  if (pendingStorage.has(STORAGE_KEYS.history)) saveHistory();
  if (pendingStorage.has(STORAGE_KEYS.program)) saveProgram();
  if (pendingStorage.has(STORAGE_KEYS.settings)) saveSettings();
  if (!pendingStorage.has(STORAGE_KEYS.history) && elements.views.complete.classList.contains("active")) {
    document.getElementById("complete-saved").textContent = "Passet är nu sparat på enheten.";
  }
});
document.getElementById("storage-export-button").addEventListener("click", exportHistory);

let displayedDay = getLocalDay();
let dayTimer = null;
function refreshDayStatus(force = false) {
  const today = getLocalDay();
  if (force || today !== displayedDay) {
    displayedDay = today;
    updateHomeSummary();
    renderProgram();
    renderStats();
  }
  clearTimeout(dayTimer);
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  // Recheck clock/time-zone changes too, without touching an ongoing session.
  dayTimer = window.setTimeout(refreshDayStatus, Math.min(60000, Math.max(1, midnight - now + 50)));
}
function resumeApp() {
  refreshDayStatus(true);
  if (state.session && !state.session.paused) {
    if (state.session.usesMediaAudio && !state.session.audioStarting && sessionAudio?.paused && !sessionAudio.ended) {
      state.session.elapsedSeconds = sessionAudio.currentTime;
      state.session.paused = true;
      setAudioNotice("Ljuduppspelningen avbröts och passet pausades. Tryck Fortsätt när du är redo.");
      updateMediaSessionState("paused");
      updateSessionUI();
    } else {
      syncSessionProgress();
    }
  }
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") resumeApp();
});
window.addEventListener("pageshow", resumeApp);
window.addEventListener("focus", resumeApp);

// If the history write succeeded but the program write failed, replay only
// records tied to this exact transition. Older records retain their old behavior.
const savedTransition = state.program.transition;
if (savedTransition) {
  for (const record of [...completedRecords()].reverse()) {
    if (record.transitionId === savedTransition.id
      && !savedTransition.completedLocalDays.includes(record.localDay)) updateProgramAfterCompletion(record);
  }
}

elements.cacheVersion.textContent = `Cache ${APP_CACHE_VERSION}`;
updateHomeSummary();
renderProgram();
renderStats();
fillSettingsForm();
registerServiceWorker();

renderStorageStatus();
refreshDayStatus();
