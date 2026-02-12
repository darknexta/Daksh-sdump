import { useState, useEffect } from 'react';
import { profileData } from '@/data/profile';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Works', href: '#works' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]'
            : 'bg-transparent'
        }`}
        style={{
          transitionTimingFunction: 'var(--ease-out-quart)',
        }}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20 max-w-[1600px] mx-auto">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="text-white font-['Melodrama'] text-xl lg:text-2xl hover:opacity-80 transition-opacity"
            >
              {profileData.firstName}
              <span className="text-[var(--text-muted)]">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-white'
                      : 'text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                      style={{
                        animation: 'scaleIn 0.3s var(--ease-out-quart)',
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="hidden lg:inline-flex btn-primary text-sm py-3 px-6"
            >
              Let's Talk
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`text-3xl font-['Melodrama'] transition-all duration-300 ${
                activeSection === item.href.slice(1)
                  ? 'text-white'
                  : 'text-[var(--text-muted)] hover:text-white'
              }`}
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="btn-primary mt-8"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '300ms',
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Side Navigation Dots (Desktop) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.href);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === item.href.slice(1)
                ? 'bg-white scale-125'
                : 'bg-white/30 hover:bg-white/50 hover:scale-110'
            }`}
            aria-label={item.label}
          />
        ))}
      </div>
    </>
  );
};

export default Navigation;
