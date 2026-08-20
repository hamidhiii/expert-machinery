import Image from "next/image";

/**
 * The supplied logo file is a 784x1168 JPG with wide white margins: the EM
 * symbol occupies y 309-765 and the printed wordmark sits below it (y 811-860).
 * A 1.48 aspect object-cover box at 43% vertical position shows the symbol only —
 * the wordmark is rendered as live text in the lockup instead. Swap in a
 * trimmed SVG/PNG export when the client provides one.
 */
export function LogoMark({ className = "h-11" }: { className?: string }) {
  return (
    <span className={`relative block aspect-[1.48] overflow-hidden ${className}`}>
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
      <span className="rounded-lg bg-white p-1">
        <LogoMark className="h-9" />
      </span>
      <span className="leading-none">
        <span
          className={`block text-[17px] font-black uppercase tracking-[0.12em] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          Expert<span className="text-flame">&nbsp;Machinery</span>
        </span>
        <span
          className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.28em] ${
            dark ? "text-slate-400" : "text-steel"
          }`}
        >
          Industrial drive
        </span>
      </span>
    </span>
  );
}
