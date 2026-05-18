import { Link } from "@tanstack/react-router";
import { DoorOpen, LayoutPanelTop, Sparkles, Building2, ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const services: Service[] = [
  {
    icon: DoorOpen,
    title: "דלתות קו־אפס",
    desc: "פרופיל סמוי בקו אפס מושלם, למראה נקי, מדויק ושקט שהופך לחלק טבעי מהחלל. אלומיניום, פורצלן או זכוכית — כל גימור מותאם אישית.",
  },
  {
    icon: LayoutPanelTop,
    title: "חיפויי חזית",
    desc: "חיפויי אלומיניום, פורצלן וזכוכית בעבודת יד. עמידות גבוהה ונראות יוקרתית שמחזיקה לאורך שנים.",
  },
  {
    icon: Sparkles,
    title: "דלתות כניסה מעוצבות",
    desc: "דלתות כניסה מודרניות ופרובנס. מהמדידה הראשונה ועד להתקנה הסופית — בתפירה אישית מלאה.",
  },
  {
    icon: Building2,
    title: "פרויקטים מיוחדים",
    desc: "דלתות לבתי כנסת, חזיתות מורכבות ופתרונות ייחודיים שדורשים יד אמן ועין חדה לפרטים.",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".srv-card");
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
      id="services"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-gradient-to-b from-[color:var(--surface)] to-white pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          {/* Blue accent line */}
          <div className="mx-auto mb-6 h-[3px] w-12 rounded-full bg-[color:var(--brand)]" />
          <h2 className="font-display text-4xl leading-[1.08] text-[color:var(--ink)] text-balance sm:text-5xl lg:text-[3.5rem]">
            מה שאני{" "}
            <span className="text-[color:var(--brand)]">מציע בשבילכם</span>
          </h2>
        </header>

        <div className="mt-14 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="srv-card reveal group relative overflow-hidden rounded-3xl border border-[color:var(--border)]/70 bg-white p-7 shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--ink)_8%,transparent)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--brand)]/35 hover:shadow-brand sm:p-9"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Background number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-3 -left-1 font-display text-[6rem] font-extrabold leading-none select-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.065] text-[color:var(--brand)]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-brand transition-transform duration-500 group-hover:scale-105 sm:h-16 sm:w-16 bg-[color:var(--brand)]">
                <service.icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <h3 className="relative mt-5 font-display text-2xl text-[color:var(--ink)] sm:mt-6 sm:text-[1.65rem]">
                {service.title}
              </h3>
              <p className="relative mt-3 text-[0.95rem] leading-7 text-[color:var(--ink)]/68 sm:text-base">
                {service.desc}
              </p>

              <div className="relative mt-6 border-t border-[color:var(--border)]/60 pt-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand)] transition-all hover:gap-3"
                >
                  לפרטים נוספים <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-[color:var(--brand)] sm:text-base">
      <span className="h-px w-8 bg-[color:var(--brand)]" />
      {children}
      <span className="h-px w-8 bg-[color:var(--brand)]" />
    </div>
  );
}
