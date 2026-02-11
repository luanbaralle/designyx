"use client";

import { Flame, Sparkles } from "lucide-react";
import { useStudioStore } from "../state/studio.store";

const navItems = ["Studio", "Gallery", "Presets", "Account"];

export function Header() {
  const credits = useStudioStore((s) => s.credits);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/30">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl btn-generate flex items-center justify-center">
            <div className="btn-generate__gradient" aria-hidden />
            <Flame className="relative z-10 w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Designyx
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                item === "Studio"
                  ? "selected-pill"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {credits} créditos
          </span>
          <button type="button" className="btn-upgrade flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Upgrade
          </button>
        </div>
      </div>
    </header>
  );
}
