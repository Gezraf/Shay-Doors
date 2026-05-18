import { useEffect, useRef } from "react";

const PORTRAIT = "https://res.cloudinary.com/dkgx2zv2g/image/upload/f_auto,q_auto,w_900/v1754534258/WhatsApp_Image_2025-08-06_at_21.49.37_v55bsv.jpg";

const benefits: [string, string][] = [
  ["אחריות מלאה", "על כל דלת ועל כל עבודת התקנה."],
  ["חומרים פרימיום", "אלומיניום, פורצלן וזכוכית מהמובילים בעולם."],
  ["שירות אישי", "ישירות ממני, מהמדידה ועד אחרי ההתקנה."],
  ["דיוק בהתקנה", "מדידות מדויקות, גימור נקי ועבודה ללא פשרות."],
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll<HTMLElement>(".about-reveal");
    if (!targets) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 pt-12 pb-24 sm:pt-20 sm:pb-32 overflow-hidden"
      style={{ background: "oklch(0.985 0.004 250)" }}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--brand) 30%, transparent), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Photo */}
          <div className="relative lg:col-span-5 about-reveal reveal-right">
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                boxShadow:
                  "0 0 0 3px color-mix(in oklab, var(--brand) 40%, transparent), 0 0 0 8px color-mix(in oklab, var(--brand) 10%, transparent), 0 30px 70px -20px color-mix(in oklab, var(--ink) 50%, transparent)",
              }}
            >
              <img
                src={PORTRAIT}
                alt="שי - עבודת התקנה"
                className="w-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
            </div>

            {/* Badge — adjusted for mobile to avoid overflow */}
            <div
              className="absolute -bottom-8 left-1/2 w-[85%] max-w-[16rem] -translate-x-1/2 sm:left-4 sm:translate-x-0 sm:w-auto rounded-2xl bg-white p-5 shadow-luxe z-10"
              style={{
                border: "1px solid color-mix(in oklab, var(--brand) 20%, transparent)",
              }}
            >
              <div className="font-display text-3xl font-extrabold text-[color:var(--brand)]">
                +15
              </div>
              <div className="mt-1 text-sm text-[color:var(--ink)]/65 max-w-[10rem]">
                שנות ניסיון בעיצוב, ייצור והתקנה של דלתות יוקרה.
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 lg:pr-10 about-reveal reveal delay-200 mt-8 sm:mt-0">
            {/* Blue accent line */}
            <div className="mb-6 h-[3px] w-12 rounded-full bg-[color:var(--brand)]" />
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.08] text-[color:var(--ink)]">
              עבודת אומנות{" "}
              <span className="text-[color:var(--brand)]">בכל דלת.</span>
            </h2>

            <p className="mt-6 text-[0.97rem] leading-8 text-[color:var(--ink)]/68 sm:text-base">
              כל פרויקט מתחיל בשיחה ומסתיים בתוצאה שמדברת בעד עצמה. אני לא מוכר דלתות — אני בונה אותן אחת אחת, ממדידה ועד גימור, עם אחריות מלאה ועין של אומן.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map(([title, desc]) => (
                <div
                  key={title}
                  className="flex gap-3.5 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "oklch(0.975 0.008 250)",
                    border: "1px solid color-mix(in oklab, var(--brand) 12%, transparent)",
                  }}
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--brand)] text-white text-xs font-bold">
                    ✓
                  </span>
                  <div>
                    <div className="font-display text-[0.95rem] font-bold text-[color:var(--ink)]">{title}</div>
                    <div className="mt-0.5 text-sm text-[color:var(--ink)]/60">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
