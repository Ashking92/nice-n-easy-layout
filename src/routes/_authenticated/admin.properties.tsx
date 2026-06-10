import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/properties")({
  component: AdminProperties,
});

function AdminProperties() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-properties"] });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-deep-navy">Properties</h1>
          <p className="text-on-surface-variant">Manage your property listings.</p>
        </div>
        <Link to="/admin/properties/new" className="bg-deep-navy text-on-primary px-4 py-2.5 rounded inline-flex items-center gap-2">
          <span className="material-symbols-outlined">add</span> New property
        </Link>
      </div>

      {isLoading ? (
        <p className="text-on-surface-variant">Loading…</p>
      ) : (
        <div className="border border-outline-variant rounded-xl overflow-hidden bg-surface-container-lowest">
          <table className="w-full">
            <thead className="bg-surface-container text-left text-xs uppercase text-on-surface-variant">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Location</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((p) => (
                <tr key={p.id} className="border-t border-outline-variant">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.hero_image} alt="" className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-semibold text-deep-navy">{p.name}</p>
                        <p className="text-xs text-on-surface-variant">{p.bhk} • {p.size_sqft}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{p.location}</td>
                  <td className="p-4 text-sm font-semibold">{p.price_label}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded ${p.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                      {p.status}
                    </span>
                    {p.featured && <span className="ml-2 text-xs px-2 py-1 rounded bg-warm-gold/20 text-warm-gold">FEATURED</span>}
                  </td>
                  <td className="p-4 text-right">
                    <Link to="/admin/properties/$id" params={{ id: p.id }} className="text-primary hover:underline text-sm mr-4">Edit</Link>
                    <button onClick={() => remove(p.id, p.name)} className="text-red-600 hover:underline text-sm">Delete</button>
                  </td>
                </tr>
              ))}
              {!data?.length && (
                <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">No properties yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
