"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "../../state/studio.store";

export function ScenarioSection() {
  const niche = useStudioStore((s) => s.niche);
  const environment = useStudioStore((s) => s.environment);
  const useScenarioRef = useStudioStore((s) => s.useScenarioRef);
  const setNiche = useStudioStore((s) => s.setNiche);
  const setEnvironment = useStudioStore((s) => s.setEnvironment);
  const setUseScenarioRef = useStudioStore((s) => s.setUseScenarioRef);

  return (
    <div className="space-y-4">
      <div>
        <label className="studio-label">Nicho / Projeto</label>
        <Input
          className="studio-input mt-1.5"
          placeholder="Ex: Trader de Elite"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
        />
      </div>
      <div>
        <label className="studio-label">Ambiente</label>
        <Input
          className="studio-input mt-1.5"
          placeholder="Ex: Escritório moderno"
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Referência de cenário
        </span>
        <Switch checked={useScenarioRef} onCheckedChange={setUseScenarioRef} />
      </div>

      <AnimatePresence>
        {useScenarioRef && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-2 border-dashed border-border/30 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-accent/30 hover:bg-secondary/20 transition-all">
              <Upload className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Upload de referência de cenário
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
