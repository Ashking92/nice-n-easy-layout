import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyForm, toDbRow, fromDbRow } from "@/components/PropertyForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/properties/$id")({
  component: EditProperty,
});

function EditProperty() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading || !data) return <div className="p-8 text-on-surface-variant">Loading…</div>;

  return (
    <div className="p-8">
      <Link to="/admin/properties" className="text-primary text-sm hover:underline">← Back to properties</Link>
      <h1 className="text-headline-xl font-headline-xl text-deep-navy mt-2 mb-6">Edit: {data.name}</h1>
      <PropertyForm
        initial={fromDbRow(data)}
        submitLabel="Save changes"
        onSubmit={async (v) => {
          const { error } = await supabase.from("properties").update(toDbRow(v)).eq("id", id);
          if (error) { toast.error(error.message); return; }
          toast.success("Saved");
          navigate({ to: "/admin/properties" });
        }}
      />
    </div>
  );
}
