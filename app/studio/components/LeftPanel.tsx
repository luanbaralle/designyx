"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  User,
  Maximize2,
  Type,
  MapPin,
  Palette,
  Layout,
  Sparkles,
  Image,
  Sliders,
  Eye,
  Layers,
  Terminal,
} from "lucide-react";
import { SubjectSection } from "./sections/SubjectSection";
import { DimensionSection } from "./sections/DimensionSection";
import { TextOverlaySection } from "./sections/TextOverlaySection";
import { ScenarioSection } from "./sections/ScenarioSection";
import { ColorLightSection } from "./sections/ColorLightSection";
import { CompositionSection } from "./sections/CompositionSection";
import { FloatingElementsSection } from "./sections/FloatingElementsSection";
import { StyleReferencesSection } from "./sections/StyleReferencesSection";
import { VisualAttributesSection } from "./sections/VisualAttributesSection";
import { VisualStyleSection } from "./sections/VisualStyleSection";
import { PostEffectsSection } from "./sections/PostEffectsSection";
import { AdvancedPromptSection } from "./sections/AdvancedPromptSection";

interface LeftPanelProps {
  onUploadSubject: () => void;
}

const sections = [
  { id: "subject", icon: User, label: "Sujeito Principal", component: SubjectSection, props: {} },
  { id: "dimension", icon: Maximize2, label: "Dimensão & Formato", component: DimensionSection, props: {} },
  { id: "text", icon: Type, label: "Texto na Arte", component: TextOverlaySection, props: {} },
  { id: "scenario", icon: MapPin, label: "Projeto & Cenário", component: ScenarioSection, props: {} },
  { id: "colors", icon: Palette, label: "Cores & Iluminação", component: ColorLightSection, props: {} },
  { id: "composition", icon: Layout, label: "Composição", component: CompositionSection, props: {} },
  { id: "floating", icon: Sparkles, label: "Elementos Flutuantes", component: FloatingElementsSection, props: {} },
  { id: "references", icon: Image, label: "Referências de Estilo", component: StyleReferencesSection, props: {} },
  { id: "attributes", icon: Sliders, label: "Atributos Visuais", component: VisualAttributesSection, props: {} },
  { id: "style", icon: Eye, label: "Estilo Visual", component: VisualStyleSection, props: {} },
  { id: "effects", icon: Layers, label: "Pós-Efeitos", component: PostEffectsSection, props: {} },
  { id: "prompt", icon: Terminal, label: "Prompt Avançado", component: AdvancedPromptSection, props: {} },
] as const;

export function LeftPanel({ onUploadSubject }: LeftPanelProps) {
  return (
    <div className="space-y-2">
      <Accordion
        type="multiple"
        defaultValue={["subject", "dimension", "style"]}
        className="space-y-2"
      >
        {sections.map(({ id, icon: Icon, label, component: Component, props }) => (
          <AccordionItem
            key={id}
            value={id}
            className="glass-card border-0 overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-secondary/20 transition-colors [&[data-state=open]]:border-b [&[data-state=open]]:border-border/20">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {label}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4 pb-5">
              {id === "subject" ? (
                <SubjectSection onUploadClick={onUploadSubject} />
              ) : (
                <Component {...(props as object)} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
