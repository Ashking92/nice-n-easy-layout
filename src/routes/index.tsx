import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida/AP1WRLtRTceq5CkOCg6SFvbxexExmMlZMhZauNHrI8HVSV0tAfWjUjwFWKpJWeGhzOfVK7U-JtzsFUTaK_V_rG1Fj-8xIbu2pFLloGh1Gn8cJvbGWFV8yzz8diIBv37Hr0PONwnGT1fRsEHff2AoaWubAWLqPyFzDKgCnsemvUSqtfM9KOJlnO5LO8O2ZxFEpEBDzUkwmJNv9pi36_CrPiMPRZ9U1kKG93m_HS64Cy6lc2PIvZEn6ECq8cX6hQ";

const FEATURED = [
  {
    name: "Nidan Empire",
    location: "Nalasopara (W)",
    price: "₹24.5 L+",
    bhk: "1/2 BHK",
    size: "450-680 sq.ft",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLsLyF0Tpm65MOotM2LqqO39P_eimFDkXQTJh0vxnUg9AYxVLDCaTh3a-yZixojt8lBiOK8nLRM71rewpAsTIL_xXMgWEMWisJIkezrn9MiuoCtS9dSWVfVcQStqYlZvkOhVzn2aNMen0ZZ4KGuWypbHqbe1_tTM7Vx63hDJTp495fDhklX-vAFJywVmEvj_kDD4vjm_AoqEKWVLNjP2RuuEQLb9ETIolGXQNr_uY4NkV7gLKgfIZ6-3wjk",
  },
  {
    name: "G.M Thakur City",
    location: "Boisar East",
    price: "₹18.0 L+",
    bhk: "1 BHK",
    size: "420 sq.ft",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLtnAI06jG6tWg73fQ1CFqmU6hyKTlDZBOuTBT0Yx4YujnPJq1jtNIslfa-xJmtcfUl02VLRyvACGo7PlWYASQ_Si3Anmx-uRDdtwCmVRGm606_l2MFN0rRI5ot8Oc5tnExxK0MbCPtXUhQy8vL9z6YBcfzBErkyuxYRF_fKaGWznVxqzaIdk4JtQwlj6duAc0x-esLKNrfbqD9WnlqdlrfcUtNoXX47fp5eocypcOLCnNw2IeeFAb__4Jg",
  },
  {
    name: "Fair Township",
    location: "Palghar West",
    price: "₹22.5 L+",
    bhk: "1/2 BHK",
    size: "550 sq.ft",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcToIKHdzVG4dTcatU8g-NWoEjAKX5I-ah9c5LvreVNGJGlxB1XpUNlrB5CPG5g5WQtYaB70S03aDwxi5G8mGS6V82ieWgAGppK9PoeBXWt9NEYV0hlVtMMXVenwvMjtioTOrCIYvDZldjenfylVvEfpL-4ofgkwJhCxjr-_lBIBCFqAjjj0MH7wSvEA2fvfhD0WYXZSgdeklOafF5sqqhyS-1H-exUFDooU7Xt7grFf2vujvCqTFiA4lHOprKeYxO9GdRqvt_thQ",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Budget Homes — Affordable Quality Living in Maharashtra" },
      { name: "description", content: "Discover budget-friendly apartments and homes in Nalasopara, Boisar, Palghar, and Umroli." },
      { property: "og:title", content: "Budget Homes — Affordable Quality Living" },
      { property: "og:description", content: "Discover budget-friendly apartments and homes in Maharashtra." },
      { property: "og:image", content: HERO_IMG },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center overflow-hidden bg-deep-navy">
          <div className="absolute inset-0 z-0 opacity-40">
            <img alt="Budget Homes hero" className="w-full h-full object-cover" src={HERO_IMG} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 to-transparent z-10" />
          <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
            <div className="max-w-2xl">
              <span className="text-warm-gold font-label-lg uppercase tracking-widest mb-4 block">Welcome to Budget Homes</span>
              <h1 className="text-headline-xl text-on-primary font-headline-xl mb-6">High Value, Affordable Living in Maharashtra</h1>
              <p className="text-body-lg text-on-primary/80 mb-8 max-w-lg">
                Making home ownership a reality for everyone. Quality residences at budget-friendly prices across Nalasopara, Boisar, Palghar and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/properties" className="bg-warm-gold text-on-primary-fixed px-8 py-4 rounded font-label-lg hover:brightness-110 transition-all">
                  Browse Properties
                </Link>
                <Link to="/contact" className="border border-on-primary text-on-primary px-8 py-4 rounded font-label-lg hover:bg-on-primary hover:text-deep-navy transition-all">
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-surface-container-low py-12">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["500+", "Happy Families"],
              ["24+", "Active Listings"],
              ["4", "Prime Locations"],
              ["10+", "Years of Trust"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-headline-lg font-headline-lg text-primary">{n}</div>
                <div className="text-label-lg uppercase tracking-widest text-on-surface-variant mt-2">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured properties */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-warm-gold font-label-lg uppercase tracking-widest mb-2 block">Featured</span>
              <h2 className="text-headline-lg font-headline-lg text-primary">Hand-picked Properties</h2>
            </div>
            <Link to="/properties" className="hidden md:inline-flex items-center text-primary font-label-lg hover:underline">
              View all <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED.map((p) => (
              <article key={p.name} className="property-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group">
                <div className="h-56 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-headline-md font-headline-md text-deep-navy mb-1">{p.name}</h3>
                  <div className="flex items-center text-on-surface-variant text-body-md mb-4">
                    <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                    {p.location}
                  </div>
                  <div className="flex gap-3 mb-4">
                    <span className="bg-surface-variant/50 px-3 py-1 rounded text-label-sm text-deep-navy">{p.bhk}</span>
                    <span className="bg-surface-variant/50 px-3 py-1 rounded text-label-sm text-deep-navy">{p.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-body-lg font-bold text-deep-navy">{p.price}</div>
                      <div className="text-label-sm text-outline">Starting Price</div>
                    </div>
                    <Link to="/properties" className="text-primary font-label-lg hover:underline">Details →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Services teaser */}
        <section className="bg-deep-navy text-on-primary py-section-gap">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "real_estate_agent", title: "Home Buying", desc: "Expert guidance from search to keys, including legal and financial advisory." },
              { icon: "trending_up", title: "Investment", desc: "High-appreciation properties with data-driven recommendations." },
              { icon: "admin_panel_settings", title: "Property Management", desc: "Tenant sourcing, maintenance and transparent reports." },
            ].map((s) => (
              <div key={s.title} className="p-8 border border-on-primary/10 rounded-xl hover:border-warm-gold transition-colors">
                <div className="w-12 h-12 bg-warm-gold/20 rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-warm-gold text-3xl">{s.icon}</span>
                </div>
                <h3 className="text-headline-md font-headline-md text-warm-gold mb-3">{s.title}</h3>
                <p className="text-body-md text-on-primary/70 mb-6">{s.desc}</p>
                <Link to="/services" className="inline-flex items-center text-on-primary font-label-lg hover:text-warm-gold">
                  Learn more <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </Link>
              </div>
            ))}
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
