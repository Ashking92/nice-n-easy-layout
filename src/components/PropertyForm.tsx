import { useState } from "react";

export type PropertyFormValues = {
  slug: string;
  name: string;
  location: string;
  property_type: string;
  bhk: string;
  size_sqft: string;
  price_label: string;
  price_numeric: number | null;
  description: string;
  long_description: string;
  amenities: string; // comma separated in UI
  highlights: string;
  hero_image: string;
  gallery: string; // newline separated
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floor_info: string;
  possession: string;
  rera_id: string;
  address: string;
  map_url: string;
  featured: boolean;
  status: string;
  sort_order: number;
};

export const emptyProperty: PropertyFormValues = {
  slug: "", name: "", location: "", property_type: "Apartment", bhk: "1 BHK",
  size_sqft: "", price_label: "", price_numeric: null, description: "", long_description: "",
  amenities: "", highlights: "", hero_image: "", gallery: "",
  bedrooms: 1, bathrooms: 1, parking: 0, floor_info: "", possession: "Ready to Move",
  rera_id: "", address: "", map_url: "", featured: false, status: "active", sort_order: 0,
};

export function toDbRow(v: PropertyFormValues) {
  return {
    ...v,
    amenities: v.amenities.split(",").map((s) => s.trim()).filter(Boolean),
    highlights: v.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
    gallery: v.gallery.split("\n").map((s) => s.trim()).filter(Boolean),
  };
}

export function fromDbRow(row: any): PropertyFormValues {
  return {
    ...emptyProperty,
    ...row,
    amenities: (row.amenities ?? []).join(", "),
    highlights: (row.highlights ?? []).join("\n"),
    gallery: (row.gallery ?? []).join("\n"),
  };
}

export function PropertyForm({
  initial, onSubmit, submitLabel,
}: { initial: PropertyFormValues; onSubmit: (v: PropertyFormValues) => Promise<void>; submitLabel: string }) {
  const [v, setV] = useState<PropertyFormValues>(initial);
  const [busy, setBusy] = useState(false);
  const u = <K extends keyof PropertyFormValues>(k: K, val: PropertyFormValues[K]) => setV((p) => ({ ...p, [k]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try { await onSubmit(v); } finally { setBusy(false); }
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label className="block">
      <span className="block text-label-lg text-on-surface-variant mb-1 text-sm">{label}</span>
      {children}
    </label>
  );
  const input = "w-full border border-outline-variant rounded p-2.5 focus:border-deep-navy focus:ring-1 focus:ring-deep-navy outline-none";

  return (
    <form onSubmit={submit} className="space-y-6 max-w-4xl">
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-deep-navy">Basics</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Name *"><input className={input} required value={v.name} onChange={(e) => u("name", e.target.value)} /></Field>
          <Field label="URL slug * (e.g. nidan-empire)"><input className={input} required value={v.slug} onChange={(e) => u("slug", e.target.value)} /></Field>
          <Field label="Location *"><input className={input} required value={v.location} onChange={(e) => u("location", e.target.value)} /></Field>
          <Field label="Property type"><input className={input} value={v.property_type} onChange={(e) => u("property_type", e.target.value)} /></Field>
          <Field label="BHK *"><input className={input} required value={v.bhk} onChange={(e) => u("bhk", e.target.value)} /></Field>
          <Field label="Size (sq.ft) *"><input className={input} required value={v.size_sqft} onChange={(e) => u("size_sqft", e.target.value)} /></Field>
          <Field label="Price label * (e.g. ₹24.5 L+)"><input className={input} required value={v.price_label} onChange={(e) => u("price_label", e.target.value)} /></Field>
          <Field label="Price (numeric, INR)"><input type="number" className={input} value={v.price_numeric ?? ""} onChange={(e) => u("price_numeric", e.target.value ? Number(e.target.value) : null)} /></Field>
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-deep-navy">Description</h2>
        <Field label="Short description"><textarea className={input} rows={2} value={v.description} onChange={(e) => u("description", e.target.value)} /></Field>
        <Field label="Long description"><textarea className={input} rows={5} value={v.long_description} onChange={(e) => u("long_description", e.target.value)} /></Field>
        <Field label="Amenities (comma separated)"><textarea className={input} rows={2} value={v.amenities} onChange={(e) => u("amenities", e.target.value)} placeholder="Lift, Security, Power Backup" /></Field>
        <Field label="Highlights (one per line)"><textarea className={input} rows={3} value={v.highlights} onChange={(e) => u("highlights", e.target.value)} /></Field>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-deep-navy">Specifications</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Bedrooms"><input type="number" className={input} value={v.bedrooms} onChange={(e) => u("bedrooms", Number(e.target.value))} /></Field>
          <Field label="Bathrooms"><input type="number" className={input} value={v.bathrooms} onChange={(e) => u("bathrooms", Number(e.target.value))} /></Field>
          <Field label="Parking"><input type="number" className={input} value={v.parking} onChange={(e) => u("parking", Number(e.target.value))} /></Field>
          <Field label="Floor info"><input className={input} value={v.floor_info} onChange={(e) => u("floor_info", e.target.value)} /></Field>
          <Field label="Possession"><input className={input} value={v.possession} onChange={(e) => u("possession", e.target.value)} /></Field>
          <Field label="RERA ID"><input className={input} value={v.rera_id} onChange={(e) => u("rera_id", e.target.value)} /></Field>
        </div>
        <Field label="Full address"><input className={input} value={v.address} onChange={(e) => u("address", e.target.value)} /></Field>
        <Field label="Google Maps embed URL"><input className={input} value={v.map_url} onChange={(e) => u("map_url", e.target.value)} /></Field>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-deep-navy">Images</h2>
        <Field label="Hero image URL *"><input className={input} required value={v.hero_image} onChange={(e) => u("hero_image", e.target.value)} /></Field>
        <Field label="Gallery URLs (one per line)"><textarea className={input} rows={5} value={v.gallery} onChange={(e) => u("gallery", e.target.value)} /></Field>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-deep-navy">Publishing</h2>
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <Field label="Status">
            <select className={input} value={v.status} onChange={(e) => u("status", e.target.value)}>
              <option value="active">Active (visible)</option>
              <option value="hidden">Hidden</option>
              <option value="sold">Sold</option>
            </select>
          </Field>
          <Field label="Sort order"><input type="number" className={input} value={v.sort_order} onChange={(e) => u("sort_order", Number(e.target.value))} /></Field>
          <label className="flex items-center gap-2 pt-6">
            <input type="checkbox" checked={v.featured} onChange={(e) => u("featured", e.target.checked)} className="w-5 h-5" />
            <span>Featured on homepage</span>
          </label>
        </div>
      </section>

      <button type="submit" disabled={busy} className="bg-deep-navy text-on-primary px-6 py-3 rounded font-label-lg disabled:opacity-60">
        {busy ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
