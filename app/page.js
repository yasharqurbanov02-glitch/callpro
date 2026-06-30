"use client";

import { useState, useEffect, useRef } from "react";
import { translations } from "@/constants/content";
import Navbar from "@/components/Navbar";

/* ─── scroll-progress hook ─────────────────────────── */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

/* ─── intersection hook ────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── reveal wrapper ────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", y = 48 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                     transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── main ──────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState("az");
  const [openFaq, setOpenFaq] = useState(null);
  const scrollY = useScrollY();
  const t = translations[lang];

  return (
    <>
      <style>{`
        :root {
          --ink:   #f0ede8;
          --paper: #0e0e0e;
          --card:  #161616;
          --dim:   #6b6b64;
          --line:  rgba(240,237,232,0.07);
          --gold:  #c9a46a;
          --gold2: #e2c28a;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--paper); color: var(--ink); font-family: 'Georgia', serif; }

        /* clamp type scale */
        .t-hero   { font-size: clamp(3.5rem, 10vw, 9.5rem); line-height: .95; letter-spacing: -.03em; font-weight: 300; }
        .t-display{ font-size: clamp(2.2rem, 5vw, 5.5rem);  line-height: 1;   letter-spacing: -.025em; font-weight: 300; }
        .t-title  { font-size: clamp(1.4rem, 2.5vw, 2.2rem); line-height: 1.1; letter-spacing: -.02em; font-weight: 400; }
        .t-body   { font-size: clamp(.875rem, 1.1vw, 1rem); line-height: 1.65; font-family: system-ui, sans-serif; }
        .t-label  { font-size: .68rem; letter-spacing: .18em; text-transform: uppercase; font-family: system-ui, sans-serif; }

        /* gold button */
        .btn-gold {
          display: inline-flex; align-items: center; gap: .5rem;
          background: var(--gold); color: #fff;
          padding: .85rem 2rem; border-radius: 2rem;
          font-family: system-ui, sans-serif; font-size: .85rem; font-weight: 500;
          border: none; cursor: pointer; text-decoration: none;
          transition: background .3s, box-shadow .3s, transform .25s cubic-bezier(.34,1.56,.64,1);
        }
        .btn-gold:hover { background: var(--gold2); box-shadow: 0 0 28px rgba(184,149,90,.38); transform: translateY(-2px); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: .5rem;
          background: transparent; color: var(--ink);
          padding: .85rem 2rem; border-radius: 2rem;
          font-family: system-ui, sans-serif; font-size: .85rem; font-weight: 500;
          border: 1px solid rgba(240,237,232,0.18); cursor: pointer; text-decoration: none;
          transition: border-color .3s, color .3s, transform .25s cubic-bezier(.34,1.56,.64,1);
        }
        .btn-ghost:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

        /* hair-line dividers */
        .rule { border: none; border-top: 1px solid var(--line); }

        /* service card hover */
        .svc-card {
          transition: transform .6s cubic-bezier(.16,1,.3,1), box-shadow .6s cubic-bezier(.16,1,.3,1);
        }
        .svc-card:hover { transform: translateY(-8px); box-shadow: 0 24px 64px rgba(12,12,12,.12); }

        /* faq toggle */
        .faq-body {
          overflow: hidden;
          transition: max-height .55s cubic-bezier(.16,1,.3,1), opacity .45s ease;
        }

        /* testimonial card */
        .testi-card { transition: transform .5s cubic-bezier(.16,1,.3,1); }
        .testi-card:hover { transform: translateY(-6px); }

        @media (max-width:768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .svc-grid  { grid-template-columns: 1fr !important; }
          .why-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar lang={lang} setLang={setLang} />

      {/* ══════════════ HERO ══════════════ */}
      <section
        id="home"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,5rem) clamp(3rem,6vw,5rem)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {/* parallax noise texture */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "radial-gradient(circle at 72% 20%, rgba(201,164,106,.13) 0%, transparent 60%)",
          transform: `translateY(${scrollY * 0.22}px)`,
          transition: "transform .05s linear",
        }} />

        {/* top meta row */}
        <div style={{
          position: "absolute", top: "clamp(6rem,10vw,8rem)", left: "clamp(1.5rem,6vw,5rem)",
          right: "clamp(1.5rem,6vw,5rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 1,
        }}>
          <span className="t-label" style={{ color: "var(--dim)" }}>{t.hero.eyebrow}</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {t.hero.stats.map(s => (
              <div key={s.label} style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-.01em" }}>{s.value}</div>
                <div className="t-label" style={{ color: "var(--dim)", marginTop: ".15rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* headline */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <h1 className="t-hero" style={{ maxWidth: "100%" }}>
              {t.hero.title.split(" ").map((word, i) => (
                <span key={i} style={{
                  display: "inline-block",
                  fontStyle: i % 2 === 1 ? "italic" : "normal",
                  color: i % 2 === 1 ? "var(--gold)" : "var(--ink)",
                  marginRight: ".22em",
                }}>
                  {word}
                </span>
              ))}
            </h1>
          </Reveal>

          <hr className="rule" style={{ margin: "clamp(1.5rem,4vw,3rem) 0" }} />

          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <a href="#contact" className="btn-gold">{t.hero.ctaPrimary} →</a>
              <a href="#services" className="btn-ghost">{t.hero.ctaSecondary}</a>
              <p className="t-body" style={{
                color: "var(--dim)", maxWidth: "36ch",
                marginLeft: "clamp(0rem,4vw,3rem)",
              }}>
                {t.hero.subtitle}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section
        id="services"
        style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem)" }}
      >
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
            flexWrap: "wrap", gap: "1rem", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <div>
              <span className="t-label" style={{ color: "var(--dim)", display: "block", marginBottom: ".75rem" }}>
                {t.services.eyebrow}
              </span>
              <h2 className="t-display">{t.services.title}</h2>
            </div>
            <p className="t-body" style={{ color: "var(--dim)", maxWidth: "32ch" }}>
              {t.services.subtitle}
            </p>
          </div>
        </Reveal>

        <hr className="rule" style={{ marginBottom: "clamp(2rem,5vw,4rem)" }} />

        {/* asymmetric grid */}
        <div className="svc-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "1px",
          background: "var(--line)",
          border: "1px solid var(--line)",
          borderRadius: "1.25rem",
          overflow: "hidden",
        }}>
          {t.services.items.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <article
                className="svc-card"
                style={{
                  background: "var(--card)",
                  padding: i === 0 ? "clamp(2rem,5vw,3.5rem)" : "clamp(1.5rem,3vw,2.5rem)",
                  gridColumn: i === 0 ? "1 / 2" : undefined,
                  gridRow: i === 0 ? "1 / 3" : undefined,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: i === 0 ? "space-between" : "flex-start",
                  minHeight: i === 0 ? "clamp(18rem,28vw,26rem)" : "clamp(10rem,14vw,14rem)",
                }}
              >
                <div>
                  <div style={{ fontSize: i === 0 ? "2.5rem" : "1.8rem", marginBottom: "1rem" }}>
                    {svc.icon}
                  </div>
                  <h3 className={i === 0 ? "t-title" : "t-body"}
                    style={{ fontWeight: 600, marginBottom: ".5rem" }}>
                    {svc.title}
                  </h3>
                  {(i === 0 || true) && (
                    <p className="t-body" style={{ color: "var(--dim)", marginTop: ".5rem" }}>
                      {svc.description}
                    </p>
                  )}
                </div>
                {i === 0 && (
                  <span className="t-label" style={{ color: "var(--gold)", marginTop: "2rem" }}>
                    {t.services.linkLabel}
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* stats bar */}
        <Reveal delay={0.2}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: "1px", background: "var(--line)",
            border: "1px solid var(--line)", borderRadius: "1rem",
            overflow: "hidden", marginTop: "1px",
          }}>
            {t.services.statsBar.map(s => (
              <div key={s.label} style={{
                background: "var(--card)",
                padding: "1.75rem clamp(1rem,3vw,2rem)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 700,
                  color: "var(--gold)", letterSpacing: "-.02em" }}>{s.value}</div>
                <div className="t-label" style={{ color: "var(--dim)", marginTop: ".4rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════════════ WHY US ══════════════ */}
      <section
        id="why"
        style={{
          padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem)",
          background: "var(--card)",
          color: "var(--ink)",
        }}
      >
        <Reveal>
          <span className="t-label" style={{ color: "var(--gold)", display: "block", marginBottom: ".75rem" }}>
            {t.why.eyebrow}
          </span>
          <h2 className="t-display" style={{ maxWidth: "16ch", marginBottom: "clamp(3rem,6vw,5rem)" }}>
            {t.why.title}
          </h2>
        </Reveal>

        <div className="why-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
          border: "1px solid rgba(240,237,232,.07)",
          borderRadius: "1.25rem", overflow: "hidden",
        }}>
          {t.why.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div style={{
                padding: "clamp(2rem,5vw,3.5rem)",
                borderBottom: i < 2 ? "1px solid rgba(240,237,232,.07)" : undefined,
                borderRight: i % 2 === 0 ? "1px solid rgba(240,237,232,.07)" : undefined,
              }}>
                <div style={{
                  width: "2rem", height: "2px", background: "var(--gold)",
                  marginBottom: "1.5rem",
                }} />
                <h3 className="t-title" style={{ marginBottom: ".75rem", fontWeight: 500 }}>{item.title}</h3>
                <p className="t-body" style={{ color: "var(--dim)" }}>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{ marginTop: "clamp(2.5rem,5vw,4rem)", display: "flex", alignItems: "center", gap: "2rem" }}>
            <a href="#contact" className="btn-gold">{t.why.cta}</a>
            <p className="t-body" style={{ color: "var(--dim)" }}>{t.why.subtitle}</p>
          </div>
        </Reveal>
      </section>

      {/* ══════════════ PROCESS ══════════════ */}
      <section
        id="process"
        style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem)" }}
      >
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "baseline", flexWrap: "wrap", gap: "1rem",
            marginBottom: "clamp(2.5rem,6vw,5rem)" }}>
            <div>
              <span className="t-label" style={{ color: "var(--dim)", display: "block", marginBottom: ".75rem" }}>
                {t.process.eyebrow}
              </span>
              <h2 className="t-display">{t.process.title}</h2>
            </div>
            <p className="t-body" style={{ color: "var(--dim)", maxWidth: "30ch" }}>
              {t.process.subtitle}
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gap: 0, border: "1px solid var(--line)", borderRadius: "1.25rem", overflow: "hidden" }}>
          {t.process.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.09}>
              <div style={{
                display: "grid", gridTemplateColumns: "6rem 1fr auto",
                alignItems: "start", gap: "2rem",
                padding: "clamp(1.5rem,4vw,2.5rem) clamp(1.5rem,4vw,2.5rem)",
                borderBottom: i < t.process.steps.length - 1 ? "1px solid var(--line)" : "none",
              }}>
                <span style={{
                  fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 200,
                  color: "var(--gold)", letterSpacing: "-.04em",
                  lineHeight: 1,
                }}>
                  {step.number}
                </span>
                <div>
                  <h3 className="t-title" style={{ marginBottom: ".4rem" }}>{step.title}</h3>
                  <p className="t-body" style={{ color: "var(--dim)" }}>{step.description}</p>
                </div>
                <div style={{
                  width: "2.5rem", height: "2.5rem", borderRadius: "50%",
                  border: "1px solid var(--line)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "var(--dim)", fontSize: ".75rem", flexShrink: 0,
                }}>
                  {i + 1}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section style={{
        padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem)",
        background: "var(--paper)", color: "var(--ink)",
      }}>
        <Reveal>
          <span className="t-label" style={{ color: "var(--gold)", display: "block", marginBottom: ".75rem" }}>
            {t.testimonials.eyebrow}
          </span>
          <h2 className="t-display" style={{ marginBottom: "clamp(2.5rem,6vw,5rem)" }}>
            {t.testimonials.title}
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,22rem),1fr))", gap: "1px",
          background: "rgba(240,237,232,.05)", border: "1px solid var(--line)",
          borderRadius: "1.25rem", overflow: "hidden" }}>
          {t.testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <article className="testi-card" style={{
                background: "var(--card)",
                padding: "clamp(2rem,4vw,3rem)",
                display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "2rem",
              }}>
                <div>
                  <div style={{ color: "var(--gold)", marginBottom: "1.25rem", fontSize: ".85rem",
                    letterSpacing: ".1em" }}>★★★★★</div>
                  <p className="t-body" style={{ color: "rgba(240,237,232,.65)", fontStyle: "italic" }}>
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "2.5rem", height: "2.5rem", borderRadius: "50%",
                    background: `linear-gradient(135deg, var(--gold), var(--gold2))`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: ".85rem", fontWeight: 700, color: "#fff", flexShrink: 0,
                  }}>
                    {item.initial}
                  </div>
                  <div>
                    <div style={{ fontSize: ".875rem", fontWeight: 600 }}>{item.name}</div>
                    <div className="t-label" style={{ color: "rgba(240,237,232,.4)", marginTop: ".2rem" }}>
                      {item.role}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section
        id="faq"
        style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem)", maxWidth: "72rem", margin: "0 auto" }}
      >
        <Reveal>
          <span className="t-label" style={{ color: "var(--dim)", display: "block", marginBottom: ".75rem" }}>
            {t.faq.eyebrow}
          </span>
          <h2 className="t-display" style={{ marginBottom: "clamp(2rem,5vw,4rem)" }}>{t.faq.title}</h2>
        </Reveal>

        <div style={{ border: "1px solid var(--line)", borderRadius: "1.25rem", overflow: "hidden" }}>
          {t.faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <div style={{ borderBottom: i < t.faq.items.length - 1 ? "1px solid var(--line)" : "none" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", gap: "1rem",
                    padding: "clamp(1.25rem,3vw,1.75rem) clamp(1.5rem,4vw,2.5rem)",
                    background: "none", border: "none", cursor: "pointer",
                    textAlign: "left", color: "var(--ink)",
                  }}
                >
                  <span className="t-body" style={{ fontWeight: 500, fontSize: "clamp(.9rem,1.2vw,1.05rem)" }}>
                    {item.q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: "1.5rem", height: "1.5rem",
                    borderRadius: "50%", border: "1px solid var(--line)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: ".75rem", color: "var(--dim)",
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    transition: "transform .4s cubic-bezier(.16,1,.3,1)",
                  }}>
                    +
                  </span>
                </button>
                <div className="faq-body" style={{
                  maxHeight: openFaq === i ? "12rem" : "0",
                  opacity: openFaq === i ? 1 : 0,
                }}>
                  <p className="t-body" style={{
                    color: "var(--dim)",
                    padding: "0 clamp(1.5rem,4vw,2.5rem) clamp(1.25rem,3vw,1.75rem)",
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section
        id="contact"
        style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem)" }}
      >
        <Reveal>
          <div style={{
            border: "1px solid var(--line)", borderRadius: "1.5rem",
            padding: "clamp(3rem,8vw,7rem) clamp(2rem,6vw,5rem)",
            textAlign: "center",
            background: "radial-gradient(ellipse at 50% -20%, rgba(201,164,106,.12) 0%, transparent 70%)",
          }}>
            <span className="t-label" style={{ color: "var(--gold)", display: "block", marginBottom: "1.25rem" }}>
              {t.cta.eyebrow}
            </span>
            <h2 className="t-display" style={{ maxWidth: "20ch", margin: "0 auto 1.5rem" }}>
              {t.cta.title}
            </h2>
            <p className="t-body" style={{ color: "var(--dim)", maxWidth: "40ch", margin: "0 auto 2.5rem" }}>
              {t.cta.subtitle}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" className="btn-gold">{t.cta.primary} →</a>
              <a href="#" className="btn-ghost">{t.cta.secondary}</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer style={{
        borderTop: "1px solid var(--line)",
        padding: "clamp(2.5rem,6vw,4rem) clamp(1.5rem,6vw,5rem)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "3rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "1.3rem", fontWeight: 600, letterSpacing: "-.02em", marginBottom: ".75rem" }}>
              Call<span style={{ color: "var(--gold)" }}>Pro</span>
            </div>
            <p className="t-body" style={{ color: "var(--dim)", maxWidth: "26ch" }}>
              {t.footer.description}
            </p>
          </div>
          <div>
            <h4 className="t-label" style={{ color: "var(--dim)", marginBottom: "1.25rem" }}>
              {t.footer.servicesTitle}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".65rem" }}>
              {t.services.items.slice(0, 5).map(s => (
                <li key={s.title}>
                  <a href="#services" className="t-body" style={{
                    color: "var(--ink)", textDecoration: "none",
                    transition: "color .2s",
                  }}
                    onMouseEnter={e => e.target.style.color = "var(--gold)"}
                    onMouseLeave={e => e.target.style.color = "var(--ink)"}
                  >{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="t-label" style={{ color: "var(--dim)", marginBottom: "1.25rem" }}>
              {t.footer.companyTitle}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".65rem" }}>
              {t.footer.companyLinks.map(c => (
                <li key={c}>
                  <a href="#" className="t-body" style={{
                    color: "var(--ink)", textDecoration: "none", transition: "color .2s",
                  }}
                    onMouseEnter={e => e.target.style.color = "var(--gold)"}
                    onMouseLeave={e => e.target.style.color = "var(--ink)"}
                  >{c}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="rule" style={{ margin: "2.5rem 0 1.25rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1rem" }}>
          <span className="t-label" style={{ color: "var(--dim)" }}>
            © {new Date().getFullYear()} CallPro AZ. {t.footer.rights}
          </span>
        </div>
      </footer>
    </>
  );
}
