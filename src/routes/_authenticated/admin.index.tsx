import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [props, featured] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact", head: true }),
        supabase.from("properties").select("id", { count: "exact", head: true }).eq("featured", true),
      ]);
      return { total: props.count ?? 0, featured: featured.count ?? 0 };
    },
  });

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-headline-xl font-headline-xl text-deep-navy mb-2">Welcome back</h1>
      <p className="text-on-surface-variant mb-8">Manage your properties and site content from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border border-outline-variant rounded-xl p-6">
          <p className="text-label-lg uppercase text-on-surface-variant text-xs">Total properties</p>
          <p className="text-headline-xl font-headline-xl text-primary mt-2">{stats?.total ?? "—"}</p>
        </div>
        <div className="border border-outline-variant rounded-xl p-6">
          <p className="text-label-lg uppercase text-on-surface-variant text-xs">Featured</p>
          <p className="text-headline-xl font-headline-xl text-warm-gold mt-2">{stats?.featured ?? "—"}</p>
        </div>
        <div className="border border-outline-variant rounded-xl p-6">
          <Link to="/admin/properties/new" className="inline-flex items-center gap-2 bg-deep-navy text-on-primary px-4 py-2 rounded mt-4">
            <span className="material-symbols-outlined">add</span> Add property
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/admin/properties" className="border border-outline-variant rounded-xl p-6 hover:border-deep-navy transition-colors block">
          <span className="material-symbols-outlined text-3xl text-deep-navy">apartment</span>
          <h3 className="text-headline-md font-headline-md mt-2">Manage Properties</h3>
          <p className="text-on-surface-variant text-sm mt-1">Add, edit, or remove listings.</p>
        </Link>
        <Link to="/admin/content" className="border border-outline-variant rounded-xl p-6 hover:border-deep-navy transition-colors block">
          <span className="material-symbols-outlined text-3xl text-deep-navy">edit_note</span>
          <h3 className="text-headline-md font-headline-md mt-2">Site Content</h3>
          <p className="text-on-surface-variant text-sm mt-1">Edit homepage hero, about, contact info.</p>
        </Link>
      </div>
    </div>
  );
}
