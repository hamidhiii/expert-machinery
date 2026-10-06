import Image from "next/image";

/**
 * The supplied logo file is a 784x1168 JPG with wide white margins: the EM
 * symbol occupies y 309-765 and the printed wordmark sits below it (y 811-860).
 * A 1.48 aspect object-cover box at 43% vertical position shows the symbol only —
 * the wordmark is rendered as live text in the lockup instead. Swap in a
 * trimmed SVG/PNG export when the client provides one.
 */
export function LogoMark({ className = "h-10" }: { className?: string }) {
  return (
    <span className={`relative block aspect-[1.48] overflow-hidden rounded ${className}`}>
      <Image
        src="/expert-machinery-logo.jpg"
        alt="EXPERT MACHINERY"
        fill
        priority
        sizes="120px"
        className="object-cover"
        style={{ objectPosition: "50% 43%" }}
      />
    </span>
  );
}

export function LogoLockup({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="rounded-md bg-white p-1.5">
        <LogoMark className="h-7" />
      </span>
      <span className="whitespace-nowrap leading-none">
        <span
          className={`block text-[15px] font-bold uppercase tracking-[0.08em] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          Expert Machinery
        </span>
        <span
          className={`mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.26em] ${
            dark ? "text-white/40" : "text-muted"
          }`}
        >
          Industrial drive
        </span>
      </span>
    </span>
  );
}
