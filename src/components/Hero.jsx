import React from 'react';
import { Calendar, ShieldCheck, UserCheck, Clock } from 'lucide-react';

export default function Hero({ onSelectCategory, onOpenWhatsApp, onScrollToBooking }) {
  return (
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Text & CTAs */}
        <div class="lg:col-span-7 space-y-6">
          
          {/* Department Red Tag Badge */}
          <div class="inline-flex items-center gap-2 bg-red-100/90 border border-red-200 px-3.5 py-1.5 rounded-full">
            <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span class="text-xs font-bold text-red-800 tracking-wide uppercase">
              WOMEN'S HEALTH • REPRODUCTIVE MEDICINE • ADVANCED EYE CARE
            </span>
          </div>

          {/* Main Title with Red Highlight Accent */}
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0c2b48] tracking-tight leading-[1.15]">
            Comprehensive Care for Every Stage of{' '}
            <span class="text-red-700 inline-block relative">
              Womanhood, Fertility & Advanced Eye Care.
              <svg class="absolute -bottom-1 left-0 w-full h-2 text-red-200 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,10" stroke="currentColor" stroke-width="8" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p class="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            From maternal health, safe delivery, and reproductive counseling to specialized ophthalmic diagnostics & vision care in Jagdalpur, Bastar. Guided by dedicated resident specialists committed to patient dignity and clinical transparency.
          </p>

          {/* Hero Red Action Buttons */}
          <div class="flex flex-wrap items-center gap-3 pt-2">
            
            {/* CTA 1: Primary Red Schedule Button */}
            <button
              onClick={() => {
                onSelectCategory("IVF & Assisted Conception");
                onScrollToBooking();
              }}
              class="inline-flex items-center gap-2.5 bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm font-bold px-5 py-3.5 rounded-xl shadow-md shadow-red-900/20 hover:shadow-lg transition-all group"
            >
              <Calendar class="w-4 h-4 text-red-200 group-hover:scale-110 transition-transform" />
              <span>Schedule Consultation</span>
            </button>

            {/* CTA 2: WhatsApp Inquiry */}
            <button
              onClick={onOpenWhatsApp}
              class="inline-flex items-center gap-2 bg-[#dcfce7] hover:bg-emerald-200 text-[#15803d] text-xs sm:text-sm font-bold px-4 py-3.5 rounded-xl transition-all"
            >
              <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">W</span>
              <span>WhatsApp Inquiry</span>
            </button>
          </div>

          {/* Highlights Row with Red Icons */}
          <div class="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-slate-700 text-xs font-semibold">
            <div class="flex items-center gap-2">
              <ShieldCheck class="w-4 h-4 text-red-600" />
              <span>Ethical, Evidence-Based Care</span>
            </div>
            <div class="flex items-center gap-2">
              <UserCheck class="w-4 h-4 text-red-600" />
              <span>Dedicated Resident Specialists</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">👁️</span>
              <span>Ophthalmology & Vision Unit</span>
            </div>
            <div class="flex items-center gap-2">
              <Clock class="w-4 h-4 text-red-600 animate-pulse" />
              <span>24/7 Emergency Services</span>
            </div>
          </div>

        </div>

        {/* Right Column: Visual Hero Image Card */}
        <div class="lg:col-span-5 relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
            
            {/* Real Bansal Nursing Home Building Image */}
            <img
              src="/images/hospital-building.jpg"
              alt="Bansal Nursing Home & IVF Center Building Facade in Jagdalpur"
              class="w-full h-[420px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
            />

            {/* Gradient Overlay */}
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20"></div>

            {/* Bottom Left Hospital Name */}
            <div class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-100 max-w-[260px]">
              <div class="text-red-700 font-bold text-xs">
                <span>Bansal Nursing Home</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
