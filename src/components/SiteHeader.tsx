import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="pl-10 pr-4 py-2 bg-paper-white border border-outline-variant rounded-lg text-label-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none w-64 transition-all"
              placeholder="Search..."
              type="text"
            />
          </div>
          <button className="bg-deep-navy text-on-primary px-6 py-2.5 rounded-lg font-label-lg hover:opacity-90 active:scale-95 transition-all">
            List Property
          </button>
        </div>
      </div>
    </header>
  );
}
