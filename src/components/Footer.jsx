import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { hospitalAddress, hospitalMapsUrl } from '../data/hospitalLocation';

export default function Footer({ onOpenEmergency }) {
  return (
    <footer className="bg-[#0f1d2f] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0284c7] flex items-center justify-center text-white font-bold text-xl shadow-md">
                B
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                Bansal Nursing Home & IVF Center
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Serving Jagdalpur and the Bastar region with evidence-based medical care, modern infrastructure, and dedicated resident clinical specialists.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-sky-400">
              <ShieldCheck className="w-4 h-4" />
              <span>NABH Standards & ISO Certified Facility</span>
            </div>
          </div>

          {/* Departments Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">
              DEPARTMENTS
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#departments" className="hover:text-white transition-colors">Advanced Eye Care & Ophthalmology</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Gynecology & Obstetrics</a></li>
              <li><a href="#ivf-journey" className="hover:text-white transition-colors">IVF & Fertility Medicine</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Ultrasound & Fetal Imaging</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Laparoscopic Surgery</a></li>
              <li><a href="#booking-form" className="hover:text-white transition-colors">24/7 Casualty & Emergency Care</a></li>
            </ul>
          </div>

          {/* Clinical Standards Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">
              CLINICAL STANDARDS
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Ethical Counseling Charter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Patient Privacy Charter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Infection Control Protocols</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Admission Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Biomedical Safety Protocols</a></li>
            </ul>
          </div>

          {/* Contact & Emergency Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">
              CONTACT & EMERGENCY
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <a
                href={hospitalMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Bansal Nursing Home location in Google Maps: ${hospitalAddress}`}
                className="flex items-start gap-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{hospitalAddress}</span>
              </a>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Hospital Desk: +91 7782 224000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Email: contact@bansalnursinghome.com</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEmergency}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>24/7 Casualty & Maternity Desk</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © Bansal Nursing Home & IVF Center, Jagdalpur. All rights reserved. Educational and informational content only.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Care</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Hospital Accreditation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
