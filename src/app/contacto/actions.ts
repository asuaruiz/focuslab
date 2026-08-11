"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendContactEmails } from "@/lib/contact-emails";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROJECT_TYPES = new Set([
  "Video",
  "Estrategia de Marca",
  "Evento",
  "Producción Comercial",
  "Podcast",
  "Fotografía",
  "Otro",
  "Brand Strategy",
  "Event",
  "Commercial Production",
  "Photography",
  "Other",
]);

export async function submitLead(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const project_type = String(formData.get("project_type") ?? "").trim();
  const project_details = String(formData.get("project_details") ?? "").trim();

  if (
    !name ||
    name.length > 120 ||
    !EMAIL_PATTERN.test(email) ||
    email.length > 254 ||
    company.length > 160 ||
    project_details.length > 5000 ||
    (project_type && !PROJECT_TYPES.has(project_type))
  ) {
    redirect("/contacto?error=campos-requeridos");
  }

  const supabase = createAdminClient();
  const companyValue = company || null;
  const projectTypeValue = project_type || null;
  const projectDetailsValue = project_details || null;
  const { data: lead, error } = await supabase
    .from("focuslab_leads")
    .insert({
      name,
      email,
      company: companyValue,
      project_type: projectTypeValue,
      project_details: projectDetailsValue,
    })
    .select("id")
    .single();

  if (error || !lead) {
    redirect("/contacto?error=envio-fallido");
  }

  try {
    await sendContactEmails({
      id: lead.id,
      name,
      email,
      company: companyValue,
      projectType: projectTypeValue,
      projectDetails: projectDetailsValue,
    });
  } catch (emailError) {
    console.error("Contact emails could not be sent", emailError);
  }

  redirect("/contacto?success=true");
}
