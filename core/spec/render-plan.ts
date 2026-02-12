import type { CreativeSpec, TemplateId } from "@/core/spec/types";

export interface RenderConstraints {
  no_people: boolean;
  no_text: boolean;
  no_logo: boolean;
  no_watermark: boolean;
  empty_right_side?: boolean;
  empty_left_side?: boolean;
  subjectless_zone?: "left" | "center" | "right";
}

export interface ReservedSpace {
  side: "left" | "center" | "right";
  percent: number;
}

export interface RenderStage {
  stage: "background";
  prompt: string;
  constraints: RenderConstraints;
  layout: string;
  reservedSpace: ReservedSpace;
  templateRules: string[];
}

export interface RenderPlan {
  goal: string;
  templateId: TemplateId;
  creativeSpec: CreativeSpec;
  stages: RenderStage[];
}
