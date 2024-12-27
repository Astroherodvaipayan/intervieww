"use client";
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot } from "lucide-react";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [controlNavbar]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    
    // Prevent body scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/about-us", label: "About us" },
  ];

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 
          flex justify-between items-center 
          p-4 sm:p-5 
          bg-white/90 backdrop-blur-md 
          shadow-md z-50 
          transition-all duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2"
          aria-label="RV AI Home"
          onClick={closeMobileMenu}
        >
          <Bot className="text-indigo-600" size={28} />
          <span className="text-xl sm:text-2xl font-bold text-indigo-600">RV AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav 
          className="hidden md:flex gap-4 lg:gap-6"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              path={path}
              href={item.href}
              label={item.label}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none text-gray-600 hover:text-indigo-600 transition-colors"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Authentication */}
        <div className="hidden md:block">
          <SignedOut>
            <SignInButton mode="modal">
              <button 
                className="
                  px-4 py-2 
                  bg-indigo-600 text-white 
                  rounded-md 
                  hover:bg-indigo-700 
                  transition-colors
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-indigo-500 
                  focus:ring-offset-2
                "
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                },
              }} 
            />
          </SignedIn>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="
            fixed inset-0 top-0 
            bg-white z-40 md:hidden 
            overflow-hidden
            pt-16
          "
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="h-full overflow-y-auto pb-16">
            <nav className="space-y-6 p-6">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  path={path}
                  href={item.href}
                  label={item.label}
                  mobile
                  onClick={closeMobileMenu}
                />
              ))}

              {/* Mobile Authentication */}
              <div className="pt-6 border-t">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button 
                      className="
                        w-full px-4 py-2 
                        bg-indigo-600 text-white 
                        rounded-md 
                        hover:bg-indigo-700 
                        transition-colors
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-indigo-500 
                        focus:ring-offset-2
                      "
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center">
                    <UserButton 
                      afterSignOutUrl="/" 
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-12 h-12 mx-auto",
                        },
                      }} 
                    />
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ path, href, label, mobile, onClick }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`
        block 
        transition-all duration-300 ease-in-out 
        cursor-pointer 
        rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-indigo-500
        ${mobile
          ? "w-full text-lg py-3 text-center"
          : "px-3 py-2 hover:bg-indigo-100 hover:text-indigo-600"
        }
        ${path === href
          ? "text-indigo-600 font-bold bg-indigo-100"
          : "text-gray-700 hover:text-indigo-600"
        }
      `}
    >
      {label}
    </Link>
  );
}

export default Header;