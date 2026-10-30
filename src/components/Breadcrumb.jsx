import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb() {
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 sm:space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <li className="inline-flex items-center">
          <a href="#" className="hover:text-[#0284c7] transition-colors">HOME</a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-0.5" />
            <a href="#departments" className="hover:text-[#0284c7] transition-colors">DEPARTMENTS</a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center text-[#0284c7]">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-0.5" />
            <span className="font-bold">GYNECOLOGY, OBSTETRICS & IVF</span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
