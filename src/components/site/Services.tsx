import { Link } from "@tanstack/react-router";
import { DoorOpen, LayoutPanelTop, Sparkles, Building2, ArrowLeft, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
};

const services: Service[] = [
  {
    icon: DoorOpen,
    title: "דלתות קו־אפס",
    desc: "פרופיל סמוי בקו אפס מושלם, למראה נקי, מדויק ושקט שהופך לחלק טבעי מהחלל.",
    bullets: ["פרופיל סמוי", "אלומיניום / פורצלן / זכוכית", "התאמה אישית מלאה", "גימור פרימיום"],
  },
  {
    icon: LayoutPanelTop,
    title: "חיפויי חזית",
    desc: "חיפויי אלומיניום, פורצלן וזכוכית בעבודת יד, עם עמידות גבוהה ונראות יוקרתית לאורך שנים.",
    bullets: ["מבטי חזית", "ייצור אישי", "עמידות גבוהה", "מגוון גימורים"],
  },
  {
    icon: Sparkles,
    title: "דלתות כניסה מעוצבות",
    desc: "דלתות כניסה מודרניות ופרובנס, מהמדידה הראשונה ועד להתקנה הסופית, בתפירה אישית.",
    bullets: ["סגנון מודרני", "סגנון פרובנס", "התאמה אישית"],
  },
  {
    icon: Building2,
    title: "פרויקטים מיוחדים",
    desc: "דלתות לבתי כנסת, חזיתות מורכבות ופתרונות מותאמים שדורשים יד אמן ועין לפרטים.",
    bullets: ["בתי כנסת", "פרויקטים מורכבים", "עיצוב מותאם"],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 bg-gradient-to-b from-[color:var(--surface)] to-white pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>השירותים שלנו</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[color:var(--ink)] text-balance sm:text-5xl lg:text-6xl">
            מה שאני <span className="text-[color:var(--brand)]">מציע בשבילכם:</span>
          </h2>
        </header>

        <div className="mt-14 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 md:gap-7">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)]/80 bg-gradient-to-br from-white via-white to-[color:var(--surface-tint)] p-6 shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--ink)_10%,transparent)] transition-all duration-500 hover:-translate-y-1 hover:shadow-brand hover:border-[color:var(--brand)]/25 sm:p-8 lg:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,var(--brand)_16%,white)_0%,transparent_70%)] opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="absolute left-5 top-5 font-display text-4xl font-extrabold text-[color:var(--brand)]/10 select-none sm:left-6 sm:top-6 sm:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-soft)] text-white shadow-brand transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105 sm:h-16 sm:w-16">
                <service.icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <h3 className="relative mt-5 font-display text-2xl text-[color:var(--ink)] sm:mt-6 sm:text-[1.65rem]">
                {service.title}
              </h3>
              <p className="relative mt-3 text-sm leading-7 text-[color:var(--ink)]/72 sm:text-base">
                {service.desc}
              </p>

              <ul className="relative mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-x-4">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-2 text-sm text-[color:var(--ink)]/82"
                  >
                    <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="relative mt-6 flex items-center justify-between border-t border-[color:var(--border)]/75 pt-5 sm:mt-7">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand)] transition-all hover:gap-3"
                >
                  לפרטים נוספים <ArrowLeft className="h-4 w-4" />
                </Link>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[color:var(--ink)]/38 sm:text-xs">
                  שירות
                </span>
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
