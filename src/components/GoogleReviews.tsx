'use client';

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { FadeIn } from '@/components/animations/MotionWrapper';
import { ApiError } from '@/lib/http';
import { getGoogleReviews, PREVIEW_REVIEWS } from '@/lib/google-reviews';
import { GOOGLE_REVIEWS_URL } from '@/lib/site-config';
import type { GoogleReview, GoogleReviewsData } from '@/types/api';

type State =
  | { status: 'loading' }
  | { status: 'ready'; data: GoogleReviewsData; preview: boolean }
  | { status: 'error'; notConfigured: boolean };

/** Layout preview with clearly labelled sample data. Never enabled in production builds. */
const PREVIEW_ENABLED = process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_REVIEWS_PREVIEW === '1';

const INITIAL_VISIBLE_MOBILE = 3;
const LONG_REVIEW_CHARS = 220;

function GoogleLogo({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.5-4.1 7-10.2 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function Stars({ rating, size = 'h-4 w-4' }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, rating - (n - 1)));
        return (
          <span key={n} className={`relative inline-block ${size}`} aria-hidden="true">
            <Star className={`absolute inset-0 ${size} text-gray-300`} strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${size} fill-[#F5B301] text-[#F5B301]`} strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Avatar({ review }: { review: GoogleReview }) {
  const [failed, setFailed] = useState(false);
  const initial = review.authorName.trim().charAt(0).toUpperCase() || '?';

  if (review.authorPhotoUri && !failed) {
    return (
      // Google-hosted avatar: plain <img> so it is never proxied or re-hosted.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={review.authorPhotoUri}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-11 w-11 shrink-0 rounded-full border border-gray-200 object-cover"
      />
    );
  }

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#174A83]/10 text-base font-bold text-[#174A83]" aria-hidden="true">
      {initial}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > LONG_REVIEW_CHARS;

  const name = review.authorUri ? (
    <a href={review.authorUri} target="_blank" rel="noopener noreferrer" className="hover:text-[#D62836] transition-colors">
      {review.authorName}
    </a>
  ) : (
    review.authorName
  );

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <Avatar review={review} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-[#102B46]">{name}</h3>
          {review.relativeDate && <p className="text-xs text-[#475467]">{review.relativeDate}</p>}
        </div>
        <GoogleLogo className="h-5 w-5 shrink-0" />
      </div>

      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>

      {review.text ? (
        <>
          <p className={`mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-[#344054] ${expanded ? '' : 'line-clamp-5'}`}>
            {review.text}
          </p>
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-2 self-start text-xs font-bold text-[#174A83] hover:text-[#D62836] transition-colors"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </>
      ) : (
        <p className="mt-3 text-sm italic text-[#98A2B3]">Rated without a written review.</p>
      )}
    </article>
  );
}

function Skeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="mx-auto mb-10 h-16 max-w-md rounded-2xl bg-gray-200/70" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-52 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 rounded bg-gray-200" />
                <div className="h-3 w-1/3 rounded bg-gray-100" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="h-3 rounded bg-gray-100" />
              <div className="h-3 rounded bg-gray-100" />
              <div className="h-3 w-4/5 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-sm font-bold text-[#174A83] hover:text-[#D62836] transition-colors ${className}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function GoogleReviews() {
  const [state, setState] = useState<State>(
    PREVIEW_ENABLED ? { status: 'ready', data: PREVIEW_REVIEWS, preview: true } : { status: 'loading' },
  );
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (PREVIEW_ENABLED) return;

    const controller = new AbortController();
    getGoogleReviews(controller.signal)
      .then((data) => setState({ status: 'ready', data, preview: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({ status: 'error', notConfigured: error instanceof ApiError && error.status === 503 && !GOOGLE_REVIEWS_URL });
      });

    return () => controller.abort();
  }, []);

  // Credentials not connected yet and nothing to link to: keep the homepage clean rather than show an empty block.
  if (state.status === 'error' && state.notConfigured && process.env.NODE_ENV === 'production') return null;

  const data = state.status === 'ready' ? state.data : null;
  const mapsUrl = data?.googleMapsUri || GOOGLE_REVIEWS_URL || null;
  const reviews = data?.reviews ?? [];
  const hiddenOnMobile = Math.max(0, reviews.length - INITIAL_VISIBLE_MOBILE);

  return (
    <section id="google-reviews" aria-labelledby="google-reviews-heading" className="relative overflow-hidden border-b border-gray-200/80 bg-white px-6 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-gray-200 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#174A83] shadow-sm">
              Customer Testimonials
            </span>
            <h2 id="google-reviews-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-tight text-[#102B46] sm:text-5xl">
              What Our Customers Say
            </h2>
            <p className="mt-3 text-sm text-[#475467] sm:text-base">Trusted feedback for Techmate Industries</p>
          </div>
        </FadeIn>

        <div className="mt-10" aria-live="polite" aria-busy={state.status === 'loading'}>
          {state.status === 'loading' && (
            <>
              <span className="sr-only">Loading Google reviews…</span>
              <Skeleton />
            </>
          )}

          {state.status === 'error' && (
            <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-[#F8FAFC] p-8 text-center" role="status">
              <GoogleLogo className="mx-auto h-8 w-8" />
              <p className="mt-3 text-sm text-[#475467]">
                {state.notConfigured
                  ? 'Google reviews will appear here once the Google connection is set up.'
                  : 'We could not load our Google reviews right now.'}
              </p>
              {GOOGLE_REVIEWS_URL && <ListingLink href={GOOGLE_REVIEWS_URL} className="mt-4">Read our reviews on Google</ListingLink>}
            </div>
          )}

          {data && (
            <>
              {state.status === 'ready' && state.preview && (
                <p className="mx-auto mb-6 max-w-xl rounded-lg border border-dashed border-amber-400 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-800">
                  Layout preview with sample data. These are not real reviews and this banner never appears in production.
                </p>
              )}

              {/* Rating summary */}
              <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] px-6 py-5 sm:flex-row sm:gap-6">
                <div className="flex items-center gap-2.5">
                  <GoogleLogo className="h-7 w-7" />
                  <span className="text-sm font-bold text-[#102B46]">Google Reviews</span>
                </div>
                {data.rating !== null ? (
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-4xl font-bold leading-none text-[#102B46]">{data.rating.toFixed(1)}</span>
                    <div>
                      <Stars rating={data.rating} size="h-5 w-5" />
                      <p className="mt-1 text-xs text-[#475467]">
                        Based on {data.totalReviews.toLocaleString('en-IN')} {data.totalReviews === 1 ? 'review' : 'reviews'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#475467]">No rating yet</p>
                )}
              </div>

              {reviews.length > 0 ? (
                <>
                  <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, index) => (
                      <div
                        key={`${review.authorName}-${review.publishTime ?? index}`}
                        className={!showAll && index >= INITIAL_VISIBLE_MOBILE ? 'hidden md:block' : undefined}
                      >
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>

                  {hiddenOnMobile > 0 && !showAll && (
                    <div className="mt-6 text-center md:hidden">
                      <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className="rounded-full border border-[#174A83] px-5 py-2 text-sm font-bold text-[#174A83] transition-colors hover:bg-[#174A83] hover:text-white"
                      >
                        Show {hiddenOnMobile} more {hiddenOnMobile === 1 ? 'review' : 'reviews'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-8 text-center text-sm text-[#475467]" role="status">
                  No written reviews to show yet. Be the first to share your experience on Google.
                </p>
              )}

              <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-8">
                {mapsUrl && <ListingLink href={mapsUrl}>View all reviews on Google Maps</ListingLink>}
                {data.writeReviewUri && <ListingLink href={data.writeReviewUri}>Write a review</ListingLink>}
              </div>

              <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#667085]">
                Reviews from <GoogleLogo className="h-3.5 w-3.5" /> <span className="font-semibold">Google</span>. Rating and review count reflect the Google listing at the time of loading.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
