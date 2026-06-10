import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin | Budget Homes" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: "dashboard", exact: true },
  { to: "/admin/properties", label: "Properties", icon: "apartment" },
  { to: "/admin/content", label: "Site Content", icon: "edit_note" },
];

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
    // Wait one tick for the role lookup to resolve
    const t = setTimeout(() => setChecked(true), 300);
    return () => clearTimeout(t);
  }, [loading, user]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  };

  if (loading || !checked) {
    return <div className="min-h-screen flex items-center justify-center text-on-surface-variant">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="max-w-md text-center bg-surface-container-lowest border border-outline-variant rounded-xl p-8">
          <span className="material-symbols-outlined text-5xl text-warm-gold">lock</span>
          <h1 className="text-headline-lg font-headline-lg text-deep-navy mt-4 mb-2">Admin access required</h1>
          <p className="text-on-surface-variant mb-4">
            Your account ({user?.email}) is signed in but has no admin role yet. Grant yourself the
            <code className="mx-1 px-2 py-0.5 bg-surface-container rounded text-sm">admin</code>
            role in the database, then refresh.
          </p>
          <pre className="text-xs bg-surface-container p-3 rounded text-left overflow-x-auto mb-4">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${user?.id ?? "<your-user-id>"}', 'admin');`}
          </pre>
          <button onClick={signOut} className="text-primary hover:underline">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="w-64 border-r border-outline-variant bg-surface-container-lowest flex flex-col">
        <div className="p-6 border-b border-outline-variant">
          <Link to="/" className="text-headline-md font-headline-md text-primary block">Budget Homes</Link>
          <p className="text-xs text-on-surface-variant mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? "bg-deep-navy text-on-primary" : "hover:bg-surface-container"}`}
              >
                <span className="material-symbols-outlined text-xl">{n.icon}</span>
                <span className="text-label-lg">{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-outline-variant">
          <p className="text-xs text-on-surface-variant mb-2 truncate">{user?.email}</p>
          <button onClick={signOut} className="w-full text-left text-sm text-primary hover:underline flex items-center gap-2">
            <span className="material-symbols-outlined text-base">logout</span> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
