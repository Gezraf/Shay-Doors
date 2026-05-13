import { Link } from "@tanstack/react-router";
import { Facebook, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="bg-[color:var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-3 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="לוגו" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
              <span className="font-display text-xl text-white sm:text-2xl">
                שי <span className="text-[color:var(--brand-soft)]">דלתות יוקרה</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs leading-7 text-white/62">
              מומחה בייצור והתקנה של דלתות קו-אפס איכותיות עם שירות מקצועי ואישי.
            </p>
            <p className="mt-6 font-display text-lg font-bold text-[color:var(--brand-soft)]">
              "פותחים דלת לאיכות"
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--brand-soft)]">
              ניווט מהיר
            </h4>
            <ul className="mt-5 space-y-3 text-white/76">
              <li>
                <Link to="/" className="transition hover:text-white">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="transition hover:text-white">
                  גלריה
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-white">
                  צרו קשר
                </Link>
              </li>
            </ul>
            <div className="mt-6 text-sm leading-7 text-white/58">
              <p className="font-semibold text-white/76">שעות פעילות:</p>
              <p>ראשון – חמישי: 07:30 – 19:00</p>
              <p>שישי: 07:30 – 12:00</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--brand-soft)]">
              צרו קשר
            </h4>
            <ul className="mt-5 space-y-3 text-white/76">
              <li>
                <a
                  className="inline-flex items-center gap-2 transition hover:text-white"
                  href="tel:+972525085086"
                >
                  <Phone className="h-4 w-4 text-[color:var(--brand-soft)]" />
                  <span>052-508-5086</span>
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 transition hover:text-white"
                  href="mailto:shayshitrit1974@gmail.com"
                >
                  <Mail className="h-4 w-4 text-[color:var(--brand-soft)]" />
                  <span>shayshitrit1974@gmail.com</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Social href="https://wa.me/972525085086" label="WhatsApp">
                <WhatsAppIcon className="h-5 w-5" />
              </Social>
              <Social href="https://www.facebook.com/shay.shitrit.9" label="Facebook">
                <Facebook className="h-5 w-5" />
              </Social>
            </div>
          </div>
        </div>

        <div className="mt-12 hairline opacity-40" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-xs text-white/46 sm:flex-row">
          <p>© {new Date().getFullYear()} שי דלתות יוקרה. כל הזכויות שמורות.</p>
          <p>פותחים דלת לאיכות</p>
        </div>
      </div>

      <a
        href="https://wa.me/972525085086"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 left-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-luxe transition-transform hover:scale-110 sm:bottom-6 sm:left-6 sm:h-14 sm:w-14"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.06] text-white/76 transition-all hover:scale-105 hover:bg-[color:var(--brand)] hover:text-white"
    >
      {children}
    </a>
  );
}
