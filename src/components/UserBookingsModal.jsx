import React, { useEffect, useState } from 'react';
import { X, Calendar, User, Phone, Clock, AlertCircle } from 'lucide-react';
import { db, collection, query, where, getDocs } from '../firebase/config';

export default function UserBookingsModal({ isOpen, onClose, currentUser }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchUserBookings();
    }
  }, [isOpen, currentUser]);

  const fetchUserBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const list = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });

      // Sort client-side by createdAt / preferredDate
      list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

      setBookings(list);
    } catch (err) {
      console.error('Error fetching user bookings from Firestore:', err);
      setError('Could not load your appointment requests. Check that Firestore is enabled and its security rules are deployed.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          class="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        {/* Header */}
        <div class="mb-6 space-y-1 pr-8">
          <span class="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
            Patient Portal • Firebase Cloud Database
          </span>
          <h2 class="text-2xl font-extrabold text-[#0c2b48]">
            My Scheduled Appointments
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            Account: {currentUser?.displayName || currentUser?.email}
          </p>
        </div>

        {/* Bookings List Content */}
        <div class="flex-1 overflow-y-auto space-y-4 pr-1">
          {loading ? (
            <div class="py-12 text-center space-y-3">
              <span class="w-6 h-6 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin inline-block"></span>
              <p class="text-xs text-slate-500 font-medium">Loading your appointments from Firebase...</p>
            </div>
          ) : error ? (
            <div class="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs leading-relaxed text-rose-700">
              <AlertCircle class="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : bookings.length === 0 ? (
            <div class="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6 space-y-3">
              <Calendar class="w-10 h-10 text-slate-300 mx-auto" />
              <h4 class="text-sm font-bold text-[#0c2b48]">No Appointments Scheduled Yet</h4>
              <p class="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't scheduled any clinical consultations yet. Use the booking form on the home page or specialty sections to schedule an OPD visit.
              </p>
            </div>
          ) : (
            bookings.map((item) => (
              <div
                key={item.id}
                class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden"
              >
                {/* Top Row: Ref ID & Status */}
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-md bg-sky-50 text-[#0284c7] text-xs font-bold">
                      Ref: {item.referenceId || item.id.substring(0, 8)}
                    </span>
                    <span class="text-xs font-extrabold text-[#0c2b48]">
                      {item.category}
                    </span>
                  </div>

                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                    <Clock class="w-3.5 h-3.5" />
                    <span>{item.status || 'Pending'}</span>
                  </span>
                </div>

                {/* Details Grid */}
                <div class="grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-slate-400 font-bold block text-[10px] uppercase">Specialist Doctor</span>
                    <span class="font-bold text-slate-800">{item.doctor || 'First Available Specialist'}</span>
                  </div>

                  <div>
                    <span class="text-slate-400 font-bold block text-[10px] uppercase">Preferred Date & Time</span>
                    <span class="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Calendar class="w-3.5 h-3.5 text-[#0284c7]" />
                      {item.preferredDate} ({item.timeWindow?.split(':')[0] || 'OPD'})
                    </span>
                  </div>

                  <div>
                    <span class="text-slate-400 font-bold block text-[10px] uppercase">Patient Name</span>
                    <span class="font-semibold text-slate-700">{item.fullName}</span>
                  </div>

                  <div>
                    <span class="text-slate-400 font-bold block text-[10px] uppercase">Contact Phone</span>
                    <span class="font-semibold text-slate-700">{item.phone}</span>
                  </div>
                </div>

                {item.concern && (
                  <div class="pt-2 border-t border-slate-100 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                    <span class="font-bold text-slate-700">Medical Concern: </span>
                    {item.concern}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
