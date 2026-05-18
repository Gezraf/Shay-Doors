import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "דף הבית" },
  { to: "/gallery", label: "גלריה" },
  { to: "/contact", label: "צרו קשר" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const onHero = location.pathname === "/" && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-[color:var(--border)] bg-white/95 shadow-sm backdrop-blur-xl"
          : onHero
            ? "border-transparent bg-transparent"
            : "border-[color:var(--border)] bg-white/95 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/logo.svg"
            alt="לוגו"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-md object-contain"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span
              className={`font-display text-lg sm:text-xl ${
                onHero ? "text-white" : "text-[color:var(--ink)]"
              }`}
            >
              שי <span className="text-[color:var(--brand)]">דלתות יוקרה</span>
            </span>
            <span
              className={`text-[11px] font-medium tracking-wide sm:text-xs ${
                onHero ? "text-[color:var(--brand-soft)]" : "text-[color:var(--brand)]/80"
              }`}
            >
              פותחים דלת לאיכות
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-base font-medium md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative transition-colors ${
                onHero
                  ? "text-white/84 hover:text-white"
                  : "text-[color:var(--ink)]/75 hover:text-[color:var(--brand)]"
              }`}
              activeProps={{ className: "text-[color:var(--brand)]" }}
              activeOptions={{ exact: true }}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-[color:var(--brand)]" />
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+972525085086"
            className="hidden min-h-11 items-center gap-2 rounded-xl btn-brand px-5 py-2.5 text-sm font-bold sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            התקשרו עכשיו
          </a>
          <button
            aria-label="תפריט"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={`grid h-10 w-10 place-items-center rounded-xl transition md:hidden ${
              onHero
                ? "bg-white/10 text-white ring-1 ring-white/15"
                : "bg-[color:var(--surface)] text-[color:var(--ink)]"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[color:var(--border)] bg-white md:hidden">
          <div className="px-5 py-4">
            <div className="space-y-1 rounded-3xl bg-[color:var(--surface)] p-3">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block rounded-2xl px-4 py-3 text-[color:var(--ink)]/82 transition hover:bg-white"
                  activeProps={{
                    className: "bg-white font-semibold text-[color:var(--brand)] shadow-soft",
                  }}
                  activeOptions={{ exact: true }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+972525085086"
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl btn-brand px-5 py-3 font-bold"
              >
                <Phone className="h-4 w-4" /> 052-508-5086
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
