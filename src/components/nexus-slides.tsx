import { useEffect, useRef, useState } from "react";
import { products, altNames, modules, FALLBACK_IMAGES, type Product } from "@/lib/nexus-data";
import allAboardPavilion from "@/assets/all-aboard-pavilion.png";
import allAboardType from "@/assets/all-aboard-type.jpg";
import par2026Type from "@/assets/par-2026-type.jpg";
import hyndraLogo from "@/assets/hyndra-logo.png";
import academiaLideresLogo from "@/assets/academia-lideres-logo.png";
import academiaLideresHero from "@/assets/academia-lideres-hero.jpg";
import academiaVendasHero from "@/assets/academia-vendas-hero.jpg";
import academiaVendasLogo from "@/assets/academia-vendas-logo.png";
import hynstaNeweLogo from "@/assets/hynstanewe-logo.png";
import miniBrandbook from "@/assets/mini-brandbook.jpg";
import hubHyndraHero from "@/assets/hub-hyndra-hero.jpg";

/* ==================== Shared parallax hook ==================== */
function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [auto, setAuto] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setMouse({ x: nx, y: ny }));
    };
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const e = (t - start) / 1000;
      setAuto({ x: Math.sin(e * 0.18) * 0.18, y: Math.cos(e * 0.14) * 0.12 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(${(mouse.x + auto.x) * depth}px, ${(mouse.y + auto.y) * depth}px, 0)`,
    willChange: "transform",
  });
  return { ref, layer };
}

/* ==================== STARRY SKY — Nosso Jeito de Ser (slide 4) ==================== */
function StarrySkyParallax() {
  const { ref, layer } = useParallax();
  // Três camadas de estrelas para profundidade real
  const make = (count: number, seed: number, sizeBase: number, sizeRange: number, dur: [number, number]) =>
    Array.from({ length: count }).map((_, i) => {
      const r = (n: number) => ((Math.sin((i + seed) * 9.13 + n * 3.7) + 1) / 2);
      const durSpan = dur[1] - dur[0];
      return {
        x: r(1) * 100,
        y: r(2) * 100,
        s: sizeBase + r(3) * sizeRange,
        d: r(4) * (dur[0] + r(5) * durSpan),
        dur: dur[0] + r(6) * durSpan,
      };
    });
  const farStars = make(160, 0, 0.5, 1.2, [5, 9]);
  const midStars = make(70, 100, 1.2, 1.8, [6, 11]);
  const nearStars = make(22, 200, 2.2, 2.6, [7, 12]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 38%, #1a2040 0%, #0e1226 45%, #07080f 90%)" }}>
      {/* nebulosa sutil */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 30% 70%, rgba(120,140,220,0.08) 0%, rgba(0,0,0,0) 55%), radial-gradient(ellipse at 75% 25%, rgba(180,140,220,0.07) 0%, rgba(0,0,0,0) 50%)",
      }} />
      {/* far layer */}
      <div className="absolute inset-0" style={layer(4)}>
        {farStars.map((st, i) => (
          <div key={`f${i}`} className="starry-twinkle absolute rounded-full"
            style={{
              top: `${st.y}%`, left: `${st.x}%`, width: st.s, height: st.s,
              background: "#F7F6F4", opacity: 0.35,
              animationDelay: `${st.d}s`, animationDuration: `${st.dur}s`,
            }} />
        ))}
      </div>
      {/* mid layer */}
      <div className="absolute inset-0" style={layer(10)}>
        {midStars.map((st, i) => (
          <div key={`m${i}`} className="starry-twinkle absolute rounded-full"
            style={{
              top: `${st.y}%`, left: `${st.x}%`, width: st.s, height: st.s,
              background: "#FFFFFF",
              animationDelay: `${st.d}s`, animationDuration: `${st.dur}s`,
            }} />
        ))}
      </div>
      {/* near layer — estrelas grandes que piscam intensamente */}
      <div className="absolute inset-0" style={layer(18)}>
        {nearStars.map((st, i) => (
          <div key={`n${i}`} className="starry-twinkle absolute rounded-full"
            style={{
              top: `${st.y}%`, left: `${st.x}%`, width: st.s, height: st.s,
              background: "#FFFFFF",
              boxShadow: "0 0 8px 1px rgba(255,255,255,0.5)",
              animationDelay: `${st.d}s`, animationDuration: `${st.dur}s`,
            }} />
        ))}
      </div>
      {/* overlay muito leve só para legibilidade do header */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0) 18%, rgba(10,10,10,0) 82%, rgba(10,10,10,0.12) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={layer(48)}>
        <div className="absolute" style={{ top: "6%", left: "8%", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 1, background: "#9DCA79" }} />
          <div className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#9DCA79" }}>CODEX · MANIFESTO</div>
        </div>
        <div className="absolute" style={{ top: "6%", right: "8%", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <div className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.85)" }}>01/10</div>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.55)" }} />
        </div>
      </div>
    </div>
  );
}

/* ==================== ACADEMIA DE VENDAS — slide 9 ==================== */
function AcademiaVendasParallax() {
  const { ref, layer } = useParallax();
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0" style={{ ...layer(12), inset: "-30px" }}>
        <img src={academiaVendasHero} alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(0.1) brightness(0.92) contrast(1.05) saturate(1)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(90deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.06) 22%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.06) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(10,10,10,0.03) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.12) 100%)",
      }} />
      <div className="absolute" style={{ ...layer(44), bottom: "7%", right: "7%", width: 170 }}>
        <img src={academiaVendasLogo} alt="Academia de Vendas Newe" className="w-full h-auto"
          style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.7))" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={layer(48)}>
        <div className="absolute" style={{ top: "6%", left: "8%", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 1, background: "#9DCA79" }} />
          <div className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#9DCA79" }}>ESCOLA DO COMPRADOR</div>
        </div>
        <div className="absolute" style={{ top: "6%", right: "8%", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <div className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.85)" }}>06/10</div>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.55)" }} />
        </div>
      </div>
    </div>
  );
}

/* ==================== HYNstaNewe — slide 10 ==================== */
function HynstaNeweParallax() {
  const { ref, layer } = useParallax();
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ background: "radial-gradient(ellipse at 60% 40%, #1a1018 0%, #0a0a0a 75%)" }}>
      <div className="absolute pointer-events-none" style={{ ...layer(14), top: "10%", left: "50%", width: "80%", height: "70%", transform: "translateX(-50%)" }}>
        <div className="w-full h-full" style={{
          background: "radial-gradient(ellipse at center, rgba(225,48,108,0.32) 0%, rgba(247,119,55,0.2) 35%, rgba(157,202,121,0.08) 65%, rgba(10,10,10,0) 80%)",
          filter: "blur(40px)",
        }} />
      </div>
      <div className="absolute" style={{ ...layer(28), top: "50%", left: "50%", width: "75%", transform: "translate(-50%, -50%)" }}>
        <img src={hynstaNeweLogo} alt="HYNstaNewe" className="w-full h-auto"
          style={{ filter: "drop-shadow(0 6px 30px rgba(0,0,0,0.7))", mixBlendMode: "screen", opacity: 0.96 }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(90deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.06) 22%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.06) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(10,10,10,0.03) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.12) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={layer(52)}>
        <div className="absolute" style={{ top: "6%", left: "8%", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 1, background: "#9DCA79" }} />
          <div className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#9DCA79" }}>ALMANAQUE VIVO</div>
        </div>
        <div className="absolute" style={{ top: "6%", right: "8%", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <div className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.85)" }}>07/10</div>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.55)" }} />
        </div>
      </div>
    </div>
  );
}

/* ==================== HABITAR A ESTRUTURA — slide 11 (vídeo loop) ==================== */
function HabitarEstruturaParallax() {
  const { ref, layer } = useParallax();
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0" style={{ ...layer(8), inset: "-20px" }}>
        <video
          src="https://res.cloudinary.com/dhhznkel5/video/upload/org_e_design_pshgta.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.1)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(90deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.06) 22%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.06) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(10,10,10,0.03) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.12) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={layer(48)}>
        <div className="absolute" style={{ top: "6%", left: "8%", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 1, background: "#9DCA79" }} />
          <div className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#9DCA79" }}>TOPOGRAFIA HUMANA</div>
        </div>
        <div className="absolute" style={{ top: "6%", right: "8%", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <div className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.85)" }}>08/10</div>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.55)" }} />
        </div>
      </div>
    </div>
  );
}

/* ==================== PLATAFORMA DE MARCA — slide 12 ==================== */
function PlataformaMarcaParallax() {
  const { ref, layer } = useParallax();
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0" style={{ ...layer(10), inset: "-20px" }}>
        <img src={miniBrandbook} alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(1.02) contrast(1.03)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(90deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.06) 22%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.06) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(10,10,10,0.06) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.12) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={layer(48)}>
        <div className="absolute" style={{ top: "6%", left: "8%", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 1, background: "#9DCA79" }} />
          <div className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#9DCA79" }}>GRAMÁTICA VIVA</div>
        </div>
        <div className="absolute" style={{ top: "6%", right: "8%", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <div className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.85)" }}>09/10</div>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.55)" }} />
        </div>
      </div>
    </div>
  );
}

/* ==================== HUB HYNDRA — slide 13 ==================== */
function HubHyndraParallax() {
  const { ref, layer } = useParallax();
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0" style={{ ...layer(10), inset: "-20px" }}>
        <img src={hubHyndraHero} alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.98) contrast(1.05)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(90deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.06) 22%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.06) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, rgba(10,10,10,0.04) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.12) 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={layer(48)}>
        <div className="absolute" style={{ top: "6%", left: "8%", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 1, background: "#9DCA79" }} />
          <div className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#9DCA79" }}>CONSTITUIÇÃO DO GRUPO</div>
        </div>
        <div className="absolute" style={{ top: "6%", right: "8%", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <div className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.85)" }}>10/10</div>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.55)" }} />
        </div>
      </div>
    </div>
  );
}





/* ==================== ALL ABOARD — PARALLAX DE CHEGADA ==================== */
function AllAboardParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [auto, setAuto] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setMouse({ x: nx, y: ny }));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const e = (t - start) / 1000;
      setAuto({ x: Math.sin(e * 0.18) * 0.18, y: Math.cos(e * 0.14) * 0.12 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(${(mouse.x + auto.x) * depth}px, ${(mouse.y + auto.y) * depth}px, 0)`,
    willChange: "transform",
  });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#1a1a1a]">
      {/* Camada 1 — fotografia arquitetônica (pavilhão de chegada) */}
      <div className="absolute inset-0" style={{ ...layer(14), inset: "-40px" }}>
        <img
          src={allAboardPavilion}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(0.15) brightness(0.88) contrast(1.04)" }}
        />
      </div>

      {/* Camada 2 — gradiente atmosférico que rebaixa o céu e amarra com o preto da capa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.06) 0%, rgba(10,10,10,0.06) 35%, rgba(10,10,10,0.06) 75%, rgba(10,10,10,0.25) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.06) 22%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.06) 100%)",
        }}
      />

      {/* Camada 3 — tipografia "all aboard" flutuando, com mistura por screen */}
      <div
        className="absolute"
        style={{
          ...layer(36),
          top: "44%",
          left: "50%",
          width: "120%",
          transform: `translate(-50%, -50%) translate3d(${(mouse.x + auto.x) * 36}px, ${(mouse.y + auto.y) * 36}px, 0)`,
          mixBlendMode: "screen",
          opacity: 0.85,
        }}
      >
        <img
          src={allAboardType}
          alt=""
          className="w-full h-auto"
          style={{ filter: "brightness(1.25) contrast(1.15)" }}
        />
      </div>

      {/* Camada 4 — anotações editoriais (régua + marcador) */}
      <div className="absolute inset-0 pointer-events-none" style={layer(58)}>
        <div
          className="absolute"
          style={{ top: "18%", right: "8%", display: "flex", alignItems: "center", gap: 10 }}
        >
          <div style={{ width: 56, height: 1, background: "var(--green)" }} />
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              color: "var(--green)",
            }}
          >
            RITO DE CHEGADA
          </div>
        </div>

        <div
          className="absolute"
          style={{ bottom: "16%", left: "8%", display: "flex", flexDirection: "column", gap: 6 }}
        >
          <div
            className="font-mono uppercase"
            style={{
              fontSize: 8,
              letterSpacing: "0.3em",
              color: "rgba(192,192,192,0.55)",
            }}
          >
            PORTAL DE PASSAGEM · 02/10
          </div>
          <div style={{ width: 120, height: 1, background: "rgba(192,192,192,0.35)" }} />
        </div>

        {/* Cruz de medição discreta */}
        <div
          className="absolute"
          style={{ top: "32%", left: "12%", width: 14, height: 14 }}
        >
          <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--green)] opacity-70" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--green)] opacity-70" />
        </div>
      </div>

      {/* Vinheta final para amarrar com a coluna de texto */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.08) 60%, rgba(10,10,10,0.2) 100%)",
        }}
      />
    </div>
  );
}

/* ==================== PAR 2026 — PARALLAX DE MERECIMENTO ==================== */
function PAR2026Parallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [auto, setAuto] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setMouse({ x: nx, y: ny }));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const e = (t - start) / 1000;
      setAuto({ x: Math.sin(e * 0.18) * 0.18, y: Math.cos(e * 0.14) * 0.12 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(${(mouse.x + auto.x) * depth}px, ${(mouse.y + auto.y) * depth}px, 0)`,
    willChange: "transform",
  });

  // Barras verticais que brilham em sequência — métrica viva de merecimento
  const BARS = 12;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#101010]">
      {/* Camada 1 — tipografia PAR 2026 como base */}
      <div className="absolute inset-0" style={{ ...layer(12), inset: "-30px" }}>
        <img
          src={par2026Type}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(0.08) brightness(0.98) contrast(1.05)" }}
        />
      </div>

      {/* Camada 2 — barras verticais que brilham em sequência (uma a uma) */}
      <div className="absolute inset-0 pointer-events-none" style={layer(26)}>
        <div className="absolute inset-0 flex items-stretch justify-between px-[6%] py-[12%]">
          {Array.from({ length: BARS }).map((_, i) => (
            <div
              key={i}
              className="par-bar"
              style={{
                width: 2,
                background:
                  "linear-gradient(180deg, rgba(192,192,192,0.18) 0%, rgba(192,192,192,0.32) 50%, rgba(192,192,192,0.18) 100%)",
                animationDelay: `${i * 0.35}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Camada 3 — marca d'água Hyndra (canto inferior esquerdo, grande, sutil) */}
      <div className="absolute pointer-events-none" style={{ ...layer(20), bottom: "-8%", left: "-6%", width: "55%" }}>
        <img
          src={hyndraLogo}
          alt=""
          className="w-full h-auto"
          style={{
            opacity: 0.07,
            filter: "brightness(2) contrast(1.2)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Vinheta para integrar com a coluna esquerda */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.06) 22%, rgba(10,10,10,0) 55%, rgba(10,10,10,0.06) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.06) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.12) 100%)",
        }}
      />

      {/* Camada 4 — logo Hyndra nítido no canto inferior direito (componente do parallax) */}
      <div
        className="absolute"
        style={{
          ...layer(48),
          bottom: "7%",
          right: "7%",
          width: 88,
        }}
      >
        <img
          src={hyndraLogo}
          alt="Hyndra"
          className="w-full h-auto"
          style={{
            opacity: 0.92,
            filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.6))",
          }}
        />
        <div
          className="font-mono uppercase mt-2 text-right"
          style={{
            fontSize: 8,
            letterSpacing: "0.3em",
            color: "rgba(192,192,192,0.55)",
          }}
        >
          HYNDRA · GRUPO
        </div>
      </div>

      {/* Camada 5 — anotações editoriais */}
      <div className="absolute inset-0 pointer-events-none" style={layer(58)}>
        <div
          className="absolute"
          style={{ top: "16%", right: "8%", display: "flex", alignItems: "center", gap: 10 }}
        >
          <div style={{ width: 56, height: 1, background: "var(--green)" }} />
          <div
            className="font-mono uppercase"
            style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--green)" }}
          >
            MOTOR DE MERECIMENTO
          </div>
        </div>

        <div
          className="absolute"
          style={{ top: "26%", left: "8%", display: "flex", flexDirection: "column", gap: 6 }}
        >
          <div
            className="font-mono uppercase"
            style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(192,192,192,0.5)" }}
          >
            INDICADOR · 03/10
          </div>
          <div style={{ width: 110, height: 1, background: "rgba(192,192,192,0.3)" }} />
        </div>

        <div className="absolute" style={{ top: "44%", right: "14%", width: 14, height: 14 }}>
          <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--green)] opacity-70" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--green)] opacity-70" />
        </div>
      </div>
    </div>
  );
}


/* ==================== ACADEMIA DE LÍDERES — FORJA ====================
   Três figuras emergem do livro (esquerda: cinza-claro, centro: verde,
   direita: cinza-escuro). A última letra "e" de "newe" também vira verde.
   Um brilho verde surge acima e a logo se estabiliza. Em loop. */
function AcademiaLideresParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [auto, setAuto] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setMouse({ x: nx, y: ny }));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const e = (t - start) / 1000;
      setAuto({ x: Math.sin(e * 0.2) * 0.16, y: Math.cos(e * 0.15) * 0.1 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(${(mouse.x + auto.x) * depth}px, ${(mouse.y + auto.y) * depth}px, 0)`,
    willChange: "transform",
  });

  // Pessoa estilizada: cabeça + corpo com braços em V.
  const Figure = ({
    cx,
    scale,
    className,
    delay,
  }: {
    cx: number;
    scale: number;
    className: string;
    delay: string;
  }) => (
    <g
      className="al-figure"
      style={{ animationDelay: delay, transformOrigin: `${cx}px 240px` }}
    >
      <g style={{ transform: `scale(${scale})`, transformOrigin: `${cx}px 240px` }}>
        <circle cx={cx} cy={120} r={18} className={className} />
        <path
          d={`M ${cx - 6} 140
             L ${cx + 6} 140
             L ${cx + 8} 168
             L ${cx + 34} 214
             L ${cx + 26} 222
             L ${cx + 6} 192
             L ${cx + 6} 240
             L ${cx - 6} 240
             L ${cx - 6} 192
             L ${cx - 26} 222
             L ${cx - 34} 214
             L ${cx - 8} 168 Z`}
          className={className}
        />
      </g>
    </g>
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Camada 1 — foto principal contida no lado direito */}
      <div className="absolute inset-0" style={layer(10)}>
        <img
          src={academiaLideresHero}
          alt="Academia de Líderes Newe — formandos"
          className="w-full h-full"
          style={{
            objectFit: "contain",
            objectPosition: "center center",
            filter: "grayscale(8%) brightness(0.95) contrast(1.05) saturate(1)",
          }}
        />
        {/* Vinheta suave para integrar a foto ao fundo escuro */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(10,10,10,0.12) 88%, rgba(10,10,10,0.2) 100%)",
          }}
        />
        {/* Sombreado nas bordas verticais para fundir nas laterais */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.06) 14%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 70%, rgba(10,10,10,0.06) 86%, rgba(10,10,10,0.15) 100%)",
          }}
        />
        {/* Borda inferior escurecida (consistência com demais slides) */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "30%",
            background:
              "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.08) 70%, rgba(10,10,10,0.18) 100%)",
          }}
        />
      </div>

      {/* Camada 2 — brilho verde sutil atrás da cena */}
      <div className="absolute inset-0 pointer-events-none" style={layer(22)}>
        <div
          className="absolute"
          style={{
            top: "20%", left: "50%", width: "78%", height: "50%", transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(157,202,121,0.16) 0%, rgba(157,202,121,0.04) 55%, rgba(157,202,121,0) 80%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Camada 3 — anotações editoriais */}
      <div className="absolute inset-0 pointer-events-none" style={layer(48)}>
        <div
          className="absolute"
          style={{ top: "6%", left: "8%", display: "flex", alignItems: "center", gap: 10 }}
        >
          <div style={{ width: 40, height: 1, background: "#9DCA79" }} />
          <div className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#9DCA79" }}>
            FORJA · ESCOLA
          </div>
        </div>
        <div
          className="absolute"
          style={{ top: "6%", right: "8%", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}
        >
          <div className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.85)" }}>
            05/10
          </div>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.55)" }} />
        </div>
      </div>
    </div>
  );
}





const FOOTER = "Hyndra | Newe Urbanismo Integrativo · Conselho · Maio 2026";

function SlideFooter({ children = FOOTER }: { children?: React.ReactNode }) {
  return (
    <div className="absolute left-[60px] bottom-[80px] font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--silver-dark)]">
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

/* ==================== SLIDE 01 — CAPA (com parallax anatomia) ==================== */
function LogoAnatomyParallax({
  variant = "full",
}: {
  variant?: "full" | "left-panel";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [auto, setAuto] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setMouse({ x: nx, y: ny }));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Float automático contínuo — garante que o parallax respira mesmo sem mouse
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const s = (t - start) / 1000;
      setAuto({ x: Math.sin(s * 0.5) * 0.15, y: Math.cos(s * 0.4) * 0.12 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const px = mouse.x + auto.x;
  const py = mouse.y + auto.y;

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(${px * depth}px, ${py * depth}px, 0)`,
    willChange: "transform",
  });

  const mono = "font-mono text-[10px] tracking-[0.3em] uppercase";

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Layer 1 — grade muito sutil */}
      <div className="absolute inset-0 opacity-[0.06]" style={layer(8)}>
        <div className="absolute inset-0" style={{
          backgroundImage:
            "linear-gradient(to right, var(--silver) 1px, transparent 1px), linear-gradient(to bottom, var(--silver) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }} />
      </div>

      {/* Layer 2 — Wordmark NEXUS gigante */}
      <div className="absolute inset-0 flex items-center justify-center" style={layer(28)}>
        <div className="relative">
          <div className="absolute -left-[34px] top-[14px] bottom-[34px] w-[3px] bg-[var(--green)] opacity-70" />
          <div
            className="font-display font-extralight leading-none text-[var(--white-warm)]/[0.18]"
            style={{ fontSize: variant === "left-panel" ? "320px" : "520px", letterSpacing: "-0.025em" }}
          >
            NEXUS
          </div>
          <div className="absolute -left-[34px] -bottom-[14px] right-[20%] flex items-center gap-[1px]">
            <div className="h-[3px] flex-1 bg-[var(--green)] opacity-70" />
            <div className="h-[3px] w-[30%] bg-[var(--silver)] opacity-40" />
          </div>
          <div className={`${mono} mt-6 ml-1 text-[var(--silver-dark)]/60`} style={{ letterSpacing: "0.35em", fontSize: variant === "left-panel" ? "14px" : "22px" }}>
            NOSSO JEITO DE SER
          </div>
        </div>
      </div>

      {/* Layer 3 — anotações tipográficas */}
      <div className="absolute inset-0" style={layer(46)}>
        <div className="absolute" style={{ top: "20%", left: "18%" }}>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-[90px] bg-[var(--green)]/50" />
            <div className={`${mono} text-[var(--green)]/70`}>Barra de chegada · Verde Newe</div>
          </div>
        </div>
        <div className="absolute" style={{ top: "34%", right: "10%" }}>
          <div className="flex items-center gap-3 justify-end">
            <div className={`${mono} text-[var(--green)]/70`}>Plus Jakarta Sans 200 · −0.025em</div>
            <div className="h-[1px] w-[110px] bg-[var(--green)]/50" />
          </div>
        </div>
        <div className="absolute" style={{ bottom: "32%", right: "14%" }}>
          <div className="flex items-center gap-3 justify-end">
            <div className={`${mono} text-[var(--green)]/70`}>Space Mono · 0.3em · Verde Newe</div>
            <div className="h-[1px] w-[80px] bg-[var(--green)]/50" />
          </div>
        </div>
        <div className="absolute" style={{ bottom: "22%", right: "8%" }}>
          <div className="flex items-center gap-3 justify-end">
            <div className={`${mono} text-[var(--silver)]/60`}>Régua de chegada · Verde + Prata</div>
            <div className="h-[1px] w-[140px]" style={{ background: "linear-gradient(to right, var(--green), var(--silver))", opacity: 0.55 }} />
          </div>
        </div>
        <div className="absolute" style={{ bottom: "18%", left: "10%" }}>
          <div className="flex items-center gap-3">
            <div className="w-[10px] h-[10px] border border-[var(--green)]/60" />
            <div className={`${mono} text-[var(--silver-dark)]/70`}>Anatomia do símbolo</div>
          </div>
        </div>
      </div>

      {/* Layer 4 — cruzes de medida */}
      <div className="absolute inset-0" style={layer(70)}>
        {[
          { t: "12%", l: "12%" },
          { t: "16%", l: "78%" },
          { t: "72%", l: "20%" },
          { t: "78%", l: "84%" },
          { t: "44%", l: "6%" },
        ].map((s, i) => (
          <div key={i} className="absolute" style={{ top: s.t, left: s.l }}>
            <div className="relative w-[14px] h-[14px]">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--green)]/60" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--green)]/60" />
            </div>
          </div>
        ))}
      </div>

      {/* Vinheta — leve, só para legibilidade do bloco de texto */}
      <div className="absolute inset-0" style={{
        background: variant === "left-panel"
          ? "radial-gradient(ellipse at 35% 50%, rgba(28,28,28,0.35) 0%, rgba(28,28,28,0.15) 55%, rgba(28,28,28,0) 100%)"
          : "radial-gradient(ellipse at 25% 50%, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 38%, rgba(10,10,10,0.25) 70%, rgba(10,10,10,0) 100%)",
      }} />
    </div>
  );
}

function Slide01() {
  const stats = [
    { value: "10", label: "PRODUTOS DIGITAIS" },
    { value: "5", label: "MÓDULOS ESTRATÉGICOS" },
    { value: "R$ 3,3M+", label: "ECONOMIA ANUAL EST.", green: true },
    { value: "100%", label: "PROPRIEDADE INTELECTUAL" },
  ];
  return (
    <div className="relative w-full h-full bg-[var(--black)] overflow-hidden">
      <LogoAnatomyParallax />

      <div className="slide-content active relative h-full px-[80px] flex flex-col justify-center max-w-[1100px] z-10">
        <div className="w-[2px] h-[60px] bg-[var(--green)] mb-8" />
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--green)] mb-10">
          SISTEMA OPERACIONAL DA CULTURA · 5 MÓDULOS · 10 PRODUTOS
        </div>
        <h1 className="relative leading-none">
          <span className="sr-only">Nexus</span>
          <span
            aria-hidden
            className="font-display inline-flex items-stretch leading-[0.85] nexus-wordmark"
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 200,
              fontSize: "clamp(96px, 22vw, 360px)",
              letterSpacing: "-0.04em",
              color: "#F7F6F4",
              textShadow: "0 0 80px rgba(157,202,121,0.15)",
              position: "relative",
              paddingLeft: "0",
            }}
          >
            <span
              aria-hidden
              className="nexus-bar"
              style={{
                position: "absolute",
                left: "0.07em",
                top: "0.16em",
                height: "0.68em",
                width: "0.05em",
                backgroundColor: "#9DCA79",
              }}
            />
            <span className="nexus-letter" style={{ ["--i" as never]: 0 } as React.CSSProperties}>N</span>
            <span className="nexus-letter" style={{ ["--i" as never]: 1 } as React.CSSProperties}>E</span>
            <span className="nexus-letter" style={{ ["--i" as never]: 2, color: "#9DCA79" } as React.CSSProperties}>X</span>
            <span className="nexus-letter" style={{ ["--i" as never]: 3 } as React.CSSProperties}>U</span>
            <span className="nexus-letter" style={{ ["--i" as never]: 4 } as React.CSSProperties}>S</span>
            <span className="nexus-spark" aria-hidden />
          </span>
        </h1>
        <div
          className="font-display font-extralight mt-6"
          style={{ fontSize: "clamp(24px, 2.6vw, 34px)", color: "var(--green)", letterSpacing: "-0.02em" }}
        >
          O Nexus não é uma plataforma.<br />É a prova de que a cultura pode ser arquitetada.
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--graphite)] grid grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-display font-extralight leading-none"
                style={{ fontSize: "48px", color: s.green ? "var(--green)" : "var(--white-warm)" }}
              >
                {s.value}
              </div>
              <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--silver-dark)] leading-relaxed">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SlideFooter />
    </div>
  );
}

/* ==================== SLIDE 02 — TESE ==================== */
function Slide02() {
  const blocks = [
    { n: "01", k: "PROBLEMA", t: "Cultura sem arquitetura se dissipa", b: "Toda empresa de alto padrão declara valores. Poucas os materializam em sistemas vivos. Sem infraestrutura digital própria, cultura vira discurso de corredor — bonita no onboarding, invisível no dia a dia." },
    { n: "02", k: "SOLUÇÃO", t: "Produto como linguagem cultural", b: "O Nexus converte o \u201CNosso Jeito de Ser\u201D em 10 produtos digitais operáveis. Cada ferramenta é simultaneamente funcional e simbólica — comunica quem somos enquanto resolve um problema real." },
    { n: "03", k: "VANTAGEM", t: "Propriedade que não se terceiriza", b: "Enquanto concorrentes pagam mensalidades a SAPs, Salesforces e Workdays, a Hyndra/Newe detém a propriedade intelectual de toda sua stack cultural. Customização total, custo marginal." },
    { n: "04", k: "ESCALA", t: "Do grupo para o setor", b: "Nenhuma incorporadora de alto padrão no Brasil opera com esta densidade de produto cultural próprio. O Nexus posiciona o grupo como referência de gestão humanista no real estate premium." },
  ];
  return (
    <div className="relative w-full h-full bg-[var(--black)] px-[80px] py-[80px] flex">
      <div className="slide-content active w-full grid grid-cols-[40%_60%] gap-16 items-center">
        {/* Left panel — tom mais claro + parallax da anatomia da logo */}
        <div
          className="relative h-full flex flex-col justify-center overflow-hidden rounded-sm"
          style={{
            background:
              "linear-gradient(135deg, #2a2a2a 0%, #232323 55%, #1c1c1c 100%)",
            boxShadow: "inset 0 0 0 1px rgba(192,192,192,0.06)",
          }}
        >
          <LogoAnatomyParallax variant="left-panel" />
          <div className="relative z-10 px-10 py-12">
            <Eyebrow>A TESE ESTRATÉGICA</Eyebrow>
            <h2
              className="mt-8 font-display font-extralight text-[var(--white-warm)]"
              style={{ fontSize: "clamp(38px, 4vw, 54px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Por que o<br />Nexus existe.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {blocks.map((b) => (
            <div key={b.n} className="bg-[var(--graphite-deep)] border-l-2 border-[var(--green)] p-7">
              <div className="font-mono text-[9px] text-[var(--green)] tracking-[0.2em] uppercase">
                {b.n} · {b.k}
              </div>
              <div className="mt-3 font-display font-extralight text-[18px] text-[var(--white-warm)] leading-snug">
                {b.t}
              </div>
              <p className="mt-4 text-[13px] text-[var(--silver)] leading-[1.6] font-light">{b.b}</p>
            </div>
          ))}
        </div>
      </div>
      <SlideFooter />
    </div>
  );
}

/* ==================== SLIDE 03 — ARQUITETURA ==================== */
function NexusBlueprintParallax() {
  const { ref, layer } = useParallax();
  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grade de blueprint */}
      <div className="absolute inset-0 opacity-[0.07]" style={layer(6)}>
        <div className="absolute inset-0" style={{
          backgroundImage:
            "linear-gradient(to right, #9DCA79 1px, transparent 1px), linear-gradient(to bottom, #9DCA79 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
      </div>
      {/* Eixos centrais */}
      <div className="absolute inset-0" style={layer(10)}>
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "rgba(157,202,121,0.18)" }} />
        <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: "rgba(157,202,121,0.12)" }} />
      </div>
      {/* SVG blueprint da arquitetura NEXUS */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid meet"
        style={{ ...layer(18), opacity: 0.55 }}
      >
        {/* Núcleo NEXUS */}
        <circle cx="800" cy="320" r="110" fill="none" stroke="#9DCA79" strokeWidth="1" strokeDasharray="700" className="bp-draw" style={{ animationDelay: "0s" }} />
        <circle cx="800" cy="320" r="70" fill="none" stroke="rgba(192,192,192,0.35)" strokeWidth="0.8" strokeDasharray="440" className="bp-draw" style={{ animationDelay: "0.2s" }} />
        <text x="800" y="328" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontWeight="200" fontSize="42" fill="rgba(247,246,244,0.55)" letterSpacing="-1">NEXUS</text>
        {/* Linhas que descem para os 5 módulos sustentando o sistema */}
        {[240, 520, 800, 1080, 1360].map((x, i) => (
          <g key={i}>
            <line x1="800" y1="430" x2={x} y2="640" stroke="#9DCA79" strokeWidth="0.8" strokeOpacity="0.45" strokeDasharray="380" className="bp-draw" style={{ animationDelay: `${0.3 + i * 0.08}s` }} />
            <rect x={x - 70} y="640" width="140" height="120" fill="none" stroke="rgba(192,192,192,0.4)" strokeWidth="0.8" strokeDasharray="520" className="bp-draw" style={{ animationDelay: `${0.5 + i * 0.08}s` }} />
            <text x={x} y="710" textAnchor="middle" fontFamily="Space Mono" fontSize="11" fill="rgba(157,202,121,0.7)" letterSpacing="2">MÓDULO {String(i + 1).padStart(2, "0")}</text>
          </g>
        ))}
        {/* Cotas */}
        <line x1="80" y1="320" x2="690" y2="320" stroke="rgba(192,192,192,0.2)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="910" y1="320" x2="1520" y2="320" stroke="rgba(192,192,192,0.2)" strokeWidth="0.5" strokeDasharray="4 4" />
        <text x="100" y="310" fontFamily="Space Mono" fontSize="10" fill="rgba(157,202,121,0.55)" letterSpacing="2">ARQUITETURA · SUSTENTADA POR 5 PILARES</text>
      </svg>
      {/* Vinheta */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.5) 80%, rgba(10,10,10,0.85) 100%)",
      }} />
    </div>
  );
}

const ModuleIcon = ({ kind }: { kind: string }) => {
  // Cada ícone usa stroke-dashoffset para "ser desenhado" simultaneamente
  const common = {
    fill: "none",
    stroke: "#9DCA79",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 nx-icon-wrap" aria-hidden>
      <g className="nx-icon-glow">
        {kind === "01" && (
          <>
            <circle cx="32" cy="32" r="20" {...common} pathLength={1} className="nx-draw" />
            <circle cx="32" cy="32" r="10" {...common} pathLength={1} className="nx-draw" />
            <circle cx="32" cy="32" r="2.5" fill="#9DCA79" />
          </>
        )}
        {kind === "02" && (
          <>
            <circle cx="22" cy="24" r="6" {...common} pathLength={1} className="nx-draw" />
            <circle cx="42" cy="24" r="6" {...common} pathLength={1} className="nx-draw" />
            <path d="M10 50 C 14 38, 30 38, 32 50" {...common} pathLength={1} className="nx-draw" />
            <path d="M32 50 C 34 38, 50 38, 54 50" {...common} pathLength={1} className="nx-draw" />
          </>
        )}
        {kind === "03" && (
          <>
            <path d="M12 18 L32 12 L52 18 L32 24 Z" {...common} pathLength={1} className="nx-draw" />
            <path d="M12 18 L12 44 L32 50 L52 44 L52 18" {...common} pathLength={1} className="nx-draw" />
            <path d="M32 24 L32 50" {...common} pathLength={1} className="nx-draw" />
          </>
        )}
        {kind === "04" && (
          <>
            <circle cx="20" cy="22" r="5" {...common} pathLength={1} className="nx-draw" />
            <circle cx="44" cy="22" r="5" {...common} pathLength={1} className="nx-draw" />
            <circle cx="32" cy="44" r="5" {...common} pathLength={1} className="nx-draw" />
            <path d="M22 26 L30 40 M42 26 L34 40 M25 22 L39 22" {...common} pathLength={1} className="nx-draw" />
          </>
        )}
        {kind === "05" && (
          <>
            <path d="M32 10 L52 18 L52 32 C52 44 42 52 32 56 C22 52 12 44 12 32 L12 18 Z" {...common} pathLength={1} className="nx-draw" />
            <path d="M24 32 L30 38 L42 26" {...common} pathLength={1} className="nx-draw" />
          </>
        )}
      </g>
    </svg>
  );
};

function Slide03() {
  return (
    <div className="relative w-full h-full bg-[var(--black)] px-[80px] py-[80px] flex flex-col overflow-hidden">
      <NexusBlueprintParallax />
      <div className="slide-content active flex-1 flex flex-col relative z-10">
        <Eyebrow>ARQUITETURA DO SISTEMA</Eyebrow>
        <h2
          className="mt-6 font-display font-extralight text-[var(--white-warm)]"
          style={{ fontSize: "clamp(38px, 4vw, 54px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
        >
          5 módulos. 10 produtos.
        </h2>

        <div className="mt-16 grid grid-cols-5 gap-0 border-t border-[var(--graphite)]">
          {modules.map((m) => (
            <div
              key={m.n}
              className="group border-r last:border-r-0 border-[var(--graphite)] p-7 h-[300px] flex flex-col justify-between relative hover:bg-[var(--graphite-deep)] transition-colors"
            >
              <div>
                <div className="font-mono text-[9px] text-[var(--green)] tracking-[0.2em] uppercase">
                  Módulo {m.n}
                </div>
                <div className="mt-5">
                  <ModuleIcon kind={m.n} />
                </div>
                <div className="mt-5 font-display font-extralight text-[28px] text-[var(--white-warm)] leading-tight">
                  {m.name}
                </div>
              </div>
              <div className="font-mono text-[9px] text-[var(--silver-dark)] leading-relaxed">{m.desc}</div>
              <div
                className="absolute left-0 right-0 bottom-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(90deg, #9DCA79, transparent)" }}
              />
            </div>
          ))}
        </div>
      </div>
      <SlideFooter />
    </div>
  );
}


/* ==================== SLIDES 04-13 — PRODUTOS ==================== */
const MAX_SAVING = Math.max(...products.map((p) => p.savingsValue));

function ProductSlide({ p, idx }: { p: Product; idx: number }) {
  const pct = (p.savingsValue / MAX_SAVING) * 100;
  return (
    <div className="relative w-full h-full bg-[var(--black)] flex flex-col overflow-hidden">
      {/* Main 55 / 45 grid */}
      <div className="flex-1 min-h-0 grid grid-cols-[55%_45%] relative">


        {/* LEFT — textual content */}
        <div className="slide-content active relative px-[80px] py-[60px] flex flex-col gap-7 z-10">
          <Eyebrow>
            MÓDULO {p.moduleN} · {p.module.toUpperCase()} · PRODUTO {String(idx + 1).padStart(2, "0")}/10
          </Eyebrow>

          <div>
            <h2
              className="font-display font-extralight text-[var(--white-warm)] leading-[1.02]"
              style={{ fontSize: "clamp(34px, 3.6vw, 52px)", letterSpacing: "-0.03em" }}
            >
              {p.name}
            </h2>
            <div className="mt-4 font-mono text-[10px] text-[var(--green)] uppercase tracking-[0.2em]">
              ALT: {p.alt}
            </div>
          </div>

          <div
            className="p-5"
            style={{
              background: "rgba(157,202,121,0.06)",
              border: "1px solid rgba(157,202,121,0.2)",
            }}
          >
            <div className="font-mono text-[8px] text-[var(--green)] uppercase tracking-[0.2em]">
              TENSÃO CULTURAL
            </div>
            <p className="mt-2 font-serif italic text-[16px] text-[var(--white-warm)] leading-[1.4]">
              {p.tension}
            </p>
          </div>

          <div className="bg-[var(--graphite-deep)] p-6 flex-1 min-h-0">
            {[
              { l: "CONCEITO", v: p.concept },
              { l: "OBJETIVO", v: p.objective },
              { l: "JUSTIFICATIVA", v: p.rationale },
            ].map((f, i, arr) => (
              <div
                key={f.l}
                className={`py-3 ${i < arr.length - 1 ? "border-b border-[var(--graphite)]" : ""} ${i === 0 ? "pt-0" : ""}`}
              >
                <div className="font-mono text-[8px] text-[var(--silver-dark)] uppercase tracking-[0.18em]">
                  {f.l}
                </div>
                <p className="mt-1.5 text-[12.5px] text-[var(--silver)] leading-[1.55] font-light">{f.v}</p>
              </div>
            ))}
          </div>

          <div className="bg-[var(--graphite-deep)] p-5">
            <div className="font-mono text-[8px] text-[var(--silver-dark)] uppercase tracking-[0.18em]">
              EQUIVALENTE DE MERCADO
            </div>
            <div className="mt-2 font-display text-[13px] text-[var(--white-warm)]">{p.market}</div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[
                { l: "IMPLANT.", v: p.implant },
                { l: "MENSAL.", v: p.monthly },
                { l: "NEXUS", v: p.nexus },
              ].map((c) => (
                <div key={c.l}>
                  <div className="font-mono text-[8px] text-[var(--silver-dark)] uppercase tracking-[0.18em]">
                    {c.l}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-[var(--white-warm)]">{c.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — editorial photo (ou parallax para All Aboard) */}
        <div className="slide-foto relative overflow-hidden">
          {p.name === "All Aboard" ? (
            <AllAboardParallax />
          ) : p.name === "PAR 2026" ? (
            <PAR2026Parallax />
          ) : p.name === "Academia de Líderes Newe" ? (
            <AcademiaLideresParallax />
          ) : p.name === "Nosso Jeito de Ser" ? (
            <StarrySkyParallax />
          ) : p.name === "Academia de Vendas Newe" ? (
            <AcademiaVendasParallax />
          ) : p.name === "HYNstaNewe" ? (
            <HynstaNeweParallax />
          ) : p.name === "Habitar a Estrutura" ? (
            <HabitarEstruturaParallax />
          ) : p.name === "Plataforma de Marca" ? (
            <PlataformaMarcaParallax />
          ) : p.name === "HUB Hyndra" ? (
            <HubHyndraParallax />
          ) : (



            <>
              <img
                src={p.image}
                alt=""
                data-modulo={p.moduleSlug}
                onError={(e) => {
                  const el = e.currentTarget;
                  const fb = FALLBACK_IMAGES[p.moduleSlug];
                  if (fb && el.src !== fb) el.src = fb;
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.12) 20%, rgba(10,10,10,0.05) 60%, rgba(10,10,10,0) 100%)",
                }}
              />
              <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.2) 100%)",
                }}
              />
            </>
          )}
          <div
            className="absolute z-[2] font-serif italic"
            style={{
              bottom: "28px",
              right: "28px",
              fontSize: "12px",
              color: "rgba(247,246,244,0.5)",
              letterSpacing: "0.02em",
              maxWidth: "220px",
              textAlign: "right",
              lineHeight: 1.5,
            }}
          >
            {p.caption}
          </div>
        </div>
      </div>

      {/* Bottom savings bar — full width */}
      <div className="bg-[var(--graphite-deep)] px-[80px] py-4 flex items-center gap-8 border-t border-[var(--graphite)] relative z-10">
        <div className="font-mono text-[8px] text-[var(--silver-dark)] uppercase tracking-[0.2em] whitespace-nowrap">
          ECONOMIA ESTIMADA · 2 ANOS VS. MERCADO
        </div>
        <div className="flex-1 h-[3px] bg-[var(--graphite)] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--green)]"
            style={{ width: `${pct}%`, transition: "width 600ms ease" }}
          />
        </div>
        <div className="flex flex-col items-end">
          <div className="font-mono font-bold text-[18px] text-[var(--green)] whitespace-nowrap">
            {p.savings}
          </div>
          <div className="font-mono text-[7px] text-[var(--silver-dark)] tracking-[0.08em] mt-0.5">
            vs. mercado · faixa estimada 2024–2026
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== SLIDE 14 — FINANCEIRO ==================== */
function Slide14() {
  const totalImplant = "R$ 1,0M";
  const totalMonthly2y = "R$ 2,1M";
  const totalSavings = "R$ 3,4M+";
  const totalNexus = "R$ 9,4k";

  const sum2y = (impl: string, monthly: string) => {
    const i = parseFloat(impl.replace(/[^\d,]/g, "").replace(",", "."));
    const m = parseFloat(monthly.replace(/[^\d,]/g, "").replace(",", "."));
    return `R$ ${(i + m * 24).toFixed(0)}k`;
  };

  return (
    <div className="relative w-full h-full bg-[var(--graphite-deep)] px-[80px] py-[60px] flex flex-col overflow-hidden">
      <div className="slide-content active flex-1 flex flex-col min-h-0">
        <Eyebrow>ANÁLISE FINANCEIRA</Eyebrow>
        <h2
          className="mt-5 font-display font-extralight text-[var(--white-warm)]"
          style={{ fontSize: "clamp(34px, 3.5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
        >
          O que o Nexus economiza ao grupo.
        </h2>

        <div className="mt-8 grid grid-cols-3 gap-5">
          {[
            { l: "CUSTO DE MERCADO · 10 PRODUTOS · ANO 1", v: totalImplant, sub: "Implantação + licenças + manutenção" },
            { l: "CUSTO RECORRENTE DE MERCADO · ANO 2+", v: totalMonthly2y, sub: "Apenas licenças + manutenção anual" },
          ].map((b) => (
            <div key={b.l} className="bg-[var(--black)] border border-[var(--graphite)] p-6">
              <div className="font-mono text-[8px] text-[var(--silver-dark)] uppercase tracking-[0.18em]">{b.l}</div>
              <div className="mt-4 font-display font-extralight text-[44px] text-[var(--white-warm)] leading-none">
                {b.v}
              </div>
              <div className="mt-3 font-mono text-[9px] text-[var(--silver-dark)]">{b.sub}</div>
            </div>
          ))}
          <div
            className="p-6"
            style={{
              border: "1px solid var(--green)",
              background: "rgba(157,202,121,0.06)",
            }}
          >
            <div className="font-mono text-[8px] text-[var(--green)] uppercase tracking-[0.18em]">
              ECONOMIA ESTIMADA · PRIMEIRO CICLO (2 ANOS)
            </div>
            <div
              className="mt-4 font-display font-extralight leading-none"
              style={{ fontSize: "52px", color: "var(--green)" }}
            >
              {totalSavings}
            </div>
            <div className="mt-2 font-mono text-[9px] text-[var(--silver)]">
              Custo real Nexus: <span style={{ color: "var(--green)" }}>{totalNexus}</span>
            </div>
            <div className="mt-1 font-mono text-[9px] text-[var(--silver-dark)]">
              Vs. R$ 3,4M em plataformas de mercado equivalentes
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-7 flex-1 min-h-0 overflow-auto no-scrollbar bg-[var(--black)] border border-[var(--graphite)]">
          <table className="w-full font-mono text-[10px] text-[var(--silver)]">
            <thead className="text-[var(--silver-dark)] uppercase tracking-[0.15em]">
              <tr className="border-b border-[var(--graphite)]">
                {["PRODUTO", "EQUIVALENTE", "IMPLANT.", "MENSAL.", "CUSTO 2 ANOS", "NEXUS*", "ECONOMIA"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[8px] font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.n}
                  className="border-b border-[var(--graphite)] hover:bg-[rgba(157,202,121,0.02)] transition-colors"
                >
                  <td className="px-4 py-2.5 text-[var(--white-warm)]">{p.name}</td>
                  <td className="px-4 py-2.5">{p.market}</td>
                  <td className="px-4 py-2.5">{p.implant}</td>
                  <td className="px-4 py-2.5">{p.monthly}</td>
                  <td className="px-4 py-2.5">{sum2y(p.implant, p.monthly)}</td>
                  <td className="px-4 py-2.5">{p.nexus}</td>
                  <td className="px-4 py-2.5 font-bold text-[11px] text-[var(--green)]">{p.savings}</td>
                </tr>
              ))}
            </tbody>
            <tfoot style={{ borderTop: "1px solid var(--green)" }}>
              <tr>
                <td colSpan={6} className="px-4 py-3 text-right uppercase tracking-[0.15em] text-[var(--silver-dark)] text-[9px]">
                  TOTAL ECONOMIA
                </td>
                <td className="px-4 py-3 font-bold text-[16px] text-[var(--green)]">{totalSavings}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-3 font-mono text-[7px] text-[var(--silver-dark)] leading-relaxed">
          * Valores calculados para 2 anos. Custo Nexus estimado via Lovable + manutenção incremental. Referências públicas 2024–2026.
        </div>
      </div>
    </div>
  );
}

/* ==================== SLIDE 15 — NOMES ALT ==================== */
const BRAND_SHEETS: Record<string, {
  tagline: string;
  anchor: string;
  palette: [string, string, string, string];
  voz: string;
  palavras: [string, string, string];
  ref: string;
}> = {
  CODEX: { tagline: "A lei que nos forma", anchor: "#C9B46E", palette: ["#1A1A2E", "#C9B46E", "#2D2D4A", "#F0EAD6"], voz: "Declarativa. Sem eufemismos. Tom de carta magna.", palavras: ["FUNDANTE", "SOBERANO", "INSCRITO"], ref: "The Economist · Constituição Federal" },
  "RITO DE CHEGADA": { tagline: "Entrada que marca", anchor: "#8FBC8F", palette: ["#2C5F2E", "#8FBC8F", "#F4F0E6", "#1C3A1E"], voz: "Acolhedora mas não infantil. Guia experiente.", palavras: ["TRAVESSIA", "LIMIAR", "PERTENCIMENTO"], ref: "National Geographic · Cerimônia minimalista" },
  "MOTOR DE MERECIMENTO": { tagline: "Equidade como sistema", anchor: "#FFD700", palette: ["#8B1A1A", "#FFD700", "#2A2A2A", "#F5F5F0"], voz: "Direta. Movida por critério. Tom de árbitro justo.", palavras: ["MÉRITO", "CRITÉRIO", "IMPACTO"], ref: "Bloomberg Terminal · Alto rendimento" },
  "MESA DE DECISÃO": { tagline: "Poder com clareza", anchor: "#778DA9", palette: ["#0D1B2A", "#E8D5B7", "#415A77", "#778DA9"], voz: "Contida. Precisa. Brief executivo de alto nível.", palavras: ["DELIBERAÇÃO", "PROTOCOLO", "CONSEQUÊNCIA"], ref: "McKinsey deck · Sala de conselho" },
  FORJA: { tagline: "Transformação, não formação", anchor: "#FF8C42", palette: ["#3D1C02", "#FF8C42", "#F5C518", "#1A0A00"], voz: "Intensa. Mentor que não aceita mediocridade.", palavras: ["PRESSÃO", "TÊMPERA", "TRANSFORMAÇÃO"], ref: "Nike Training · Industrial premium" },
  "ESCOLA DO COMPRADOR": { tagline: "Entender antes de vender", anchor: "#BDC3C7", palette: ["#2C3E50", "#BDC3C7", "#E8E8E8", "#1A252F"], voz: "Sofisticada. Observacional. Curador de experiências.", palavras: ["PERCEPÇÃO", "DESEJO", "CURADORIA"], ref: "Monocle Magazine · Sommelier de luxo" },
  "ALMANAQUE VIVO": { tagline: "Memória que respira", anchor: "#9B88D4", palette: ["#4A4A8A", "#E8E4FF", "#9B88D4", "#1E1E3F"], voz: "Reflexiva. Tom de editor de arquivo cultural.", palavras: ["REGISTRO", "ACERVO", "CONTINUIDADE"], ref: "Criterion Collection · Anuário centenário" },
  "TOPOGRAFIA HUMANA": { tagline: "Organograma como território", anchor: "#95D5B2", palette: ["#1B4332", "#95D5B2", "#D8F3DC", "#081C15"], voz: "Cartográfica. Descritiva. Guia de terreno.", palavras: ["TERRITÓRIO", "NÓ", "ADJACÊNCIA"], ref: "Infografia NYT · Cartografia arquitetural" },
  "GRAMÁTICA VIVA": { tagline: "Marca como língua", anchor: "#E8B4E8", palette: ["#5C1A5C", "#E8B4E8", "#B56AB5", "#2E002E"], voz: "Prescritiva mas elegante. Manual de estilo de luxo.", palavras: ["VOCABULÁRIO", "SINTAXE", "VOZ"], ref: "Pentagram · The Guardian style guide" },
  "CONSTITUIÇÃO DO GRUPO": { tagline: "Carta magna institucional", anchor: "#C8A951", palette: ["#1C1C1C", "#C8A951", "#3D3D3D", "#F8F5EE"], voz: "Solene. Definitiva. Não admite ambiguidade.", palavras: ["ESTATUTO", "VIGÊNCIA", "MANDATO"], ref: "The Economist · Arquivo do STF" },
};

function BrandSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono uppercase"
      style={{ fontSize: 8, letterSpacing: "0.15em", color: "#6B8C3E" }}
    >
      {children}
    </div>
  );
}

function Slide15() {
  return (
    <div className="relative w-full h-full bg-[var(--black)] px-[80px] py-[50px] flex flex-col overflow-hidden">
      <div className="slide-content active flex-1 flex flex-col min-h-0">
        <Eyebrow>NOMES ALTERNATIVOS · PROVOCAÇÃO ESTRATÉGICA</Eyebrow>
        <h2
          className="mt-4 font-display font-extralight text-[var(--white-warm)]"
          style={{ fontSize: "clamp(30px, 3vw, 42px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
        >
          Nomes que incomodam bem.
        </h2>
        <p className="mt-3 font-serif italic text-[15px] text-[var(--silver)] max-w-[700px] leading-[1.45]">
          “Um nome estratégico não é apenas bonito — é uma declaração de intenção. As opções abaixo provocam se os nomes atuais comunicam o que cada produto faz.”
        </p>

        <div className="mt-5 grid grid-cols-5 grid-rows-2 gap-3 flex-1 min-h-0">
          {altNames.map((a) => {
            const sheet = BRAND_SHEETS[a.alt];
            if (!sheet) return null;
            const dividerStyle = { background: "rgba(255,255,255,0.06)" } as const;
            return (
              <div
                key={a.current}
                className="relative bg-[#1A1C14] border border-[var(--graphite)] flex flex-col overflow-hidden"
                style={{ padding: "12px 11px 11px" }}
              >
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: 3, background: sheet.anchor }}
                />

                <div
                  className="font-display font-light text-[var(--white-warm)] leading-tight"
                  style={{ fontSize: 11, marginTop: 2 }}
                >
                  {a.current}
                </div>

                <div
                  className="font-mono font-bold uppercase mt-1"
                  style={{ fontSize: 12, letterSpacing: "0.08em", color: "#9DCA79", lineHeight: 1.15 }}
                >
                  {a.alt}
                </div>

                <div
                  className="font-serif italic mt-1"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", lineHeight: 1.3 }}
                >
                  {sheet.tagline}
                </div>

                <p
                  className="font-light mt-2"
                  style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.45 }}
                >
                  {a.rationale}
                </p>

                <div className="h-px w-full my-2" style={dividerStyle} />

                <BrandSectionLabel>PALETA</BrandSectionLabel>
                <div className="flex items-center gap-1 mt-1">
                  {sheet.palette.map((c, i) => (
                    <span
                      key={i}
                      style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }}
                    />
                  ))}
                </div>

                <div className="h-px w-full my-2" style={dividerStyle} />

                <BrandSectionLabel>VOZ</BrandSectionLabel>
                <div
                  className="font-serif italic mt-0.5"
                  style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", lineHeight: 1.35 }}
                >
                  {sheet.voz}
                </div>

                <div className="h-px w-full my-2" style={dividerStyle} />

                <div className="flex flex-wrap gap-1">
                  {sheet.palavras.map((w) => (
                    <span
                      key={w}
                      className="font-mono uppercase"
                      style={{
                        fontSize: 8,
                        letterSpacing: "0.08em",
                        border: `0.5px solid ${sheet.anchor}`,
                        color: sheet.anchor,
                        padding: "2px 5px",
                        borderRadius: 0,
                        lineHeight: 1,
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>

                <div className="h-px w-full my-2" style={dividerStyle} />

                <BrandSectionLabel>REF</BrandSectionLabel>
                <div
                  className="font-mono mt-0.5"
                  style={{ fontSize: 8.5, color: "rgba(255,255,255,0.32)", lineHeight: 1.3 }}
                >
                  {sheet.ref}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ==================== SLIDE 16 — ENCERRAMENTO ==================== */
function Slide16() {
  return (
    <div className="relative w-full h-full bg-[var(--black)] flex flex-col items-center justify-center px-[80px]">
      <div className="slide-content active flex flex-col items-center text-center">
        <div className="w-[1px] h-[80px] bg-[var(--green)] mb-10" />
        <blockquote
          className="font-serif italic font-light text-[var(--silver)] max-w-[700px]"
          style={{ fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.5 }}
        >
          “A Newe não acredita em fórmulas.<br />
          Acredita em projeto —<br />
          com método, estética e responsabilidade.”
        </blockquote>
        <div className="mt-10 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--silver-dark)]">
          NOSSO JEITO DE SER · HYNDRA GROUP
        </div>
        <div
          className="mt-12 w-[80px] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, #9DCA79, transparent)" }}
        />
        <div className="mt-12 font-display font-extralight text-[15px] text-[var(--silver-dark)] tracking-[0.05em] max-w-[600px]">
          O Nexus não é uma plataforma. É a prova de que a cultura pode ser arquitetada.
        </div>
      </div>
      <SlideFooter>
        Marlon Silva · Head de Pessoas e Cultura · Hyndra | Newe · Maio 2026
      </SlideFooter>
    </div>
  );
}

/* ==================== REGISTRY ==================== */
/* ==================== SLIDE — OS 10 PRODUTOS DO SISTEMA (grid 5x2) ==================== */
const PRODUTOS_GRID = [
  { n: "01", orig: "Nosso Jeito de Ser",       alt: "CODEX",                 anchor: "#C9B46E", palette: ["#1A1A2E","#C9B46E","#2D2D4A","#F0EAD6"], tagline: "A lei que nos forma",            pills: ["FUNDANTE","SOBERANO","INSCRITO"] },
  { n: "02", orig: "All Aboard",                alt: "RITO DE CHEGADA",       anchor: "#8FBC8F", palette: ["#2C5F2E","#8FBC8F","#F4F0E6","#1C3A1E"], tagline: "Entrada que marca",              pills: ["TRAVESSIA","LIMIAR","PERTENCIMENTO"] },
  { n: "03", orig: "PAR 2026",                  alt: "MOTOR DE MERECIMENTO",  anchor: "#FFD700", palette: ["#8B1A1A","#FFD700","#2A2A2A","#F5F5F0"], tagline: "Equidade como sistema",          pills: ["MÉRITO","CRITÉRIO","IMPACTO"] },
  { n: "04", orig: "Decidir com Intenção",      alt: "MESA DE DECISÃO",       anchor: "#778DA9", palette: ["#0D1B2A","#E8D5B7","#415A77","#778DA9"], tagline: "Poder com clareza",              pills: ["DELIBERAÇÃO","PROTOCOLO","CONSEQUÊNCIA"] },
  { n: "05", orig: "Academia de Líderes Newe",  alt: "FORJA",                 anchor: "#FF8C42", palette: ["#3D1C02","#FF8C42","#F5C518","#1A0A00"], tagline: "Transformação, não formação",    pills: ["PRESSÃO","TÊMPERA","TRANSFORMAÇÃO"] },
  { n: "06", orig: "Academia de Vendas Newe",   alt: "ESCOLA DO COMPRADOR",   anchor: "#BDC3C7", palette: ["#2C3E50","#BDC3C7","#E8E8E8","#1A252F"], tagline: "Entender antes de vender",       pills: ["PERCEPÇÃO","DESEJO","CURADORIA"] },
  { n: "07", orig: "HYNstaNewe",                alt: "ALMANAQUE VIVO",        anchor: "#9B88D4", palette: ["#4A4A8A","#E8E4FF","#9B88D4","#1E1E3F"], tagline: "Memória que respira",            pills: ["REGISTRO","ACERVO","CONTINUIDADE"] },
  { n: "08", orig: "Habitar a Estrutura",       alt: "TOPOGRAFIA HUMANA",     anchor: "#95D5B2", palette: ["#1B4332","#95D5B2","#D8F3DC","#081C15"], tagline: "Organograma como território",    pills: ["TERRITÓRIO","NÓ","ADJACÊNCIA"] },
  { n: "09", orig: "Plataforma de Marca",       alt: "GRAMÁTICA VIVA",        anchor: "#E8B4E8", palette: ["#5C1A5C","#E8B4E8","#B56AB5","#2E002E"], tagline: "Marca como língua",              pills: ["VOCABULÁRIO","SINTAXE","VOZ"] },
  { n: "10", orig: "HUB Hyndra",                alt: "CONSTITUIÇÃO DO GRUPO", anchor: "#C8A951", palette: ["#1C1C1C","#C8A951","#3D3D3D","#F8F5EE"], tagline: "Carta magna institucional",      pills: ["ESTATUTO","VIGÊNCIA","MANDATO"] },
];

function NexusInline({ size = 11 }: { size?: number }) {
  return (
    <span className="font-mono uppercase" style={{ fontSize: `${size}px`, letterSpacing: "0.2em", color: "#E8E8E8" }}>
      NE
      <span style={{ color: "#9DCA79", textShadow: "0 0 10px rgba(157,202,121,0.9), 0 0 20px rgba(157,202,121,0.5), 0 0 40px rgba(157,202,121,0.2)" }}>X</span>
      US
    </span>
  );
}

function SlideProdutosGrid() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#0A0A0B" }}>
      <div className="slide-content active relative h-full px-[80px] pt-[70px] pb-[60px] flex flex-col z-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <NexusInline size={14} />
            <span className="font-mono uppercase" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}>
              · SISTEMA OPERACIONAL DA CULTURA
            </span>
          </div>
          <span className="font-mono uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
            5 MÓDULOS · 10 PRODUTOS
          </span>
        </div>

        <div className="mb-6">
          <div className="font-mono uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#9DCA79" }}>
            OS 10 PRODUTOS DO SISTEMA
          </div>
          <div className="mt-3 font-display font-extralight text-[var(--white-warm)]" style={{ fontSize: "40px", letterSpacing: "-0.025em", lineHeight: 1 }}>
            Um ecossistema com identidade diferenciada por produto.
          </div>
        </div>

        <div className="flex-1 grid grid-cols-5 grid-rows-2" style={{ gap: "1px", background: "rgba(157,202,121,0.15)" }}>
          {PRODUTOS_GRID.map((p) => (
            <div key={p.n} className="relative flex flex-col" style={{ background: "#0A0A0B", padding: "20px 22px", minHeight: "180px" }}>
              <div className="absolute top-0 left-0 right-0" style={{ height: "3px", background: p.anchor }} />
              <div className="font-mono" style={{ fontSize: "9px", color: "#9DCA79", opacity: 0.5, marginTop: "6px" }}>{p.n}</div>
              <div className="font-mono uppercase mt-1" style={{ fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)" }}>{p.orig}</div>
              <div className="mt-2 leading-none" style={{ fontFamily: '"Bebas Neue", "Plus Jakarta Sans", sans-serif', fontSize: "26px", letterSpacing: "0.02em", color: p.anchor }}>{p.alt}</div>
              <div className="font-serif italic mt-2" style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: 1.25 }}>{p.tagline}</div>
              <div className="mt-auto pt-3" style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-[6px]">
                  {p.palette.map((c, i) => (
                    <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-[5px] mt-2">
                  {p.pills.map((pill) => (
                    <span key={pill} className="font-mono uppercase" style={{ fontSize: "8px", letterSpacing: "0.12em", padding: "2px 7px", border: `0.5px solid ${p.anchor}`, color: p.anchor, borderRadius: 0 }}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 flex items-center justify-between" style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
          <NexusInline size={11} />
          <span className="font-mono uppercase" style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.25)" }}>
            SISTEMA OPERACIONAL DA CULTURA · 5 MÓDULOS · 10 PRODUTOS
          </span>
        </div>
      </div>
    </div>
  );
}

export const slides: Array<{ title: string; render: () => React.ReactNode }> = [
  { title: "Capa", render: () => <Slide01 /> },
  { title: "A Tese Estratégica", render: () => <Slide02 /> },
  { title: "Arquitetura do Sistema", render: () => <Slide03 /> },
  ...products.map((p, i) => ({
    title: p.name,
    render: () => <ProductSlide p={p} idx={i} />,
  })),
  { title: "Análise Financeira", render: () => <Slide14 /> },
  { title: "Nomes Alternativos", render: () => <Slide15 /> },
  { title: "Encerramento", render: () => <Slide16 /> },
];
