import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/components/nexus-slides";

export const Route = createFileRoute("/")({
  component: NexusDeck,
  head: () => ({
    meta: [
      { title: "NEXUS · Conselho · Hyndra | Newe · Maio 2026" },
      { name: "description", content: "Sistema Operacional da Cultura · 5 Módulos · 10 Produtos" },
      { property: "og:title", content: "NEXUS · Conselho · Hyndra | Newe · Maio 2026" },
    ],
  }),
});

function NexusDeck() {
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [cursorHidden, setCursorHidden] = useState(false);
  const cursorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gMode = useRef<{ active: boolean; buf: string; timer: ReturnType<typeof setTimeout> | null }>({
    active: false,
    buf: "",
    timer: null,
  });

  const goTo = useCallback(
    (next: number) => {
      const target = Math.max(0, Math.min(total - 1, next));
      setCurrent((prev) => {
        if (target === prev) return prev;
        setLeaving(prev);
        setTimeout(() => setLeaving(null), 320);
        return target;
      });
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // G + digit jump
      if (gMode.current.active) {
        if (/^[0-9]$/.test(e.key)) {
          gMode.current.buf += e.key;
          if (gMode.current.timer) clearTimeout(gMode.current.timer);
          gMode.current.timer = setTimeout(() => {
            const n = parseInt(gMode.current.buf, 10);
            if (!Number.isNaN(n)) goTo(n - 1);
            gMode.current.active = false;
            gMode.current.buf = "";
          }, 600);
          return;
        }
        gMode.current.active = false;
        gMode.current.buf = "";
      }

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        goTo(0);
      } else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      } else if (e.key === "g" || e.key === "G") {
        gMode.current.active = true;
        gMode.current.buf = "";
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total]);

  // Cursor auto-hide
  useEffect(() => {
    const onMove = () => {
      setCursorHidden(false);
      if (cursorTimer.current) clearTimeout(cursorTimer.current);
      cursorTimer.current = setTimeout(() => setCursorHidden(true), 2000);
    };
    onMove();
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (cursorTimer.current) clearTimeout(cursorTimer.current);
    };
  }, []);

  const progress = ((current + 1) / total) * 100;

  const handleStageClick = (e: React.MouseEvent) => {
    // Avoid double-trigger if clicking nav controls
    const target = e.target as HTMLElement;
    if (target.closest("[data-nav]")) return;
    next();
  };

  return (
    <div
      className={`fixed inset-0 bg-[var(--black)] ${cursorHidden ? "cursor-hidden" : ""}`}
      style={{ overflow: "hidden" }}
    >
      <div
        className="absolute inset-0"
        onClick={handleStageClick}
        style={{ paddingBottom: "56px" }}
      >
        {slides.map((s, i) => {
          const isActive = i === current;
          const isLeaving = i === leaving;
          if (!isActive && !isLeaving) return null;
          return (
            <div
              key={i}
              className={`slide-frame ${isActive ? "is-active" : ""} ${isLeaving ? "is-leaving" : ""}`}
            >
              {s.render()}
            </div>
          );
        })}
      </div>

      {/* Bottom navigation */}
      <div
        data-nav
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-[60px] py-3 border-t border-[var(--graphite)] z-50"
        style={{
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--green)]">
          NEXUS · SISTEMA OPERACIONAL DA CULTURA
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-[200px] h-[2px] bg-[var(--graphite)]">
            <div
              className="absolute inset-y-0 left-0 bg-[var(--green)]"
              style={{ width: `${progress}%`, transition: "width 400ms ease" }}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="text-[var(--silver)] hover:text-[var(--white-warm)] transition-colors font-mono text-[14px] leading-none"
              aria-label="Anterior"
            >
              ←
            </button>
            <div className="font-mono text-[11px] text-[var(--white-warm)] tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <button
              onClick={next}
              className="text-[var(--silver)] hover:text-[var(--white-warm)] transition-colors font-mono text-[14px] leading-none"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
