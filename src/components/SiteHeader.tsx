import { Link, useRouterState } from "@tanstack/react-router";
import { useSiteContent } from "@/hooks/useSiteContent";



const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const contact = useSiteContent("contact", { phone: "", email: "", whatsapp: "http://wa.link/a8stio", address: "" });
  return (
    <header className="bg-surface sticky top-0 z-50 w-full border-b border-outline-variant">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20 w-full">
        <Link to="/" className="text-headline-md font-headline-md font-bold text-primary">
          Budget Homes
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={
                  active
                    ? "text-label-lg font-label-lg text-primary border-b-2 border-primary pb-1"
                    : "text-label-lg font-label-lg text-on-surface-variant hover:text-primary transition-colors duration-200"
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="bg-deep-navy text-on-primary px-6 py-2.5 rounded-lg font-label-lg hover:opacity-90 active:scale-95 transition-all">
            List Property
          </a>
        </div>
      </div>
    </header>
  );

}
