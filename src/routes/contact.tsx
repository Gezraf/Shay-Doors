import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

const PAGE_URL = "https://shaydoors.co.il/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "צרו קשר — שי דלתות יוקרה" },
      {
        name: "description",
        content:
          "צרו קשר לקבלת הצעת מחיר עבור דלתות קו־אפס, חיפויי אלומיניום, פורצלן, זכוכית ודלתות כניסה מעוצבות. טלפון 052-508-5086.",
      },
      { property: "og:title", content: "צרו קשר — שי דלתות יוקרה" },
      {
        property: "og:description",
        content: "דברו איתנו לקבלת הצעת מחיר ולהתחלת הפרויקט שלכם.",
      },
      { property: "og:url", content: PAGE_URL },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-4 sm:pt-6" />
      <Contact />
      <Footer />
    </main>
  );
}
