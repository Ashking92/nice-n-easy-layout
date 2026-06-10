import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

/**
 * Hook to subscribe to real-time changes on a Supabase table
 * @param tableName - Name of the table to subscribe to
 * @param onUpdate - Callback fired when data changes
 */
export function useRealtimeSubscription(
  tableName: string,
  onUpdate: (payload: any) => void
) {
  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    const subscribe = async () => {
      channel = supabase
        .channel(`public:${tableName}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: tableName,
          },
          (payload) => {
            onUpdate(payload);
          }
        )
        .subscribe();
    };

    subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [tableName, onUpdate]);
}

/**
 * Debounce helper for auto-save operations
 */
export function useDebounce<T>(value: T, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}
