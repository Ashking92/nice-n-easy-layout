import { useSiteContent } from "@/hooks/useSiteContent";

export function WhatsAppFab() {
  const contact = useSiteContent("contact", {
    phone: "",
    email: "",
    whatsapp: "http://wa.link/a8stio",
    address: "",
  });
  return (
    <a
      className="fixed bottom-8 right-8 bg-forest-green text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all z-[100]"
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      title="Contact us on WhatsApp"
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
    </a>
  );
}
