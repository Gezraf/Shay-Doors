import { Check } from "lucide-react";

const PORTRAIT = "https://res.cloudinary.com/dkgx2zv2g/image/upload/f_auto,q_auto,w_900/v1754534258/WhatsApp_Image_2025-08-06_at_21.49.37_v55bsv.jpg";

const benefits: [string, string][] = [
  ["אחריות מלאה", "על כל דלת ועל כל עבודת התקנה."],
  ["חומרים פרימיום", "אלומיניום, פורצלן וזכוכית מהמובילים בעולם."],
  ["שירות אישי", "ישירות ממני, מהמדידה ועד אחרי ההתקנה."],
  ["דיוק בהתקנה", "מדידות מדויקות, גימור נקי ועבודה ללא פשרות."],
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 pt-12 pb-24 sm:pt-16 sm:pb-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl shadow-luxe ring-1 ring-border">
              <img src={PORTRAIT} alt="עבודת התקנה" className="w-full object-cover aspect-[4/5]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block max-w-[16rem] rounded-2xl bg-white p-5 shadow-luxe ring-1 ring-border">
              <div className="font-display text-3xl text-[color:var(--brand)]">+15</div>
              <div className="mt-1 text-sm text-[color:var(--ink)]/70">
                שנות ניסיון בעיצוב, ייצור והתקנה של דלתות יוקרה.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pr-10">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-balance leading-[1.1] text-[color:var(--ink)]">
              עבודת אומנות{" "}
              <span className="text-[color:var(--brand)]">בכל דלת.</span>
            </h2>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map(([t, d]) => (
                <li key={t} className="flex gap-3 rounded-xl bg-secondary/60 p-4 ring-1 ring-border">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--brand)] text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <div className="font-display text-base text-[color:var(--ink)]">{t}</div>
                    <div className="text-sm text-[color:var(--ink)]/65">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
