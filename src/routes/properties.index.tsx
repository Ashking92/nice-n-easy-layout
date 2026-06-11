import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeSubscription } from "@/hooks/useRealtimeData";


const propertiesQuery = {
  queryKey: ["properties", "list"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "active")
      .order("sort_order");
    if (error) throw error;
    return data;
  },
};

export const Route = createFileRoute("/properties/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(propertiesQuery),
  head: () => ({
    meta: [
      { title: "Properties | Budget Homes — High Value, Affordable Living" },
      { name: "description", content: "Explore high-quality, affordable property listings in Nalasopara, Boisar, Palghar, and Umroli." },
      { property: "og:title", content: "Available Properties | Budget Homes" },
      { property: "og:description", content: "Browse budget-friendly homes across Maharashtra." },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const { data: properties = [] } = useQuery(propertiesQuery);
  const [locFilter, setLocFilter] = useState<string[]>([]);
  const [type, setType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = properties.filter((p) => {
    if (locFilter.length && !locFilter.some((l) => p.location.toLowerCase().includes(l.toLowerCase()))) return false;
    if (type !== "All" && p.property_type !== type) return false;
    if (minPrice && (p.price_numeric ?? 0) < Number(minPrice)) return false;
    if (maxPrice && (p.price_numeric ?? 0) > Number(maxPrice)) return false;
    return true;
  });

  const toggleLoc = (l: string) =>
    setLocFilter((cur) => (cur.includes(l) ? cur.filter((x) => x !== l) : [...cur, l]));

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-gutter">
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div>
              <h2 className="text-headline-md font-headline-md text-primary mb-6">Refine Search</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-label-lg font-label-lg uppercase text-on-surface-variant">Location</label>
                  <div className="flex flex-col gap-2">
                    {["Nalasopara", "Boisar", "Palghar", "Umroli"].map((l) => (
                      <label key={l} className="flex items-center gap-3 cursor-pointer">
                        <input
                          checked={locFilter.includes(l)}
                          onChange={() => toggleLoc(l)}
                          className="w-5 h-5 rounded border-outline-variant text-deep-navy focus:ring-deep-navy"
                          type="checkbox"
                        />
                        <span className="text-body-md">{l}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-label-lg font-label-lg uppercase text-on-surface-variant">Property Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-outline-variant rounded p-3 text-body-md">
                    <option>All</option>
                    <option>Apartment</option>
                    <option>Townhouse</option>
                    <option>Single-family Home</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-label-lg font-label-lg uppercase text-on-surface-variant">Price Range (INR)</label>
                  <div className="flex items-center gap-2">
                    <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-1/2 border border-outline-variant rounded p-2 text-body-md" placeholder="Min" type="number" />
                    <span className="text-outline">—</span>
                    <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-1/2 border border-outline-variant rounded p-2 text-body-md" placeholder="Max" type="number" />
                  </div>
                </div>
                <button onClick={() => { setLocFilter([]); setType("All"); setMinPrice(""); setMaxPrice(""); }} className="w-full border border-outline-variant py-3 rounded font-label-lg">
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-headline-xl font-headline-xl text-deep-navy mb-2">Available Properties</h1>
                <p className="text-body-lg text-on-surface-variant">{filtered.length} home{filtered.length === 1 ? "" : "s"} found.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((p) => (
                <article key={p.id} className="property-card bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={p.hero_image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                        <div className="text-body-lg font-bold text-deep-navy">{p.price_label}</div>
                        <div className="text-label-sm text-outline">Starting</div>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-6">
                      <span className="bg-surface-variant/50 px-3 py-1 rounded text-label-sm text-deep-navy flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">bed</span> {p.bhk}
                      </span>
                      <span className="bg-surface-variant/50 px-3 py-1 rounded text-label-sm text-deep-navy flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">straighten</span> {p.size_sqft}
                      </span>
                    </div>
                    <Link to="/properties/$slug" params={{ slug: p.slug }} className="block text-center w-full border border-deep-navy text-deep-navy py-3 rounded font-label-lg hover:bg-deep-navy hover:text-on-primary transition-all">
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
              {!filtered.length && (
                <div className="col-span-full text-center py-12 text-on-surface-variant">
                  No properties match your filters.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
