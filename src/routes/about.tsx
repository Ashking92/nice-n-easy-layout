import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Budget Homes" },
      { name: "description", content: "Learn about Budget Homes — making quality home ownership a reality across Maharashtra." },
      { property: "og:title", content: "About Budget Homes" },
      { property: "og:description", content: "Making quality home ownership a reality for everyone." },
      { property: "og:url", content: "/about" },
    ],
    links: [
      { rel: "canonical", href: "/about" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "About Us",
        url: "/about",
        description: "Learn about Budget Homes — making quality home ownership a reality across Maharashtra.",
        mainEntity: {
          "@type": "AboutPage",
          name: "About Budget Homes",
          description: "Budget Homes was founded with a simple belief: home ownership should be within everyone's reach.",
        },
      }),
    }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="max-w-3xl">
          <span className="text-warm-gold font-label-lg uppercase tracking-widest mb-4 block">About Budget Homes</span>
          <h1 className="text-headline-xl font-headline-xl text-primary mb-6">Affordable homes, built on trust</h1>
          <p className="text-body-lg text-on-surface-variant mb-6">
            Budget Homes was founded with a simple belief: home ownership should be within everyone's reach. We connect first-time buyers and seasoned investors with quality residences across Nalasopara, Boisar, Palghar, and Umroli — at prices that make sense.
          </p>
          <p className="text-body-lg text-on-surface-variant mb-10">
            From the first site visit to handover and beyond, our team handles property selection, legal verification, financing guidance, and long-term management. We're not just brokers — we're partners in your property journey.
          </p>
          <Link to="/contact" className="inline-flex items-center bg-deep-navy text-on-primary px-8 py-4 rounded font-label-lg hover:opacity-90 transition-all">
            Talk to our team <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
