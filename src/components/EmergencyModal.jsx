import React from 'react';
import { X, PhoneCall, AlertTriangle, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { hospitalAddress, hospitalMapsUrl } from '../data/hospitalLocation';

export default function EmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-rose-100 relative overflow-hidden">
        
        {/* Top Emergency Red Bar */}
        <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-600"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle class="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h3 class="text-xl font-extrabold text-slate-900">
              24/7 Emergency Maternity Desk
            </h3>
            <p class="text-xs font-semibold text-rose-600">
              Immediate Obstetric & Casualty Response
            </p>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          For acute labor pains, severe abdominal symptoms, sudden bleeding, or immediate obstetric emergencies, our casualty team and resident obstetricians are on 24/7 standby in Jagdalpur.
        </p>

        {/* Emergency Phone Call Action Box */}
        <div class="bg-rose-50 rounded-xl p-4 border border-rose-200 text-center space-y-3 mb-6">
          <span class="text-xs font-bold text-rose-800 uppercase tracking-wider block">
            Direct Emergency Hotline
          </span>
          <a
            href="tel:+917782224000"
            class="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg py-3.5 px-6 rounded-xl shadow-lg shadow-red-600/20 hover:scale-[1.02] transition-all w-full"
          >
            <PhoneCall class="w-5 h-5 animate-pulse" />
            <span>+91 7782 224000</span>
          </a>
          <p class="text-[11px] text-rose-700 font-medium">
            Available 24 Hours a Day • 365 Days a Year
          </p>
        </div>

        <div class="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
          <div class="flex items-center gap-2">
            <Clock class="w-4 h-4 text-[#0284c7]" />
            <span>Casualty OT & Delivery Suite ready round-the-clock.</span>
          </div>
          <a
            href={hospitalMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Bansal Nursing Home location in Google Maps: ${hospitalAddress}`}
            class="flex items-center gap-2 transition-colors hover:text-[#0284c7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <MapPin class="w-4 h-4 text-[#0284c7]" />
            <span>{hospitalAddress}</span>
          </a>
        </div>

        <div class="mt-6">
          <button
            onClick={onClose}
            class="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
