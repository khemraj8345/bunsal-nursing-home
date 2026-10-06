import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { hospitalAddress, hospitalMapsUrl } from '../data/hospitalLocation';

export default function Footer({ onOpenEmergency }) {
  return (
    <footer class="bg-[#0f1d2f] text-slate-300 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Column */}
          <div class="lg:col-span-4 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#0284c7] flex items-center justify-center text-white font-bold text-xl shadow-md">
                B
              </div>
              <span class="text-lg font-extrabold text-white tracking-tight">
                Bansal Nursing Home & IVF Center
              </span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed max-w-sm">
              Serving Jagdalpur and the Bastar region with evidence-based medical care, modern infrastructure, and dedicated resident clinical specialists.
            </p>
            <div class="pt-2 flex items-center gap-2 text-xs font-semibold text-sky-400">
              <ShieldCheck class="w-4 h-4" />
              <span>NABH Standards & ISO Certified Facility</span>
            </div>
          </div>

          {/* Departments Column */}
          <div class="lg:col-span-2 space-y-3">
            <h4 class="text-xs font-bold text-white tracking-wider uppercase">
              DEPARTMENTS
            </h4>
            <ul class="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#departments" class="hover:text-white transition-colors">Advanced Eye Care & Ophthalmology</a></li>
              <li><a href="#departments" class="hover:text-white transition-colors">Gynecology & Obstetrics</a></li>
              <li><a href="#ivf-journey" class="hover:text-white transition-colors">IVF & Fertility Medicine</a></li>
              <li><a href="#departments" class="hover:text-white transition-colors">Ultrasound & Fetal Imaging</a></li>
              <li><a href="#departments" class="hover:text-white transition-colors">Laparoscopic Surgery</a></li>
              <li><a href="#booking-form" class="hover:text-white transition-colors">24/7 Casualty & Emergency Care</a></li>
            </ul>
          </div>

          {/* Clinical Standards Column */}
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-bold text-white tracking-wider uppercase">
              CLINICAL STANDARDS
            </h4>
            <ul class="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#" class="hover:text-white transition-colors">Ethical Counseling Charter</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Patient Privacy Charter</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Infection Control Protocols</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Emergency Admission Guide</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Biomedical Safety Protocols</a></li>
            </ul>
          </div>

          {/* Contact & Emergency Column */}
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-bold text-white tracking-wider uppercase">
              CONTACT & EMERGENCY
            </h4>
            <div class="space-y-2 text-xs text-slate-400">
              <a
                href={hospitalMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Bansal Nursing Home location in Google Maps: ${hospitalAddress}`}
                class="flex items-start gap-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <MapPin class="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{hospitalAddress}</span>
              </a>
              <p class="flex items-center gap-2">
                <PhoneCall class="w-4 h-4 text-sky-400 shrink-0" />
                <span>Hospital Desk: +91 7782 224000</span>
              </p>
              <p class="flex items-center gap-2">
                <Mail class="w-4 h-4 text-sky-400 shrink-0" />
                <span>Email: contact@bansalnursinghome.com</span>
              </p>
            </div>

            <div class="pt-2">
              <button
                onClick={onOpenEmergency}
                class="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all"
              >
                <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>24/7 Casualty & Maternity Desk</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div class="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © Bansal Nursing Home & IVF Center, Jagdalpur. All rights reserved. Educational and informational content only.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" class="hover:text-slate-300 transition-colors">Terms of Care</a>
            <span>•</span>
            <a href="#" class="hover:text-slate-300 transition-colors">Hospital Accreditation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
