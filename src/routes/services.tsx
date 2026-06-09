import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const HERO =
  "https://lh3.googleusercontent.com/aida/AP1WRLtRTceq5CkOCg6SFvbxexExmMlZMhZauNHrI8HVSV0tAfWjUjwFWKpJWeGhzOfVK7U-JtzsFUTaK_V_rG1Fj-8xIbu2pFLloGh1Gn8cJvbGWFV8yzz8diIBv37Hr0PONwnGT1fRsEHff2AoaWubAWLqPyFzDKgCnsemvUSqtfM9KOJlnO5LO8O2ZxFEpEBDzUkwmJNv9pi36_CrPiMPRZ9U1kKG93m_HS64Cy6lc2PIvZEn6ECq8cX6hQ";
const INVEST =
  "https://lh3.googleusercontent.com/aida/AP1WRLt1pqJyFhcLARoPqVFVC-ksrta9X-mD3GaRRVpSP8WbyBARZU9kY0rYJsIQCGR1C3Qy2jyx3w9vWokcvQqB5wxYW3gS26Zj9l5tKahXsOT21qQKiJHXG0Y1_FsDTnS73Pz6fDVGrnyDtyvQYHLdmKzfKpzg6vR2BssFubg18S6kjcYDid8mHxaA-5GpQ6sBqzBug_yST79Mc5H2Suz73g2-3yF6lbfE0DzARWyC9LFMhlvbXyQUaftXVR8";
const MGMT =
  "https://lh3.googleusercontent.com/aida/AP1WRLvutttlnZXynKknxDYbn6CdoBFAT6vmDVC_-nB3f3lfTodjgitXRhdRtDidVDP8NQHUUJngSwtx_AFL3M1VawuJUnRuT4Hat6faytC-PJoBdwQKbod6H-n4cfwZJP33W2DAzYpL0rCAJhuecS4y5uwMPqMGL_dY1nbDRfDSbK_L_6ZtwjUFwXzS4wWdV_rXyttOdc9qHyvodqrjurTIrJg0na4FefY1uTZ7e9QNOisMPsuEwvEHKUZRSnk";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Investment — Budget Homes" },
      { name: "description", content: "Home buying assistance, investment opportunities, and property management services from Budget Homes." },
      { property: "og:title", content: "Services & Investment — Budget Homes" },
      { property: "og:description", content: "Expert services for intelligent real estate decisions." },
      { property: "og:image", content: HERO },
      { property: "og:url", content: "/services" },
    ],
    links: [
      { rel: "canonical", href: "/services" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Services & Investment",
        url: "/services",
        description: "Home buying assistance, investment opportunities, and property management services from Budget Homes.",
        mainEntity: [
          {
            "@type": "Service",
            serviceType: "Home Buying Assistance",
            provider: { "@type": "Organization", name: "Budget Homes" },
            areaServed: { "@type": "City", name: "Nalasopara, Boisar, Palghar, Umroli" },
            description: "Expert guidance from search to keys, including legal and financial advisory.",
          },
          {
            "@type": "Service",
            serviceType: "Investment Opportunities",
            provider: { "@type": "Organization", name: "Budget Homes" },
            areaServed: { "@type": "City", name: "Nalasopara, Boisar, Palghar, Umroli" },
            description: "High-appreciation properties with data-driven recommendations.",
          },
          {
            "@type": "Service",
            serviceType: "Property Management",
            provider: { "@type": "Organization", name: "Budget Homes" },
            areaServed: { "@type": "City", name: "Nalasopara, Boisar, Palghar, Umroli" },
            description: "Tenant sourcing, maintenance and transparent reports.",
          },
        ],
      }),
    }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center overflow-hidden bg-deep-navy">
          <div className="absolute inset-0 z-0 opacity-40">
            <img alt="Professional home buying assistance" className="w-full h-full object-cover" src={HERO} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 to-transparent z-10" />
          <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
            <div className="max-w-2xl">
              <span className="text-warm-gold font-label-lg uppercase tracking-widest mb-4 block">Our Expertise</span>
              <h1 className="text-headline-xl text-on-primary font-headline-xl mb-6">
                Expert Services for Intelligent Real Estate Decisions
              </h1>
              <p className="text-body-lg text-on-primary/80 mb-8 max-w-lg">
                From your first home purchase to building a multi-property portfolio, we provide the strategic guidance and management you need to thrive.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-warm-gold text-on-primary-fixed px-8 py-4 rounded font-label-lg hover:brightness-110 transition-all">
                  Explore Investment Plans
                </button>
                <button className="border border-on-primary text-on-primary px-8 py-4 rounded font-label-lg hover:bg-on-primary hover:text-deep-navy transition-all">
                  View Our Listings
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg font-headline-lg text-primary mb-4">Empowering Your Property Journey</h2>
            <div className="h-1 w-20 bg-warm-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 group relative overflow-hidden bg-white border border-outline-variant rounded-xl hover-lift">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="p-10 flex flex-col justify-center">
                  <div className="mb-6 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">real_estate_agent</span>
                  </div>
                  <h3 className="text-headline-md font-headline-md text-deep-navy mb-4">Home Buying Assistance</h3>
                  <p className="text-body-md text-on-surface-variant mb-6">
                    Our experienced team is ready to guide you through the complex buying process. From property selection to final documentation, we ensure a smooth, stress-free path to ownership.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Custom Property Matches", "Legal & Title Verification", "Financial Advisory"].map((i) => (
                      <li key={i} className="flex items-center gap-3 text-label-lg text-on-surface">
                        <span className="material-symbols-outlined text-warm-gold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                  <a className="inline-flex items-center text-primary font-label-lg group-hover:underline" href="/contact">
                    CONTACT AN EXPERT <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                  </a>
                </div>
                <div className="hidden lg:block relative min-h-[400px]">
                  <img alt="Counseling" className="absolute inset-0 w-full h-full object-cover" src={HERO} />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col bg-deep-navy text-on-primary rounded-xl overflow-hidden hover-lift border border-deep-navy group">
              <div className="h-64 overflow-hidden">
                <img alt="Investment growth" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" src={INVEST} />
              </div>
              <div className="p-10 flex-grow">
                <div className="mb-6 w-12 h-12 bg-warm-gold/20 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-warm-gold text-3xl">trending_up</span>
                </div>
                <h3 className="text-headline-md font-headline-md mb-4 text-warm-gold">Investment Opportunities</h3>
                <p className="text-body-md text-on-primary/70 mb-8">
                  Looking for a smart investment? Explore properties with high appreciation potential. We help seasoned investors and first-timers make informed, data-driven decisions.
                </p>
                <button className="w-full py-4 bg-warm-gold text-on-primary-fixed rounded font-label-lg hover:brightness-110 transition-all uppercase tracking-wider">
                  Get Started
                </button>
              </div>
            </div>

            <div className="md:col-span-12 bg-white border border-outline-variant rounded-xl overflow-hidden hover-lift">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="md:w-1/3 h-64 md:h-auto relative">
                  <img alt="Property management" className="absolute inset-0 w-full h-full object-cover" src={MGMT} />
                </div>
                <div className="md:w-2/3 p-10 md:p-16 flex flex-col justify-center">
                  <div className="mb-6 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
                  </div>
                  <h3 className="text-headline-md font-headline-md text-deep-navy mb-4">Property Management</h3>
                  <p className="text-body-lg text-on-surface-variant mb-8 max-w-2xl">
                    For investors, our property management services ensure that your investment is well-maintained and consistently generates returns. Sit back and relax while we handle tenant sourcing, maintenance, and administrative details.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    {[
                      ["Tenant Screening", "Reliable"],
                      ["Maintenance", "Proactive"],
                      ["Reports", "Transparent"],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-paper-white p-4 border border-outline-variant rounded">
                        <span className="text-label-sm uppercase tracking-widest text-on-surface-variant block mb-2">{k}</span>
                        <p className="text-headline-md font-bold text-primary">{v}</p>
                      </div>
                    ))}
                  </div>
                  <button className="inline-flex items-center justify-center px-10 py-4 bg-deep-navy text-on-primary rounded font-label-lg hover:opacity-95 self-start transition-all">
                    ENQUIRE ABOUT MANAGEMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-container-high py-section-gap">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
            <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-6">Ready to find your dream home without breaking the bank?</h2>
            <p className="text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-10">
              Browse our listings, connect with our team, and let Budget Homes be your partner in affordable living.
            </p>
            <a
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] text-white rounded-lg font-label-lg hover:brightness-105 transition-all shadow-lg"
              href="http://wa.link/a8stio"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined">chat</span>
              CONTACT US ON WHATSAPP
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
