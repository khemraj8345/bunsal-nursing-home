import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Eye, 
  Search, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { procedures } from '../data/clinicalData';

export default function ProceduresListPage({ onOpenProcedure, onBack }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProcedures = procedures.filter((proc) => {
    const matchesFilter = filter === 'All' || 
      (filter === 'Gynecology' && proc.departmentId === 'gynecology-ivf') ||
      (filter === 'Eye Care' && proc.departmentId === 'ophthalmology');
    
    const matchesSearch = proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

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
            CLINICAL PROCEDURES DIRECTORY • BANSAL NURSING HOME
          </div>
        </div>

        {/* Hero Header Card */}
        <div class="bg-gradient-to-r from-[#0c2b48] via-[#0f3456] to-[#0284c7] rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3">
          <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-sky-200 uppercase tracking-wider inline-block">
            FULL PROCEDURES CATALOG
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Clinical & Surgical Procedures
          </h1>
          <p class="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
            Complete list of evidence-based diagnostic, therapeutic & micro-surgical procedures performed at Bansal Nursing Home & IVF Center in Jagdalpur.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Category Filter Pills */}
          <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
            {['All', 'Gynecology', 'Eye Care'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                class={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filter === cat
                    ? 'bg-[#0c2b48] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Procedures' : `${cat} Procedures`}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div class="relative w-full sm:w-72">
            <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search procedure..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
            />
          </div>

        </div>

        {/* Grid of All Procedures */}
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcedures.map((proc) => {
            const isGyne = proc.departmentId === 'gynecology-ivf';
            return (
              <div
                key={proc.id}
                onClick={() => onOpenProcedure(proc)}
                class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div>
                  {/* Procedure Image */}
                  <div class="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={proc.image}
                      alt={proc.title}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div class="absolute top-3 left-3">
                      <span class={`px-2.5 py-1 rounded-md text-[10px] font-bold text-white backdrop-blur-md ${
                        isGyne ? 'bg-sky-600' : 'bg-amber-600'
                      }`}>
                        {proc.department}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div class="p-5 space-y-3">
                    <h3 class="text-base font-extrabold text-[#0c2b48] group-hover:text-[#0284c7] transition-colors leading-snug">
                      {proc.title}
                    </h3>

                    <p class="text-xs text-slate-600 leading-relaxed font-normal">
                      {proc.shortDescription}
                    </p>

                    <div class="pt-2 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-600">
                      <span class="bg-slate-100 px-2.5 py-1 rounded">⏱️ {proc.duration}</span>
                      <span class="bg-slate-100 px-2.5 py-1 rounded">🛡️ {proc.anesthesia}</span>
                    </div>
                  </div>
                </div>

                {/* Procedure Detail Action */}
                <div class="p-5 pt-0">
                  <button
                    class="w-full py-2.5 px-3 bg-slate-50 group-hover:bg-[#0c2b48] group-hover:text-white border border-slate-200 text-[#0c2b48] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Full Procedure Details</span>
                    <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
