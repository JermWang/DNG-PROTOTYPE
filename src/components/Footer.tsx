export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[11px] tracking-[0.25em] text-white/15 uppercase font-light">
          Volterra E1
        </span>
        <span className="text-[11px] tracking-[0.15em] text-white/15 font-light">
          Built in 24 Hours &mdash; Campaign Prototype
        </span>
        <span className="text-[11px] text-white/15 font-light">
          &copy; 2026
        </span>
      </div>
    </footer>
  );
}
