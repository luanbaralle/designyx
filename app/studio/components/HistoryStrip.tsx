"use client";

import { useStudioStore } from "../state/studio.store";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function HistoryStrip() {
  const history = useStudioStore((s) => s.history);
  const setCurrentResultUrl = useStudioStore((s) => s.setCurrentResultUrl);

  const displayList = history;

  if (displayList.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card/30 px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          Suas gerações aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto rounded-xl border border-border bg-card/30 p-3">
      {displayList.slice(0, 12).map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setCurrentResultUrl(item.imageUrl)}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-border transition hover:border-primary"
        >
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        </button>
      ))}
    </div>
  );
}
