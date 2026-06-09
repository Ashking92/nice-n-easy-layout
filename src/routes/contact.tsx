import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const MAP_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB-ig8bYRVdGbDyTrIocMYZocFyPziex_36oHL3Ol0KHg_rfj1YYb5z0mLphioFzaMU84Vxn9VpQ5zCC5Xq2fzSGougTwPhJArroOByGUT8A_g5xYMI0KWdL1ZbaOijp8YAtSf9_x2GcBfTfwTBayUsSFYp1h54Ul_NbhsAfg_8-TdRO-dAt3tQd3Qref-5aadvCTN_DRmgqTM7crZsqCbnkqqKlALbvjDXiBklF_y0HwT16unJLE0Hqhmx99TbXkF9iUNIQlCPI1E";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Budget Homes" },
      { name: "description", content: "Get in touch with the Budget Homes team in Nalasopara East, Maharashtra. We respond within 24 business hours." },
      { property: "og:title", content: "Contact Us — Budget Homes" },
      { property: "og:description", content: "Talk to our property experts in Maharashtra." },
      { property: "og:url", content: "/contact" },
    ],
    links: [
      { rel: "canonical", href: "/contact" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Us",
        url: "/contact",
        description: "Get in touch with the Budget Homes team in Nalasopara East, Maharashtra.",
        mainEntity: {
          "@type": "Organization",
          name: "Budget Homes",
          telephone: "+91-8828300415",
          email: "ashish.budgethomes@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shop No. C 118, 1st Floor, C Wing, Icchapurti Sai Prestige CHS Ltd, Taki Virar Road, Near Dutt Mandir",
            addressLocality: "Nalasopara East",
            addressRegion: "Maharashtra",
            postalCode: "401209",
            addressCountry: "IN",
          },
        },
      }),
    }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1200);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="font-headline-xl text-headline-xl text-primary mb-6">Let's Find Your Dream Home</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Whether you have questions about our listings or need assistance with home buying, our professional team is here to guide you through every step.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-paper-white p-8 border border-outline-variant rounded-xl">
                <h2 className="font-headline-md text-headline-md text-primary mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <InfoItem icon="location_on" title="Office Address">
                    Shop No. C 118, 1st Floor, C Wing,<br />
                    Icchapurti Sai Prestige CHS Ltd,<br />
                    Taki Virar Road, Near Dutt Mandir,<br />
                    Nalasopara East, Palghar, Maharashtra - 401209
                  </InfoItem>
                  <InfoItem icon="call" title="Contact Number">8828300415</InfoItem>
                  <InfoItem icon="mail" title="Email Address">ashish.budgethomes@gmail.com</InfoItem>
                </div>
                <div className="mt-10 pt-8 border-t border-outline-variant">
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">For immediate assistance, connect with us on WhatsApp:</p>
                  <a
                    className="inline-flex items-center justify-center w-full bg-forest-green text-on-primary py-4 rounded-lg font-label-lg hover:opacity-95 transition-all shadow-md group"
                    href="http://wa.link/a8stio"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-outlined mr-2 group-hover:scale-110 transition-transform">chat</span>
                    CHAT ON WHATSAPP
                  </a>
                </div>
              </div>

              <div className="relative h-64 rounded-xl overflow-hidden border border-outline-variant group">
                <img alt="Nalasopara East Map Area" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={MAP_IMG} />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded border border-outline-variant">
                  <p className="text-label-sm font-label-sm text-primary">Nalasopara East, MH</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-white p-10 border border-outline-variant rounded-xl">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Send us a Message</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-10">We'll get back to you within 24 business hours.</p>
              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="First Name" id="first_name" placeholder="John" />
                  <Field label="Last Name" id="last_name" placeholder="Doe" />
                </div>
                <Field label="Email Address" id="email" placeholder="john@example.com" type="email" />
                <div className="space-y-2">
                  <label className="font-label-lg text-label-lg uppercase text-on-surface-variant" htmlFor="subject">Property Interest</label>
                  <select id="subject" className="w-full h-12 px-4 rounded border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                    <option>General Inquiry</option>
                    <option>Apartment in Nalasopara</option>
                    <option>Investment Opportunity</option>
                    <option>Property Management</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-lg text-label-lg uppercase text-on-surface-variant" htmlFor="message">Message</label>
                  <textarea id="message" rows={6} required placeholder="Tell us about what you're looking for..." className="w-full px-4 py-3 rounded border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                </div>
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className={`w-full py-4 rounded font-label-lg text-on-primary hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center ${
                    status === "sent" ? "bg-forest-green" : "bg-deep-navy"
                  }`}
                >
                  <span className={`material-symbols-outlined mr-2 ${status === "sending" ? "animate-spin" : ""}`}>
                    {status === "sending" ? "sync" : status === "sent" ? "check_circle" : "send"}
                  </span>
                  {status === "sending" ? "SENDING..." : status === "sent" ? "SENT SUCCESSFULLY" : "SUBMIT ENQUIRY"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}

function InfoItem({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="bg-primary-container p-3 rounded-lg mr-4">
        <span className="material-symbols-outlined text-on-primary-container">{icon}</span>
      </div>
      <div>
        <h3 className="font-label-lg text-label-lg uppercase text-primary mb-1">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">{children}</p>
      </div>
    </div>
  );
}

function Field({ label, id, placeholder, type = "text" }: { label: string; id: string; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-2">
      <label className="font-label-lg text-label-lg uppercase text-on-surface-variant" htmlFor={id}>{label}</label>
      <input id={id} type={type} required placeholder={placeholder} className="w-full h-12 px-4 rounded border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
    </div>
  );
}
