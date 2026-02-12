/**
 * CreativeSpec builders — contrato sagrado: UI → Store → CreativeSpec → API
 */

import type {
  CreativeSpec,
  DesignFormat,
  TemplateId,
  SubjectSpec,
  SceneSpec,
  CompositionSpec,
  TextSpec,
  StyleSpec,
  FloatingElementsSpec,
  PostFxSpec,
} from "./types";

export interface StoreLike {
  subjectUrl: string | null;
  style: string;
  composition: string;
  lighting: string;
  dimension: string;
  templateId?: string;
  niche?: string;
  environment?: string;
  ambientColor?: string;
  rimColor?: string;
  fillColor?: string;
  textOverlayEnabled?: boolean;
  headline?: string;
  subheadline?: string;
  cta?: string;
  floatingElementsEnabled?: boolean;
  floatingElementsPrompt?: string;
  postfxBlur?: boolean;
  postfxGradient?: boolean;
  attributesScore?: number;
  advancedPromptEnabled?: boolean;
  advancedPrompt?: string;
}

const DEFAULT_TEMPLATE: TemplateId = "lux_ad_01";

function toDesignFormat(d: string): DesignFormat {
  if (["1:1", "9:16", "16:9", "4:5"].includes(d)) return d as DesignFormat;
  return "1:1";
}

function toTemplateId(id?: string): TemplateId {
  const valid: TemplateId[] = [
    "lux_ad_01",
    "text_overlay_center_01",
    "minimal_editorial_01",
    "hero_left_01",
    "hero_right_01",
  ];
  if (id && valid.includes(id as TemplateId)) return id as TemplateId;
  return DEFAULT_TEMPLATE;
}

export function buildCreativeSpecFromStore(store: StoreLike): CreativeSpec {
  const subject: SubjectSpec = {
    imageUrl: store.subjectUrl ?? "",
    lockFace: true,
    type: "portrait",
  };

  const scene: SceneSpec = {
    niche: store.niche || undefined,
    environment: store.environment || undefined,
    palette: undefined,
    lighting: store.lighting || undefined,
    ambientColor: store.ambientColor || undefined,
    rimColor: store.rimColor || undefined,
    fillColor: store.fillColor || undefined,
  };

  const composition: CompositionSpec = {
    layout: store.composition || "medium-shot",
    depth: "medium",
    safeMargins: true,
  };

  const text: TextSpec = {
    enabled: store.textOverlayEnabled ?? false,
    headline: store.headline || undefined,
    subheadline: store.subheadline || undefined,
    cta: store.cta || undefined,
  };

  const style: StyleSpec = {
    preset: store.style || "cinematic",
    references: [],
    attributesScore: store.attributesScore ?? 50,
    advancedPrompt: (store.advancedPromptEnabled && store.advancedPrompt) ? store.advancedPrompt : undefined,
  };

  const floatingElements: FloatingElementsSpec = {
    enabled: store.floatingElementsEnabled ?? false,
    prompt: store.floatingElementsPrompt || undefined,
  };

  const postfx: PostFxSpec = {
    blur: store.postfxBlur ?? false,
    gradient: store.postfxGradient ?? true,
    bloom: false,
    vignette: false,
    grain: false,
  };

  return {
    format: toDesignFormat(store.dimension),
    templateId: toTemplateId(store.templateId),
    subject,
    scene,
    composition,
    text,
    style,
    floatingElements,
    postfx,
  };
}

export interface ApiCreativeSpecBody {
  format?: string;
  dimension?: string;
  templateId?: string;
  subjectUrl?: string;
  style?: string;
  composition?: string;
  lighting?: string;
  niche?: string;
  environment?: string;
  ambientColor?: string;
  rimColor?: string;
  fillColor?: string;
  textOverlayEnabled?: boolean;
  headline?: string;
  subheadline?: string;
  cta?: string;
  floatingElementsEnabled?: boolean;
  floatingElementsPrompt?: string;
  postfxBlur?: boolean;
  postfxGradient?: boolean;
  attributesScore?: number;
  advancedPromptEnabled?: boolean;
  advancedPrompt?: string;
}

export function buildCreativeSpecFromAPI(body: ApiCreativeSpecBody): CreativeSpec {
  const storeLike: StoreLike = {
    subjectUrl: body.subjectUrl ?? null,
    style: body.style ?? "cinematic",
    composition: body.composition ?? "medium-shot",
    lighting: body.lighting ?? "cinematic",
    dimension: "1:1",
    templateId: body.templateId,
    niche: body.niche,
    environment: body.environment,
    ambientColor: body.ambientColor,
    rimColor: body.rimColor,
    fillColor: body.fillColor,
    textOverlayEnabled: body.textOverlayEnabled,
    headline: body.headline,
    subheadline: body.subheadline,
    cta: body.cta,
    floatingElementsEnabled: body.floatingElementsEnabled,
    floatingElementsPrompt: body.floatingElementsPrompt,
    postfxBlur: body.postfxBlur,
    postfxGradient: body.postfxGradient,
    attributesScore: body.attributesScore ?? 50,
    advancedPromptEnabled: body.advancedPromptEnabled ?? false,
    advancedPrompt: body.advancedPrompt,
  };
  storeLike.dimension = body.format ?? body.dimension ?? "1:1";
  return buildCreativeSpecFromStore(storeLike);
}
