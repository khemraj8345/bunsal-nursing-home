import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { hospitalAddress, hospitalMapsUrl } from '../data/hospitalLocation';

import { db, collection, addDoc, serverTimestamp } from '../firebase/config';

export default function ConsultationForm({ selectedCategory, selectedDoctor, selectedConcern, onSubmitSuccess, currentUser, onRequireAuth }) {
  const [formData, setFormData] = useState({
    fullName: currentUser?.displayName || '',
    phone: '',
    category: selectedCategory || 'Select a Clinical Domain',
    doctor: selectedDoctor || 'First Available Specialist',
    preferredDate: '',
    timeWindow: 'Morning: 09:00 AM - 01:00 PM',
    concern: selectedConcern || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (currentUser?.displayName && !formData.fullName) {
      setFormData((prev) => ({ ...prev, fullName: currentUser.displayName }));
    }
  }, [currentUser]);

  useEffect(() => {
    setFormData((prev) => {
      const newCategory = selectedCategory && selectedCategory !== 'Select a Clinical Domain'
        ? selectedCategory 
        : prev.category;

      let matchedDoctorOption = prev.doctor;
      if (selectedDoctor !== undefined) {
        if (selectedDoctor) {
          if (selectedDoctor.includes('Mamta')) {
            matchedDoctorOption = 'Dr. Mamta Bansal (Senior Obstetrician & Laparoscopic Surgeon)';
          } else if (selectedDoctor.includes('S. Bansal') || selectedDoctor.includes('S Bansal')) {
            matchedDoctorOption = 'Dr. S. Bansal (Senior Gynecologist & IVF Specialist)';
          } else if (selectedDoctor.includes('Manish')) {
            matchedDoctorOption = 'Dr. Manish Bansal (Senior Eye Surgeon & Retina Specialist)';
          } else {
            matchedDoctorOption = selectedDoctor;
          }
        } else {
          matchedDoctorOption = 'First Available Specialist';
        }
      }

      // Infer Category from doctor clue if category is still unselected
      let finalCategory = newCategory;
      if (!finalCategory || finalCategory === 'Select a Clinical Domain') {
        if (matchedDoctorOption.includes('Mamta')) {
          finalCategory = 'Obstetrics & Maternity Care';
        } else if (matchedDoctorOption.includes('S. Bansal')) {
          finalCategory = 'Infertility & IVF Treatment';
        } else if (matchedDoctorOption.includes('Manish')) {
          finalCategory = 'Advanced Eye Care & Ophthalmology';
        }
      }

      return {
        ...prev,
        category: finalCategory || 'Select a Clinical Domain',
        doctor: matchedDoctorOption,
        concern: ''
      };
    });
  }, [selectedCategory, selectedDoctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError('');
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Require sign-in / registration before booking as requested
    if (!currentUser) {
      if (onRequireAuth) {
        onRequireAuth('Please sign in or create a patient account to confirm your clinical appointment.');
      }
      return;
    }

    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (formData.category === 'Select a Clinical Domain') {
      newErrors.category = 'Please select a clinical domain';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const bookingRef = 'BNH-' + Math.floor(100000 + Math.random() * 900000);

      // Store appointment in Firebase Firestore Cloud Database
      await addDoc(collection(db, 'bookings'), {
        userId: currentUser.uid,
        userEmail: currentUser.email || '',
        fullName: formData.fullName,
        phone: formData.phone,
        category: formData.category,
        doctor: formData.doctor,
        preferredDate: formData.preferredDate,
        timeWindow: formData.timeWindow,
        concern: formData.concern,
        referenceId: bookingRef,
        status: 'Pending',
        createdAt: serverTimestamp()
      });

      setIsSubmitting(false);
      onSubmitSuccess({ ...formData, referenceId: bookingRef });

      // Reset form
      setFormData({
        fullName: currentUser?.displayName || '',
        phone: '',
        category: 'Select a Clinical Domain',
        doctor: 'First Available Specialist',
        preferredDate: '',
        timeWindow: 'Morning: 09:00 AM - 01:00 PM',
        concern: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Error saving appointment booking to Firestore:', err);
      if (err.code === 'permission-denied') {
        setSubmitError('Firebase rejected this booking. Deploy this project’s Firestore rules from the project folder, then try again.');
      } else if (err.code === 'failed-precondition' || err.code === 'not-found') {
        setSubmitError('Firestore is not ready for this project yet. Create the Firestore database in Firebase Console, then deploy the project rules.');
      } else if (err.code === 'unauthenticated') {
        setSubmitError('Your sign-in session expired. Sign in again, then resubmit your appointment request.');
      } else if (err.code === 'unavailable' || err.code === 'deadline-exceeded') {
        setSubmitError('Firebase is temporarily unreachable. Check your internet connection and try again.');
      } else {
        setSubmitError(`Could not save the appointment (${err.code || 'unknown Firestore error'}). ${err.message || 'Check your Firebase setup and try again.'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-form" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Context & Emergency Box & Address */}
        <div class="lg:col-span-5 space-y-6">
          
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] tracking-wider uppercase">
              <span class="w-2 h-2 rounded-full bg-[#0284c7]"></span>
              <span>DIRECT BOOKING LINE</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0c2b48] tracking-tight">
              Book Your Clinical Consultation
            </h2>
            <p class="text-slate-600 text-sm leading-relaxed">
              We respect your personal schedule and privacy. Request an initial consultation or follow-up with our department specialists, and our team will coordinate the timing.
            </p>
          </div>

          {/* Address & Hours Cards */}
          <div class="space-y-3">
            <a
              href={hospitalMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Bansal Nursing Home location in Google Maps: ${hospitalAddress}`}
              class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-start gap-3 transition-colors hover:border-sky-300 hover:bg-sky-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <MapPin class="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div>
                <h4 class="text-xs font-bold text-[#0c2b48]">Bansal Nursing Home & IVF Center</h4>
                <p class="text-xs text-slate-500 mt-0.5">{hospitalAddress}</p>
                <p class="mt-1 text-[10px] font-semibold text-[#0284c7]">Open in Google Maps</p>
              </div>
            </a>

            <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-start gap-3">
              <Clock class="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div>
                <h4 class="text-xs font-bold text-[#0c2b48]">OPD Operating Hours</h4>
                <p class="text-xs text-slate-500 mt-0.5">
                  OPD Hours: Monday to Saturday | 10:00 AM - 7:00 PM
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Appointment Form Container */}
        <div class="lg:col-span-7">
          <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xl relative">

            {!currentUser ? (
              <div class="mb-5 flex flex-col gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm font-bold text-[#0c2b48]">Sign in before booking</p>
                  <p class="mt-1 text-xs leading-relaxed text-slate-600">Create an account or sign in to save and view your appointment requests.</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRequireAuth?.('Sign in or register to continue with your appointment request.')}
                  class="shrink-0 rounded-lg bg-[#0c2b48] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#113a60]"
                >
                  Sign In / Register
                </button>
              </div>
            ) : (
              <p class="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800">
                Signed in as {currentUser.email || currentUser.displayName}
              </p>
            )}
            
            <form onSubmit={handleSubmit} class="space-y-5">
              
              {/* Row 1: Name & Phone */}
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    Patient Full Name <span class="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    class={`w-full px-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      errors.fullName
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-slate-200 focus:border-[#0284c7] focus:ring-[#0284c7]'
                    }`}
                  />
                  {errors.fullName && (
                    <p class="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    Contact Phone Number <span class="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter 10-digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    class={`w-full px-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      errors.phone
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-slate-200 focus:border-[#0284c7] focus:ring-[#0284c7]'
                    }`}
                  />
                  {errors.phone && (
                    <p class="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Category & Doctor */}
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    Service Category <span class="text-rose-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    class={`w-full px-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      errors.category
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-slate-200 focus:border-[#0284c7] focus:ring-[#0284c7]'
                    }`}
                  >
                    <option value="Select a Clinical Domain">Select a Clinical Domain</option>
                    <option value="Gynecology, Obstetrics & IVF">Gynecology, Obstetrics & IVF</option>
                    <option value="Advanced Eye Care & Ophthalmology">Advanced Eye Care & Ophthalmology</option>
                    <option value="Obstetrics & Maternity Care">Obstetrics & Maternity Care</option>
                    <option value="General & Surgical Gynecology">General & Surgical Gynecology</option>
                    <option value="Infertility & IVF Treatment">Infertility & IVF Treatment</option>
                    <option value="IVF & ICSI (Assisted Reproduction)">IVF & ICSI (Assisted Reproduction)</option>
                    <option value="IUI (Intrauterine Insemination)">IUI (Intrauterine Insemination)</option>
                    <option value="Laparoscopic Gynecological Surgery">Laparoscopic Gynecological Surgery</option>
                    <option value="Cataract Phacoemulsification & IOL">Cataract Phacoemulsification & IOL</option>
                    <option value="Glaucoma Diagnostics & IOP Management">Glaucoma Diagnostics & IOP Management</option>
                    <option value="Diabetic Retinopathy & Retina Screening">Diabetic Retinopathy & Retina Screening</option>
                    <option value="Diagnostic Fetal Ultrasound">Diagnostic Fetal Ultrasound</option>
                    <option value="Pregnancy Care Programs">Pregnancy Care Programs</option>
                    <option value="Women's Preventive Health">Women's Preventive Health</option>
                  </select>
                  {errors.category && (
                    <p class="text-[11px] text-rose-500 mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Specialist
                  </label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    class="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                  >
                    <option value="First Available Specialist">First Available Specialist</option>
                    <option value="Dr. Mamta Bansal (Senior Obstetrician & Laparoscopic Surgeon)">Dr. Mamta Bansal (Senior Obstetrician & Laparoscopic Surgeon)</option>
                    <option value="Dr. S. Bansal (Senior Gynecologist & IVF Specialist)">Dr. S. Bansal (Senior Gynecologist & IVF Specialist)</option>
                    <option value="Dr. Manish Bansal (Senior Eye Surgeon & Retina Specialist)">Dr. Manish Bansal (Senior Eye Surgeon & Retina Specialist)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Date & Time Window */}
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Date <span class="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    class={`w-full px-3.5 py-2.5 bg-slate-50/70 border rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-1 transition-all ${
                      errors.preferredDate
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-slate-200 focus:border-[#0284c7] focus:ring-[#0284c7]'
                    }`}
                  />
                  {errors.preferredDate && (
                    <p class="text-[11px] text-rose-500 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    name="timeWindow"
                    value={formData.timeWindow}
                    onChange={handleChange}
                    class="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all"
                  >
                    <option value="Morning: 09:00 AM - 01:00 PM">Morning: 09:00 AM - 01:00 PM</option>
                    <option value="Afternoon: 01:00 PM - 04:00 PM">Afternoon: 01:00 PM - 04:00 PM</option>
                    <option value="Evening: 04:00 PM - 07:00 PM">Evening: 04:00 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Brief Concern */}
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">
                  Brief Medical Concern & History (Confidential)
                </label>
                <textarea
                  name="concern"
                  rows="3"
                  placeholder="Mention any specific symptoms, prior medical reports, or questions you wish to discuss..."
                  value={formData.concern}
                  onChange={handleChange}
                  class="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              {submitError && (
                <div role="alert" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium leading-relaxed text-rose-800">
                  {submitError}
                  {submitError.includes('Deploy') && (
                    <code class="mt-2 block rounded-lg bg-white/70 px-2 py-1 font-mono text-[11px] text-rose-900">
                      npx firebase-tools deploy --only firestore:rules
                    </code>
                  )}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                class="w-full inline-flex items-center justify-center gap-2 bg-[#0c2b48] hover:bg-[#113a60] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing Request...</span>
                  </>
                ) : (
                  <>
                    <Send class="w-4 h-4 text-sky-400" />
                    <span>Submit Consultation Request</span>
                  </>
                )}
              </button>

              {/* Legal Note */}
              <p class="text-[11px] text-slate-400 text-center leading-relaxed">
                * Your personal health information is strictly confidential. Submitting this form does not form a binding doctor-patient relationship until confirmed by hospital staff.
              </p>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
