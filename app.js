const STORAGE_KEYS = {
  settings: "knip.settings",
  history: "knip.history"
};

const DEFAULT_SETTINGS = {
  prepDuration: 5,
  squeezeDuration: 5,
  restDuration: 5,
  repetitions: 10,
  vibrationEnabled: true
};

const PHASES = {
  prep: { label: "Förbered", settingsKey: "prepDuration" },
  squeeze: { label: "Knip", settingsKey: "squeezeDuration" },
  rest: { label: "Vila", settingsKey: "restDuration" }
};

const EXERCISE_TYPES = {
  find: {
    label: "Hitta-rätt-knip",
    instruction: "Knip ihop runt ändtarmsöppning och urinrör med liten kraft."
  },
  strength: {
    label: "Styrkeknip",
    instruction: "Knip ihop runt ändtarmsöppning och urinrör och lyft inåt/uppåt med så stor kraft du kan."
  },
  endurance: {
    label: "Uthållighetsknip",
    instruction: "Knip ihop runt ändtarmsöppning och urinrör och lyft inåt/uppåt – men du behöver inte ta i maximalt."
  },
  quick: {
    label: "Snabba knip",
    instruction: "Knip snabbt ihop runt ändtarmsöppning och urinrör och lyft inåt/uppåt så kraftigt du kan."
  }
};

const EXERCISE_LEVELS = [
  {
    id: "exercise-1",
    title: "Övning 1",
    position: "Enklast i liggande. Går även att göra sittande eller stående.",
    sessionsPerDay: 3,
    recommendedPeriod: { days: 3, label: "3 dagar" },
    blocks: [{ type: "find", repetitions: 8 }]
  },
  {
    id: "exercise-2",
    title: "Övning 2",
    position: "Enklast i liggande. Går även att göra sittande eller stående.",
    sessionsPerDay: 3,
    recommendedPeriod: { days: 3, label: "3 dagar" },
    blocks: [
      { type: "find", repetitions: 6 },
      { type: "strength", repetitions: 2 }
    ]
  },
  {
    id: "exercise-3",
    title: "Övning 3",
    position: "Liggande, sittande eller stående.",
    sessionsPerDay: 3,
    recommendedPeriod: { days: 3, label: "3 dagar" },
    blocks: [
      { type: "find", repetitions: 5 },
      { type: "strength", repetitions: 5 }
    ]
  },
  {
    id: "exercise-4",
    title: "Övning 4",
    position: "Sittande eller stående.",
    sessionsPerDay: 3,
    recommendedPeriod: { minWeeks: 1, maxWeeks: 2, label: "1–2 veckor" },
    blocks: [
      { type: "strength", repetitions: 8 },
      { type: "endurance", repetitions: 1, durationSeconds: 15 }
    ]
  },
  {
    id: "exercise-5",
    title: "Övning 5",
    position: "Stående.",
    sessionsPerDay: 3,
    recommendedPeriod: { minWeeks: 1, maxWeeks: 2, label: "1–2 veckor" },
    blocks: [
      { type: "strength", repetitions: 10 },
      { type: "endurance", repetitions: 1, durationSeconds: 25 }
    ]
  },
  {
    id: "exercise-6",
    title: "Övning 6",
    position: "Stående.",
    sessionsPerDay: 3,
    recommendedPeriod: {
      minWeeks: 1,
      maxWeeks: 2,
      label: "1–2 veckor",
      note: "Fortsätt tills den totala träningstiden är 3 månader."
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
  timerValue: document.getElementById("timer-value"),
  phaseBarFill: document.getElementById("phase-bar-fill"),
  repCounter: document.getElementById("rep-counter"),
  completeSummary: document.getElementById("complete-summary"),
  homeTotalSessions: document.getElementById("home-total-sessions"),
  homeSettingsSummary: document.getElementById("home-settings-summary"),
  statsTotal: document.getElementById("stats-total"),
  statsWeek: document.getElementById("stats-week"),
  statsLatest: document.getElementById("stats-latest"),
  settingsForm: document.getElementById("settings-form"),
  squeezeDuration: document.getElementById("squeeze-duration"),
  restDuration: document.getElementById("rest-duration"),
  repetitions: document.getElementById("repetitions"),
  vibrationEnabled: document.getElementById("vibration-enabled")
};

const state = {
  settings: loadSettings(),
  history: loadHistory(),
  session: null
};

let tickTimer = null;

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

function showView(name) {
  Object.entries(elements.views).forEach(([key, view]) => {
    view.classList.toggle("active", key === name);
  });
}

function updateHomeSummary() {
  elements.homeTotalSessions.textContent = `${state.history.length} pass`;
  elements.homeSettingsSummary.textContent = `${state.settings.squeezeDuration}s / ${state.settings.restDuration}s / ${state.settings.repetitions}`;
}

function formatExerciseBlock(block, includeDuration = false) {
  const exerciseType = EXERCISE_TYPES[block.type];
  const duration = includeDuration && block.durationSeconds
    ? ` · ${block.durationSeconds} sekunder`
    : "";

  return `${block.repetitions} ${exerciseType.label}${duration}`;
}

function renderProgram() {
  elements.programLevels.replaceChildren();

  EXERCISE_LEVELS.forEach((level) => {
    const details = document.createElement("details");
    details.className = "program-level";
    details.id = level.id;

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
      ["Kroppsläge", level.position],
      ["Frekvens", `${level.sessionsPerDay} gånger om dagen`],
      ["Rekommenderad period", level.recommendedPeriod.label]
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

    details.append(summary, content);
    elements.programLevels.append(details);
  });
}

function renderStats() {
  const total = state.history.length;
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const weekCount = state.history.filter((entry) => new Date(entry.completedAt).getTime() >= sevenDaysAgo).length;
  const latest = state.history[0];

  elements.statsTotal.textContent = String(total);
  elements.statsWeek.textContent = String(weekCount);
  elements.statsLatest.textContent = latest
    ? new Date(latest.completedAt).toLocaleString("sv-SE", {
        dateStyle: "medium",
        timeStyle: "short"
      })
    : "Inget ännu";
}

function fillSettingsForm() {
  elements.squeezeDuration.value = state.settings.squeezeDuration;
  elements.restDuration.value = state.settings.restDuration;
  elements.repetitions.value = state.settings.repetitions;
  elements.vibrationEnabled.checked = Boolean(state.settings.vibrationEnabled);
}

function triggerVibration(pattern = 120) {
  if (state.settings.vibrationEnabled && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function getPhaseDuration(phaseName) {
  const phase = PHASES[phaseName];
  return state.settings[phase.settingsKey];
}

function buildSession() {
  return {
    repIndex: 1,
    phaseName: "prep",
    phaseRemaining: state.settings.prepDuration,
    paused: false
  };
}

function updateSessionUI() {
  if (!state.session) {
    return;
  }

  const duration = getPhaseDuration(state.session.phaseName);
  const elapsed = duration - state.session.phaseRemaining;
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0;

  elements.phaseLabel.textContent = PHASES[state.session.phaseName].label;
  elements.timerValue.textContent = String(state.session.phaseRemaining);
  elements.repCounter.textContent = `Repetition ${state.session.repIndex} av ${state.settings.repetitions}`;
  elements.phaseBarFill.style.width = `${Math.max(0, Math.min(progress, 100))}%`;
  elements.pauseButton.textContent = state.session.paused ? "Fortsätt" : "Pausa";
}

function advancePhase() {
  if (!state.session) {
    return;
  }

  if (state.session.phaseName === "prep") {
    state.session.phaseName = "squeeze";
    state.session.phaseRemaining = state.settings.squeezeDuration;
    triggerVibration(160);
    return;
  }

  if (state.session.phaseName === "squeeze") {
    state.session.phaseName = "rest";
    state.session.phaseRemaining = state.settings.restDuration;
    triggerVibration([80, 60, 80]);
    return;
  }

  if (state.session.repIndex >= state.settings.repetitions) {
    completeSession();
    return;
  }

  state.session.repIndex += 1;
  state.session.phaseName = "squeeze";
  state.session.phaseRemaining = state.settings.squeezeDuration;
  triggerVibration(160);
}

function tick() {
  if (!state.session || state.session.paused) {
    return;
  }

  if (state.session.phaseRemaining > 1) {
    state.session.phaseRemaining -= 1;
    updateSessionUI();
    return;
  }

  advancePhase();
  updateSessionUI();
}

function startSession() {
  clearInterval(tickTimer);
  state.session = buildSession();
  showView("session");
  updateSessionUI();
  tickTimer = window.setInterval(tick, 1000);
}

function stopSession() {
  clearInterval(tickTimer);
  tickTimer = null;
  state.session = null;
}

function completeSession() {
  stopSession();

  const record = {
    completedAt: new Date().toISOString(),
    repetitions: state.settings.repetitions,
    squeezeDuration: state.settings.squeezeDuration,
    restDuration: state.settings.restDuration
  };

  state.history.unshift(record);
  state.history = state.history.slice(0, 200);
  saveHistory();

  elements.completeSummary.textContent = `Pass sparat ${new Date(record.completedAt).toLocaleString("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short"
  })}.`;

  updateHomeSummary();
  renderStats();
  showView("complete");
  triggerVibration([120, 80, 180]);
}

function cancelSession() {
  stopSession();
  showView("home");
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

elements.settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  state.settings.squeezeDuration = Math.max(1, Number(elements.squeezeDuration.value) || DEFAULT_SETTINGS.squeezeDuration);
  state.settings.restDuration = Math.max(1, Number(elements.restDuration.value) || DEFAULT_SETTINGS.restDuration);
  state.settings.repetitions = Math.max(1, Number(elements.repetitions.value) || DEFAULT_SETTINGS.repetitions);
  state.settings.vibrationEnabled = elements.vibrationEnabled.checked;

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
