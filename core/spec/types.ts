export type DesignFormat = "1:1" | "9:16" | "16:9" | "4:5";

export type TemplateId =
  | "lux_ad_01"
  | "text_overlay_center_01"
  | "minimal_editorial_01"
  | "hero_left_01"
  | "hero_right_01";

export interface SubjectSpec {
  imageUrl: string;
  lockFace: boolean;
  type: "portrait" | "full-body";
}

export interface SceneSpec {
  niche?: string;
  environment?: string;
  palette?: string;
  lighting?: string;
  ambientColor?: string;
  rimColor?: string;
  fillColor?: string;
}

export interface CompositionSpec {
  layout: string;
  depth: "low" | "medium" | "strong";
  safeMargins: boolean;
}

export interface TextSpec {
  enabled: boolean;
  headline?: string;
  subheadline?: string;
  cta?: string;
}

export interface StyleSpec {
  preset: string;
  references: string[];
  attributesScore: number;
  advancedPrompt?: string;
}

export interface FloatingElementsSpec {
  enabled: boolean;
  prompt?: string;
}

export interface PostFxSpec {
  blur: boolean;
  gradient: boolean;
  bloom: boolean;
  vignette: boolean;
  grain: boolean;
}

export interface CreativeSpec {
  format: DesignFormat;
  templateId: TemplateId;
  subject: SubjectSpec;
  scene: SceneSpec;
  composition: CompositionSpec;
  text: TextSpec;
  style: StyleSpec;
  floatingElements: FloatingElementsSpec;
  postfx: PostFxSpec;
}

export interface TypographyConfig {
  headline: {
    maxFontSize: number;
    minFontSize: number;
    maxLines: number;
  };
  subheadline: {
    maxFontSize: number;
    minFontSize: number;
    maxLines: number;
  };
  cta: {
    fontSize: number;
  };
}
