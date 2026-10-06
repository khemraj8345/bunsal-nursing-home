import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Baby, 
  Eye, 
  User, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  PhoneCall, 
  Award,
  ChevronRight
} from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';

export default function SpecialtyPage({ specialty, onBack, onOpenEmergency, onSubmitSuccess, currentUser, onRequireAuth }) {
  // Only pre-fill doctor if there is only 1 doctor in the department (e.g. Ophthalmology = Dr. Manish Bansal)
  const defaultDoc = specialty?.id === 'ophthalmology' ? (specialty?.doctors[0]?.name || 'Dr. Manish Bansal') : '';
  const [activeDoctorInForm, setActiveDoctorInForm] = React.useState(defaultDoc);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const targetDoc = specialty?.id === 'ophthalmology' ? (specialty?.doctors[0]?.name || 'Dr. Manish Bansal') : '';
    setActiveDoctorInForm(targetDoc);
  }, [specialty]);

  if (!specialty) return null;

  const isGyne = specialty.id === 'gynecology-ivf';

  const handleSelectDoctorForBooking = (docName) => {
    setActiveDoctorInForm(docName);
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
            DEPARTMENT PAGE • BANSAL NURSING HOME
          </div>
        </div>

        {/* Hero Banner Header */}
        <div class="bg-gradient-to-r from-[#0c2b48] to-[#0284c7] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 opacity-10">
            {isGyne ? <Baby class="w-96 h-96" /> : <Eye class="w-96 h-96" />}
          </div>

          <div class="relative z-10 space-y-4 max-w-3xl">
            <span class="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-sky-200 uppercase tracking-wider">
              {specialty.badge}
            </span>

            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {specialty.name}
            </h1>

            <p class="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
              {specialty.shortDescription}
            </p>

            <div class="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-sky-200">
              <span class="flex items-center gap-1.5"><ShieldCheck class="w-4 h-4 text-emerald-400" /> Evidence-Based Protocol</span>
              <span class="flex items-center gap-1.5"><User class="w-4 h-4 text-amber-300" /> Resident Specialists</span>
              <span class="flex items-center gap-1.5"><Clock class="w-4 h-4 text-rose-300" /> 24/7 Emergency Support</span>
            </div>
          </div>
        </div>

        {/* Resident Doctors Section */}
        <div class="space-y-6">
          <div class="border-b border-slate-200 pb-3">
            <h2 class="text-2xl font-extrabold text-[#0c2b48]">
              Department Resident Consultants
            </h2>
            <p class="text-xs text-slate-500 mt-1">
              Experienced medical specialists available for daily OPD consultations & emergency care.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            {specialty.doctors.map((doc) => (
              <div key={doc.id} class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-6">
                <img src={doc.image} alt={doc.name} class="w-28 h-36 rounded-xl object-cover border border-slate-200 shrink-0" />
                
                <div class="space-y-2 flex-1">
                  <span class="inline-block px-2.5 py-0.5 rounded bg-sky-50 text-[#0284c7] font-bold text-[11px]">
                    {doc.experience}
                  </span>
                  
                  <h3 class="text-lg font-bold text-[#0c2b48]">{doc.name}</h3>
                  <p class="text-xs font-semibold text-slate-600">{doc.role}</p>
                  <p class="text-[11px] text-slate-500 font-medium">{doc.qualifications}</p>

                  <div class="pt-2 text-xs text-slate-600 leading-relaxed">
                    {doc.bio}
                  </div>

                  <div class="pt-2 flex items-center justify-between flex-wrap gap-2">
                    <div class="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Clock class="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>{doc.opd}</span>
                    </div>

                    <button
                      onClick={() => handleSelectDoctorForBooking(doc.name)}
                      class="px-3 py-1.5 bg-[#0c2b48] hover:bg-[#0284c7] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <span>Book Consultation</span>
                      <ChevronRight class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Highlights */}
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-lg font-bold text-[#0c2b48]">
            Department Infrastructure & Facilities
          </h3>
          <div class="grid sm:grid-cols-2 gap-3">
            {specialty.highlights.map((h, i) => (
              <div key={i} class="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700">
                <CheckCircle2 class="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Appointment Booking on Department Page */}
        <div class="pt-4">
          <ConsultationForm
            selectedCategory={specialty.name}
            selectedDoctor={activeDoctorInForm}
            currentUser={currentUser}
            onRequireAuth={onRequireAuth}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>

      </div>
    </div>
  );
}
