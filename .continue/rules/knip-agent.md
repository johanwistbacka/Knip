# Knip Agent Rules

## Scope

The workspace root is `/Users/johan/Documents/Projekt/Knip`. Work only in this project unless the user explicitly asks for another location.

Knip is a static Swedish HTML/CSS/JavaScript PWA. There is no package manager, build step, framework, or external dependency.

## Required context

Before changing code, read:

1. `AGENT.md`
2. `todo.md`
3. The relevant files in `resurser/`
4. The existing files involved in the requested change

Do not assume the project is Python. Never create `main.py` or any other Python file.

## Autonomous workflow

When the user asks for implementation:

1. Inspect the existing implementation and identify the smallest safe patch.
2. Modify only the files required for that patch.
3. Preserve existing quick start, timer behavior, localStorage data, and offline PWA behavior unless the task explicitly changes them.
4. Review the resulting diff for accidental rewrites or unrelated changes.
5. Run the most relevant available checks and report what was tested.

Do not stop at a plan when the requested change is implementable. Do not claim a file was read, changed, or tested unless the tool result confirms it.

## Product constraints

- Keep all user-facing text in Swedish.
- Keep the app mobile-first and usable with large touch targets.
- Keep the solution dependency-free and offline-capable.
- Store progression and history in `localStorage` using stable identifiers such as `programId`, `levelId`, and `mode`.
- Implement the exercise 1-6 program incrementally. Do not add audio, snoozable reminders, or full gamification until the underlying program model is stable.

## Tool discipline

Use the Agent's actual file and search tools when available. Do not invent tool names, argument schemas, file contents, or tool results. If a tool call fails repeatedly, stop retrying variations and explain the concrete limitation.

Do not apply generated code that replaces an existing file wholesale when the request calls for a small patch. Prefer a targeted edit and keep unrelated user changes intact.
