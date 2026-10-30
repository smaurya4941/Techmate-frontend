'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import {
  STATIC_GOOGLE_REVIEWS,
  GOOGLE_REVIEWS_SUMMARY,
  type StaticGoogleReview,
} from '@/lib/google-reviews';

/** Official multi-color Google 'G' Mark */
function GoogleGLogo({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.5-4.1 7-10.2 7-17.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

/** Official full-color Google Wordmark SVG */
function GoogleWordmark({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 74 24" className={className} aria-label="Google" fill="none">
      <path
        fill="#4285F4"
        d="M9.24 8.19v2.46h5.88c-.18 1.34-.71 2.37-1.63 3.28-.99.99-2.54 2.08-4.25 2.08-3.39 0-6.14-2.77-6.14-6.18s2.75-6.18 6.14-6.18c1.83 0 3.17.72 4.15 1.66l1.74-1.74C13.68 2.15 11.75 1.2 9.24 1.2 4.28 1.2.2 5.25.2 10.15s4.08 8.95 9.04 8.95c2.68 0 4.71-.88 6.3-2.52 1.63-1.63 2.14-3.93 2.14-5.78 0-.58-.05-1.13-.15-1.61H9.24z"
      />
      <path
        fill="#EA4335"
        d="M23.77 6.1c-3.15 0-5.71 2.41-5.71 5.75s2.56 5.75 5.71 5.75c3.15 0 5.71-2.41 5.71-5.75s-2.56-5.75-5.71-5.75zm0 9.24c-1.73 0-3.23-1.42-3.23-3.49 0-2.1 1.5-3.49 3.23-3.49 1.73 0 3.23 1.39 3.23 3.49 0 2.07-1.5 3.49-3.23 3.49z"
      />
      <path
        fill="#FBBC05"
        d="M36.31 6.1c-3.15 0-5.71 2.41-5.71 5.75s2.56 5.75 5.71 5.75c3.15 0 5.71-2.41 5.71-5.75s-2.56-5.75-5.71-5.75zm0 9.24c-1.73 0-3.23-1.42-3.23-3.49 0-2.1 1.5-3.49 3.23-3.49 1.73 0 3.23 1.39 3.23 3.49 0 2.07-1.5 3.49-3.23 3.49z"
      />
      <path
        fill="#4285F4"
        d="M47.78 6.1c-3.08 0-5.65 2.45-5.65 5.75 0 3.27 2.57 5.75 5.65 5.75 1.78 0 2.9-.78 3.54-1.54h.13v1.07c0 2.2-1.18 3.38-3.08 3.38-1.54 0-2.51-1.1-2.9-2.04l-2.15.9c.63 1.51 2.28 3.4 5.05 3.4 2.93 0 5.42-1.73 5.42-6v-11.8h-2.36v.92h-.13c-.63-.8-1.75-1.79-3.52-1.79zm.34 9.24c-1.73 0-3.08-1.47-3.08-3.49 0-2.05 1.35-3.49 3.08-3.49 1.7 0 3.05 1.44 3.05 3.49 0 2.02-1.35 3.49-3.05 3.49z"
      />
      <path
        fill="#34A853"
        d="M55.82 1.55h2.47v16.05h-2.47z"
      />
      <path
        fill="#EA4335"
        d="M64.67 15.34c-1.28 0-2.17-.58-2.77-1.73l7.63-3.15-.26-.65c-.48-1.3-1.95-3.71-4.93-3.71-2.96 0-5.43 2.33-5.43 5.75 0 3.22 2.44 5.75 5.76 5.75 2.68 0 4.22-1.64 4.87-2.59l-1.99-1.33c-.67.97-1.57 1.66-2.88 1.66zm-.18-7.14c1.04 0 1.93.53 2.22 1.28l-5.3 2.2c0-2.47 1.75-3.48 3.08-3.48z"
      />
    </svg>
  );
}

/** 5-Star golden rating display */
function Stars({ rating = 5, size = 'h-4 w-4' }: { rating?: number; size?: string }) {
  return (
    <div className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${size} ${n <= rating ? 'fill-[#FBBC05] text-[#FBBC05]' : 'text-gray-300'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/** Verified circular blue checkmark */
function VerifiedCheckmark() {
  return (
    <span
      className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#1a73e8] text-white shrink-0 shadow-xs"
      title="Verified Review"
    >
      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 fill-current">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </svg>
    </span>
  );
}

/** High-contrast Google Profile Avatar Icon */
function Avatar({ review }: { review: StaticGoogleReview }) {
  const initial = review.authorName.trim().charAt(0).toUpperCase() || '?';
  const bgColor = review.avatarColor || '#174A83';

  if (review.authorPhotoUri) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={review.authorPhotoUri}
        alt={review.authorName}
        width={42}
        height={42}
        loading="lazy"
        className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
      />
    );
  }

  return (
    <div
      className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-sm ring-2 ring-white/60 select-none transition-transform group-hover:scale-105"
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

export function GoogleReviews() {
  const reviews = STATIC_GOOGLE_REVIEWS;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedReview, setSelectedReview] = useState<StaticGoogleReview | null>(null);

  // Update arrow states based on scroll position
  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollState();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [checkScrollState]);

  // Scroll by 1 card width + gap
  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-review-card]');
    if (!card) return;
    const scrollAmount = card.offsetWidth + 16;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="google-reviews"
      aria-labelledby="google-reviews-heading"
      className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200/80 relative select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Flex Layout: Improved Left Summary Card + Right 3-Card Carousel */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
          
          {/* Improved Left Column: Premium Google Rating Badge */}
          <a
            href={GOOGLE_REVIEWS_SUMMARY.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-between shrink-0 w-full lg:w-64 p-6 sm:p-7 text-center rounded-2xl bg-gradient-to-b from-[#FAFBFD] to-[#F1F4F9] border border-gray-200/90 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300"
            title="Read all verified reviews on Google Maps"
          >
            {/* Top Pill: Google Reviews Verified */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs mb-2">
              <GoogleGLogo className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold tracking-wider text-[#102B46] uppercase">
                Google Rating
              </span>
            </div>

            {/* Middle: EXCELLENT + 5 Stars + 300+ Reviews */}
            <div className="my-auto py-2">
              <span className="block font-black text-2xl sm:text-3xl text-[#102B46] tracking-tight uppercase font-heading">
                {GOOGLE_REVIEWS_SUMMARY.headline}
              </span>

              {/* 5 Vibrant Stars with 5th star split (4.9 rating) */}
              <div className="flex items-center gap-1 justify-center my-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-6 w-6 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
                {/* Half-filled 5th Star */}
                <div className="relative h-6 w-6">
                  <Star className="absolute inset-0 h-6 w-6 text-[#D1D5DB] fill-[#D1D5DB]" />
                  <div className="absolute inset-0 overflow-hidden w-[75%]">
                    <Star className="h-6 w-6 fill-[#FBBC05] text-[#FBBC05]" />
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#5F6368] font-medium">
                Based on <strong className="font-bold text-[#102B46]">{GOOGLE_REVIEWS_SUMMARY.totalReviews} reviews</strong>
              </p>
            </div>

            {/* Bottom: Official Google Logo + Subtle Click Action */}
            <div className="pt-2 border-t border-gray-200/60 w-full flex flex-col items-center gap-1">
              <GoogleWordmark className="h-6 sm:h-7 w-auto" />
              <span className="text-[11px] font-semibold text-[#174A83] group-hover:text-[#D62836] transition-colors inline-flex items-center gap-1 mt-1">
                Read all reviews <ExternalLink className="h-2.5 w-2.5" />
              </span>
            </div>
          </a>

          {/* Right Column: Carousel Track without scrollbars */}
          <div className="relative flex-1 min-w-0 w-full flex items-center">
            
            {/* Left Chevron Navigation Button */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous reviews"
              className={`absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#102B46] hover:bg-gray-50 transition-all ${
                !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Right Chevron Navigation Button */}
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next reviews"
              className={`absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#102B46] hover:bg-gray-50 transition-all ${
                !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Scrollable Track: exactly 3 reviews per view on desktop (lg), 2 on tablet (md), 1 on mobile */}
            {/* NO SCROLLBAR: uses .no-scrollbar and cross-browser hiding rules */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory py-2 px-1 w-full"
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  data-review-card
                  className="snap-start flex-[0_0_100%] md:flex-[0_0_calc((100%-1rem)/2)] lg:flex-[0_0_calc((100%-2rem)/3)] min-w-0"
                >
                  <article className="group h-full flex flex-col justify-between rounded-2xl bg-[#F8F9FA] border border-gray-100 p-5 shadow-2xs hover:shadow-sm hover:border-gray-200 transition-all duration-300 min-h-[200px]">
                    <div>
                      {/* Top Row: Colored Profile Icon + Author & Time + Google 'G' Mark */}
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar review={review} />
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-bold text-[14px] text-[#202124] leading-tight">
                              {review.authorName}
                            </h3>
                            <p className="text-[11px] text-[#5F6368] mt-0.5 truncate">
                              {review.relativeDate}
                            </p>
                          </div>
                        </div>
                        <GoogleGLogo className="h-5 w-5 shrink-0 opacity-90 transition-opacity group-hover:opacity-100" />
                      </div>

                      {/* Stars + Verified Checkmark Badge */}
                      <div className="mt-3 flex items-center gap-1.5">
                        <Stars rating={review.rating} size="h-4 w-4" />
                        {review.isVerified && <VerifiedCheckmark />}
                      </div>

                      {/* Review Text */}
                      <p className="mt-3 text-[13px] leading-relaxed text-[#3C4043] font-normal line-clamp-4">
                        {review.text}
                      </p>
                    </div>

                    {/* Bottom: Read More Button */}
                    <div className="mt-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedReview(review)}
                        className="text-[12px] font-medium text-[#70757A] hover:text-[#1A73E8] transition-colors"
                      >
                        Read more
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Author Header */}
            <div className="flex items-center gap-3 pr-8">
              <Avatar review={selectedReview} />
              <div>
                <h3 className="font-bold text-base text-[#202124]">
                  {selectedReview.authorName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#5F6368] mt-0.5">
                  <span>{selectedReview.relativeDate}</span>
                  {selectedReview.authorDetails && (
                    <>
                      <span>•</span>
                      <span>{selectedReview.authorDetails}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Rating Stars + Verified */}
            <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
              <Stars rating={selectedReview.rating} size="h-5 w-5" />
              {selectedReview.isVerified && (
                <span className="inline-flex items-center gap-1 text-xs text-[#1A73E8] font-medium">
                  <VerifiedCheckmark /> Verified Review
                </span>
              )}
            </div>

            {/* Review Full Text */}
            <div className="mt-4 text-sm leading-relaxed text-[#3C4043] whitespace-pre-line">
              {selectedReview.text}
            </div>

            {/* Footer: View on Google */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-[#5F6368]">
                <GoogleGLogo className="h-4 w-4" /> Posted on Google
              </span>
              <a
                href={GOOGLE_REVIEWS_SUMMARY.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174A83] hover:text-[#D62836] transition-colors"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
