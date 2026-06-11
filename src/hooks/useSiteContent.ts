import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeSubscription } from "@/hooks/useRealtimeData";

/**
 * Reads a site_content row (keyed JSON blob) and live-updates when admin saves.
 * Returns `defaults` while loading or if the row doesn't exist yet.
 */
export function useSiteContent<T extends Record<string, any>>(key: string, defaults: T): T {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["site-content", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error) throw error;
      return (data?.value ?? null) as T | null;
    },
  });

  useRealtimeSubscription("site_content", (payload: any) => {
    const row = payload.new ?? payload.old;
    if (row?.key === key) {
      qc.invalidateQueries({ queryKey: ["site-content", key] });
    }
  });

  return { ...defaults, ...(data ?? {}) } as T;
}
