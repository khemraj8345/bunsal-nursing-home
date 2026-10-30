import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export default function MedicalConsultants({ onSelectDoctor, onScrollToBooking, onOpenDoctor }) {
  const doctors = [
    {
      id: 'dr-mamta-bansal',
      name: 'Dr. Mamta Bansal',
      tag: 'Obstetrics & Laparoscopic Surgeon',
      qualifications: 'MBBS, DGO, DNB (Obs & Gyn), Minimal Access Surgery Specialist',
      clinicalFocus: 'High-risk obstetrics, painless vaginal delivery, laparoscopic cystectomy, fibroid surgery, and adolescent health.',
      experience: '16+ years of clinical practice in Jagdalpur & Bastar.',
      opd: 'Mon - Sat: 10:00 AM - 2:00 PM',
      department: 'Gynecology & Obstetrics',
      image: `${import.meta.env.BASE_URL}images/dr-mamta-bansal-portrait.png`,
      badgeColor: 'bg-sky-50 text-[#0284c7] border-sky-200'
    },
    {
      id: 'dr-s-bansal',
      name: 'Dr. S. Bansal',
      tag: 'Gynecologist & IVF Specialist',
      qualifications: 'MBBS, MS (Obstetrics & Gynecology), Fellow in Reproductive Medicine',
      clinicalFocus: 'Infertility diagnostic workup, AMH testing, follicular tracking, IUI, IVF/ICSI procedures, and embryo transfer.',
      experience: '15+ years in reproductive medicine & female healthcare.',
      opd: 'Mon - Sat: 3:00 PM - 7:00 PM',
      department: 'Gynecology & IVF',
      image: `${import.meta.env.BASE_URL}images/dr-s-bansal.jpg`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'dr-manish-bansal',
      name: 'Dr. Manish Bansal',
      tag: 'Consultant Eye Surgeon & Retina Specialist',
      qualifications: 'MBBS, MS (Ophthalmology), Fellow in Phacoemulsification & Vitreo-Retina',
      clinicalFocus: 'Stitchless micro-incision Phaco cataract surgery, IOL implants, glaucoma pressure management, and diabetic retinopathy.',
      experience: '14+ years in ophthalmic microsurgery.',
      opd: 'Mon - Sat: 11:00 AM - 6:00 PM',
      department: 'Ophthalmology & Eye Care',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  return (
    <section id="doctors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-[#0284c7]"></span>
          <span>DEPARTMENT SPECIALISTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2b48] tracking-tight">
          Lead Medical Consultants
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Our hospital is staffed by experienced resident specialists committed to patient safety, ethical practice, and comprehensive healthcare across Gynecology, IVF & Eye Care.
        </p>
      </div>

      {/* Doctor Cards Grid (3 Cards) */}
      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
          >
            <div 
              onClick={() => onOpenDoctor && onOpenDoctor(doctor)}
              className="cursor-pointer"
            >
              {/* Doctor Portrait Image */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-200">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{ objectPosition: doctor.id === 'dr-mamta-bansal' ? 'center top' : 'center' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[10px] font-bold text-center">
                  Resident Specialist • Click for Profile
                </div>
              </div>

              {/* Speciality Badge Tag */}
              <div className={`inline-block border px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 ${doctor.badgeColor}`}>
                {doctor.tag}
              </div>

              {/* Name & Qualifications */}
              <div className="mb-3">
                <h3 className="text-lg font-extrabold text-[#0c2b48] group-hover:text-[#0284c7] transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                  {doctor.qualifications}
                </p>
              </div>

              {/* Clinical Focus */}
              <div className="text-xs text-slate-600 leading-relaxed mb-3">
                <span className="font-bold text-[#0c2b48]">Clinical Focus: </span>
                {doctor.clinicalFocus}
              </div>

              {/* OPD Schedule */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-4">
                <Clock className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>{doctor.opd}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenDoctor && onOpenDoctor(doctor)}
                className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-[#0c2b48] rounded-xl text-xs font-bold transition-all text-center"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  onSelectDoctor(doctor.name, doctor.department);
                  onScrollToBooking();
                }}
                className="py-2.5 px-2 bg-[#0c2b48] hover:bg-[#0284c7] text-white rounded-xl text-xs font-bold transition-all text-center inline-flex items-center justify-center gap-1"
              >
                <span>Book OPD</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
