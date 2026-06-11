import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeSubscription } from "@/hooks/useRealtimeData";


const propertyQuery = (slug: string) => ({
  queryKey: ["property", "slug", slug],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();
    return data;
  },
});

export const Route = createFileRoute("/properties/$slug")({
  ssr: false,
  loader: ({ params, context }) => context.queryClient.ensureQueryData(propertyQuery(params.slug)),
  head: ({ loaderData }) => {
    const p = loaderData as any;
    const title = p ? `${p.name} — ${p.location} | Budget Homes` : "Property | Budget Homes";
    const desc = p?.description ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: p?.hero_image ?? "" },
        { property: "og:url", content: `/properties/${p?.slug ?? ""}` },
      ],
      links: [{ rel: "canonical", href: `/properties/${p?.slug ?? ""}` }],
      scripts: p ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: [p.hero_image, ...(p.gallery ?? [])],
          brand: { "@type": "Organization", name: "Budget Homes" },
          offers: {
            "@type": "Offer",
            price: p.price_numeric ?? undefined,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        }),
      }] : [],
    };
  },
  component: PropertyDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col bg-surface">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center text-center p-8">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-deep-navy mb-4">Property not found</h1>
          <Link to="/properties" className="text-primary hover:underline">Back to properties</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-xl font-semibold">Could not load property</h1>
        <p className="text-sm text-on-surface-variant mt-2">{error.message}</p>
        <button onClick={reset} className="mt-4 text-primary hover:underline">Try again</button>
      </div>
    </div>
  ),
});

function PropertyDetail() {
  const { slug } = Route.useParams();
  const qc = useQueryClient();
  const { data: p } = useQuery(propertyQuery(slug));
  useRealtimeSubscription("properties", () => qc.invalidateQueries({ queryKey: ["property", "slug", slug] }));
  if (!p) return null;


  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] overflow-hidden bg-deep-navy">
          <img src={p.hero_image} alt={p.name} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-10">
            {p.featured && <span className="bg-warm-gold text-white text-xs font-bold px-3 py-1 rounded">FEATURED</span>}
            <h1 className="text-headline-xl font-headline-xl text-on-primary mt-3">{p.name}</h1>
            <div className="flex items-center text-on-primary/80 mt-2">
              <span className="material-symbols-outlined text-base mr-1">location_on</span>
              {p.location}
            </div>
          </div>
        </section>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick specs */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["bed", `${p.bedrooms} Beds`],
                ["bathtub", `${p.bathrooms} Baths`],
                ["straighten", p.size_sqft],
                ["directions_car", `${p.parking} Parking`],
              ].map(([icon, label]) => (
                <div key={label} className="border border-outline-variant rounded-xl p-4 text-center">
                  <span className="material-symbols-outlined text-2xl text-deep-navy">{icon}</span>
                  <p className="text-sm mt-1">{label}</p>
                </div>
              ))}
            </section>

            {p.long_description && (
              <section>
                <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-4">About this property</h2>
                <p className="text-body-md text-on-surface-variant whitespace-pre-line">{p.long_description}</p>
              </section>
            )}

            {p.highlights?.length > 0 && (
              <section>
                <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {p.highlights.map((h: string) => (
                    <li key={h} className="flex gap-3">
                      <span className="material-symbols-outlined text-warm-gold">check_circle</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {p.amenities?.length > 0 && (
              <section>
                <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {p.amenities.map((a: string) => (
                    <div key={a} className="flex items-center gap-2 border border-outline-variant rounded-lg p-3">
                      <span className="material-symbols-outlined text-deep-navy text-base">star</span>
                      <span className="text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {p.gallery?.length > 1 && (
              <section>
                <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {p.gallery.map((g: string, i: number) => (
                    <img key={i} src={g} alt={`${p.name} ${i + 1}`} className="rounded-lg w-full h-48 object-cover" />
                  ))}
                </div>
              </section>
            )}

            {p.map_url && (
              <section>
                <h2 className="text-headline-lg font-headline-lg text-deep-navy mb-4">Location</h2>
                <iframe src={p.map_url} className="w-full h-80 rounded-xl border border-outline-variant" loading="lazy" />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest sticky top-28">
              <p className="text-on-surface-variant text-sm">Starting Price</p>
              <p className="text-headline-xl font-headline-xl text-deep-navy">{p.price_label}</p>
              <div className="mt-4 space-y-2 text-sm">
                <Row label="Type" value={p.property_type} />
                <Row label="Configuration" value={p.bhk} />
                <Row label="Floor" value={p.floor_info || "—"} />
                <Row label="Possession" value={p.possession} />
                {p.rera_id && <Row label="RERA" value={p.rera_id} />}
              </div>
              <a href="http://wa.link/a8stio" target="_blank" rel="noreferrer" className="mt-6 block text-center bg-[#25D366] text-white py-3 rounded font-label-lg hover:brightness-105">
                Enquire on WhatsApp
              </a>
              <Link to="/contact" className="mt-2 block text-center border border-deep-navy text-deep-navy py-3 rounded font-label-lg hover:bg-deep-navy hover:text-on-primary transition-colors">
                Schedule a visit
              </Link>
            </div>
            {p.address && (
              <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                <p className="text-label-lg uppercase text-xs text-on-surface-variant mb-2">Address</p>
                <p className="text-sm">{p.address}</p>
              </div>
            )}
          </aside>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-outline-variant pb-1">
      <span className="text-on-surface-variant">{label}</span>
      <span className="font-semibold text-deep-navy">{value}</span>
    </div>
  );
}
