import React from 'react';
import { CheckCircle2, Calendar, User, Phone, FileText, X } from 'lucide-react';

export default function SuccessModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 text-center relative">
        
        <button
          onClick={onClose}
          class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-4 flex items-center justify-center shadow-inner">
          <CheckCircle2 class="w-8 h-8" />
        </div>

        <h3 class="text-xl font-extrabold text-slate-900 mb-1">
          Appointment Request Received
        </h3>
        <p class="text-xs text-slate-500 mb-6">
          Reference Code: <span class="font-bold text-[#0c2b48] bg-slate-100 px-2 py-0.5 rounded">{data.referenceId}</span>
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-left text-xs space-y-2.5 mb-6">
          <div class="flex items-center justify-between">
            <span class="text-slate-500 font-medium">Patient Name:</span>
            <span class="font-bold text-slate-800">{data.fullName}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 font-medium">Contact Phone:</span>
            <span class="font-bold text-slate-800">{data.phone}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 font-medium">Domain:</span>
            <span class="font-bold text-[#0284c7]">{data.category}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 font-medium">Preferred Specialist:</span>
            <span class="font-bold text-slate-800">{data.doctor}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 font-medium">Requested Date:</span>
            <span class="font-bold text-slate-800">{data.preferredDate}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500 font-medium">Time Window:</span>
            <span class="font-bold text-slate-800">{data.timeWindow}</span>
          </div>
        </div>

        <p class="text-[11px] text-slate-500 mb-6 leading-relaxed">
          Our hospital front desk team will call you within 2 hours to confirm your final OPD token slot.
        </p>

        <button
          onClick={onClose}
          class="w-full bg-[#0c2b48] hover:bg-[#113a60] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all"
        >
          Done
        </button>

      </div>
    </div>
  );
}
