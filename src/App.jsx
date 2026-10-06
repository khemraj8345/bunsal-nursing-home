import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import Hero from './components/Hero';
import SpecialitiesAndProcedures from './components/SpecialitiesAndProcedures';
import IVFJourney from './components/IVFJourney';
import Facilities from './components/Facilities';
import MedicalConsultants from './components/MedicalConsultants';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import EmergencyModal from './components/EmergencyModal';
import WhatsAppModal from './components/WhatsAppModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import SuccessModal from './components/SuccessModal';

import AuthModal from './components/AuthModal';
import UserBookingsModal from './components/UserBookingsModal';

import SpecialtyPage from './pages/SpecialtyPage';
import ProcedurePage from './pages/ProcedurePage';
import ProceduresListPage from './pages/ProceduresListPage';
import FacilityDetailPage from './pages/FacilityDetailPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import AdminPortal from './pages/AdminPortal';

import { auth, onAuthStateChanged, signOut } from './firebase/config';

export default function App() {
  const [viewMode, setViewMode] = useState('home');
  const [activeSpecialty, setActiveSpecialty] = useState(null);
  const [activeProcedure, setActiveProcedure] = useState(null);
  const [activeFacility, setActiveFacility] = useState(null);
  const [activeDoctorObj, setActiveDoctorObj] = useState(null);

  // Firebase Auth & Modal State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Ref to store exact scroll Y position before opening any sub-page
  const lastScrollPos = useRef(0);

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
  const [successBookingData, setSuccessBookingData] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user?.email?.toLowerCase() === 'pririsahu8@gmail.com') {
        setViewMode('admin');
        window.history.replaceState({ view: 'admin' }, '', '#admin');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timeoutId = window.setTimeout(() => setToastMessage(''), 4200);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  // Synchronously restore/set scroll position before DOM paint
  useLayoutEffect(() => {
    if (viewMode === 'home') {
      const savedY = lastScrollPos.current || 0;
      window.scrollTo({ top: savedY, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [viewMode]);

  // Handle browser back button event
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setViewMode(event.state.view);
      } else {
        setViewMode('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateNav = (sectionId) => {
    setViewMode('home');
    window.history.pushState({ view: 'home' }, '', window.location.pathname);

    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToBooking = () => {
    handleNavigateNav('booking-form');
  };

  const handleOpenSpecialty = (spec) => {
    if (viewMode === 'home') {
      lastScrollPos.current = window.scrollY || window.pageYOffset || 0;
    }
    setActiveSpecialty(spec);
    setViewMode('specialty');
    window.history.pushState({ view: 'specialty', id: spec.id }, '', `#specialty-${spec.id}`);
  };

  const handleOpenProcedure = (proc) => {
    if (viewMode === 'home') {
      lastScrollPos.current = window.scrollY || window.pageYOffset || 0;
    }
    setActiveProcedure(proc);
    setViewMode('procedure');
    window.history.pushState({ view: 'procedure', id: proc.id }, '', `#procedure-${proc.id}`);
  };

  const handleOpenProceduresList = () => {
    if (viewMode === 'home') {
      lastScrollPos.current = window.scrollY || window.pageYOffset || 0;
    }
    setViewMode('all-procedures');
    window.history.pushState({ view: 'all-procedures' }, '', '#all-procedures');
  };

  const handleOpenFacility = (fac) => {
    if (viewMode === 'home') {
      lastScrollPos.current = window.scrollY || window.pageYOffset || 0;
    }
    setActiveFacility(fac);
    setViewMode('facility');
    window.history.pushState({ view: 'facility', id: fac.id }, '', `#facility-${fac.id}`);
  };

  const handleOpenDoctor = (doc) => {
    if (viewMode === 'home') {
      lastScrollPos.current = window.scrollY || window.pageYOffset || 0;
    }
    setActiveDoctorObj(doc);
    setViewMode('doctor');
    window.history.pushState({ view: 'doctor', id: doc.id }, '', `#doctor-${doc.id}`);
  };

  // Restores home view and scroll position with zero flicker
  const handleBackToHome = () => {
    setViewMode('home');
    setActiveSpecialty(null);
    setActiveProcedure(null);
    setActiveFacility(null);
    setActiveDoctorObj(null);
    window.history.pushState({ view: 'home' }, '', window.location.pathname);
  };

  const handleOpenAdmin = () => {
    setViewMode('admin');
    window.history.pushState({ view: 'admin' }, '', '#admin');
  };

  const handleSelectCategoryFromHero = (cat) => {
    setSelectedCategory(cat);
    scrollToBooking();
  };

  const handleSelectDoctor = (doctorName, categoryName) => {
    setSelectedDoctor(doctorName);
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
    scrollToBooking();
  };

  const handleBookServiceFromModal = (title) => {
    setSelectedCategory(title);
    scrollToBooking();
  };

  const handleRequireAuth = (message) => {
    setToastMessage(message || 'Please sign in or register to book an appointment.');
    setAuthModalMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      if (viewMode === 'admin') {
        setViewMode('home');
        window.history.replaceState({ view: 'home' }, '', window.location.pathname);
      }
      setToastMessage('Signed out successfully.');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <div id="top" class="min-h-screen bg-[#f6f8fd] flex flex-col font-sans selection:bg-[#0284c7] selection:text-white relative">
      
      {/* Toast Alert Message */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          class="fixed inset-x-4 top-24 z-[60] mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-sky-100 bg-white/95 p-4 text-left shadow-[0_18px_50px_-18px_rgba(12,43,72,0.45)] backdrop-blur-xl animate-toast-enter sm:left-auto sm:right-6 sm:inset-x-auto"
        >
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
            <ShieldCheck class="h-5 w-5" aria-hidden="true" />
          </span>
          <div class="min-w-0 flex-1 pt-0.5">
            <p class="text-sm font-bold leading-5 text-[#0c2b48]">One quick step</p>
            <p class="mt-1 text-xs font-medium leading-5 text-slate-600">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage('')}
            aria-label="Dismiss notification"
            class="-mr-1 -mt-1 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <X class="h-4 w-4" aria-hidden="true" />
          </button>
          <span class="toast-progress" aria-hidden="true" />
        </div>
      )}

      {/* Top Navbar with Firebase Auth State & Navigation Handlers */}
      <Navbar
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onNavigateNav={handleNavigateNav}
        currentUser={currentUser}
        onOpenAuth={(mode) => { setAuthModalMode(mode); setIsAuthModalOpen(true); }}
        onOpenMyBookings={() => setIsBookingsModalOpen(true)}
        onSignOut={handleSignOut}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Home Content (Kept mounted in DOM, hidden when on sub-page for zero-lag scroll restoration) */}
      <main class={`flex-grow space-y-4 ${viewMode === 'home' ? '' : 'hidden'}`}>
        {/* Breadcrumb Navigation */}
        <Breadcrumb />

        {/* Hero Section */}
        <Hero
          onSelectCategory={handleSelectCategoryFromHero}
          onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
          onScrollToBooking={scrollToBooking}
        />

        {/* Specialities & Procedures Section */}
        <SpecialitiesAndProcedures
          onOpenSpecialty={handleOpenSpecialty}
          onOpenProcedure={handleOpenProcedure}
          onOpenProceduresList={handleOpenProceduresList}
          onScrollToBooking={scrollToBooking}
          onScrollToDoctors={() => handleNavigateNav('doctors')}
        />

        {/* The IVF Clinical Journey Section */}
        <IVFJourney
          onScrollToBooking={scrollToBooking}
        />

        {/* Dedicated Department Facilities Section */}
        <Facilities
          onSelectImage={(facility) => setSelectedServiceDetail(facility)}
          onOpenFacility={handleOpenFacility}
        />

        {/* Lead Medical Consultants Section */}
        <MedicalConsultants
          onSelectDoctor={handleSelectDoctor}
          onScrollToBooking={scrollToBooking}
          onOpenDoctor={handleOpenDoctor}
        />

        {/* Consultation Booking Form Section */}
        <ConsultationForm
          selectedCategory={selectedCategory}
          selectedDoctor={selectedDoctor}
          currentUser={currentUser}
          onRequireAuth={handleRequireAuth}
          onSubmitSuccess={(data) => setSuccessBookingData(data)}
        />
      </main>

      {/* Dedicated Specialty Sub-Page View */}
      {viewMode === 'specialty' && (
        <SpecialtyPage
          specialty={activeSpecialty}
          onBack={handleBackToHome}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          currentUser={currentUser}
          onRequireAuth={handleRequireAuth}
          onSubmitSuccess={(data) => setSuccessBookingData(data)}
        />
      )}

      {/* Dedicated Full Procedures Catalog Page View */}
      {viewMode === 'all-procedures' && (
        <ProceduresListPage
          onOpenProcedure={handleOpenProcedure}
          onBack={handleBackToHome}
        />
      )}

      {/* Dedicated Procedure Sub-Page View */}
      {viewMode === 'procedure' && (
        <ProcedurePage
          procedure={activeProcedure}
          onBack={handleBackToHome}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          currentUser={currentUser}
          onRequireAuth={handleRequireAuth}
          onSubmitSuccess={(data) => setSuccessBookingData(data)}
        />
      )}

      {/* Dedicated Facility Sub-Page View */}
      {viewMode === 'facility' && (
        <FacilityDetailPage
          facility={activeFacility}
          onBack={handleBackToHome}
          currentUser={currentUser}
          onRequireAuth={handleRequireAuth}
          onSubmitSuccess={(data) => setSuccessBookingData(data)}
        />
      )}

      {/* Dedicated Doctor Sub-Page View */}
      {viewMode === 'doctor' && (
        <DoctorDetailPage
          doctor={activeDoctorObj}
          onBack={handleBackToHome}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          currentUser={currentUser}
          onRequireAuth={handleRequireAuth}
          onSubmitSuccess={(data) => setSuccessBookingData(data)}
        />
      )}

      {viewMode === 'admin' && (
        <AdminPortal currentUser={currentUser} onBack={handleBackToHome} onSignOut={handleSignOut} />
      )}

      {/* Footer */}
      <Footer
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Firebase Auth Modal (Sign In / Register / Google Auth) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessMessage={(msg) => {
          setToastMessage(msg);
        }}
      />

      {/* User Bookings Modal (My Scheduled Appointments loaded from Firestore) */}
      <UserBookingsModal
        isOpen={isBookingsModalOpen}
        currentUser={currentUser}
        onClose={() => setIsBookingsModalOpen(false)}
      />

      {/* Interactive Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      <ServiceDetailModal
        item={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onBookService={handleBookServiceFromModal}
      />

      <SuccessModal
        data={successBookingData}
        onClose={() => setSuccessBookingData(null)}
      />

    </div>
  );
}
