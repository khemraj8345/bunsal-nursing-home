import React, { useState } from 'react';
import { 
  Baby, 
  Eye, 
  Dna, 
  Activity, 
  ShieldCheck, 
  Stethoscope, 
  ChevronRight, 
  Clock, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  Heart,
  Syringe,
  Microscope
} from 'lucide-react';
import { specialties, procedures } from '../data/clinicalData';
import { hospitalMapsUrl } from '../data/hospitalLocation';

export default function SpecialitiesAndProcedures({ onOpenSpecialty, onOpenProcedure, onOpenProceduresList, onScrollToBooking, onScrollToDoctors }) {
  const [activeTab, setActiveTab] = useState('specialties'); // 'specialties' | 'procedures'

  // Exactly 2 primary specialties: Obstetrics And Gynaecology & Ophthalmology & Eye Care
  const specialtyItems = [
    {
      id: 'gynecology-ivf',
      title: 'Obstetrics And Gynaecology',
      icon: Baby,
      specialtyData: specialties.find(s => s.id === 'gynecology-ivf')
    },
    {
      id: 'ophthalmology',
      title: 'Ophthalmology & Eye Care',
      icon: Eye,
      specialtyData: specialties.find(s => s.id === 'ophthalmology')
    }
  ];

  // Procedure Icons mapping
  const getProcedureIcon = (procId) => {
    if (procId === 'cataract-phaco' || procId === 'glaucoma-care' || procId === 'retina-diabetic-care') {
      return Eye;
    }
    if (procId === 'ivf-icsi') return Dna;
    if (procId === 'iui-treatment') return Syringe;
    return Microscope;
  };

  return (
    <section id="specialities-procedures" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column (7 Columns): Section Header, Tabs, & Specialty/Procedure List */}
        <div class="lg:col-span-7 flex flex-col justify-start space-y-6">
          
          {/* Section Header */}
          <div class="border-b border-slate-200 pb-3 relative">
            <h2 class="text-2xl sm:text-3xl font-bold text-[#002b49] border-b-4 border-[#002b49] inline-block pb-3 tracking-tight -mb-[15px]">
              Specialities & Procedures
            </h2>
          </div>
          
          {/* Underline Tabs Switcher matching reference Teal & Grey style */}
          <div class="flex items-center gap-10 border-b border-slate-200 pb-1">
            <button
              onClick={() => setActiveTab('specialties')}
              class={`text-lg sm:text-xl font-bold pb-2 transition-all relative ${
                activeTab === 'specialties'
                  ? 'text-[#00a99d] font-extrabold'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span>Specialities</span>
              {activeTab === 'specialties' && (
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a99d]"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('procedures')}
              class={`text-lg sm:text-xl font-bold pb-2 transition-all relative ${
                activeTab === 'procedures'
                  ? 'text-[#00a99d] font-extrabold'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span>Procedures</span>
              {activeTab === 'procedures' && (
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a99d]"></div>
              )}
            </button>
          </div>

          {/* TAB 1: SPECIALITIES LIST (VERTICALLY STACKED GYNE & OPHTHAL) */}
          {activeTab === 'specialties' && (
            <div class="flex flex-col gap-y-5 pt-2 animate-fadeIn">
              {specialtyItems.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => onOpenSpecialty(item.specialtyData)}
                    class="flex items-center gap-4 group cursor-pointer"
                  >
                    {/* Minimal Line Art Icon */}
                    <div class="w-10 h-10 rounded-full border border-slate-300 group-hover:border-[#00a99d] bg-white flex items-center justify-center text-[#002b49] group-hover:text-[#00a99d] shrink-0 transition-all">
                      <IconComp class="w-5 h-5 stroke-[1.75]" />
                    </div>

                    {/* Text Link */}
                    <span class="text-sm sm:text-[15px] font-semibold text-[#002b49] group-hover:text-[#00a99d] transition-colors leading-snug">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: PROCEDURES LIST (2-COLUMN MINIMAL ICON + LINK) */}
          {activeTab === 'procedures' && (
            <div class="grid sm:grid-cols-2 gap-x-8 gap-y-7 py-2 animate-fadeIn">
              {procedures.map((proc) => {
                const ProcIcon = getProcedureIcon(proc.id);
                return (
                  <div
                    key={proc.id}
                    onClick={() => onOpenProcedure(proc)}
                    class="flex items-center gap-4 group cursor-pointer"
                  >
                    <div class="w-10 h-10 rounded-full border border-slate-300 group-hover:border-[#00a99d] bg-white flex items-center justify-center text-[#002b49] group-hover:text-[#00a99d] shrink-0 transition-all">
                      <ProcIcon class="w-5 h-5 stroke-[1.75]" />
                    </div>

                    <span class="text-sm sm:text-[15px] font-semibold text-[#002b49] group-hover:text-[#00a99d] transition-colors leading-snug">
                      {proc.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* View All Link ONLY for Procedures Tab */}
          {activeTab === 'procedures' && (
            <div class="pt-2">
              <button
                onClick={onOpenProceduresList}
                class="text-xs sm:text-sm font-extrabold text-[#002b49] hover:text-[#00a99d] inline-flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Right Column (5 Columns): "Looking for an Expert" Teal Container matching reference image */}
        <div class="lg:col-span-5">
          <div class="bg-[#00a99d] text-white rounded-[32px] p-7 sm:p-9 relative overflow-hidden flex flex-col justify-between h-full min-h-[380px] shadow-xl">
            
            {/* Top Right Clock Icon matching reference image */}
            <div class="absolute top-6 right-6 w-11 h-11 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Clock class="w-5 h-5 text-white" />
            </div>

            {/* Top Text Content */}
            <div class="space-y-3 relative z-10 max-w-sm pt-2">
              <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Looking for an Expert
              </h3>
              
              <p class="text-xs sm:text-sm text-teal-50 font-normal leading-relaxed opacity-95">
                Bansal Nursing Home & IVF Center is home to dedicated resident specialists in Obstetrics, Gynecology, IVF & Eye Care in Jagdalpur.
              </p>

              {/* Find a Doctor Action Button */}
              <div class="pt-2">
                <button
                  onClick={onScrollToDoctors || onScrollToBooking}
                  class="inline-flex items-center justify-between gap-6 bg-[#005f73] hover:bg-[#004d5d] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-md transition-all group border border-teal-400/30"
                >
                  <span>Find a Doctor</span>
                  <ChevronRight class="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bottom Doctor Consultation Vector Illustration matching reference image */}
            <div class="relative z-10 pt-6 mt-6 border-t border-white/20 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white">
                  24/7
                </div>
                <div>
                  <p class="text-xs font-bold text-white">Emergency Desk</p>
                  <p class="text-[11px] text-teal-100">+91 7782 224000</p>
                </div>
              </div>

              <a
                href={hospitalMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Bansal Nursing Home in Jagdalpur on Google Maps"
                class="bg-[#005f73] px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20 hover:bg-[#004d5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Jagdalpur Unit
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
