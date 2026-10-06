import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowLeft, CalendarDays, Check, Clock3, Filter,
  LogOut, Plus, RefreshCw, Search, ShieldCheck, X
} from 'lucide-react';
import {
  addDoc, collection, db, getDocs, orderBy, query,
  sendEmailVerification, serverTimestamp, updateDoc, doc
} from '../firebase/config';

const ADMIN_EMAIL = 'pririsahu8@gmail.com';
const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const EMPTY_BOOKING = {
  fullName: '',
  userEmail: '',
  phone: '',
  category: 'Gynecology, Obstetrics & IVF',
  doctor: 'First Available Specialist',
  preferredDate: '',
  timeWindow: 'Morning: 09:00 AM - 01:00 PM',
  concern: ''
};

function firebaseErrorMessage(error) {
  if (error.code === 'permission-denied') {
    return 'Firestore denied this action. Deploy the updated firestore.rules file from this project.';
  }
  return `${error.message || 'Something went wrong.'}${error.code ? ` (${error.code})` : ''}`;
}

function statusClass(status) {
  if (status === 'Confirmed') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (status === 'Completed') return 'border-sky-200 bg-sky-50 text-sky-700';
  if (status === 'Cancelled') return 'border-rose-200 bg-rose-50 text-rose-700';
  return 'border-amber-200 bg-amber-50 text-amber-700';
}

export default function AdminPortal({ currentUser, onBack, onSignOut }) {
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [newBooking, setNewBooking] = useState(EMPTY_BOOKING);
  const [creating, setCreating] = useState(false);
  const [notice, setNotice] = useState('');

  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL;
  const isVerified = currentUser?.emailVerified === true;

  const loadBookings = async () => {
    if (!isAdmin || !isVerified) return;
    setLoading(true);
    setError('');
    try {
      const snapshot = await getDocs(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')));
      setBookings(snapshot.docs.map((bookingDoc) => ({ id: bookingDoc.id, ...bookingDoc.data() })));
    } catch (err) {
      console.error('Admin bookings load failed:', err);
      setError(firebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [currentUser]);

  const visibleBookings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesStatus = filter === 'All' || (booking.status || 'Pending') === filter;
      const matchesSearch = !normalizedSearch || [
        booking.fullName, booking.phone, booking.userEmail,
        booking.referenceId, booking.doctor, booking.category
      ].some((value) => String(value || '').toLowerCase().includes(normalizedSearch));
      return matchesStatus && matchesSearch;
    });
  }, [bookings, filter, search]);

  const counts = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter((booking) => (booking.status || 'Pending') === 'Pending').length,
    confirmed: bookings.filter((booking) => booking.status === 'Confirmed').length,
    completed: bookings.filter((booking) => booking.status === 'Completed').length
  }), [bookings]);

  const requestEmailVerification = async () => {
    setError('');
    setNotice('');
    try {
      await sendEmailVerification(currentUser);
      setNotice(`Verification email sent to ${currentUser.email}. Verify it, sign out, then sign in again.`);
    } catch (err) {
      console.error('Admin verification email failed:', err);
      setError(firebaseErrorMessage(err));
    }
  };

  const updateStatus = async (booking, status) => {
    setSavingId(booking.id);
    setError('');
    setNotice('');
    try {
      await updateDoc(doc(db, 'bookings', booking.id), {
        status,
        updatedAt: serverTimestamp()
      });
      setBookings((previous) => previous.map((item) => item.id === booking.id ? { ...item, status } : item));
      setNotice(`Appointment ${booking.referenceId || ''} updated to ${status}.`);
    } catch (err) {
      console.error('Admin booking update failed:', err);
      setError(firebaseErrorMessage(err));
    } finally {
      setSavingId('');
    }
  };

  const createBooking = async (event) => {
    event.preventDefault();
    setCreating(true);
    setError('');
    setNotice('');
    try {
      const referenceId = `BNH-${Math.floor(100000 + Math.random() * 900000)}`;
      await addDoc(collection(db, 'bookings'), {
        userId: currentUser.uid,
        userEmail: newBooking.userEmail.trim(),
        fullName: newBooking.fullName.trim(),
        phone: newBooking.phone.trim(),
        category: newBooking.category,
        doctor: newBooking.doctor,
        preferredDate: newBooking.preferredDate,
        timeWindow: newBooking.timeWindow,
        concern: newBooking.concern.trim(),
        referenceId,
        status: 'Pending',
        createdAt: serverTimestamp()
      });
      setNewBooking(EMPTY_BOOKING);
      setShowNewBooking(false);
      setNotice(`Appointment created (${referenceId}).`);
      await loadBookings();
    } catch (err) {
      console.error('Admin booking creation failed:', err);
      setError(firebaseErrorMessage(err));
    } finally {
      setCreating(false);
    }
  };

  return (
    <main class="min-h-[75vh] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <button onClick={onBack} class="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-sky-700">
          <ArrowLeft class="h-4 w-4" /> Back to website
        </button>

        {!isAdmin ? (
          <section class="mx-auto max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div class="bg-[#0c2b48] px-7 py-8 text-white">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <ShieldCheck class="h-6 w-6 text-sky-300" />
              </div>
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Restricted access</p>
              <h1 class="mt-2 text-2xl font-extrabold">Admin access only</h1>
              <p class="mt-2 text-sm leading-6 text-slate-300">Sign in with the authorized admin account from the website header. Admin access opens automatically after sign-in.</p>
            </div>
            <div class="p-7 text-center text-xs leading-6 text-slate-600">This page does not accept a separate login. Use the site's normal sign-in flow; only the authorized email can open the dashboard.</div>
          </section>
        ) : !isVerified ? (
          <section class="mx-auto max-w-lg rounded-3xl border border-amber-200 bg-white p-7 shadow-xl">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100"><ShieldCheck class="h-6 w-6" /></div>
            <p class="text-xs font-bold uppercase tracking-wider text-amber-700">Email verification required</p>
            <h1 class="mt-2 text-2xl font-extrabold text-[#0c2b48]">Verify admin account</h1>
            <p class="mt-2 text-sm leading-6 text-slate-600">Firebase signed in this admin account, but Firestore keeps admin data locked until the email is verified.</p>
            {error && <div role="alert" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs leading-5 text-rose-800">{error}</div>}
            {notice && <div role="status" class="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">{notice}</div>}
            <div class="mt-5 flex flex-wrap gap-2">
              <button onClick={requestEmailVerification} class="rounded-xl bg-[#0c2b48] px-4 py-2.5 text-xs font-bold text-white">Send verification email</button>
              <button onClick={onSignOut} class="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700">Sign out</button>
            </div>
          </section>
        ) : (
          <>
            <header class="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div class="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  <span class="h-2 w-2 rounded-full bg-emerald-500" /> Admin session verified
                </div>
                <h1 class="text-3xl font-extrabold tracking-tight text-[#0c2b48] sm:text-4xl">Appointment Dashboard</h1>
                <p class="mt-1 text-sm text-slate-500">Review requests, update their status, or add a booking for a patient.</p>
              </div>
              <div class="flex gap-2">
                <button onClick={loadBookings} disabled={loading} class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60">
                  <RefreshCw class={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
                <button onClick={onSignOut} class="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50">
                  <LogOut class="h-4 w-4" /> Sign out
                </button>
              </div>
            </header>

            {error && <div role="alert" class="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>}
            {notice && <div role="status" class="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</div>}

            <section class="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['All requests', counts.total, Activity],
                ['Awaiting review', counts.pending, Clock3],
                ['Confirmed', counts.confirmed, Check],
                ['Completed', counts.completed, CalendarDays]
              ].map(([label, value, Icon]) => (
                <div key={label} class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div class="flex items-center justify-between text-xs font-semibold text-slate-500"><span>{label}</span><Icon class="h-4 w-4 text-sky-600" /></div>
                  <p class="mt-2 text-2xl font-extrabold text-[#0c2b48]">{value}</p>
                </div>
              ))}
            </section>

            <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div class="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex flex-1 flex-col gap-2 sm:flex-row">
                  <label class="relative flex-1">
                    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patient, phone, reference…" class="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-sky-500" />
                  </label>
                  <label class="relative">
                    <Filter class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select value={filter} onChange={(event) => setFilter(event.target.value)} class="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-700 outline-none focus:border-sky-500 sm:w-40">
                      {['All', ...STATUSES].map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </label>
                </div>
                <button onClick={() => { setShowNewBooking((open) => !open); setError(''); }} class="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-sky-800">
                  {showNewBooking ? <X class="h-4 w-4" /> : <Plus class="h-4 w-4" />}{showNewBooking ? 'Close form' : 'Add booking'}
                </button>
              </div>

              {showNewBooking && (
                <form onSubmit={createBooking} class="grid gap-4 border-b border-sky-100 bg-sky-50/50 p-4 sm:grid-cols-2 lg:grid-cols-3">
                  <h2 class="text-sm font-extrabold text-[#0c2b48] sm:col-span-2 lg:col-span-3">New patient appointment</h2>
                  <input required value={newBooking.fullName} onChange={(event) => setNewBooking({ ...newBooking, fullName: event.target.value })} placeholder="Patient full name *" class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs" />
                  <input type="email" value={newBooking.userEmail} onChange={(event) => setNewBooking({ ...newBooking, userEmail: event.target.value })} placeholder="Patient email (optional)" class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs" />
                  <input required type="tel" value={newBooking.phone} onChange={(event) => setNewBooking({ ...newBooking, phone: event.target.value })} placeholder="Phone number *" class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs" />
                  <select value={newBooking.category} onChange={(event) => setNewBooking({ ...newBooking, category: event.target.value })} class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs">
                    {['Gynecology, Obstetrics & IVF', 'Advanced Eye Care & Ophthalmology', 'Obstetrics & Maternity Care', 'Infertility & IVF Treatment', 'General Consultation'].map((category) => <option key={category}>{category}</option>)}
                  </select>
                  <select value={newBooking.doctor} onChange={(event) => setNewBooking({ ...newBooking, doctor: event.target.value })} class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs">
                    {['First Available Specialist', 'Dr. Mamta Bansal (Senior Obstetrician & Laparoscopic Surgeon)', 'Dr. S. Bansal (Senior Gynecologist & IVF Specialist)', 'Dr. Manish Bansal (Senior Eye Surgeon & Retina Specialist)'].map((doctor) => <option key={doctor}>{doctor}</option>)}
                  </select>
                  <input required type="date" min={new Date().toISOString().slice(0, 10)} value={newBooking.preferredDate} onChange={(event) => setNewBooking({ ...newBooking, preferredDate: event.target.value })} class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs" />
                  <select value={newBooking.timeWindow} onChange={(event) => setNewBooking({ ...newBooking, timeWindow: event.target.value })} class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs">
                    {['Morning: 09:00 AM - 01:00 PM', 'Afternoon: 01:00 PM - 04:00 PM', 'Evening: 04:00 PM - 07:00 PM'].map((time) => <option key={time}>{time}</option>)}
                  </select>
                  <textarea maxLength={2000} value={newBooking.concern} onChange={(event) => setNewBooking({ ...newBooking, concern: event.target.value })} placeholder="Concern or notes (optional)" class="min-h-10 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs sm:col-span-2 lg:col-span-2" />
                  <button disabled={creating} class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c2b48] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60"><Plus class="h-4 w-4" />{creating ? 'Saving…' : 'Create pending appointment'}</button>
                </form>
              )}

              {loading ? (
                <div class="p-12 text-center text-sm text-slate-500"><RefreshCw class="mx-auto mb-3 h-5 w-5 animate-spin text-sky-600" />Loading appointments…</div>
              ) : visibleBookings.length === 0 ? (
                <div class="p-12 text-center text-sm text-slate-500">No appointment requests match this view.</div>
              ) : (
                <div class="divide-y divide-slate-100">
                  {visibleBookings.map((booking) => (
                    <article key={booking.id} class="p-4 transition-colors hover:bg-slate-50/70 sm:p-5">
                      <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div class="min-w-0 flex-1">
                          <div class="flex flex-wrap items-center gap-2">
                            <h3 class="text-sm font-extrabold text-[#0c2b48]">{booking.fullName || 'Patient'}</h3>
                            <span class="rounded-md bg-slate-100 px-2 py-1 font-mono text-[10px] font-bold text-slate-600">{booking.referenceId || booking.id.slice(0, 8)}</span>
                            <span class={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClass(booking.status || 'Pending')}`}>{booking.status || 'Pending'}</span>
                          </div>
                          <p class="mt-2 text-xs font-semibold text-slate-700">{booking.category} <span class="font-normal text-slate-400">•</span> {booking.doctor}</p>
                          <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                            <span>{booking.phone || 'No phone provided'}</span>
                            {booking.userEmail && <span>{booking.userEmail}</span>}
                            <span>{booking.preferredDate || 'No date'} · {booking.timeWindow?.split(':')[0] || 'OPD'}</span>
                          </div>
                          {booking.concern && <p class="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">{booking.concern}</p>}
                        </div>
                        <label class="flex shrink-0 items-center gap-2 text-[11px] font-bold text-slate-500">
                          Update status
                          <select disabled={savingId === booking.id} value={booking.status || 'Pending'} onChange={(event) => updateStatus(booking, event.target.value)} class="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-700 outline-none focus:border-sky-500 disabled:opacity-50">
                            {STATUSES.map((status) => <option key={status}>{status}</option>)}
                          </select>
                          {savingId === booking.id && <RefreshCw class="h-3.5 w-3.5 animate-spin text-sky-600" />}
                        </label>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
            <p class="mt-4 text-[11px] leading-5 text-slate-500">Patient names, contact details, and optional health concerns are visible only to the signed-in patient and this verified admin account.</p>
          </>
        )}
      </div>
    </main>
  );
}
