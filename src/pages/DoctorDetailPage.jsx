import React, { useEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Award, Calendar, CheckCircle2, UserCheck } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

export default function DoctorDetailPage({ doctor, onBack, onOpenEmergency, onSubmitSuccess, currentUser, onRequireAuth }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [doctor]);

  if (!doctor) return null;

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
            SPECIALIST DOCTOR PROFILE • BANSAL NURSING HOME
          </div>
        </div>

        {/* Doctor Hero Card with Large Photo Display */}
        <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl">
          <div class="grid md:grid-cols-12 gap-0 items-center">
            
            {/* Large High-Resolution Doctor Photo (5 Columns) */}
            <div class="md:col-span-5 relative bg-slate-900 h-80 sm:h-[460px]">
              <img
                src={doctor.image}
                alt={doctor.name}
                style={{ objectPosition: doctor.id === 'dr-mamta-bansal' ? 'center top' : 'center' }}
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div class="absolute bottom-6 left-6 right-6">
                <span class="inline-block px-3 py-1 rounded-md bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider mb-2">
                  Resident Specialist
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
                  {doctor.name}
                </h1>
                <p class="text-xs text-sky-200 font-semibold mt-1">
                  {doctor.tag}
                </p>
              </div>
            </div>

            {/* Doctor Bio, Qualifications, & OPD Schedule (7 Columns) */}
            <div class="md:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <span class="inline-block px-3 py-1 rounded-full bg-sky-50 text-[#0284c7] border border-sky-200 font-bold text-xs mb-3">
                  {doctor.experience}
                </span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0c2b48]">
                  {doctor.name}
                </h2>
                <p class="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  {doctor.qualifications}
                </p>
              </div>

              {/* Clinical Focus & Biography */}
              <div class="space-y-2">
                <h3 class="text-xs font-bold text-[#0c2b48] uppercase tracking-wider">
                  Clinical Expertise & Focus
                </h3>
                <p class="text-slate-700 text-sm leading-relaxed font-normal">
                  {doctor.clinicalFocus || doctor.bio}
                </p>
              </div>

              {/* OPD Operating Hours */}
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div class="flex items-center gap-2 text-xs font-bold text-[#0c2b48]">
                  <Clock class="w-4 h-4 text-[#0284c7]" />
                  <span>OPD Timings:</span>
                </div>
                <span class="text-xs font-semibold text-slate-700">
                  {doctor.opd}
                </span>
              </div>

              {/* Quality Badges */}
              <div class="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
                <span class="flex items-center gap-1.5"><ShieldCheck class="w-4 h-4 text-[#0284c7]" /> Ethical Patient Care</span>
                <span class="flex items-center gap-1.5"><Award class="w-4 h-4 text-amber-500" /> Experienced Specialist</span>
              </div>
            </div>

          </div>
        </div>

        {/* Direct Appointment Booking for Doctor */}
        <div class="pt-4">
          <ConsultationForm
            selectedDoctor={doctor.name}
            selectedCategory={doctor.department}
            currentUser={currentUser}
            onRequireAuth={onRequireAuth}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>

      </div>
    </div>
  );
}
