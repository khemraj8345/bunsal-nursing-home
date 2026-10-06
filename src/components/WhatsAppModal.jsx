import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';

export default function WhatsAppModal({ isOpen, onClose }) {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      message || "Hello Bansal Nursing Home & IVF Center team, I would like to inquire about gynecology & IVF services in Jagdalpur."
    );
    window.open(`https://wa.me/917782224000?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-emerald-100 relative">
        
        <button
          onClick={onClose}
          class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <span class="text-2xl font-black">W</span>
          </div>
          <div>
            <h3 class="text-xl font-extrabold text-slate-900">
              WhatsApp Desk Inquiry
            </h3>
            <p class="text-xs text-slate-500">
              Bansal Nursing Home & IVF Center
            </p>
          </div>
        </div>

        <p class="text-xs text-slate-600 mb-4 leading-relaxed">
          Connect directly with our clinical patient counselor on WhatsApp for quick inquiries regarding doctor timings, test reports, or IVF packages.
        </p>

        <div class="mb-5">
          <label class="block text-xs font-bold text-slate-700 mb-1.5">
            Your Question / Inquiry Message
          </label>
          <textarea
            rows="3"
            placeholder="Type your question here (e.g. AMH test cost, OPD timing for Dr. G. Bansal)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            class="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          ></textarea>
        </div>

        <button
          onClick={handleSendWhatsApp}
          class="w-full inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all"
        >
          <Send class="w-4 h-4" />
          <span>Start WhatsApp Chat (+91 7782 224000)</span>
        </button>

      </div>
    </div>
  );
}
