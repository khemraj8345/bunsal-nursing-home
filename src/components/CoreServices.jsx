import React, { useState } from 'react';
import { 
  Baby, 
  Stethoscope, 
  Microscope, 
  Dna, 
  Users, 
  Activity, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight,
  Search,
  Sparkles,
  Eye
} from 'lucide-react';

export default function CoreServices({ onSelectService, onScrollToBooking }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      id: 'eye-care-main',
      title: 'Advanced Eye Care & Ophthalmology',
      category: 'Eye Care',
      icon: Eye,
      iconBg: 'bg-amber-100/80',
      iconColor: 'text-amber-700',
      description: 'Comprehensive vision testing, computerized refraction, cataract evaluation, glaucoma screening, and diabetic retinopathy management.',
      badge: 'Vision & Retina Care',
      details: [
        'Comprehensive Slit-Lamp & Ophthalmic Examination',
        'Cataract Workup & Intraocular Lens (IOL) Selection',
        'Glaucoma Intraocular Pressure (IOP) & Nerve Screening',
        'Diabetic Retinopathy & Macular Health Screening'
      ]
    },
    {
      id: 'refractive-optics',
      title: 'Refractive & Pediatric Eye Care',
      category: 'Eye Care',
      icon: Eye,
      iconBg: 'bg-amber-100/80',
      iconColor: 'text-amber-700',
      description: 'Precision automated refraction, squints and amblyopia evaluation for children, dry eye therapy, and prescription optics guidance.',
      badge: 'Precision Optics',
      details: [
        'Automated Computerized Refraction & Eyeglass Prescription',
        'Pediatric Squint & Vision Screening',
        'Dry Eye Diagnostic Tear Film Evaluation',
        'Contact Lens & Specialized Vision Aids Counseling'
      ]
    },
    {
      id: 'obstetrics',
      title: 'Obstetrics & Maternity Care',
      category: 'Obstetrics',
      icon: Baby,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
      description: 'Comprehensive antenatal care, high-risk pregnancy monitoring, normal and cesarean delivery choices, and post-natal maternal recovery.',
      badge: 'Antenatal to Delivery',
      details: [
        'Routine & High-Risk Antenatal Care (ANC)',
        'Normal Vaginal Delivery & Painless Birth Options',
        'Elective & Emergency Cesarean Section (C-Section)',
        'Postpartum Maternal & Neonatal Health Monitoring'
      ]
    },
    {
      id: 'gynecology',
      title: 'General & Surgical Gynecology',
      category: 'Gynecology',
      icon: Stethoscope,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
      description: 'Management of PCOD, ovarian cysts, fibroids, endometriosis, and comprehensive adolescent & menopausal wellness.',
      badge: 'Holistic Gynecology',
      details: [
        'PCOD / PCOS Clinical Management Protocols',
        'Laparoscopic Cystectomy & Fibroid Surgery',
        'Endometriosis Treatment & Pain Management',
        'Adolescent & Menopausal Hormonal Wellness'
      ]
    },
    {
      id: 'infertility',
      title: 'Infertility Diagnostic Workup',
      category: 'Infertility',
      icon: Microscope,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
      description: 'Precision follicular tracking/ultrasound, ovarian reserve testing/hormonal profiles, semen analysis, hysterosalpingography (HSG), and laparoscopy evaluations.',
      badge: 'Couple Assessment',
      details: [
        'Hormonal Profile & Ovarian Reserve (AMH) Testing',
        'Computerized Semen Analysis & Sperm Morphology',
        'Tubal Patency Assessment (HSG / SSG)',
        'Diagnostic Laparoscopy & Hysteroscopy'
      ]
    },
    {
      id: 'ivf',
      title: 'IVF & Assisted Conception',
      category: 'Infertility',
      icon: Dna,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
      description: 'Controlled ovarian stimulation, intrauterine insemination (IUI), IVF/ICSI assessment, embryo/oocyte transfer, and individualized clinical support.',
      badge: 'Assisted Reproduction',
      details: [
        'Intrauterine Insemination (IUI) - Homologous / Donor',
        'In Vitro Fertilization (IVF) & ICSI Procedures',
        'Embryo Cryopreservation & Frozen Embryo Transfer (FET)',
        'Blastocyst Culture & Oocyte Freezing'
      ]
    },
    {
      id: 'counseling',
      title: 'Fertility Counseling & Guidance',
      category: 'Infertility',
      icon: Users,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
      description: 'Transparent pre-treatment counseling, honest discussion of medical prognosis and age factors, with compassionate psychological guidance throughout.',
      badge: 'Transparent Dialogue',
      details: [
        'Realistic Prognosis & Evidence-Based Expectations',
        'Emotional Support & Stress Management in IVF',
        'Financial & Procedural Clarity',
        'Couple Consultation & Mind-Body Wellness'
      ]
    },
    {
      id: 'ultrasound',
      title: 'Diagnostic Ultrasound & Fetal Medicine',
      category: 'Diagnostics',
      icon: Activity,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
      description: 'High-resolution pelvic sonography, dedicated Doppler study, high-level anomaly scans, and fetal well-being assessment.',
      badge: 'Advanced Sonography',
      details: [
        'TIFFA / High-Level Anomaly Ultrasound Scans',
        'Maternal & Fetal Color Doppler Studies',
        '3D / 4D Fetal Wellbeing Assessment',
        'Follicular Tracking & Pelvic Scans'
      ]
    },
    {
      id: 'pregnancy-care',
      title: 'Pregnancy Care Programs',
      category: 'Obstetrics',
      icon: HeartHandshake,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
      description: 'Maternal nutritional counseling, gestational diabetes screening, preeclampsia screening, and timely immunization schedules.',
      badge: 'Maternal Wellness',
      details: [
        'Gestational Diabetes Screening & Diet Management',
        'Hypertension & Preeclampsia Early Detection',
        'Maternal Nutrition & Prenatal Supplements',
        'Childbirth Education & Vaccination Guidance'
      ]
    },
    {
      id: 'preventive',
      title: "Women's Preventive Health",
      category: 'Preventive',
      icon: ShieldCheck,
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
      description: 'Preventive cervical/breast cancer screening, clinical breast examination, pelvic physical therapy, and annual health checkup packages.',
      badge: 'Preventive Coverage',
      details: [
        'Pap Smear & Cervical Cancer HPV Screening',
        'Clinical Breast Examination & Mammography Guidance',
        'Pelvic Floor Rehabilitation Counseling',
        'Annual Comprehensive Women Wellness Checkups'
      ]
    }
  ];

  const categories = ['All', 'Eye Care', 'Obstetrics', 'Gynecology', 'Infertility', 'Diagnostics', 'Preventive'];

  const filteredServices = services.filter((s) => {
    const matchesCategory = activeFilter === 'All' || s.category === activeFilter;
    const matchesQuery = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="departments" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      {/* Section Header */}
      <div class="max-w-3xl mb-10 space-y-3">
        <div class="inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-[#0284c7]"></span>
          <span>COMPREHENSIVE MEDICAL SCOPE</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0c2b48] tracking-tight">
          Core Clinical Services
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          Specialized gynecology, obstetrics, and reproductive wellness tailored to regional families in Bastar, supported by modern clinical infrastructure and transparent clinical dialogue.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        
        {/* Category Pills */}
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              class={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? 'bg-[#0c2b48] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div class="relative w-full sm:w-64">
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            class="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
          />
        </div>

      </div>

      {/* Services Grid (8 Cards) */}
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              class="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Subtle accent hover indicator */}
              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0c2b48] to-[#0284c7] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Icon */}
                <div class={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <IconComponent class={`w-6 h-6 ${service.iconColor}`} />
                </div>

                {/* Title */}
                <h3 class="text-lg font-bold text-[#0c2b48] mb-2.5 group-hover:text-[#0284c7] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p class="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              {/* Card Footer Link Badge */}
              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[12px] font-semibold text-slate-700 group-hover:text-[#0284c7] transition-colors flex items-center gap-1">
                  {service.badge}
                </span>
                <div class="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#0284c7] group-hover:text-white flex items-center justify-center text-slate-500 transition-all">
                  <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
