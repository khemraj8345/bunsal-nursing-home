import React, { useState } from 'react';
import { CalendarDays, Menu, X, User, LogIn, LogOut, FileText, ChevronDown } from 'lucide-react';

export default function Navbar({ onOpenEmergency, onNavigateNav, currentUser, onOpenAuth, onOpenMyBookings, onSignOut }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', sectionId: 'top' },
    { name: 'Specialities & Procedures', sectionId: 'specialities-procedures' },
    { name: 'Doctors', sectionId: 'doctors' },
    { name: 'Facilities', sectionId: 'facilities' },
    { name: 'Admin', admin: true }
  ];

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateNav(sectionId);
  };

  return (
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          {/* Logo - Clean Bansal Nursing Home */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, 'top')}
            class="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c2b48] to-[#0284c7] flex items-center justify-center text-white shadow-md shadow-sky-900/10 group-hover:scale-105 transition-transform">
              <span class="font-bold text-lg">B</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[17px] sm:text-[19px] font-extrabold tracking-tight text-[#0c2b48] leading-tight flex items-center gap-1.5">
                Bansal Nursing Home
              </span>
              <span class="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wide uppercase">
                Women's Health & Eye Care
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav class="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.admin ? '#admin' : `#${link.sectionId}`}
                onClick={(e) => {
                  if (link.admin) {
                    e.preventDefault();
                    onOpenAdmin();
                  } else {
                    handleNavClick(e, link.sectionId);
                  }
                }}
                class="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0284c7] hover:bg-sky-50 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div class="hidden sm:flex items-center gap-3 relative">
            <button
              onClick={() => onNavigateNav('booking-form')}
              class="inline-flex items-center justify-center gap-2 bg-[#0c2b48] hover:bg-[#113a60] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <CalendarDays class="w-4 h-4" />
              <span>Book OPD</span>
            </button>

            {/* Auth / Account Controls */}
            {currentUser ? (
              <div class="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  class="inline-flex items-center gap-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#0c2b48] text-xs font-bold px-3 py-2 rounded-xl transition-all"
                >
                  <div class="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-xs font-black">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <span class="max-w-[110px] truncate">{currentUser.displayName || 'Patient'}</span>
                  <ChevronDown class="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                    <div class="px-4 py-2 border-b border-slate-100 text-[11px]">
                      <p class="font-bold text-[#0c2b48] truncate">{currentUser.displayName || 'Patient'}</p>
                      <p class="text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenMyBookings();
                      }}
                      class="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-[#0284c7] flex items-center gap-2"
                    >
                      <FileText class="w-4 h-4 text-[#0284c7]" />
                      <span>My Appointments</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      class="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <LogOut class="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('signin')}
                class="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-[#0c2b48] text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <LogIn class="w-4 h-4 text-[#0284c7]" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div class="lg:hidden flex items-center gap-2">
            {!currentUser ? (
              <button
                onClick={() => onOpenAuth('signin')}
                class="px-2.5 py-1.5 rounded-lg bg-sky-50 text-[#0284c7] text-xs font-bold sm:hidden"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={onOpenMyBookings}
                class="p-2 rounded-lg bg-sky-50 text-[#0284c7] sm:hidden"
                title="My Appointments"
              >
                <FileText class="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              class="p-2.5 rounded-lg text-slate-600 hover:text-[#0c2b48] hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X class="w-6 h-6" /> : <Menu class="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div class="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div class="grid gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.admin ? '#admin' : `#${link.sectionId}`}
                onClick={(e) => {
                  if (link.admin) {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  } else {
                    handleNavClick(e, link.sectionId);
                  }
                }}
                class="px-3 py-2.5 rounded-md text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0284c7]"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMyBookings();
                  }}
                  class="w-full flex items-center justify-center gap-2 bg-sky-50 text-[#0c2b48] text-sm font-bold py-3 rounded-lg"
                >
                  <FileText class="w-4 h-4 text-[#0284c7]" />
                  <span>My Appointments ({currentUser.displayName || 'Patient'})</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  class="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 text-sm font-bold py-2.5 rounded-lg"
                >
                  <LogOut class="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signin');
                }}
                class="w-full flex items-center justify-center gap-2 bg-[#0c2b48] text-white text-sm font-bold py-3 rounded-lg shadow-sm"
              >
                <LogIn class="w-4 h-4" />
                <span>Patient Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
