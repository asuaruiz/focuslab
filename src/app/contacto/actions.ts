"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function submitLead(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const project_type = String(formData.get("project_type") ?? "").trim();
  const project_details = String(formData.get("project_details") ?? "").trim();

  if (!name || !email) {
    redirect("/contacto?error=campos-requeridos");
  }

  const supabase = createClient();
  const { error } = await supabase.from("focuslab_leads").insert({
    name,
    email,
    company: company || null,
    project_type: project_type || null,
    project_details: project_details || null,
  });

  if (error) {
    redirect("/contacto?error=envio-fallido");
  }

  redirect("/contacto?success=true");
}
