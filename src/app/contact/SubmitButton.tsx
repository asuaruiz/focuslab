"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return <button className="button-primary field-full" type="submit" disabled={pending} aria-disabled={pending}>{pending ? pendingLabel : label}<span aria-hidden="true">↗</span></button>;
}
