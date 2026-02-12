import { create } from "zustand";
import type { TemplateId } from "@/core/spec/types";

export type AgentLogEntry = {
  role: "Director" | "Critic" | "Renderer" | "Done";
  message: string;
  at: number;
};

export interface GenerationRecord {
  id: string;
  imageUrl: string;
  prompt?: string;
  style?: string;
  createdAt: number;
}

interface StudioState {
  subjectUrl: string | null;
  style: string;
  composition: string;
  lighting: string;
  dimension: string;
  templateId: TemplateId;
  niche: string;
  environment: string;
  useScenarioRef: boolean;
  ambientColor: string;
  rimColor: string;
  fillColor: string;
  photoCount: number;
  gender: "male" | "female";
  position: "left" | "center" | "right";
  textOverlayEnabled: boolean;
  headline: string;
  subheadline: string;
  cta: string;
  floatingElementsEnabled: boolean;
  floatingElementsPrompt: string;
  postfxBlur: boolean;
  postfxGradient: boolean;
  attributesScore: number;
  advancedPromptEnabled: boolean;
  advancedPrompt: string;
  credits: number;
  isGenerating: boolean;
  isUploadingSubject: boolean;
  uploadError: string | null;
  agentLog: AgentLogEntry[];
  history: GenerationRecord[];
  currentResultUrl: string | null;
  backgroundUrl: string | null;
  setSubjectUrl: (url: string | null) => void;
  setStyle: (s: string) => void;
  setComposition: (c: string) => void;
  setLighting: (l: string) => void;
  setDimension: (d: string) => void;
  setTemplateId: (id: TemplateId) => void;
  setNiche: (v: string) => void;
  setEnvironment: (v: string) => void;
  setUseScenarioRef: (v: boolean) => void;
  setAmbientColor: (v: string) => void;
  setRimColor: (v: string) => void;
  setFillColor: (v: string) => void;
  setPhotoCount: (n: number) => void;
  setGender: (g: "male" | "female") => void;
  setPosition: (p: "left" | "center" | "right") => void;
  setTextOverlayEnabled: (v: boolean) => void;
  setHeadline: (h: string) => void;
  setSubheadline: (s: string) => void;
  setCta: (c: string) => void;
  setFloatingElementsEnabled: (v: boolean) => void;
  setFloatingElementsPrompt: (v: string) => void;
  setPostfxBlur: (v: boolean) => void;
  setPostfxGradient: (v: boolean) => void;
  setAttributesScore: (n: number) => void;
  setAdvancedPromptEnabled: (v: boolean) => void;
  setAdvancedPrompt: (v: string) => void;
  setCredits: (n: number) => void;
  setGenerating: (v: boolean) => void;
  setUploadingSubject: (v: boolean) => void;
  setUploadError: (msg: string | null) => void;
  setBackgroundUrl: (url: string | null) => void;
  appendLog: (entry: AgentLogEntry) => void;
  clearLog: () => void;
  addToHistory: (record: GenerationRecord) => void;
  setHistory: (list: GenerationRecord[]) => void;
  setCurrentResultUrl: (url: string | null) => void;
  resetForNewRun: () => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  subjectUrl: null,
  style: "cinematic",
  composition: "medium-shot",
  lighting: "cinematic",
  dimension: "1:1",
  templateId: "lux_ad_01",
  niche: "",
  environment: "",
  useScenarioRef: false,
  ambientColor: "#1a1a2e",
  rimColor: "#e94560",
  fillColor: "#f5a623",
  photoCount: 3,
  gender: "male",
  position: "center",
  textOverlayEnabled: false,
  headline: "",
  subheadline: "",
  cta: "",
  floatingElementsEnabled: false,
  floatingElementsPrompt: "",
  postfxBlur: false,
  postfxGradient: true,
  attributesScore: 50,
  advancedPromptEnabled: false,
  advancedPrompt: "",
  credits: 0,
  isGenerating: false,
  isUploadingSubject: false,
  uploadError: null,
  agentLog: [],
  history: [],
  currentResultUrl: null,
  backgroundUrl: null,

  setSubjectUrl: (url) => set({ subjectUrl: url }),
  setStyle: (s) => set({ style: s }),
  setComposition: (c) => set({ composition: c }),
  setLighting: (l) => set({ lighting: l }),
  setDimension: (d) => set({ dimension: d }),
  setTemplateId: (id) => set({ templateId: id }),
  setNiche: (v) => set({ niche: v }),
  setEnvironment: (v) => set({ environment: v }),
  setUseScenarioRef: (v) => set({ useScenarioRef: v }),
  setAmbientColor: (v) => set({ ambientColor: v }),
  setRimColor: (v) => set({ rimColor: v }),
  setFillColor: (v) => set({ fillColor: v }),
  setPhotoCount: (n) => set({ photoCount: n }),
  setGender: (g) => set({ gender: g }),
  setPosition: (p) => set({ position: p }),
  setTextOverlayEnabled: (v) => set({ textOverlayEnabled: v }),
  setHeadline: (h) => set({ headline: h }),
  setSubheadline: (s) => set({ subheadline: s }),
  setCta: (c) => set({ cta: c }),
  setFloatingElementsEnabled: (v) => set({ floatingElementsEnabled: v }),
  setFloatingElementsPrompt: (v) => set({ floatingElementsPrompt: v }),
  setPostfxBlur: (v) => set({ postfxBlur: v }),
  setPostfxGradient: (v) => set({ postfxGradient: v }),
  setAttributesScore: (n) => set({ attributesScore: n }),
  setAdvancedPromptEnabled: (v) => set({ advancedPromptEnabled: v }),
  setAdvancedPrompt: (v) => set({ advancedPrompt: v }),
  setCredits: (n) => set({ credits: n }),
  setGenerating: (v) => set({ isGenerating: v }),
  setUploadingSubject: (v) => set({ isUploadingSubject: v }),
  setUploadError: (msg) => set({ uploadError: msg }),
  setBackgroundUrl: (url) => set({ backgroundUrl: url }),
  appendLog: (entry) =>
    set((state) => ({ agentLog: [...state.agentLog, entry] })),
  clearLog: () => set({ agentLog: [] }),
  addToHistory: (record) =>
    set((state) => ({ history: [record, ...state.history].slice(0, 20) })),
  setHistory: (list) => set({ history: list }),
  setCurrentResultUrl: (url) => set({ currentResultUrl: url }),
  resetForNewRun: () =>
    set({ agentLog: [], currentResultUrl: null }),
}));
