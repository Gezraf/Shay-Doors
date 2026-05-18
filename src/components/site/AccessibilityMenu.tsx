import { useEffect, useRef, useState } from "react";
import {
  Accessibility,
  Contrast,
  Link2,
  PauseCircle,
  RotateCcw,
  Type,
  Underline,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

type Settings = {
  fontScale: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  pauseAnimations: boolean;
};

const DEFAULTS: Settings = {
  fontScale: 1,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  underlineLinks: false,
  readableFont: false,
  bigCursor: false,
  pauseAnimations: false,
};

const STORAGE_KEY = "shay-a11y-v1";

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = `${settings.fontScale * 100}%`;
    html.classList.toggle("a11y-contrast", settings.highContrast);
    html.classList.toggle("a11y-grayscale", settings.grayscale);
    html.classList.toggle("a11y-highlight-links", settings.highlightLinks);
    html.classList.toggle("a11y-underline-links", settings.underlineLinks);
    html.classList.toggle("a11y-readable-font", settings.readableFont);
    html.classList.toggle("a11y-big-cursor", settings.bigCursor);
    html.classList.toggle("a11y-pause-animations", settings.pauseAnimations);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  return (
    <>
      <button
        type="button"
        aria-label="פתיחת תפריט נגישות"
        onClick={() => setOpen(true)}
        className="fixed bottom-[5.75rem] left-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[color:var(--brand)] text-white shadow-luxe transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[color:var(--brand)]/35 sm:bottom-[6.5rem] sm:left-6 sm:h-14 sm:w-14"
      >
        <Accessibility className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-stretch sm:justify-start"
          role="dialog"
          aria-modal="true"
          aria-label="תפריט נגישות"
        >
          <button
            aria-label="סגירת התפריט"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <aside
            className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-[1.75rem] bg-white text-[color:var(--ink)] shadow-2xl sm:h-full sm:max-h-none sm:w-[24rem] sm:rounded-none"
            dir="rtl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[color:var(--border)] bg-white/95 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-2 font-semibold">
                <Accessibility className="h-5 w-5 text-[color:var(--brand)]" />
                תפריט נגישות
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                aria-label="סגור"
                className="grid h-10 w-10 place-items-center rounded-xl transition hover:bg-[color:var(--surface)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5 text-sm">
              <section className="rounded-[1.4rem] bg-[color:var(--surface)] p-4">
                <h3 className="mb-3 font-semibold text-[color:var(--ink)]/75">גודל טקסט</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      set("fontScale", Math.max(0.85, +(settings.fontScale - 0.1).toFixed(2)))
                    }
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl border border-[color:var(--border)] bg-white py-2 font-medium transition hover:border-[color:var(--brand)]/40"
                  >
                    <ZoomOut className="h-4 w-4" /> הקטנה
                  </button>
                  <span className="w-16 text-center font-semibold">
                    {Math.round(settings.fontScale * 100)}%
                  </span>
                  <button
                    onClick={() =>
                      set("fontScale", Math.min(1.5, +(settings.fontScale + 0.1).toFixed(2)))
                    }
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl border border-[color:var(--border)] bg-white py-2 font-medium transition hover:border-[color:var(--brand)]/40"
                  >
                    <ZoomIn className="h-4 w-4" /> הגדלה
                  </button>
                </div>
              </section>

              <section className="space-y-2">
                <Toggle
                  icon={Contrast}
                  label="ניגודיות גבוהה"
                  active={settings.highContrast}
                  onClick={() => set("highContrast", !settings.highContrast)}
                />
                <Toggle
                  icon={Contrast}
                  label="גווני אפור"
                  active={settings.grayscale}
                  onClick={() => set("grayscale", !settings.grayscale)}
                />
                <Toggle
                  icon={Link2}
                  label="הדגשת קישורים"
                  active={settings.highlightLinks}
                  onClick={() => set("highlightLinks", !settings.highlightLinks)}
                />
                <Toggle
                  icon={Underline}
                  label="קו תחתון לקישורים"
                  active={settings.underlineLinks}
                  onClick={() => set("underlineLinks", !settings.underlineLinks)}
                />
                <Toggle
                  icon={Type}
                  label="פונט קריא"
                  active={settings.readableFont}
                  onClick={() => set("readableFont", !settings.readableFont)}
                />
                <Toggle
                  icon={Accessibility}
                  label="סמן עכבר גדול"
                  active={settings.bigCursor}
                  onClick={() => set("bigCursor", !settings.bigCursor)}
                />
                <Toggle
                  icon={PauseCircle}
                  label="עצירת אנימציות"
                  active={settings.pauseAnimations}
                  onClick={() => set("pauseAnimations", !settings.pauseAnimations)}
                />
              </section>

              <button
                onClick={() => setSettings(DEFAULTS)}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--ink)] px-4 py-3 text-white transition hover:opacity-95"
              >
                <RotateCcw className="h-4 w-4" /> איפוס הגדרות
              </button>

              <p className="text-xs leading-6 text-[color:var(--ink)]/56">
                האתר נבנה עם דגש על נגישות בהתאם לתקן הישראלי (ת״י 5568) ולהנחיות WCAG 2.1 ברמה AA.
                לפניות בנושא נגישות: 052-508-5086.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function Toggle({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-13 w-full items-center justify-between rounded-[1.2rem] border px-4 py-3 text-right transition ${
        active
          ? "border-[color:var(--brand)] bg-[color:var(--brand)]/8 text-[color:var(--brand-strong)]"
          : "border-[color:var(--border)] bg-white text-[color:var(--ink)] hover:bg-[color:var(--surface)]"
      }`}
    >
      <span className="flex items-center gap-2 font-medium">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span
        className={`grid h-6 w-10 place-items-center rounded-full transition ${
          active ? "bg-[color:var(--brand)]" : "bg-[color:var(--border)]"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${
            active ? "-translate-x-2" : "translate-x-2"
          }`}
        />
      </span>
    </button>
  );
}
