export default function Card({ className="", children }: {className?: string; children: React.ReactNode}) {
  return (
    <div className={`group relative isolate overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-[transform,box-shadow] duration-300
                     hover:shadow-md hover:-translate-y-1 hover:scale-[1.02] transform-gpu will-change-transform ${className}`}>
      {/* hover gradient tint (very subtle) */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition duration-300
                      bg-gradient-to-br from-violet-500/8 via-indigo-500/8 to-emerald-500/8" />
      {/* sheen */}
      <div className="pointer-events-none absolute -inset-y-8 -left-1/3 w-1/3 rotate-12 bg-white/0
                      group-hover:translate-x-[220%] group-hover:bg-white/15 transition duration-500 ease-out" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}