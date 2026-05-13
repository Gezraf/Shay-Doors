import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useLocation,
  useRouter,
} from "@tanstack/react-router";

import { AccessibilityMenu } from "@/components/site/AccessibilityMenu";
import appCss from "../styles.css?url";

const SITE_URL = "https://shaydoors.co.il";
const OG_IMAGE =
  "https://res.cloudinary.com/dkgx2zv2g/image/upload/f_auto,q_auto,w_1600/v1754534561/WhatsApp_Image_2025-08-06_at_22.39.05_nzflv4.jpg";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "שי דלתות יוקרה",
  url: SITE_URL,
  image: OG_IMAGE,
  slogan: "פותחים דלת לאיכות",
  telephone: "+972525085086",
  email: "shayshitrit1974@gmail.com",
  areaServed: "IL",
  addressCountry: "IL",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "07:30",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "07:30",
      closes: "12:00",
    },
  ],
  sameAs: ["https://www.facebook.com/shay.shitrit.9", "https://wa.me/972525085086"],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn&apos;t load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "שי דלתות יוקרה — דלתות קו־אפס, חיפויי חזית ודלתות כניסה" },
      {
        name: "description",
        content:
          "שי דלתות יוקרה מתמחה בייצור והתקנה של דלתות קו־אפס, חיפויי אלומיניום, פורצלן וזכוכית ודלתות כניסה מעוצבות. שירות אישי, גימור מדויק והתקנה בכל הארץ.",
      },
      { name: "author", content: "שי דלתות יוקרה" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#1d4ed8" },
      { property: "og:site_name", content: "שי דלתות יוקרה" },
      { property: "og:title", content: "שי דלתות יוקרה — דלתות קו־אפס, חיפויי חזית ודלתות כניסה" },
      {
        property: "og:description",
        content: "דלתות קו־אפס, חיפויי חזית ודלתות כניסה מעוצבות בייצור והתקנה אישית.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "he_IL" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "שי דלתות יוקרה — דלתות קו־אפס, חיפויי חזית ודלתות כניסה" },
      {
        name: "twitter:description",
        content: "דלתות קו־אפס, חיפויי חזית ודלתות כניסה מעוצבות בייצור והתקנה אישית.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700;800&family=Heebo:wght@300;400;500;700;800&display=swap",
      },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div key={location.pathname} className="page-shell">
        <Outlet />
      </div>
      <AccessibilityMenu />
    </QueryClientProvider>
  );
}
