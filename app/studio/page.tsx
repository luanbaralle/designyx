"use client";

import { useEffect } from "react";
import { Header } from "./components/Header";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useStudioStore } from "./state/studio.store";

export default function StudioPage() {
  const setCredits = useStudioStore((s) => s.setCredits);
  const setSubjectUrl = useStudioStore((s) => s.setSubjectUrl);
  const setGenerating = useStudioStore((s) => s.setGenerating);
  const appendLog = useStudioStore((s) => s.appendLog);
  const clearLog = useStudioStore((s) => s.clearLog);
  const setCurrentResultUrl = useStudioStore((s) => s.setCurrentResultUrl);
  const addToHistory = useStudioStore((s) => s.addToHistory);
  const subjectUrl = useStudioStore((s) => s.subjectUrl);
  const style = useStudioStore((s) => s.style);
  const composition = useStudioStore((s) => s.composition);
  const lighting = useStudioStore((s) => s.lighting);
  const headline = useStudioStore((s) => s.headline);
  const subheadline = useStudioStore((s) => s.subheadline);
  const cta = useStudioStore((s) => s.cta);

  useEffect(() => {
    fetch("/api/credits")
      .then((r) => r.json())
      .then((d) => typeof d.credits === "number" && setCredits(d.credits))
      .catch(() => {});
  }, [setCredits]);

  const handleUploadSubject = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const form = new FormData();
      form.set("file", file);
      form.set("type", "subject");
      const res = await fetch("/api/uploads", { method: "POST", body: form });
      if (!res.ok) return;
      const { url } = await res.json();
      setSubjectUrl(url);
    };
    input.click();
  };

  const handleGenerate = async () => {
    if (!subjectUrl) return;
    clearLog();
    setGenerating(true);
    setCurrentResultUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectUrl,
          style,
          composition,
          lighting,
          headline: headline || undefined,
          subheadline: subheadline || undefined,
          cta: cta || undefined,
        }),
      });
      const data = await res.json();

      if (data.log?.length) {
        data.log.forEach(
          (entry: { role: string; message: string; at: number }) =>
            appendLog(entry)
        );
      }

      if (data.imageUrl) {
        setCurrentResultUrl(data.imageUrl);
        addToHistory({
          id: crypto.randomUUID(),
          imageUrl: data.imageUrl,
          createdAt: Date.now(),
        });
      }

      if (res.status === 402) {
        const cr = await fetch("/api/credits").then((r) => r.json());
        if (typeof cr.credits === "number") setCredits(cr.credits);
      } else if (res.ok) {
        const cur = useStudioStore.getState().credits;
        setCredits(Math.max(0, cur - 1));
      }
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[150px]" />
      </div>

      <Header />
      <main className="max-w-[1600px] mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
          <div className="max-h-[calc(100vh-112px)] overflow-y-auto pr-1">
            <LeftPanel onUploadSubject={handleUploadSubject} />
          </div>

          <div className="lg:sticky lg:top-[88px] lg:self-start">
            <RightPanel onGenerate={handleGenerate} />
          </div>
        </div>
      </main>
    </div>
  );
}
