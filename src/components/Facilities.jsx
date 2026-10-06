import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Facilities({ onSelectImage, onOpenFacility }) {
  const facilities = [
    {
      id: 'advanced-ot-anesthesia',
      title: 'Advanced Surgical OT & Anesthesia Workstation',
      description: 'Equipped with precision anesthesia delivery, multi-para vital sign monitors, surgical lights, and advanced mechanical ventilator.',
      image: '/images/advanced-ot-anesthesia.jpg',
      highlights: ['Advanced Mechanical Anesthesia Ventilator', 'Multi-parameter Vital Signs Cardiac Monitor', 'Sterile Overhead Surgical Light System']
    },
    {
      id: 'ivf-lab-ot',
      title: 'Modular Embryology & IVF Laboratory Suite',
      description: 'Sterile embryology laboratory workstation, ICSI micromanipulator, laminar airflow hoods, and gas-controlled incubators.',
      image: '/images/ivf-lab-facility.jpg',
      highlights: ['Ultrasonic Oocyte Retrieval Workstation', 'Laminar Airflow Sterilization Unit', '24/7 Temperature & Gas Controlled Incubators']
    },
    {
      id: 'baby-warmer-resuscitation',
      title: 'Baby Resuscitation Unit & Baby Warmer',
      description: 'Dedicated radiant warmer and neonatal resuscitation unit for immediate post-delivery newborn stabilization and care.',
      image: '/images/baby-warmer-resuscitation.jpg',
      highlights: ['Microprocessor Temperature Controlled Warmer', 'Integrated Oxygen & Resuscitation Line', '24/7 Neonatal Monitoring Desk']
    },
    {
      id: 'mammography-unit',
      title: 'Digital Mammography Diagnostic Unit',
      description: 'State-of-the-art Hologic digital mammography system for precise breast cancer screening and early preventive diagnostics.',
      image: '/images/mammography-unit.png',
      highlights: ['High-Resolution Digital Mammography System', 'Low-Radiation Dose Imaging Protocol', 'Confidential Screening Suite']
    },
    {
      id: 'digital-cr-system',
      title: 'Agfa Digital CR Radiology System',
      description: 'Advanced Computerized Radiography (CR) system for rapid digital imaging processing and crystal-clear X-ray diagnostic reporting.',
      image: '/images/digital-cr-system.jpg',
      highlights: ['Agfa High-Speed Digital CR Workstation', 'Instant High-Contrast Image Processing', 'PACS Connected Reporting Suite']
    },
    {
      id: 'digital-xray-unit',
      title: 'High-Frequency Digital X-Ray Diagnostic Unit',
      description: 'Precision digital X-ray machine with comfortable patient couch for comprehensive orthopedic, chest, and pelvic imaging.',
      image: '/images/digital-xray-unit.png',
      highlights: ['High-Frequency Precision Generator', 'Ergonomic Patient Examination Couch', 'Fast Digital Film Processing']
    },
    {
      id: 'dr-s-bansal-opd',
      title: 'Confidential Doctor OPD Consultation Chamber',
      description: 'Quiet, dignified meeting room for one-on-one medical counseling, reproductive health guidance, and patient privacy.',
      image: '/images/dr-s-bansal.jpg',
      highlights: ['1-on-1 Confidential Consultation Desk', 'Ultrasound Examination Couch', 'Digital Health Record System']
    },
    {
      id: 'mamta-bansal-opd',
      title: 'Gynecology & Obstetric Clinical OPD Unit',
      description: 'Dedicated examination suite led by Dr. Mamta Bansal for high-risk pregnancy screening and comprehensive gynecological care.',
      image: '/images/dr-mamta-bansal.jpg',
      highlights: ['Sonography & Fetal Tracking', 'High-Risk Pregnancy Evaluation', 'Preventive Women Health Checkups']
    },
    {
      id: 'hospital-building-campus',
      title: 'Bansal Hospital Campus & Inpatient Facility',
      description: 'Multi-specialty hospital facility in Demani Press Zone, Jagdalpur equipped for Obstetrics, IVF & Eye Care.',
      image: '/images/hospital-building.jpg',
      highlights: ['In-house Pharmacy & Diagnostics', '24/7 Obstetric & Emergency Desk', 'Ample Parking & Wheelchair Access']
    }
  ];

  return (
    <section id="facilities" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      {/* Section Header */}
      <div class="max-w-3xl mb-12 space-y-3">
        <div class="inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-[#0284c7]"></span>
          <span>INFRASTRUCTURE & SAFETY</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0c2b48] tracking-tight">
          Hospital Facilities & Diagnostic Equipment
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore real photos of our surgical operating theatre, sterile IVF laboratory, digital radiology suites, and OPD consultation chambers in Jagdalpur.
        </p>
      </div>

      {/* Facilities Grid */}
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((fac) => (
          <button
            type="button"
            key={fac.id}
            onClick={() => (onOpenFacility ? onOpenFacility(fac) : onSelectImage(fac))}
            aria-label={`View details for ${fac.title}`}
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            <span class="relative block aspect-video overflow-hidden bg-slate-100">
              <img
                src={fac.image}
                alt=""
                class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#0c2b48] shadow-md transition-all group-hover:bg-[#0c2b48] group-hover:text-white">
                <ArrowUpRight class="h-5 w-5" />
              </span>
            </span>

            <span class="block p-5 sm:p-6">
                <span class="block text-base font-bold leading-snug text-[#0c2b48] transition-colors group-hover:text-[#0284c7] sm:text-lg">
                  {fac.title}
                </span>
                <span class="mt-2 block line-clamp-2 text-sm font-normal leading-relaxed text-slate-600">
                  {fac.description}
                </span>
                <span class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-[#0284c7]">
                  <span>View facility details</span>
                  <ArrowUpRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
            </span>
          </button>
        ))}
      </div>

    </section>
  );
}
