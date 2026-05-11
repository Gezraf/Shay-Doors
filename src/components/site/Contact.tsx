import { useState } from "react";
import { ArrowLeft, Clock, Mail, Phone } from "lucide-react";
import { SectionEyebrow } from "./Services";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const message = data.get("message") || "";
    const text = `שלום שי, שמי ${name}.%0A${message}%0Aטלפון: ${phone}`;
    window.open(`https://wa.me/972525085086?text=${text}`, "_blank");
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 bg-[color:var(--surface)] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <SectionEyebrow>נדבר?</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[color:var(--ink)] text-balance sm:text-5xl lg:text-6xl">
            בואו נתחיל את <span className="text-[color:var(--brand)]">הפרויקט</span> שלכם.
          </h2>
          <p className="mt-5 text-base leading-7 text-[color:var(--ink)]/65 sm:text-lg sm:leading-8">
            השאירו פרטים או חייגו ישירות, ונחזור אליכם עם הצעת מחיר מדויקת ופתרון מותאם לבית שלכם.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <aside className="space-y-4 lg:col-span-5">
            <ContactRow
              icon={Phone}
              label="חייגו ישירות"
              value="052-508-5086"
              href="tel:+972525085086"
            />
            <ContactRow
              icon={WhatsAppIcon}
              label="WhatsApp מיידי"
              value="שלחו הודעה"
              href="https://wa.me/972525085086"
            />
            <ContactRow
              icon={Mail}
              label='דוא"ל'
              value="shayshitrit1974@gmail.com"
              href="mailto:shayshitrit1974@gmail.com"
            />

            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-6 shadow-soft">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--brand)]">
                <Clock className="h-4 w-4" /> שעות פעילות
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-[color:var(--ink)]/80">
                <span>ראשון – חמישי</span>
                <span className="text-left font-semibold">07:30 – 19:00</span>
                <span>שישי</span>
                <span className="text-left font-semibold">07:30 – 12:00</span>
              </div>
            </div>
          </aside>

          <form
            onSubmit={onSubmit}
            className="grid gap-5 self-start rounded-[1.6rem] bg-white p-6 shadow-soft ring-1 ring-[color:var(--border)] sm:p-8 lg:col-span-7"
          >
            <Field label="שם מלא" name="name" required placeholder="לדוגמה: דנה לוי" />
            <Field label="טלפון" name="phone" type="tel" required placeholder="050-0000000" />
            <Field
              label="כתובת אימייל (אופציונלי)"
              name="email"
              type="email"
              placeholder="you@email.com"
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-[color:var(--ink)]/80">
                פרויקט / הערות
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="ספרו לנו על הפרויקט: סוג הדלת, סגנון, לוחות זמנים..."
                className="w-full rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/25"
              />
            </div>

            <button
              type="submit"
              className="mt-1 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 text-base font-semibold text-white shadow-[0_10px_25px_-10px_rgba(37,211,102,0.7)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
              שליחה ב-WhatsApp <ArrowLeft className="h-4 w-4" />
            </button>

            {sent && (
              <p className="text-sm text-[color:var(--ink)]/70">
                נפתח עבורכם חלון WhatsApp לשליחת ההודעה. נחזור אליכם בהקדם.
              </p>
            )}

            <p className="text-xs leading-6 text-[color:var(--ink)]/55">
              בלחיצה על שליחה את/ה מאשר/ת לנו לחזור אליך לגבי הפנייה.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[color:var(--ink)]/80">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/25"
      />
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between rounded-[1.4rem] border border-[color:var(--border)] bg-white p-5 transition-all hover:border-[color:var(--brand)] hover:shadow-soft"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)] transition-transform group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink)]/55">
            {label}
          </div>
          <div className="mt-1 truncate font-display text-lg text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--brand)]">
            {value}
          </div>
        </div>
      </div>
      <ArrowLeft className="h-5 w-5 shrink-0 text-[color:var(--brand)] transition-transform group-hover:-translate-x-1" />
    </a>
  );
}
