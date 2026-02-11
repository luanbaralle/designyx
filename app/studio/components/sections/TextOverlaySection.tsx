"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "../../state/studio.store";

export function TextOverlaySection() {
  const enabled = useStudioStore((s) => s.textOverlayEnabled);
  const setEnabled = useStudioStore((s) => s.setTextOverlayEnabled);
  const headline = useStudioStore((s) => s.headline);
  const subheadline = useStudioStore((s) => s.subheadline);
  const cta = useStudioStore((s) => s.cta);
  const setHeadline = useStudioStore((s) => s.setHeadline);
  const setSubheadline = useStudioStore((s) => s.setSubheadline);
  const setCta = useStudioStore((s) => s.setCta);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Adicionar texto</span>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <div>
              <label className="studio-label">Headline</label>
              <Input
                className="studio-input mt-1.5"
                placeholder="Título principal da arte"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
            <div>
              <label className="studio-label">Subheadline</label>
              <Input
                className="studio-input mt-1.5"
                placeholder="Subtítulo complementar"
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
              />
            </div>
            <div>
              <label className="studio-label">CTA</label>
              <Input
                className="studio-input mt-1.5"
                placeholder="Texto do botão (ex: Saiba Mais)"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
