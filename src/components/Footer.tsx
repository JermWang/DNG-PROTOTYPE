export default function Footer() {
  const links = ["Overview", "Performance", "Design", "Reserve"];
  return (
    <footer className="border-t border-white/[0.06] pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-16">
          <div>
            <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2">
              Volterra
            </p>
            <p className="text-white/50 text-xs tracking-wide font-light">
              Electric Performance Redefined
            </p>
          </div>
          <div className="flex gap-8">
            {links.map((link) => (
              <span
                key={link}
                className="text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                {link}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] tracking-[0.15em] text-white/40 font-light">
            &copy; 2026 Volterra Motors. All rights reserved.
          </span>
          <span className="text-[11px] tracking-[0.15em] text-white/40 font-light">
            Campaign Prototype &mdash; Confidential
          </span>
        </div>
      </div>
    </footer>
  );
}
