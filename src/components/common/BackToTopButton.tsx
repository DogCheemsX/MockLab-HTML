import React, { useState, useEffect } from 'react';

export const BackToTopButton: React.FC = React.memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-indigo-600/80 hover:bg-indigo-500 text-white border border-indigo-400/40 shadow-glow-indigo backdrop-blur-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 flex items-center justify-center animate-page-enter"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
});

BackToTopButton.displayName = 'BackToTopButton';
