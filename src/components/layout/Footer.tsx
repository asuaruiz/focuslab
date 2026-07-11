import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <Image
          src="/logo-circle.png"
          alt="Focus Labs Media Group"
          width={48}
          height={48}
          className="h-12 w-12"
        />

        <p className="accent-quote mt-8 text-lg">
          &ldquo;Transformamos la imaginación en experiencias significativas.&rdquo;
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <span className="font-heading text-xs tracking-widest uppercase text-gray">
            Focus Labs Media Group — Est. 2024
          </span>

          <nav className="flex flex-wrap gap-6">
            <Link href="/servicios" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              Servicios
            </Link>
            <Link href="/casos-de-estudio" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              Casos de Estudio
            </Link>
            <Link href="/contacto" className="text-xs tracking-widest uppercase text-gray hover:text-white">
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
