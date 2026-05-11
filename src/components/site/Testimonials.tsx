import { Quote } from "lucide-react";
import { SectionEyebrow } from "./Services";

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
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden bg-[color:var(--ink)] py-20 text-white sm:py-28 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, color-mix(in oklab, var(--brand) 28%, transparent), transparent 40%), radial-gradient(circle at 84% 88%, color-mix(in oklab, var(--brand-soft) 22%, transparent), transparent 38%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>לקוחות מספרים</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
            ההמלצה הכי טובה <span className="text-[color:var(--brand-soft)]">היא דלת פתוחה</span>{" "}
            אצל אחרים.
          </h2>
        </header>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((item) => (
            <figure
              key={`${item.name}-${item.where}`}
              className="relative rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors hover:border-[color:var(--brand-soft)]/45 sm:p-8"
            >
              <blockquote className="pl-8 text-base leading-8 text-white/84 sm:pl-10 sm:text-lg">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--brand)] text-base font-extrabold text-white">
                  {item.name[0]}
                </span>
                <div>
                  <div className="font-display text-base">{item.name}</div>
                  <div className="text-xs text-white/55">{item.where}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
