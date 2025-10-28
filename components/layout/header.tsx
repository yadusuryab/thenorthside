'use client'

import Link from "next/link";
import Brand from "../brand/brand";
import CartButton from "../cart/cart-buttons/cart-count";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentTopText, setCurrentTopText] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const topTexts = ["NORTHSIDE", "#WEARENORTHSIDE", "NEW COLLECTIONS"];

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Rotate top bar text with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTopText((prev) => (prev + 1) % topTexts.length);
        setIsAnimating(false);
      }, 500); // Increased duration for smoother fade
    }, 4000); // Increased interval for better readability
    return () => clearInterval(interval);
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300); // Wait for animation to complete
    }
  }, [showSearch]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    };
  }, [showMenu]);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery("");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  // Search icon SVG
  const SearchIcon = () => (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );

  // Close icon SVG
  const CloseIcon = () => (
    <svg 
      className="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M6 18L18 6M6 6l12 12" 
      />
    </svg>
  );

  // Menu icon SVG
  const MenuIcon = () => (
    <svg 
      className="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 6h16M4 12h16M4 18h16" 
      />
    </svg>
  );

  return (
    <>
      {/* Top Black Bar */}
      <div className="fixed top-0 left-0 w-full bg-primary text-white py-2 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm font-medium uppercase tracking-wide h-5 flex items-center justify-center">
            <span 
              className={`transition-all duration-500 ease-out ${
                isAnimating 
                  ? 'opacity-0 transform -translate-y-4 scale-95' 
                  : 'opacity-100 transform translate-y-0 scale-100'
              }`}
            >
              {topTexts[currentTopText]}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="fixed bg-white top-8 w-full p-2 z-10">
        {isMobile ? (
          // Mobile View
          <div className="flex items-center justify-between">
            {/* Menu Button */}
            <button 
              onClick={handleMenuToggle}
              className="p-2 transition-all duration-300 ease-out hover:scale-110 active:scale-95 hover:opacity-70"
              aria-label="Open menu"
            >
             MENU
            </button>
            
            {/* Logo */}
            <Link href="/" className="flex-1 text-center transform transition-transform duration-300 hover:scale-105">
              <Brand />
            </Link>
            
            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button 
                onClick={handleSearchToggle}
                className="p-2 transition-all duration-300 ease-out hover:scale-110 active:scale-95 hover:opacity-70"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
              
              {/* Cart */}
              <div className="transform transition-transform duration-300 hover:scale-110">
                <CartButton />
              </div>
            </div>
          </div>
        ) : (
          // Desktop View
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <Link href="/" className="flex-1 transform transition-transform duration-500 hover:scale-105">
              <Brand />
            </Link>
            
            {/* Navigation - Middle */}
            <nav className="flex-1 flex justify-center">
              <div className="flex items-center gap-12 uppercase text-sm font-medium tracking-wide">
                <Link 
                  href="/" 
                  className="relative transition-all duration-500 ease-out hover:opacity-80 
                             after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current 
                             after:transition-all after:duration-500 hover:after:w-full"
                >
                  HOME
                </Link>
                <Link 
                  href="/terms" 
                  className="relative transition-all duration-500 ease-out hover:opacity-80 
                             after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current 
                             after:transition-all after:duration-500 hover:after:w-full"
                >
                  TERMS
                </Link>
                <Link 
                  href="/contact" 
                  className="relative transition-all duration-500 ease-out hover:opacity-80 
                             after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current 
                             after:transition-all after:duration-500 hover:after:w-full"
                >
                  CONTACT
                </Link>
              </div>
            </nav>
            
            {/* Actions - Right */}
            <div className="flex-1 flex justify-end items-center gap-8">
              {/* Search */}
              <button 
                onClick={handleSearchToggle}
                className="uppercase text-sm font-medium tracking-wide transition-all duration-500 ease-out 
                           hover:opacity-70 relative
                           after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current 
                           after:transition-all after:duration-500 hover:after:w-full"
              >
                SEARCH
              </button>
              
              {/* Cart */}
              <div className="transform transition-transform duration-500 hover:scale-110">
                <CartButton />
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showSearch ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-lg shadow-lg p-4">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="SEARCH PRODUCTS..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full px-4 py-3 border-0 bg-gray-100 rounded-md uppercase text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            {searchQuery && (
              <button
                type="submit"
                className="w-full mt-3 px-4 py-2 bg-black text-white uppercase text-sm font-medium tracking-wide rounded-md transition-all duration-300 hover:bg-gray-800 active:scale-95"
              >
                Search
              </button>
            )}
          </form>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          showMenu 
            ? 'bg-black bg-opacity-50 backdrop-blur-sm' 
            : 'bg-transparent pointer-events-none'
        }`}
        onClick={closeMenu}
      >
        {/* Menu Sheet */}
        <div 
          className={`fixed left-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 transform transition-all duration-500 ease-out ${
            showMenu 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-200">
            <span className="uppercase font-medium text-xl tracking-wider">MENU</span>
            <button 
              onClick={closeMenu}
              className="p-3 transition-all duration-300 ease-out hover:scale-110 active:scale-95 hover:opacity-70 rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Menu Navigation */}
          <nav className="p-8">
            <ul className="space-y-8">
              {[
                { href: "/", label: "HOME" },
                { href: "/collections", label: "COLLECTIONS" },
                { href: "/products", label: "ALL PRODUCTS" },
                { href: "/about", label: "ABOUT" },
                { href: "/terms", label: "TERMS" },
                { href: "/contact", label: "CONTACT" },
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="block uppercase text-xl font-medium tracking-wider transition-all duration-500 ease-out 
                               hover:opacity-70 hover:translate-x-4 hover:text-gray-800
                               transform origin-left"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-gray-200 bg-gray-50">
            <div className="text-center space-y-3">
              <p className="text-lg font-medium uppercase tracking-wider text-gray-900">NORTHSIDE</p>
              <p className="text-sm uppercase tracking-widest text-gray-600">#WEARENORTHSIDE</p>
              <div className="pt-4 text-xs text-gray-500 uppercase tracking-wide">
                <p>Explore Latest Collections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-22"></div>
    </>
  );
};

export default Header;