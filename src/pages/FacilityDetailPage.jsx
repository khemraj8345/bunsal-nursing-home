import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import ConsultationForm from '../components/ConsultationForm';
import { hospitalAddress, hospitalMapsUrl } from '../data/hospitalLocation';

export default function FacilityDetailPage({ facility, onBack, onSubmitSuccess, currentUser, onRequireAuth }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [facility]);

  if (!facility) return null;

  return (
    <div className="min-h-screen bg-[#f6f8fd] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-[#0c2b48] hover:bg-[#113a60] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Back</span>
          </button>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
            FACILITY & DIAGNOSTIC DETAIL • BANSAL NURSING HOME
          </div>
        </div>

        {/* Facility showcase */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5">
          <div className="grid items-stretch lg:grid-cols-12">
            <div className="relative aspect-video overflow-hidden bg-slate-100 lg:col-span-7 lg:aspect-auto lg:min-h-[520px]">
              <img
                src={facility.image}
                alt={facility.title}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-between bg-white p-6 sm:p-9 lg:col-span-5 lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0284c7]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Bansal Nursing Home • Facility profile</span>
                </div>

                <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-[#0c2b48] sm:text-3xl">
                  {facility.title}
                </h1>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {facility.description}
                </p>

                <div className="mt-7 border-t border-slate-200 pt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Facility highlights
                  </h2>
                  <div className="mt-4 space-y-3">
                    {facility.highlights?.map((h, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0284c7]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={hospitalMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Bansal Nursing Home location in Google Maps: ${hospitalAddress}`}
                className="mt-7 flex items-center gap-2 border-t border-slate-200 pt-5 text-xs font-semibold text-slate-500 transition-colors hover:text-[#0284c7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <MapPin className="h-4 w-4 text-[#0284c7]" />
                <span>{hospitalAddress}</span>
              </a>
            </div>

          </div>
        </div>

        {/* Detailed Facility Booking & Inquiry Form */}
        <div className="pt-4">
          <ConsultationForm
            selectedCategory={facility.title}
            currentUser={currentUser}
            onRequireAuth={onRequireAuth}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>

      </div>
    </div>
  );
}
