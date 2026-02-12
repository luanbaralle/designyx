"use client";

import { useEffect } from "react";
import { Header } from "./components/Header";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useStudioStore, type AgentLogEntry } from "./state/studio.store";
import { buildCreativeSpecFromStore } from "@/core/spec/creative-spec";

export default function StudioPage() {
  const setCredits = useStudioStore((s) => s.setCredits);
  const setSubjectUrl = useStudioStore((s) => s.setSubjectUrl);
  const setGenerating = useStudioStore((s) => s.setGenerating);
  const setUploadingSubject = useStudioStore((s) => s.setUploadingSubject);
  const setUploadError = useStudioStore((s) => s.setUploadError);
  const setBackgroundUrl = useStudioStore((s) => s.setBackgroundUrl);
  const appendLog = useStudioStore((s) => s.appendLog);
  const clearLog = useStudioStore((s) => s.clearLog);
  const setCurrentResultUrl = useStudioStore((s) => s.setCurrentResultUrl);
  const addToHistory = useStudioStore((s) => s.addToHistory);

  useEffect(() => {
    fetch("/api/credits")
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/login";
          return null;
        }
        return r.json();
      })
      .then((d) => d && typeof d.credits === "number" && setCredits(d.credits))
      .catch(() => {});
  }, [setCredits]);

  const uploadSubjectFile = async (file: File) => {
    setUploadError(null);
    setUploadingSubject(true);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("type", "subject");
      const res = await fetch("/api/uploads", { method: "POST", body: form });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error || `Erro ao enviar (${res.status})`;
        setUploadError(msg);
        return;
      }
      const url = data?.url;
      if (url) {
        setSubjectUrl(url);
      } else {
        setUploadError("Resposta inválida do servidor");
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Erro ao enviar foto");
    } finally {
      setUploadingSubject(false);
    }
  };

  const handleUploadSubject = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) uploadSubjectFile(file);
    };
    input.click();
  };

  const handleGenerate = async () => {
    const store = useStudioStore.getState();
    const spec = buildCreativeSpecFromStore(store);

    clearLog();
    setGenerating(true);
    setCurrentResultUrl(null);
    setBackgroundUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectUrl: spec.subject.imageUrl || undefined,
          format: spec.format,
          dimension: spec.format,
          templateId: spec.templateId,
          style: spec.style.preset,
          composition: spec.composition.layout,
          lighting: spec.scene.lighting || spec.style.preset,
          niche: spec.scene.niche,
          environment: spec.scene.environment,
          ambientColor: spec.scene.ambientColor,
          rimColor: spec.scene.rimColor,
          fillColor: spec.scene.fillColor,
          textOverlayEnabled: spec.text.enabled,
          headline: spec.text.headline,
          subheadline: spec.text.subheadline,
          cta: spec.text.cta,
          floatingElementsEnabled: spec.floatingElements.enabled,
          floatingElementsPrompt: spec.floatingElements.prompt,
          postfxBlur: spec.postfx.blur,
          postfxGradient: spec.postfx.gradient,
          attributesScore: spec.style.attributesScore,
          advancedPromptEnabled: store.advancedPromptEnabled,
          advancedPrompt: spec.style.advancedPrompt,
        }),
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();

      if (data.log?.length) {
        (data.log as AgentLogEntry[]).forEach(appendLog);
      }

      const imageUrl = data.backgroundUrl ?? data.imageUrl;
      if (imageUrl) {
        setCurrentResultUrl(imageUrl);
        setBackgroundUrl(imageUrl);
        addToHistory({
          id: crypto.randomUUID(),
          imageUrl,
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
            <LeftPanel onUploadSubject={handleUploadSubject} onUploadFile={uploadSubjectFile} />
          </div>

          <div className="lg:sticky lg:top-[88px] lg:self-start">
            <RightPanel onGenerate={handleGenerate} />
          </div>
        </div>
      </main>
    </div>
  );
}
