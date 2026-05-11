import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  "line-zero-aluminum": "קו־אפס · אלומיניום",
  "line-zero-porcelain": "קו־אפס · פורצלן",
  "line-zero-glass": "קו־אפס · זכוכית",
  "entrance-modern": "כניסה · מודרני",
  "entrance-provence": "כניסה · פרובנס",
  synagogue: "בתי כנסת",
  "front-views": "מבטי חזית",
  special: "עבודות מיוחדות",
};

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "הכל" },
  { key: "line-zero-aluminum", label: "אלומיניום" },
  { key: "line-zero-porcelain", label: "פורצלן" },
  { key: "line-zero-glass", label: "זכוכית" },
  { key: "entrance-modern", label: "כניסה מודרנית" },
  { key: "entrance-provence", label: "כניסה פרובנס" },
  { key: "synagogue", label: "בתי כנסת" },
  { key: "front-views", label: "מבטי חזית" },
  { key: "special", label: "מיוחדות" },
];

type Img = { url: string; category: string };

function transform(url: string, transformString: string) {
  return url.replace("/upload/", `/upload/${transformString}/`);
}

export function Gallery() {
  const [images, setImages] = useState<Img[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [visible, setVisible] = useState(12);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    fetch("/images_paths.csv")
      .then((response) => response.text())
      .then((text) => {
        const lines = text.trim().split("\n");
        const headers = lines[0].split(",").map((header) => header.trim());
        const rows = lines.slice(1).map((line) => line.split(","));
        const nextImages: Img[] = [];

        rows.forEach((row) => {
          headers.forEach((category, index) => {
            const url = row[index]?.trim();
            if (url?.startsWith("https://res.cloudinary.com/")) {
              nextImages.push({ url, category });
            }
          });
        });

        setImages(nextImages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? images : images.filter((image) => image.category === filter)),
    [filter, images],
  );

  useEffect(() => setVisible(12), [filter]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((current) =>
            current >= filtered.length ? current : current + 12,
          );
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length, visible]);

  return (
    <section
      id="gallery"
      className="relative scroll-mt-24 bg-[color:var(--surface)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div className="filters-scroll flex min-w-max gap-2 pb-1 sm:flex-wrap sm:justify-center">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all sm:px-5 ${
                  filter === item.key
                    ? "border-[color:var(--brand)] bg-[color:var(--brand)] text-white shadow-brand"
                    : "border-[color:var(--border)] bg-white text-[color:var(--ink)]/72 hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] animate-pulse rounded-2xl bg-[color:var(--surface-strong)]"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filtered.slice(0, visible).map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  onClick={() => setLightbox(image.url)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[color:var(--surface-strong)] shadow-soft transition-transform duration-500 hover:-translate-y-1"
                >
                  <img
                    src={transform(image.url, "f_auto,q_auto,w_700,c_fill")}
                    alt={CATEGORY_LABELS[image.category] || ""}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/28 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}

          {filtered.length > visible && (
            <div ref={sentinelRef} className="mt-10 flex justify-center sm:mt-12" aria-hidden>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--border)] border-t-[color:var(--brand)]" />
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-[color:var(--overlay)]/95 p-4 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="סגור"
            className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/15 sm:left-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={transform(lightbox, "f_auto,q_auto,w_1600")}
            className="max-h-[90vh] max-w-[95vw] rounded-2xl shadow-luxe"
            alt=""
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
