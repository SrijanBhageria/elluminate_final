'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isInsightsPage = pathname === '/insights' || pathname.startsWith('/insights/');
  const isContactPage = pathname === '/contact' || pathname.startsWith('/contact/');
  const isRecordsPage = pathname === '/records' || pathname.startsWith('/records/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll(isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.2; // Hero section height
      const videoStart = heroHeight;
      
      setIsScrolled(scrollY > 20);
      setIsOverVideo(scrollY > videoStart);
    };

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleNav = (sectionId: string) => (e?: React.MouseEvent) => {
    if (isHomePage) {
      if (e) e.preventDefault();
      scrollToSection(sectionId);
      closeMenu();
    }
  };

  // Close on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Focus trap and ESC to close
  useEffect(() => {
    if (!isMenuOpen) return;

    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable && focusable[0];
    const last = focusable && focusable[focusable.length - 1];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
      } else if (e.key === 'Tab' && focusable && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };

    const focusTimeout = window.setTimeout(() => {
      first?.focus();
    }, 0);

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimeout);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOverVideo ? 'over-video' : ''}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-fixed)',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        style={{
          width: '100%',
          padding: '0 var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80px',
          position: 'relative',
        }}
        className="navbar-container"
      >
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              outline: 'none',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              setIsLogoHovered(true);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              setIsLogoHovered(false);
            }}
          >
            <Image 
              src="/usethis.png" 
              alt="Elluminate Capital" 
              width={200} 
              height={60}
              style={{ 
                objectFit: 'contain',
                height: 'auto',
                maxHeight: '50px'
              }}
              priority
            />
          </Link>
        </div>

        {/* Right Section - Hamburger (mobile) */}
        <div className="navbar-right show-on-mobile">
          <button
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-drawer"
            aria-expanded={isMenuOpen}
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>


        {/* Center Section - Page-specific: Insights = Home, Our Story→/records, Contact | Contact = Home, Insights, Our Story→/records | Records = Home, Insights, Contact | Home = Insights, Story (scroll), Companies, Contact */}
        <div className="navbar-center">
          {isInsightsPage && (
            <>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/records/" className="nav-link">Our Story</Link>
              <Link href="/contact/" className="nav-link">Contact Us</Link>
            </>
          )}
          {isContactPage && (
            <>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/insights/" className="nav-link">Insights</Link>
              <Link href="/records/" className="nav-link">Our Story</Link>
            </>
          )}
          {isRecordsPage && (
            <>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/insights/" className="nav-link">Insights</Link>
              <Link href="/contact/" className="nav-link">Contact Us</Link>
            </>
          )}
          {isHomePage && (
            <>
              <Link href="/insights/" className="nav-link">Insights</Link>
              <button onClick={() => scrollToSection('story')} className="nav-link">Our Story</button>
              <button onClick={() => scrollToSection('companies')} className="nav-link">Companies</button>
              <Link href="/contact/" className="nav-link">Contact Us</Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <button className="drawer-overlay" aria-label="Close menu" onClick={closeMenu}></button>
      )}

      {/* Mobile Drawer */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}
      >
        <div className="drawer" ref={drawerRef}>
          <div className="drawer-header">
            <Link href="/" onClick={closeMenu} className="drawer-logo">
              <Image src="/usethis.png" alt="Elluminate Capital" width={140} height={40} priority />
            </Link>
            <button className="drawer-close" aria-label="Close menu" onClick={closeMenu}>
              ×
            </button>
          </div>
          <nav className="drawer-nav">
            {isInsightsPage && (
              <>
                <Link className="drawer-link" href="/" onClick={closeMenu}>Home</Link>
                <Link className="drawer-link" href="/records/" onClick={closeMenu}>Our Story</Link>
                <Link className="drawer-link" href="/contact/" onClick={closeMenu}>Contact Us</Link>
              </>
            )}
            {isContactPage && (
              <>
                <Link className="drawer-link" href="/" onClick={closeMenu}>Home</Link>
                <Link className="drawer-link" href="/insights/" onClick={closeMenu}>Insights</Link>
                <Link className="drawer-link" href="/records/" onClick={closeMenu}>Our Story</Link>
              </>
            )}
            {isRecordsPage && (
              <>
                <Link className="drawer-link" href="/" onClick={closeMenu}>Home</Link>
                <Link className="drawer-link" href="/insights/" onClick={closeMenu}>Insights</Link>
                <Link className="drawer-link" href="/contact/" onClick={closeMenu}>Contact Us</Link>
              </>
            )}
            {isHomePage && (
              <>
                <Link className="drawer-link" href="/insights/" onClick={closeMenu}>Insights</Link>
                <button className="drawer-link" onClick={() => { scrollToSection('story'); closeMenu(); }}>Story</button>
                <button className="drawer-link" onClick={() => { scrollToSection('companies'); closeMenu(); }}>Companies</button>
                <Link className="drawer-link" href="/contact/" onClick={closeMenu}>Contact Us</Link>
              </>
            )}
          </nav>
        </div>
      </aside>


      <style jsx>{`
        .navbar {
          background: transparent;
          border: none;
        }
        
        .navbar.scrolled {
          background: transparent;
          backdrop-filter: none;
          border: none;
          box-shadow: none;
        }
        
        /* Over video section - keep transparent */
        .navbar.over-video {
          background: transparent;
          backdrop-filter: none;
          box-shadow: none;
          border: none;
        }
        
        .navbar.over-video .navbar-container {
          color: var(--text-primary);
        }
        
        .navbar.over-video .navbar-container span {
          color: var(--text-primary) !important;
        }
        
        .navbar-container {
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        
        .navbar-left {
          position: absolute;
          left: var(--space-6);
          top: 50%;
          transform: translateY(-50%);
        }
        .navbar-right {
          position: absolute;
          right: var(--space-6);
          top: 50%;
          transform: translateY(-50%);
        }
        
        .navbar-center {
          display: flex;
          align-items: center;
          gap: var(--space-8);
        }
        
        /* :global so Link-rendered <a> (no styled-jsx class) get same hover/focus as <button> */
        :global(.navbar-center .nav-link) {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          letter-spacing: 0.05em;
          cursor: pointer;
          padding: var(--space-2) var(--space-4);
          transition: all var(--transition-fast);
          position: relative;
          outline: none;
          text-decoration: none;
          display: inline-block;
        }
        
        :global(.navbar-center .nav-link:focus) {
          outline: none !important;
          box-shadow: none !important;
        }
        
        :global(.navbar-center .nav-link:active) {
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
        
        :global(.navbar-center .nav-link:focus-visible) {
          outline: none !important;
          box-shadow: none !important;
        }
        
        :global(.navbar-center .nav-link::after) {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 1px;
          background: #B8956A;
          transition: transform var(--transition-fast);
        }
        
        :global(.navbar-center .nav-link:hover) {
          color: #B8956A;
        }
        
        :global(.navbar-center .nav-link:hover::after) {
          transform: translateX(-50%) scaleX(1);
        }
        
        .navbar-left a:focus {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }
        
        .navbar-left a:focus-visible {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }
        
        /* Hamburger */
        .hamburger {
          position: relative;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(20,20,20,0.6);
          border: 1px solid rgba(255,255,255,0.3);
          cursor: pointer;
        }
        .hamburger:focus-visible {
          outline: 2px solid #ffffff; outline-offset: 2px;
        }
        .hamburger span {
          position: absolute;
          left: 50%;
          width: 22px;
          height: 2px;
          background: #ffffff;
          border-radius: 1px;
          transform: translateX(-50%);
          transition: transform 0.25s ease, opacity 0.25s ease, top 0.25s ease;
        }
        .hamburger span:nth-child(1) { top: 14px; }
        .hamburger span:nth-child(2) { top: 22px; }
        .hamburger span:nth-child(3) { top: 30px; }
        .hamburger.active span:nth-child(1) { top: 22px; transform: translateX(-50%) rotate(45deg); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { top: 22px; transform: translateX(-50%) rotate(-45deg); }

        /* Drawer */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: calc(var(--z-fixed) - 1);
        }
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 0;
          overflow: hidden;
          z-index: var(--z-fixed);
          transition: width 0.3s ease;
        }
        .mobile-drawer.open { width: min(85vw, 360px); }
        .drawer {
          position: absolute;
          top: 0;
          right: 0;
          width: min(85vw, 360px);
          height: 100%;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(12px);
          border-left: 1px solid rgba(255,255,255,0.12);
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }
        .mobile-drawer.open .drawer { transform: translateX(0); }
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .drawer-logo { display: inline-flex; align-items: center; }
        .drawer-close {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.06);
          color: #fff;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
        }
        .drawer-nav {
          display: flex;
          flex-direction: column;
          padding: 12px 12px 24px;
          gap: 6px;
        }
        .drawer-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 14px 12px;
          border-radius: 10px;
          color: #ffffff;
          background: transparent;
          border: 1px solid transparent;
          font-size: 14px;
        }
        .drawer-link:hover, .drawer-link:focus {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.06);
          outline: none;
        }

        /* Hide desktop center links on small screens */
        @media (max-width: 768px) {
          .navbar-center { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
