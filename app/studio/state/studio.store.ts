import { create } from "zustand";

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
  dimension: string; // "1:1" | "9:16" | "16:9" | "4:5"
  photoCount: number;
  gender: "male" | "female";
  position: "left" | "center" | "right";
  textOverlayEnabled: boolean;
  headline: string;
  subheadline: string;
  cta: string;
  credits: number;
  isGenerating: boolean;
  agentLog: AgentLogEntry[];
  history: GenerationRecord[];
  currentResultUrl: string | null;
  setSubjectUrl: (url: string | null) => void;
  setStyle: (s: string) => void;
  setComposition: (c: string) => void;
  setLighting: (l: string) => void;
  setDimension: (d: string) => void;
  setPhotoCount: (n: number) => void;
  setGender: (g: "male" | "female") => void;
  setPosition: (p: "left" | "center" | "right") => void;
  setTextOverlayEnabled: (v: boolean) => void;
  setHeadline: (h: string) => void;
  setSubheadline: (s: string) => void;
  setCta: (c: string) => void;
  setCredits: (n: number) => void;
  setGenerating: (v: boolean) => void;
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
  photoCount: 3,
  gender: "male",
  position: "center",
  textOverlayEnabled: false,
  headline: "",
  subheadline: "",
  cta: "",
  credits: 0,
  isGenerating: false,
  agentLog: [],
  history: [],
  currentResultUrl: null,

  setSubjectUrl: (url) => set({ subjectUrl: url }),
  setStyle: (s) => set({ style: s }),
  setComposition: (c) => set({ composition: c }),
  setLighting: (l) => set({ lighting: l }),
  setDimension: (d) => set({ dimension: d }),
  setPhotoCount: (n) => set({ photoCount: n }),
  setGender: (g) => set({ gender: g }),
  setPosition: (p) => set({ position: p }),
  setTextOverlayEnabled: (v) => set({ textOverlayEnabled: v }),
  setHeadline: (h) => set({ headline: h }),
  setSubheadline: (s) => set({ subheadline: s }),
  setCta: (c) => set({ cta: c }),
  setCredits: (n) => set({ credits: n }),
  setGenerating: (v) => set({ isGenerating: v }),
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
