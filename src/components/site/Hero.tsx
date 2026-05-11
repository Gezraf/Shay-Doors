import { Link } from "@tanstack/react-router";
import { ArrowLeft, Phone } from "lucide-react";

const HERO_AMBIENT =
  "https://res.cloudinary.com/dkgx2zv2g/image/upload/f_auto,q_auto,w_1600/v1754534561/WhatsApp_Image_2025-08-06_at_22.39.05_nzflv4.jpg";
const HERO_BG =
  "https://res.cloudinary.com/dkgx2zv2g/image/upload/f_auto,q_auto,w_1800/v1754540553/52_otpzld.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-shell relative isolate overflow-hidden pt-24 pb-16 sm:pt-30 sm:pb-24 lg:py-36"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_AMBIENT}
          alt=""
          className="hero-ambient-image h-full w-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
        <div className="hero-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="order-2 text-center text-white lg:order-1 lg:col-span-7 lg:text-right">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold sm:text-sm">
            </div>

            <h1 className="mt-5 font-display text-[2.7rem] leading-[1.02] font-extrabold text-balance sm:mt-6 sm:text-6xl lg:text-7xl xl:text-[5rem]">
              דלתות שמדברות
              <br />
              <span className="bg-gradient-to-l from-[color:var(--brand)] via-[color:var(--brand-soft)] to-[color:var(--brand)] bg-clip-text text-transparent">
                בשפת היוקרה.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/78 sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">
              שי דלתות יוקרה מתמחה בייצור והתקנה של דלתות קו־אפס, חיפויי אלומיניום, פורצלן וזכוכית,
              עם התאמה אישית מלאה לכל בית.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl btn-brand px-7 py-3.5 text-base font-semibold"
              >
                לקבלת הצעת מחיר <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/6 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                גלריית עבודות
              </Link>
            </div>

            <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-brand sm:mt-12 sm:gap-5 sm:p-5 lg:mx-0">
              <Stat number="+15" label="שנות ניסיון" />
              <Stat number="+500" label="פרויקטים" />
              <Stat number="100%" label="התאמה אישית" />
            </div>

            <p className="mt-8 font-display text-xl font-bold text-[color:var(--brand-soft)] sm:mt-10 sm:text-2xl">
              "פותחים דלת לאיכות"
            </p>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            <div className="door-hero-container w-full max-w-[22.5rem] sm:max-w-[24.75rem]">
              <div className="door-hero-frame">
                <div className="door-hero-reveal" style={{ backgroundImage: `url(${HERO_BG})` }} />
                <div className="door-hero-caption rounded-2xl px-4 py-3 text-right shadow-soft">
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/60">
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
        </div>
      </div>

      <div className="relative mt-12 sm:mt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="hero-card flex flex-col items-center justify-center gap-3 rounded-2xl px-5 py-4 text-center text-sm text-white/72 sm:flex-row sm:flex-wrap sm:gap-6 sm:px-6">
            <a href="tel:+972525085086" className="inline-flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 text-[color:var(--brand-soft)]" />
              052-508-5086
            </a>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>א׳–ה׳ 07:30–19:00 · ו׳ 07:30–12:00</span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>שירות בכל הארץ</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center lg:text-right">
      <div className="font-display text-2xl font-extrabold text-[color:var(--brand-soft)] sm:text-4xl">
        {number}
      </div>
      <div className="mt-1 text-[0.7rem] font-medium text-white/60 sm:text-sm">{label}</div>
    </div>
  );
}
