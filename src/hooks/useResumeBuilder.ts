import { useCallback, useEffect, useRef, useState } from "react";
import { resumeApi } from "../lib/Resumeapi";
import { emptyResume, type ResumeData } from "../types/resumeTypes";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

const AUTOSAVE_DELAY_MS = 800;

export function useResumeBuilder() {
  const [resume, setResume] = useState<ResumeData>(emptyResume);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestResume = useRef(resume);
  latestResume.current = resume;

  // ── Initial load ──────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await resumeApi.get();
        if (!cancelled) setResume({ ...emptyResume, ...data });
      } catch {
        // No resume yet for this user — start fresh, create on first save.
        if (!cancelled) setResume(emptyResume);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Debounced autosave ────────────────────────────────────────
  const scheduleSave = useCallback(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        const saved = latestResume.current.id
          ? await resumeApi.update(latestResume.current)
          : await resumeApi.create();
        setResume((prev) => ({ ...prev, id: saved.id, updatedAt: saved.updatedAt }));
        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    }, AUTOSAVE_DELAY_MS);
  }, []);

  const update = useCallback(
    (updater: (prev: ResumeData) => ResumeData) => {
      setResume((prev) => updater(prev));
      scheduleSave();
    },
    [scheduleSave]
  );

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  return {
    resume,
    loading,
    loadError,
    saveStatus,
    update,
  };
}