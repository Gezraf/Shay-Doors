import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    quote:
      "פנינו לשי אחרי שראינו עבודה אצל חברים. הוא הגיע, הקשיב, ותוך זמן קצר התקין לנו דלת קו־אפס שכולם עוצרים להסתכל עליה.",
    name: "ענת ויואב",
    where: "וילה · רעננה",
  },
  {
    quote:
      "מקצוען אמיתי. ראינו פרטים שלא ידענו לבקש. הגימור פשוט מדויק, וההתקנה הייתה נקייה ומהירה.",
    name: "ליאור כהן",
    where: "פנטהאוז · תל אביב",
  },
  {
    quote:
      "השקעה שמרגישים בכל פעם שנכנסים הביתה. שירות אישי, חומרים מצוינים, והכי חשוב, עומד במילה שלו.",
    name: "משפחת אסולין",
    where: "בית פרטי · מודיעין",
  },
  {
    quote:
      "ביצענו פרויקט חזית מורכב לבית כנסת בקהילה. שי הציע פתרון יצירתי שאף אחד אחר לא חשב עליו, והתוצאה מרהיבה.",
    name: "הרב דוד",
    where: "בית כנסת · ירושלים",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".testi-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden py-20 text-white sm:py-28 lg:py-32"
      style={{
        background:
          "radial-gradient(ellipse at 15% 10%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 50%), radial-gradient(ellipse at 85% 90%, color-mix(in oklab, var(--brand-soft) 12%, transparent), transparent 50%), var(--ink)",
      }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(color-mix(in oklab, white 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          {/* Blue accent line */}
          <div className="mx-auto mb-6 h-[3px] w-12 rounded-full bg-[color:var(--brand-soft)]" />
          <h2 className="font-display text-4xl leading-[1.08] text-balance sm:text-5xl lg:text-[3.4rem]">
            ההמלצות הכי טובות{" "}
            <span className="text-[color:var(--brand-soft)]">
              פותחות דלתות לאחרים.
            </span>
          </h2>
        </header>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((item, i) => (
            <figure
              key={`${item.name}-${item.where}`}
              className="testi-card reveal relative overflow-hidden rounded-3xl p-7 transition-all duration-500 glass-dark sm:p-8"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {/* Decorative quote mark */}
              <div className="quote-mark text-[color:var(--brand-soft)] opacity-20">"</div>

              {/* Stars */}
              <div className="stars mb-4 text-[color:var(--brand-soft)]">★★★★★</div>

              <blockquote className="relative z-10 text-base leading-8 text-white/82 sm:text-[1.05rem] sm:leading-8">
                {item.quote}
              </blockquote>

              <figcaption className="relative z-10 mt-6 flex items-center gap-3.5">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-extrabold text-white bg-[color:var(--brand)]"
                >
                  {item.name[0]}
                </span>
                <div>
                  <div className="font-display text-[0.95rem] font-bold">{item.name}</div>
                  <div className="text-xs text-white/50 mt-0.5">{item.where}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
