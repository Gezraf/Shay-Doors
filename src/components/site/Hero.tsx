import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Phone, ChevronDown } from "lucide-react";

const HERO_AMBIENT =
  "https://res.cloudinary.com/dkgx2zv2g/image/upload/v1778512392/27_idzzop.png";
const HERO_BG =
  "https://res.cloudinary.com/dkgx2zv2g/image/upload/f_auto,q_auto,w_1800/v1754540553/52_otpzld.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-shell relative isolate overflow-hidden pt-24 pb-16 sm:pt-30 sm:pb-24 lg:py-36 lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_AMBIENT}
          alt=""
          className="hero-ambient-image h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
        <div className="hero-grid absolute inset-0 opacity-20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Text column */}
          <div className="order-1 text-center text-white lg:order-1 lg:col-span-7 lg:row-start-1 lg:text-right">

            <h1 className="mt-2 font-display text-[2.8rem] leading-[1.02] font-extrabold text-balance sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
              {/* "פותחים דלת" — warm gold */}
              <span
                style={{
                  background: "linear-gradient(135deg, oklch(0.62 0.14 78) 0%, oklch(0.76 0.15 82) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                פותחים דלת
              </span>{" "}
              {/* "לאיכות." — lighter, softer gold */}
              <span
                style={{
                  background: "linear-gradient(135deg, oklch(0.80 0.11 82) 0%, oklch(0.87 0.09 84) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                לאיכות.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg sm:leading-9 lg:mx-0">
              מומחה בייצור והתקנה של דלתות קו-אפס, חיפויי אלומיניום, פורצלן וזכוכית.
              כל דלת היא יצירת אומנות המותאמת אישית לבית ולסגנון שלכם.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
              <Link
                to="/contact"
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-xl btn-brand px-8 py-4 text-base font-bold tracking-wide"
              >
                לקבלת הצעת מחיר
              </Link>
              <Link
                to="/gallery"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/22 bg-white/6 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/11 hover:border-white/35"
              >
                גלריית עבודות
              </Link>
            </div>
          </div>

          {/* Door animation column */}
          <div className="order-2 flex justify-center lg:order-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 lg:self-end lg:justify-end">
            <div className="door-hero-container w-full max-w-[13.5rem] sm:max-w-[24.75rem]">
              <div className="door-hero-frame">
                <div className="door-hero-reveal" style={{ backgroundImage: `url(${HERO_BG})` }} />
                <div className="door-hero-caption rounded-2xl px-4 py-3 text-right shadow-soft">
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/55">
                    Shay Luxury Doors
                  </div>
                  <div className="mt-1 text-sm font-semibold sm:text-base">
                    גימור מדויק, התקנה נקייה ונוכחות שמרגישים כבר בכניסה.
                  </div>
                </div>
                <div className="door-hero-left">
                  <div className="door-hero-handle-left" />
                  <div className="door-hero-panel" />
                </div>
                <div className="door-hero-right">
                  <div className="door-hero-handle-right" />
                  <div className="door-hero-panel" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="order-3 mx-auto w-full max-w-lg lg:order-3 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:mt-2">
            <div className="grid grid-cols-3 divide-x divide-x-reverse divide-white/10 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm">
              <StatItem number="+20" label="שנות ניסיון" />
              <StatItem number="+5,000" label="פרויקטים" />
              <StatItem number="100%" label="התאמה אישית" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact bar */}
      <div className="relative mt-12 sm:mt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="hero-card flex flex-col items-center justify-center gap-3 rounded-2xl px-5 py-4 text-center text-sm text-white/65 sm:flex-row sm:flex-wrap sm:gap-8 sm:px-6">
            <a href="tel:+972525085086" className="inline-flex items-center gap-2 transition hover:text-white font-medium">
              <Phone className="h-4 w-4 text-[color:var(--brand-soft)]" />
              052-508-5086
            </a>
            <span className="hidden text-white/18 sm:inline">·</span>
            <span>א׳–ה׳ 07:30–19:00 &nbsp;·&nbsp; ו׳ 07:30–12:00</span>
            <span className="hidden text-white/18 sm:inline">·</span>
            <span>שירות בכל הארץ</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1">
        <ChevronDown className="scroll-indicator h-5 w-5 text-white/35" />
      </div>
    </section>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-4 py-4 text-center sm:py-5">
      <div className="font-display text-2xl font-extrabold tabular-nums text-[color:var(--brand-soft)] sm:text-4xl">
        <CountUp value={number} />
      </div>
      <div className="mt-1.5 text-[0.7rem] font-medium text-white/55 sm:text-xs">{label}</div>
    </div>
  );
}

function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^([^\d-]*)([\d,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numericStr = match?.[2] ?? "0";
  const suffix = match?.[3] ?? "";
  const target = parseInt(numericStr.replace(/,/g, ""), 10) || 0;
  const hasComma = numericStr.includes(",");

  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  const formatted = hasComma ? display.toLocaleString("en-US") : String(display);
  return <>{prefix}{formatted}{suffix}</>;
}
