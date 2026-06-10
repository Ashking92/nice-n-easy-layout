import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { PropertyForm, emptyProperty, toDbRow } from "@/components/PropertyForm";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/properties/new")({
  component: NewProperty,
});

function NewProperty() {
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <Link to="/admin/properties" className="text-primary text-sm hover:underline">← Back to properties</Link>
      <h1 className="text-headline-xl font-headline-xl text-deep-navy mt-2 mb-6">New property</h1>
      <PropertyForm
        initial={emptyProperty}
        submitLabel="Create property"
        onSubmit={async (v) => {
          const { error } = await supabase.from("properties").insert(toDbRow(v));
          if (error) { toast.error(error.message); return; }
          toast.success("Property created");
          navigate({ to: "/admin/properties" });
        }}
      />
    </div>
  );
}
