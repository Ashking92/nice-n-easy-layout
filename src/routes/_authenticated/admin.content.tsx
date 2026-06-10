import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/content")({
  component: ContentEditor,
});

type HeroV = { eyebrow: string; title: string; subtitle: string; cta_primary_label: string; cta_secondary_label: string };
type ContactV = { phone: string; email: string; whatsapp: string; address: string };
type AboutV = { title: string; body: string };

function ContentEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site-content-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*");
      if (error) throw error;
      const map: Record<string, any> = {};
      data.forEach((r) => (map[r.key] = r.value));
      return map;
    },
  });

  const [hero, setHero] = useState<HeroV>({ eyebrow: "", title: "", subtitle: "", cta_primary_label: "", cta_secondary_label: "" });
  const [contact, setContact] = useState<ContactV>({ phone: "", email: "", whatsapp: "", address: "" });
  const [about, setAbout] = useState<AboutV>({ title: "", body: "" });

  useEffect(() => {
    if (!data) return;
    if (data.hero) setHero((prev) => ({ ...prev, ...data.hero }));
    if (data.contact) setContact((prev) => ({ ...prev, ...data.contact }));
    if (data.about) setAbout((prev) => ({ ...prev, ...data.about }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const save = async (key: string, value: any) => {
    const { error } = await supabase.from("site_content").upsert({ key, value });
    if (error) toast.error(error.message);
    else {
      toast.success(`${key} saved`);
      qc.invalidateQueries({ queryKey: ["site-content-all"] });
      qc.invalidateQueries({ queryKey: ["site-content", key] });
    }
  };

  const input = "w-full border border-outline-variant rounded p-2.5 focus:border-deep-navy focus:ring-1 focus:ring-deep-navy outline-none";
  const card = "bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4";
  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-label-lg text-on-surface-variant mb-1 text-sm">{children}</span>
  );

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-headline-xl font-headline-xl text-deep-navy">Site Content</h1>
        <p className="text-on-surface-variant">Edit text shown across your public website.</p>
      </div>

      <section className={card}>
        <h2 className="font-headline-md text-headline-md text-deep-navy">Homepage Hero</h2>
        <label><Label>Eyebrow</Label><input className={input} value={hero.eyebrow} onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })} /></label>
        <label><Label>Title</Label><input className={input} value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} /></label>
        <label><Label>Subtitle</Label><textarea className={input} rows={3} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} /></label>
        <div className="grid md:grid-cols-2 gap-4">
          <label><Label>Primary button</Label><input className={input} value={hero.cta_primary_label} onChange={(e) => setHero({ ...hero, cta_primary_label: e.target.value })} /></label>
          <label><Label>Secondary button</Label><input className={input} value={hero.cta_secondary_label} onChange={(e) => setHero({ ...hero, cta_secondary_label: e.target.value })} /></label>
        </div>
        <button onClick={() => save("hero", hero)} className="bg-deep-navy text-on-primary px-4 py-2 rounded">Save hero</button>
      </section>

      <section className={card}>
        <h2 className="font-headline-md text-headline-md text-deep-navy">About Section</h2>
        <label><Label>Title</Label><input className={input} value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} /></label>
        <label><Label>Body</Label><textarea className={input} rows={5} value={about.body} onChange={(e) => setAbout({ ...about, body: e.target.value })} /></label>
        <button onClick={() => save("about", about)} className="bg-deep-navy text-on-primary px-4 py-2 rounded">Save about</button>
      </section>

      <section className={card}>
        <h2 className="font-headline-md text-headline-md text-deep-navy">Contact Info</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label><Label>Phone</Label><input className={input} value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></label>
          <label><Label>Email</Label><input className={input} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></label>
          <label><Label>WhatsApp link</Label><input className={input} value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} /></label>
        </div>
        <label><Label>Address</Label><textarea className={input} rows={3} value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} /></label>
        <button onClick={() => save("contact", contact)} className="bg-deep-navy text-on-primary px-4 py-2 rounded">Save contact</button>
      </section>
    </div>
  );
}
