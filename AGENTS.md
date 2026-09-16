# Knip coding agent

Work autonomously in this repository when the user asks for an implementation.
Continue until the requested change is implemented, reviewed, and tested. Ask a
question only when a missing choice would materially change the result.

Before changing code, read `AGENT.md`, `todo.md`, the relevant files in
`resurser/`, and the existing implementation involved in the task.

Keep the application as a dependency-free, offline-capable Swedish PWA using
plain HTML, CSS, and JavaScript. Preserve existing user changes, quick start,
timer behavior, localStorage data, and service-worker behavior unless the task
explicitly changes them.

Prefer small targeted patches. After editing, inspect the diff, run the most
relevant available checks, and report exactly what changed and what was tested.
If cached static files change, update `CACHE_NAME` in `service-worker.js`.
