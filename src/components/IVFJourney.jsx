import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function IVFJourney({ onScrollToBooking }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: 1,
      title: 'Initial Couple Evaluation',
      summary: 'Detailed medical history, hormone assays, semen evaluation, and baseline ultrasound scan to determine baseline health.',
      details: [
        'Comprehensive clinical history review for both partners',
        'Serum AMH & baseline hormonal panel evaluation',
        'High-resolution baseline pelvic ultrasound scan',
        'Seminal fluid analysis following WHO strict criteria'
      ]
    },
    {
      number: 2,
      title: 'Protocol Personalization',
      summary: 'Controlled ovarian stimulation regimen tailored to ovarian reserve status, age, and individual medical history.',
      details: [
        'Selection of short GnRH antagonist or long agonist protocol',
        'Individualized gonadotropin dosage customization',
        'Medication administration guidance & nurse support',
        'Pre-stimulation counseling and scheduling clarity'
      ]
    },
    {
      number: 3,
      title: 'Monitoring & Procedures',
      summary: 'Serial ultrasound monitoring of follicle development, timing trigger administration, and ultrasound-guided egg retrieval under gentle sedation.',
      details: [
        'Transvaginal ultrasound follicle tracking every 2-3 days',
        'Serum estradiol level monitoring during follicular phase',
        'Precision hCG/GnRH trigger injection timing',
        'Comfortable ultrasound-guided oocyte retrieval under sedation'
      ]
    },
    {
      number: 4,
      title: 'Embryo Culture & Transfer',
      summary: 'IVF/ICSI fertilization, embryo development tracking, high-precision ultrasound-guided embryo transfer with patient comfort priority.',
      details: [
        'High-precision ICSI / conventional IVF fertilization',
        'Daily embryo development tracking in specialized incubator',
        'Day 3 or Day 5 (Blastocyst) transfer decision',
        'Gentle ultrasound-guided embryo placement with zero pain'
      ]
    },
    {
      number: 5,
      title: 'Luteal Support & Follow-up',
      summary: 'Personalized luteal support medications, emotional support during waiting period, and post-transfer beta-hCG assessment.',
      details: [
        'Tailored progesterone & estrogen luteal phase support',
        '24/7 helpline for symptom guidance during two-week wait',
        'Serum Beta-hCG pregnancy confirmation test on Day 14',
        'Early obstetric confirmation scan scheduling upon positive result'
      ]
    }
  ];

  return (
    <section id="ivf-journey" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      {/* Section Header */}
      <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div class="inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-[#0284c7]"></span>
          <span>EVIDENCE-BASED CLINICAL PATHWAY</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0c2b48] tracking-tight">
          The IVF Clinical Journey
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          A phased, empathetic approach respecting biology, couple readiness, and clinical transparency at every step.
        </p>
      </div>

      {/* 5 Steps Process Grid */}
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 relative mb-8">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={step.number}
              onClick={() => setActiveStep(idx)}
              class={`cursor-pointer rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between border relative ${
                isActive
                  ? 'bg-white border-[#0284c7] shadow-lg ring-2 ring-[#0284c7]/20 translate-y-[-2px]'
                  : 'bg-white/80 hover:bg-white border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Step Number Badge */}
                <div class="flex items-center justify-between mb-4">
                  <div class={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center transition-colors ${
                    isActive ? 'bg-[#0c2b48] text-white' : 'bg-slate-100 text-[#0c2b48]'
                  }`}>
                    {step.number}
                  </div>
                  {isActive && (
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                {/* Step Title */}
                <h3 class="text-sm font-bold text-[#0c2b48] mb-2 leading-snug">
                  {step.title}
                </h3>

                {/* Step Summary */}
                <p class="text-[12px] text-slate-600 leading-relaxed font-normal">
                  {step.summary}
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-[#0284c7]">
                <span>Explore Phase Details</span>
                <ChevronRight class="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Step Detailed Breakdown Card */}
      <div class="bg-gradient-to-br from-white to-sky-50/50 rounded-2xl p-6 sm:p-8 border border-sky-200/80 shadow-md mb-10">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-md bg-[#0c2b48] text-white text-xs font-bold">
                Phase {steps[activeStep].number} of 5
              </span>
              <h4 class="text-xl font-extrabold text-[#0c2b48]">
                {steps[activeStep].title} - Clinical Protocols
              </h4>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed max-w-2xl">
              {steps[activeStep].summary}
            </p>
          </div>

          <button
            onClick={onScrollToBooking}
            class="inline-flex items-center justify-center gap-2 bg-[#0c2b48] hover:bg-[#113a60] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm transition-all whitespace-nowrap self-start md:self-center"
          >
            <span>Book Consultation for Step {steps[activeStep].number}</span>
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>

        {/* Phase checklist details */}
        <div class="mt-6 pt-6 border-t border-sky-100 grid sm:grid-cols-2 gap-3">
          {steps[activeStep].details.map((detail, index) => (
            <div key={index} class="flex items-start gap-2.5 bg-white/80 p-3 rounded-xl border border-sky-100">
              <CheckCircle2 class="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
              <span class="text-xs font-semibold text-slate-700">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment Banner Box */}
      <div class="bg-[#e0f2fe]/60 border border-sky-200/90 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm">
        <div class="w-12 h-12 rounded-xl bg-[#0c2b48] flex items-center justify-center text-white shrink-0 shadow-md">
          <ShieldCheck class="w-6 h-6 text-sky-400" />
        </div>
        <div>
          <h3 class="text-base font-bold text-[#0c2b48] mb-1">
            Commitment to Transparent Clinical Counseling
          </h3>
          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
            At Bansal Nursing Home, our practice relies on evidence-based protocols. We provide honest biological prognoses without false guarantees, ensuring couples make fully informed decisions based on clinical reality and mutual trust.
          </p>
        </div>
      </div>

    </section>
  );
}
