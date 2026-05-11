import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Nav } from "@/components/site/Nav";

const PAGE_URL = "https://shaydoors.co.il/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "גלריית עבודות — שי דלתות יוקרה" },
      {
        name: "description",
        content:
          "גלריית פרויקטים של שי דלתות יוקרה: דלתות קו־אפס, חיפויי אלומיניום, פורצלן וזכוכית, דלתות כניסה ועבודות מיוחדות.",
      },
      { property: "og:title", content: "גלריית עבודות — שי דלתות יוקרה" },
      {
        property: "og:description",
        content: "צפו בפרויקטים נבחרים של דלתות קו־אפס, חיפויי חזית ודלתות כניסה מעוצבות.",
      },
      { property: "og:url", content: PAGE_URL },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-28 sm:pt-32">
        <header className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <h1 className="font-display text-4xl leading-[1.1] text-[color:var(--ink)] text-balance sm:text-5xl lg:text-6xl">
            גלריית <span className="text-[color:var(--brand)]">עבודות</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ink)]/65">
            סננו לפי קטגוריה כדי לראות את העבודות שמדברות אליכם, מדלתות קו־אפס ועד חיפויי חזית
            וכניסות מעוצבות.
          </p>
        </header>
      </div>
      <Gallery />
      <Footer />
    </main>
  );
}
