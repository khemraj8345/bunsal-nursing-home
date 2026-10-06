import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  UserCheck, 
  ChevronRight,
  Activity
} from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

export default function ProcedurePage({ procedure, onBack, onOpenEmergency, onSubmitSuccess, currentUser, onRequireAuth }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [procedure]);

  if (!procedure) return null;

  const isGyne = procedure.departmentId === 'gynecology-ivf';

  return (
    <div class="min-h-screen bg-[#f6f8fd] py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Back Navigation Bar */}
        <div class="flex items-center justify-between border-b border-slate-200 pb-4">
          <button
            onClick={onBack}
            class="inline-flex items-center gap-2 bg-[#0c2b48] hover:bg-[#113a60] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <ArrowLeft class="w-4 h-4 text-sky-400" />
            <span>Back</span>
          </button>

          <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
            PROCEDURE DETAIL PAGE • BANSAL NURSING HOME
          </div>
        </div>

        {/* Hero Header Card */}
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg grid lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 space-y-4">
            <div class="inline-flex items-center gap-2">
              <span class={`px-3 py-1 rounded-md text-xs font-bold text-white ${
                isGyne ? 'bg-sky-600' : 'bg-amber-600'
              }`}>
                {procedure.department}
              </span>
              <span class="text-xs font-semibold text-slate-500">Clinical Protocol</span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-extrabold text-[#0c2b48] tracking-tight">
              {procedure.title}
            </h1>

            <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {procedure.overview}
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-3">
              <div class="bg-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700">
                ⏱️ Duration: {procedure.duration}
              </div>
              <div class="bg-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700">
                🛡️ Anesthesia: {procedure.anesthesia}
              </div>
              <div class="bg-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700">
                🏥 Recovery: {procedure.recovery}
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="rounded-2xl overflow-hidden shadow-md border-4 border-slate-100 bg-slate-900 h-64 sm:h-72">
              <img src={procedure.image} alt={procedure.title} class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Step by Step Breakdown */}
        <div class="grid lg:grid-cols-12 gap-8">
          
          <div class="lg:col-span-7 space-y-6">
            
            <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 class="text-xl font-extrabold text-[#0c2b48] flex items-center gap-2">
                <Activity class="w-5 h-5 text-[#0284c7]" />
                <span>Procedure Steps & Clinical Pathway</span>
              </h2>

              <div class="space-y-3 pt-2">
                {procedure.steps.map((step, idx) => (
                  <div key={idx} class="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span class="w-6 h-6 rounded-full bg-[#0c2b48] text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span class="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div class="lg:col-span-5 space-y-6">
            
            <div class="bg-sky-50/70 rounded-2xl p-6 border border-sky-200 space-y-3">
              <h3 class="text-base font-bold text-[#0c2b48] flex items-center gap-2">
                <UserCheck class="w-4 h-4 text-[#0284c7]" />
                <span>Who is this Procedure Suitable For?</span>
              </h3>

              <div class="space-y-2 pt-1">
                {procedure.suitableFor.map((item, i) => (
                  <div key={i} class="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 class="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div class="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <span class="font-bold block mb-1">ℹ️ Important Clinical Note:</span>
              All procedures at Bansal Nursing Home are conducted under strict sterile surgical protocols adhering to NABH infection control standards. Initial evaluation with our resident consultant is required prior to scheduling.
            </div>

          </div>

        </div>

        {/* Booking Form Pre-selected for Procedure */}
        <div class="pt-4">
          <ConsultationForm
            selectedCategory={procedure.title}
            selectedDoctor={procedure.departmentId === 'ophthalmology' ? 'Dr. Manish Bansal' : ''}
            currentUser={currentUser}
            onRequireAuth={onRequireAuth}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>

      </div>
    </div>
  );
}
