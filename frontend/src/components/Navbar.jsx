import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown } from 'lucide-react';
import { LOGO_URL, programs } from '../mock';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setProgOpen(false); }, [pathname]);

  const transparent = onHome && !scrolled;

  const baseNav = 'font-caps text-[0.7rem] font-semibold tracking-[0.2em] transition-colors';
  const navColor = transparent ? 'text-cream hover:text-gold' : 'text-navy hover:text-gold';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-cream/95 backdrop-blur border-b border-navy/5'
      }`}
    >
      <div className="container-x flex items-center justify-between h-[88px]">
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO_URL} alt="Epsilon" className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          <div
            className="relative"
            onMouseEnter={() => setProgOpen(true)}
            onMouseLeave={() => setProgOpen(false)}
          >
            <NavLink to="/programs" className={`${baseNav} ${navColor} flex items-center gap-1`}>
              Programs <ChevronDown size={12} strokeWidth={2} />
            </NavLink>
            {progOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                <div className="bg-navy-deep text-cream border border-gold/20 shadow-2xl w-[360px] p-2">
                  {programs.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/programs/${p.slug}`}
                      className="block px-4 py-3 hover:bg-navy transition-colors"
                    >
                      <div className="font-display text-sm text-cream leading-tight">{p.subtitle}</div>
                      <div className="font-caps text-[0.6rem] text-gold mt-1">{p.weeks} weeks · {p.levelLabel}</div>
                    </Link>
                  ))}
                  <div className="border-t border-gold/10 mt-1 pt-1">
                    <Link to="/programs" className="block px-4 py-3 hover:bg-navy transition-colors font-caps text-[0.65rem] text-gold">
                      View all programmes →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <NavLink to="/faculty" className={`${baseNav} ${navColor}`}>Faculty</NavLink>
          <NavLink to="/admissions" className={`${baseNav} ${navColor}`}>Admissions</NavLink>
          <NavLink to="/about" className={`${baseNav} ${navColor}`}>About</NavLink>
          <NavLink to="/contact" className={`${baseNav} ${navColor}`}>Contact</NavLink>
        </nav>

        <div className="hidden lg:flex items-center">
          <a
            href="https://moodle.org/login/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className={transparent ? 'btn-gold' : 'btn-navy'}
          >
            <LogIn size={14} /> Sign In
          </a>
        </div>

        <button
          className={`lg:hidden ${transparent ? 'text-cream' : 'text-navy'}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-deep text-cream border-t border-gold/20">
          <div className="container-x py-6 flex flex-col gap-5">
            <Link to="/programs" className="font-caps text-sm text-cream tracking-[0.2em]">Programs</Link>
            <Link to="/faculty" className="font-caps text-sm text-cream tracking-[0.2em]">Faculty</Link>
            <Link to="/admissions" className="font-caps text-sm text-cream tracking-[0.2em]">Admissions</Link>
            <Link to="/about" className="font-caps text-sm text-cream tracking-[0.2em]">About</Link>
            <Link to="/contact" className="font-caps text-sm text-cream tracking-[0.2em]">Contact</Link>
            <a href="https://moodle.org/login/index.php" className="btn-gold w-fit" target="_blank" rel="noopener noreferrer">
              <LogIn size={14} /> Sign In
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
