-- Lock down has_role(): only used inside RLS where SECURITY DEFINER bypasses execute checks at definition time; revoke from public/anon/authenticated
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- Add RLS policies on realtime.messages restricting topic subscriptions to the publicly-readable topics only
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public topic subscriptions" ON realtime.messages;
CREATE POLICY "Allow public topic subscriptions"
ON realtime.messages
FOR SELECT
TO anon, authenticated
USING (
  (realtime.topic() IN ('properties', 'site_content'))
  AND extension IN ('postgres_changes', 'presence', 'broadcast')
);
