'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Mission', href: '#mission' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      } text-[var(--color-blue)] font-[var(--font-sans)]`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
  <Image
    src="/logo5.png"
    alt="Waymor Logo"
    width={190}
    height={60}
    className="object-contain w-[120px] h-[40px] md:w-[350px] md:h-[60px]"
  />
</Link>


        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-xl font-[var(--font-serif)] text-[#13304D] transition-all duration-300 ease-in-out hover:text-[var(--color-green)] hover:scale-105"
            >
              <span className="relative group">
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--color-green)] transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-[var(--color-green)] focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4 bg-[var(--color-blue)]/90 backdrop-blur-md text-white py-4 rounded-lg shadow-lg transition-all duration-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-[var(--font-sans)] hover:text-[var(--color-green)] transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--color-green)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
