import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Nav } from "@/components/site/Nav";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";

const PAGE_URL = "https://shaydoors.co.il/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "שי דלתות יוקרה — דלתות קו־אפס בעיצוב אישי" },
      {
        name: "description",
        content:
          "שי דלתות יוקרה מתמחה בייצור והתקנה של דלתות קו־אפס, חיפויי חזית ודלתות כניסה מעוצבות. פותחים דלת לאיכות.",
      },
      { property: "og:title", content: "שי דלתות יוקרה — פותחים דלת לאיכות" },
      {
        property: "og:description",
        content: "דלתות קו־אפס, חיפויי אלומיניום, פורצלן וזכוכית בייצור והתקנה אישית.",
      },
      { property: "og:url", content: PAGE_URL },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Footer />
    </main>
  );
}
