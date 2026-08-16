import type { ResumeData } from "../types/resumeTypes";

// ─────────────────────────────────────────────
// Resume API
//
// TODO(wiring): You said auth is already handled elsewhere in the app.
// If you have an existing client (e.g. `src/lib/api.ts`, an axios
// instance, or a fetch wrapper that injects your auth header/cookie),
// swap the body of `request()` below to call through it instead of
// raw `fetch`. Everything else in this file — and every component
// that uses `resumeApi` — stays the same.
// ─────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`Resume API error (${res.status}): ${message}`);
  }

  // 204 No Content etc.
  if (res.status === 204) return undefined as T;

  return res.json();
}

export const resumeApi = {
  /** GET /resume — fetch the signed-in talent's resume. */
  get: () => request<ResumeData>("/resume"),

  /** PUT /resume — full or partial update, called on autosave. */
  update: (data: Partial<ResumeData>) =>
    request<ResumeData>("/resume", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  /** POST /resume — create the resume the first time a user opens the builder. */
  create: () =>
    request<ResumeData>("/resume", {
      method: "POST",
    }),
};