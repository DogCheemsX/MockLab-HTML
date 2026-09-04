import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { UserProfile } from '../../types/auth';
import { submitReview } from '../../services/reviewService';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  userData?: UserProfile | null;
}

export const ReviewModal: React.FC<ReviewModalProps> = React.memo(({ isOpen, onClose, user, userData }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const RATING_LABELS: Record<number, string> = {
    1: 'Needs Improvement 👎',
    2: 'Fair Experience 😐',
    3: 'Good Platform 👌',
    4: 'Great Experience! 👍',
    5: 'Excellent & Super Helpful! 🌟'
  };

  const currentDisplayRating = hoverRating || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!comment.trim()) {
      setErrorMsg('Please share a few words in your review.');
      return;
    }

    setLoading(true);

    const uid = user?.uid || 'guest-student';
    const name = userData?.name || user?.displayName || user?.email?.split('@')[0] || 'Student';
    const email = userData?.email || user?.email || '';
    const phone = userData?.whatsapp || user?.phoneNumber || 'No Phone';
    const photo = userData?.photoURL || user?.photoURL || '';

    const success = await submitReview({
      userId: uid,
      userName: name,
      userEmail: email,
      userPhone: phone,
      userPhotoURL: photo,
      rating,
      comment: comment.trim()
    });

    setLoading(false);

    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setComment('');
        setRating(5);
        onClose();
      }, 2200);
    } else {
      setErrorMsg('Failed to submit review. Please check your internet connection.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-backdrop-enter overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg my-auto max-h-[88vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-500/40 shadow-2xl rounded-3xl p-5 sm:p-8 relative text-left transition-all duration-300 ease-out transform animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-20"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-8 text-center animate-page-enter">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 mx-auto flex items-center justify-center text-3xl font-black mb-4 shadow-sm">
              ✨
            </div>
            <h3 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-2">
              Thank You for Your Review!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto leading-relaxed">
              Your feedback is 100% private and sent directly to the MockLab team. We appreciate your support!
            </p>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/40 text-[10px] font-black uppercase tracking-wider mb-2 shadow-sm">
                <span>🔒</span> PRIVATE FEEDBACK
              </div>
              <h2 id="review-modal-title" className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                Leave a Review
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
                Your review is private and only visible to the admin.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star Rating Selection */}
              <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Select Rating
                </span>
                <div className="flex items-center gap-2 my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-3xl sm:text-4xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <span className={star <= currentDisplayRating ? 'text-amber-400 drop-shadow-sm' : 'text-slate-300 dark:text-slate-700'}>
                        ★
                      </span>
                    </button>
                  ))}
                </div>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-300">
                  {RATING_LABELS[currentDisplayRating]}
                </span>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-500/40 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Text Review Comment Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Your Review / Feedback
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience preparing with MockLab, test accuracy, or features you'd like to see..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm text-slate-900 placeholder-slate-400 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-medium resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm py-4 rounded-xl shadow-glow-indigo transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 border border-indigo-400/30"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Review...
                  </>
                ) : (
                  <span>Submit Private Review ✨</span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
});

ReviewModal.displayName = 'ReviewModal';
