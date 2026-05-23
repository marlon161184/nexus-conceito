import { useEffect, useRef, useState } from "react";
import { products, altNames, modules, FALLBACK_IMAGES, type Product } from "@/lib/nexus-data";

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
function LogoAnatomyParallax() {
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
            style={{ fontSize: "520px", letterSpacing: "-0.025em" }}
          >
            NEXUS
          </div>
          <div className="absolute -left-[34px] -bottom-[14px] right-[20%] flex items-center gap-[1px]">
            <div className="h-[3px] flex-1 bg-[var(--green)] opacity-70" />
            <div className="h-[3px] w-[30%] bg-[var(--silver)] opacity-40" />
          </div>
          <div className={`${mono} mt-6 ml-1 text-[var(--silver-dark)]/60`} style={{ letterSpacing: "0.35em", fontSize: "22px" }}>
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

      {/* Vinheta — leve, só para legibilidade do bloco de texto à esquerda */}
      <div className="absolute inset-0" style={{
        background:
          "radial-gradient(ellipse at 25% 50%, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 38%, rgba(10,10,10,0.25) 70%, rgba(10,10,10,0) 100%)",
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
        <h1
          className="font-display font-extralight text-[var(--white-warm)] leading-none"
          style={{ fontSize: "clamp(80px, 9vw, 120px)", letterSpacing: "-0.04em" }}
        >
          NEXUS
        </h1>
        <div
          className="font-display font-extralight mt-6"
          style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "var(--green)", letterSpacing: "-0.02em" }}
        >
          Não é um sistema de RH.
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
        <div>
          <Eyebrow>A TESE ESTRATÉGICA</Eyebrow>
          <h2
            className="mt-8 font-display font-extralight text-[var(--white-warm)]"
            style={{ fontSize: "clamp(38px, 4vw, 54px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            Por que o<br />Nexus existe.
          </h2>
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
function Slide03() {
  return (
    <div className="relative w-full h-full bg-[var(--black)] px-[80px] py-[80px] flex flex-col">
      <div className="slide-content active flex-1 flex flex-col">
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
                <div className="mt-6 font-display font-extralight text-[28px] text-[var(--white-warm)] leading-tight">
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

        {/* RIGHT — editorial photo */}
        <div className="slide-foto relative overflow-hidden">
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
          {/* horizontal blend into text */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 20%, rgba(10,10,10,0.3) 60%, rgba(10,10,10,0) 100%)",
            }}
          />
          {/* vertical edges */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.9) 100%)",
            }}
          />
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
        <div className="font-mono font-bold text-[18px] text-[var(--green)] whitespace-nowrap">
          {p.savings}
        </div>
      </div>
    </div>
  );
}

/* ==================== SLIDE 14 — FINANCEIRO ==================== */
function Slide14() {
  const totalImplant = "R$ 1,0M";
  const totalMonthly2y = "R$ 2,1M";
  const totalSavings = "R$ 3,3M+";

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
            <div className="mt-3 font-mono text-[9px] text-[var(--silver)]">
              Vs. aquisição de plataformas equivalentes
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-7 flex-1 min-h-0 overflow-auto no-scrollbar bg-[var(--black)] border border-[var(--graphite)]">
          <table className="w-full font-mono text-[10px] text-[var(--silver)]">
            <thead className="text-[var(--silver-dark)] uppercase tracking-[0.15em]">
              <tr className="border-b border-[var(--graphite)]">
                {["PRODUTO", "EQUIVALENTE", "IMPLANT.", "MENSAL.", "CUSTO 2 ANOS", "NEXUS", "ECONOMIA"].map((h) => (
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
function Slide15() {
  return (
    <div className="relative w-full h-full bg-[var(--black)] px-[80px] py-[60px] flex flex-col overflow-hidden">
      <div className="slide-content active flex-1 flex flex-col min-h-0">
        <Eyebrow>NOMES ALTERNATIVOS · PROVOCAÇÃO ESTRATÉGICA</Eyebrow>
        <h2
          className="mt-5 font-display font-extralight text-[var(--white-warm)]"
          style={{ fontSize: "clamp(34px, 3.5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
        >
          Nomes que incomodam bem.
        </h2>
        <p className="mt-5 font-serif italic text-[18px] text-[var(--silver)] max-w-[700px] leading-[1.5]">
          “Um nome estratégico não é apenas bonito — é uma declaração de intenção. As opções abaixo provocam se os nomes atuais comunicam o que cada produto faz.”
        </p>

        <div className="mt-7 grid grid-cols-5 grid-rows-2 gap-4 flex-1 min-h-0">
          {altNames.map((a) => (
            <div key={a.current} className="bg-[var(--graphite-deep)] border border-[var(--graphite)] p-4 flex flex-col">
              <div className="font-display font-light text-[13px] text-[var(--white-warm)] pb-2 border-b border-[var(--graphite)] leading-tight">
                {a.current}
              </div>
              <div className="mt-3 font-mono font-bold text-[12px] text-[var(--green)] uppercase tracking-[0.1em]">
                {a.alt}
              </div>
              <p className="mt-3 font-light text-[11px] text-[var(--silver-dark)] leading-[1.5]">{a.rationale}</p>
            </div>
          ))}
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
