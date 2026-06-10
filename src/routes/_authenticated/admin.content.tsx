import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useDebounce, useRealtimeSubscription } from "@/hooks/useRealtimeData";

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
  
  // Track if user is actively editing
  const [isEditing, setIsEditing] = useState(false);

  // Debounce state for auto-save (1 second delay)
  const debouncedHero = useDebounce(hero, 1000);
  const debouncedContact = useDebounce(contact, 1000);
  const debouncedAbout = useDebounce(about, 1000);

  useEffect(() => {
    if (!data) return;
    if (data.hero) setHero((prev) => ({ ...prev, ...data.hero }));
    if (data.contact) setContact((prev) => ({ ...prev, ...data.contact }));
    if (data.about) setAbout((prev) => ({ ...prev, ...data.about }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Auto-save hero
  useEffect(() => {
    if (!isEditing) return;
    const saveHero = async () => {
      const { error } = await supabase.from("site_content").upsert({ key: "hero", value: debouncedHero });
      if (error) {
        toast.error("Failed to save hero");
        console.error(error);
      } else {
        toast.success("Hero saved");
        qc.invalidateQueries({ queryKey: ["site-content-all"] });
        qc.invalidateQueries({ queryKey: ["site-content", "hero"] });
      }
    };
    saveHero();
  }, [debouncedHero, isEditing, qc]);

  // Auto-save contact
  useEffect(() => {
    if (!isEditing) return;
    const saveContact = async () => {
      const { error } = await supabase.from("site_content").upsert({ key: "contact", value: debouncedContact });
      if (error) {
        toast.error("Failed to save contact");
        console.error(error);
      } else {
        toast.success("Contact saved");
        qc.invalidateQueries({ queryKey: ["site-content-all"] });
        qc.invalidateQueries({ queryKey: ["site-content", "contact"] });
      }
    };
    saveContact();
  }, [debouncedContact, isEditing, qc]);

  // Auto-save about
  useEffect(() => {
    if (!isEditing) return;
    const saveAbout = async () => {
      const { error } = await supabase.from("site_content").upsert({ key: "about", value: debouncedAbout });
      if (error) {
        toast.error("Failed to save about");
        console.error(error);
      } else {
        toast.success("About saved");
        qc.invalidateQueries({ queryKey: ["site-content-all"] });
        qc.invalidateQueries({ queryKey: ["site-content", "about"] });
      }
    };
    saveAbout();
  }, [debouncedAbout, isEditing, qc]);

  // Subscribe to real-time changes
  useRealtimeSubscription("site_content", (payload) => {
    if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
      const { key, value } = payload.new;
      if (key === "hero") setHero(value);
      if (key === "contact") setContact(value);
      if (key === "about") setAbout(value);
      toast.info("Content updated by another user");
    }
  });

  const input = "w-full border border-outline-variant rounded p-2.5 focus:border-deep-navy focus:ring-1 focus:ring-deep-navy outline-none";
  const card = "bg-surface-container-lowest border border-outline-variant rounded-xl p-6 space-y-4";
  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-label-lg text-on-surface-variant mb-1 text-sm">{children}</span>
  );

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-headline-xl font-headline-xl text-deep-navy">Site Content</h1>
        <p className="text-on-surface-variant">Edit text shown across your public website. Changes save automatically.</p>
      </div>

      <section className={card}>
        <h2 className="font-headline-md text-headline-md text-deep-navy">Homepage Hero</h2>
        <label><Label>Eyebrow</Label><input className={input} value={hero.eyebrow} onFocus={() => setIsEditing(true)} onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })} /></label>
        <label><Label>Title</Label><input className={input} value={hero.title} onFocus={() => setIsEditing(true)} onChange={(e) => setHero({ ...hero, title: e.target.value })} /></label>
        <label><Label>Subtitle</Label><textarea className={input} rows={3} value={hero.subtitle} onFocus={() => setIsEditing(true)} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} /></label>
        <div className="grid md:grid-cols-2 gap-4">
          <label><Label>Primary button</Label><input className={input} value={hero.cta_primary_label} onFocus={() => setIsEditing(true)} onChange={(e) => setHero({ ...hero, cta_primary_label: e.target.value })} /></label>
          <label><Label>Secondary button</Label><input className={input} value={hero.cta_secondary_label} onFocus={() => setIsEditing(true)} onChange={(e) => setHero({ ...hero, cta_secondary_label: e.target.value })} /></label>
        </div>
      </section>

      <section className={card}>
        <h2 className="font-headline-md text-headline-md text-deep-navy">About Section</h2>
        <label><Label>Title</Label><input className={input} value={about.title} onFocus={() => setIsEditing(true)} onChange={(e) => setAbout({ ...about, title: e.target.value })} /></label>
        <label><Label>Body</Label><textarea className={input} rows={5} value={about.body} onFocus={() => setIsEditing(true)} onChange={(e) => setAbout({ ...about, body: e.target.value })} /></label>
      </section>

      <section className={card}>
        <h2 className="font-headline-md text-headline-md text-deep-navy">Contact Info</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label><Label>Phone</Label><input className={input} value={contact.phone} onFocus={() => setIsEditing(true)} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></label>
          <label><Label>Email</Label><input className={input} value={contact.email} onFocus={() => setIsEditing(true)} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></label>
          <label><Label>WhatsApp link</Label><input className={input} value={contact.whatsapp} onFocus={() => setIsEditing(true)} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} /></label>
        </div>
        <label><Label>Address</Label><textarea className={input} rows={3} value={contact.address} onFocus={() => setIsEditing(true)} onChange={(e) => setContact({ ...contact, address: e.target.value })} /></label>
      </section>
    </div>
  );
}
