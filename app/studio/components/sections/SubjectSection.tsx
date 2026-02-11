"use client";

import { Upload, User } from "lucide-react";
import { motion } from "framer-motion";
import { useStudioStore } from "../../state/studio.store";

interface SubjectSectionProps {
  onUploadClick: () => void;
}

export function SubjectSection({ onUploadClick }: SubjectSectionProps) {
  const gender = useStudioStore((s) => s.gender);
  const position = useStudioStore((s) => s.position);
  const photoCount = useStudioStore((s) => s.photoCount);
  const setGender = useStudioStore((s) => s.setGender);
  const setPosition = useStudioStore((s) => s.setPosition);
  const setPhotoCount = useStudioStore((s) => s.setPhotoCount);

  return (
    <div className="space-y-5">
      <motion.div
        role="button"
        tabIndex={0}
        onClick={onUploadClick}
        onKeyDown={(e) => e.key === "Enter" && onUploadClick()}
        whileHover={{ borderColor: "hsl(270 80% 65% / 0.4)" }}
        className="border-2 border-dashed border-border/40 rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-colors hover:bg-secondary/20"
      >
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Upload className="w-5 h-5 text-accent" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Arraste fotos ou clique para enviar
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Envie 1 a 5 fotos do sujeito
          </p>
        </div>
      </motion.div>

      <div>
        <label className="studio-label">Quantidade de fotos</label>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPhotoCount(n)}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                photoCount === n ? "selected-pill" : "unselected-pill"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="studio-label">Gênero</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                gender === g ? "selected-pill" : "unselected-pill"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              {g === "male" ? "Masculino" : "Feminino"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="studio-label">Posição</label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {(["left", "center", "right"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPosition(p)}
              className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
                position === p ? "selected-pill" : "unselected-pill"
              }`}
            >
              {p === "left" ? "Esquerda" : p === "center" ? "Centro" : "Direita"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
