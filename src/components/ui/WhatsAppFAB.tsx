import type { Locale } from "@/lib/i18n";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default function WhatsAppFAB({ locale }: { locale: Locale }) {
  const href = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : "/contacto";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={locale === "en" ? "Message us on WhatsApp" : "Escríbenos por WhatsApp"}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.79 14.06c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.17.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.13.63-.08.17-.2.73-.85.93-1.14.19-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.72-.17 1.4Z" />
      </svg>
    </a>
  );
}
