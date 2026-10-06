import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ServiceDetailModal({ item, onClose, onBookService }) {
  if (!item) return null;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close button */}
        <button
          onClick={onClose}
          class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        {/* If image item (Facility preview) */}
        {item.image && (
          <div class="rounded-xl overflow-hidden mb-6 border border-slate-200 shadow-md">
            <img src={item.image} alt={item.title} class="w-full h-56 object-cover" />
          </div>
        )}

        <div class="space-y-4">
          <div class="inline-block px-3 py-1 rounded-full bg-sky-50 text-[#0284c7] font-bold text-xs">
            {item.badge}
          </div>

          <h3 class="text-2xl font-extrabold text-[#0c2b48]">
            {item.title}
          </h3>

          <p class="text-sm text-slate-600 leading-relaxed">
            {item.description}
          </p>

          {/* Details list */}
          {(item.details || item.highlights) && (
            <div class="pt-4 border-t border-slate-100 space-y-3">
              <h4 class="text-xs font-bold text-[#0c2b48] uppercase tracking-wider">
                Clinical Scope & Infrastructure Features
              </h4>
              <div class="grid gap-2">
                {(item.details || item.highlights).map((point, index) => (
                  <div key={index} class="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 class="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span class="font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onBookService(item.title);
              }}
              class="flex-1 bg-[#0c2b48] hover:bg-[#113a60] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Book Appointment for {item.title}</span>
              <ArrowRight class="w-4 h-4 text-sky-400" />
            </button>

            <button
              onClick={onClose}
              class="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
