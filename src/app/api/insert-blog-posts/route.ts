import { createClient as createAdminClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    // Use service role key to bypass RLS
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "SUPABASE_SERVICE_ROLE_KEY not configured",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey
    );

    // Read blog data from JSON file
    const blogDataPath = path.join(process.cwd(), "scripts/blog-data.json");
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, "utf8"));

    let successful = 0;
    let failed = 0;
    const errors = [];

    for (const post of blogData) {
      const { data, error } = await supabase
        .from("focuslab_blog_posts")
        .insert(post)
        .select();

      if (error) {
        failed++;
        errors.push({
          title: post.title,
          error: error.message,
        });
      } else {
        successful++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        inserted: successful,
        failed: failed,
        errors: errors,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Fatal error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
