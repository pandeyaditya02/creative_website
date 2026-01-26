import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-8 py-6 flex items-center justify-between text-white mix-blend-difference">
      {/* Logo Area */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-tighter text-orange-500">CREATIVECHAUK</span>
        <span className="text-[10px] tracking-[0.2em] text-gray-400">PRODUCTION</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-12 text-xs font-medium tracking-widest">
        <div className="w-8 h-8 bg-orange-500 rounded-full"></div> {/* Placeholder for the dot/icon in design */}
        <Link href="#" className="hover:text-orange-500 transition-colors">WORK</Link>
        <Link href="#" className="hover:text-orange-500 transition-colors">SERVICES</Link>
        <Link href="#" className="hover:text-orange-500 transition-colors">ABOUT US</Link>
        <Link href="#" className="hover:text-orange-500 transition-colors">CONTACTS</Link>
        <div className="ml-8 text-orange-500 flex items-center gap-2">
            <span>23:43:21</span> {/* Static time for now, will make dynamic later if needed or just remove */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
