import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const PROPERTIES = [
  {
    name: "Nidan Empire",
    location: "Nalasopara (W)",
    price: "₹24.5 L+",
    bhk: "1/2 BHK",
    size: "450-680 sq.ft",
    featured: true,
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
  {
    name: "Riyansh Enclave",
    location: "Umroli (W)",
    price: "₹15.5 L+",
    bhk: "1 BHK",
    size: "380 sq.ft",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPBHZ6Byngg5jeQq8nfVnVXzWcN1E8lHDmmFs7OzWc6R9zJWwuS1vR0_9G0xYsdEzl4m61ZqJMpa_WyIhGK1F3b1qyHefPHOmS9If8dmtqeYnxCfo7o8hb_CoBY4D1xLHx1Q_G9wNl1ViuLXosvqE6ihY_Wq935Ysts-r6xgh7IPbWEFcNwiFaD6r2UMtmVrrR51g1NN41xG5MjmThstyTsH0ertlwdEYbfnKH9JBVMZO78XNM47nC_1ZrTUDWZ4x5hmFfZpovtqE",
  },
];

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties | Budget Homes — High Value, Affordable Living" },
      { name: "description", content: "Explore high-quality, affordable property listings in Nalasopara, Boisar, Palghar, and Umroli." },
      { property: "og:title", content: "Available Properties | Budget Homes" },
      { property: "og:description", content: "Browse 24 budget-friendly homes across Maharashtra." },
      { property: "og:url", content: "/properties" },
    ],
    links: [
      { rel: "canonical", href: "/properties" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Available Properties",
        url: "/properties",
        description: "Explore high-quality, affordable property listings in Nalasopara, Boisar, Palghar, and Umroli.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: PROPERTIES.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: `${p.bhk} apartment in ${p.location}. Starting at ${p.price}.`,
              image: p.img,
              offers: {
                "@type": "Offer",
                price: String(parseFloat(p.price.replace("₹", "").replace(" L+", "")) * 100000),
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
            },
          })),
        },
      }),
    }],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Filter sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div>
              <h2 className="text-headline-md font-headline-md text-primary mb-6">Refine Search</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-label-lg font-label-lg uppercase text-on-surface-variant">Location</label>
                  <div className="flex flex-col gap-2">
                    {["Nalasopara", "Boisar", "Palghar", "Umroli"].map((l) => (
                      <label key={l} className="flex items-center gap-3 cursor-pointer">
                        <input className="w-5 h-5 rounded border-outline-variant text-deep-navy focus:ring-deep-navy" type="checkbox" />
                        <span className="text-body-md">{l}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-label-lg font-label-lg uppercase text-on-surface-variant">Property Type</label>
                  <select className="w-full border border-outline-variant rounded p-3 text-body-md focus:ring-2 focus:ring-deep-navy focus:border-deep-navy transition-all">
                    <option>All Types</option>
                    <option>Apartments</option>
                    <option>Townhouses</option>
                    <option>Single-family Homes</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-label-lg font-label-lg uppercase text-on-surface-variant">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input className="w-1/2 border border-outline-variant rounded p-2 text-body-md focus:border-deep-navy focus:ring-0" placeholder="Min" type="text" />
                    <span className="text-outline">—</span>
                    <input className="w-1/2 border border-outline-variant rounded p-2 text-body-md focus:border-deep-navy focus:ring-0" placeholder="Max" type="text" />
                  </div>
                </div>
                <button className="w-full bg-forest-green text-on-primary py-3 rounded font-label-lg transition-all hover:opacity-90">
                  Apply Filters
                </button>
              </div>
            </div>
            <div className="p-6 bg-secondary-container/30 border border-secondary-fixed rounded flex flex-col gap-4">
              <span className="material-symbols-outlined text-secondary text-4xl">support_agent</span>
              <h3 className="font-headline-md text-headline-md text-secondary">Need Help?</h3>
              <p className="text-body-md text-on-surface-variant">Talk to our experts for personalized property recommendations.</p>
              <a className="text-secondary font-bold hover:underline flex items-center gap-2" href="http://wa.link/a8stio">
                WhatsApp Us <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </aside>

          {/* Grid */}
          <section className="flex-1">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-headline-xl font-headline-xl text-deep-navy mb-2">Available Properties</h1>
                <p className="text-body-lg text-on-surface-variant">Explore {PROPERTIES.length}+ budget-friendly homes waiting for you.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-label-lg">
                <span className="text-on-surface-variant">Sort by:</span>
                <select className="border-none bg-transparent font-bold text-deep-navy focus:ring-0 cursor-pointer">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROPERTIES.map((p) => (
                <article key={p.name} className="property-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.featured && (
                      <div className="absolute top-4 right-4 bg-warm-gold text-white px-3 py-1 text-label-sm font-label-lg rounded shadow-sm">FEATURED</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-headline-md font-headline-md text-deep-navy mb-1">{p.name}</h3>
                        <div className="flex items-center text-on-surface-variant text-body-md">
                          <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                          {p.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-body-lg font-bold text-deep-navy">{p.price}</div>
                        <div className="text-label-sm text-outline">Starting Price</div>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-6">
                      <span className="bg-surface-variant/50 px-3 py-1 rounded text-label-sm text-deep-navy flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">bed</span> {p.bhk}
                      </span>
                      <span className="bg-surface-variant/50 px-3 py-1 rounded text-label-sm text-deep-navy flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">straighten</span> {p.size}
                      </span>
                    </div>
                    <button className="w-full border border-deep-navy text-deep-navy py-3 rounded font-label-lg hover:bg-deep-navy hover:text-on-primary transition-all">
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <nav className="flex items-center justify-center gap-2 mt-12">
              <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-deep-navy hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-deep-navy bg-deep-navy text-on-primary rounded font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-deep-navy hover:text-on-primary transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-deep-navy hover:text-on-primary transition-colors">3</button>
              <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded hover:bg-deep-navy hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          </section>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
