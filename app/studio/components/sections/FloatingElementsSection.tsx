"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "../../state/studio.store";

export function FloatingElementsSection() {
  const enabled = useStudioStore((s) => s.floatingElementsEnabled);
  const value = useStudioStore((s) => s.floatingElementsPrompt);
  const setEnabled = useStudioStore((s) => s.setFloatingElementsEnabled);
  const setValue = useStudioStore((s) => s.setFloatingElementsPrompt);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Adicionar elementos visuais
        </span>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Input
              className="studio-input"
              placeholder="Ex: notas de dólar, partículas neon, fumaça"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
