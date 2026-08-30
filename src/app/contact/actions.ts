"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendContactEmails } from "@/lib/contact-emails";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(formData: FormData) {
  const locale = formData.get("locale") === "en" ? "en" : "es";
  const route = locale === "en" ? "/en/contact" : "/contact";
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const projectType = String(formData.get("project_type") ?? "").trim();
  const idea = String(formData.get("idea") ?? "").trim();
  const timing = String(formData.get("timing") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (website) redirect(`${route}?success=true`);
  if (!name || name.length > 120 || !EMAIL_PATTERN.test(email) || email.length > 254 || company.length > 160 || projectType.length > 120 || idea.length < 10 || idea.length > 5000 || timing.length > 160) {
    redirect(`${route}?error=validation`);
  }

  const details = [idea, timing ? `\n---\nTiming: ${timing}` : "", `\nLocale: ${locale}`].join("");
  let failure: "storage" | "submission" | null = null;
  try {
    const supabase = createAdminClient();
    const { data: lead, error } = await supabase.from("focuslab_leads").insert({
      name,
      email,
      company: company || null,
      project_type: projectType || null,
      project_details: details,
    }).select("id").single();
    if (error || !lead) {
      failure = "storage";
    } else {
      await sendContactEmails({ id: lead.id, name, email, company: company || null, projectType: projectType || null, projectDetails: details, locale });
    }
  } catch (error) {
    console.error("Contact submission failed", error);
    failure = "submission";
  }

  if (failure) redirect(`${route}?error=${failure}`);
  redirect(`${route}?success=true`);
}
