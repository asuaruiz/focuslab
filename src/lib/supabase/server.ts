import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface CookieSetOptions {
  name: string;
  value: string;
  options?: Record<string, unknown>;
}

// Server-side client for use in Server Components, Route Handlers, and
// Server Actions (SSR/SSG data fetching for blog posts, case studies, etc.)
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieSetOptions[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — safe to ignore when
            // middleware is refreshing the session.
          }
        },
      },
    }
  );
}
