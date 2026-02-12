"use client";

import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "../../state/studio.store";

export function AdvancedPromptSection() {
  const enabled = useStudioStore((s) => s.advancedPromptEnabled);
  const value = useStudioStore((s) => s.advancedPrompt);
  const setEnabled = useStudioStore((s) => s.setAdvancedPromptEnabled);
  const setValue = useStudioStore((s) => s.setAdvancedPrompt);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Modo avançado
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
            <Textarea
              className="studio-input min-h-[100px] resize-none"
              placeholder="Instruções extras para a IA. Ex: 'Usar iluminação de Rembrandt com fundo bokeh suave...'"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
