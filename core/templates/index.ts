/**
 * Template Engine — Master Spec §4
 * Entry point for preset system. In future: load from DB templates table.
 */

export { getTemplate, listTemplateIds, DEFAULT_TEMPLATES } from "./presets";
export type { TemplatePreset, TemplateId } from "./types";
