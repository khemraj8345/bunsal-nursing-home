import React, { useEffect, useState } from 'react';
import { X, Lock, Mail, User, Phone, LogIn, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  doc, 
  setDoc, 
  serverTimestamp 
} from '../firebase/config';

export default function AuthModal({ isOpen, onClose, onSuccessMessage, initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSaveUserToFirestore = async (user, additionalData = {}) => {
    const profile = {
      uid: user.uid,
      fullName: user.displayName || additionalData.fullName || user.email || 'Patient',
      email: user.email || '',
      lastLogin: serverTimestamp()
    };

    const phone = additionalData.phone || user.phoneNumber;
    if (phone) profile.phone = phone;
    if (user.photoURL) profile.photoURL = user.photoURL;
    if (additionalData.isNewUser) profile.createdAt = serverTimestamp();

    await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup' && (!formData.fullName.trim() || !formData.phone.trim())) {
      setError('Full Name and Phone Number are required for registration.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.fullName });
        await handleSaveUserToFirestore(user, {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          isNewUser: true
        });

        if (onSuccessMessage) onSuccessMessage('Account registered successfully!');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        let profileWarning = '';
        try {
          await handleSaveUserToFirestore(userCredential.user);
        } catch (profileError) {
          console.error('Signed-in user profile save error:', profileError);
          profileWarning = profileError.code === 'permission-denied'
            ? 'Signed in successfully, but Firestore blocked the profile save. Deploy firestore.rules to enable profile and booking storage.'
            : `Signed in successfully, but the profile could not be saved (${profileError.code || 'Firestore error'}).`;
        }

        if (onSuccessMessage) onSuccessMessage(profileWarning || 'Signed in successfully!');
      }

      onClose();
    } catch (err) {
      console.error('Firebase Auth Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered. Please sign in instead.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        if (formData.email.trim().toLowerCase() === 'pririsahu8@gmail.com') {
          setError('Firebase has not accepted this admin email/password yet. Create or reset this Email/Password account in Firebase Authentication first. Once Firebase signs it in, the admin portal opens automatically.');
        } else {
          setError('Invalid email or password credentials.');
        }
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/password sign-in is not enabled for this Firebase project yet. Enable it in Firebase Console → Authentication → Sign-in method.');
      } else if (err.code === 'permission-denied') {
        setError('Your Firebase account is ready, but Firestore access is not configured yet. Deploy the project Firestore rules and try again.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    let user;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      user = result.user;
    } catch (err) {
      console.error('Google Sign In Error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Google sign-in is not enabled for this Firebase project yet. Enable Google in Firebase Console → Authentication → Sign-in method.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This site domain is not authorized for Firebase sign-in. Add it in Firebase Console → Authentication → Settings → Authorized domains.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Your browser blocked the Google sign-in window. Allow pop-ups for this site, then try again.');
      } else if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        setError('The Google sign-in window was closed before sign-in finished. Please try again.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Google sign-in could not reach Firebase. Check your internet connection and try again.');
      } else {
        setError(`Google sign-in failed (${err.code || 'unknown error'}). ${err.message || 'Please try again.'}`);
      }
      setLoading(false);
      return;
    }

    // Authentication may succeed even when Firestore is not ready. Keep those
    // outcomes separate so a missing database/ruleset isn't reported as a
    // failed Google login.
    try {
      await handleSaveUserToFirestore(user);
      if (onSuccessMessage) onSuccessMessage('Signed in with Google successfully!');
    } catch (err) {
      console.error('Google user profile save error:', err);
      const message = err.code === 'permission-denied'
        ? 'Google sign-in succeeded, but Firestore denied the profile save. Create Firestore and deploy firestore.rules to enable profile and booking storage.'
        : `Google sign-in succeeded, but the profile could not be saved (${err.code || 'Firestore error'}). Check Firebase Firestore setup and try again.`;
      if (onSuccessMessage) onSuccessMessage(message);
    } finally {
      setLoading(false);
    }

    onClose();
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          class="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div class="text-center mb-6 space-y-2">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] font-bold text-xl mb-1">
            B
          </div>
          <h2 class="text-2xl font-extrabold text-[#0c2b48]">
            {mode === 'signin' ? 'Welcome Back' : 'Patient Registration'}
          </h2>
          <p class="text-xs text-slate-500 font-medium">
            {mode === 'signin' 
              ? 'Sign in to manage & view your clinical consultations' 
              : 'Create an account to schedule & track appointments'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div class="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setMode('signin'); setError(''); }}
            class={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-white text-[#0c2b48] shadow'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            class={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#0c2b48] shadow'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div class="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle class="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} class="space-y-4">
          
          {mode === 'signup' && (
            <>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <User class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-[#0284c7] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <Phone class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-[#0284c7] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">
              Email Address <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <Mail class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-[#0284c7] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">
              Password <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <Lock class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-[#0284c7] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            class="w-full py-3 px-4 bg-[#0c2b48] hover:bg-[#113a60] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75 mt-2"
          >
            {loading ? (
              <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : mode === 'signin' ? (
              <>
                <LogIn class="w-4 h-4" />
                <span>Sign In to Account</span>
              </>
            ) : (
              <>
                <UserPlus class="w-4 h-4" />
                <span>Create Patient Account</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div class="relative my-5">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-[11px] uppercase">
            <span class="bg-white px-3 text-slate-400 font-bold">Or continue with</span>
          </div>
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          class="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

      </div>
    </div>
  );
}
