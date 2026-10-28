'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem, HoverCard } from '@/components/animations/MotionWrapper';

export function TechnicalInsights() {
  const blogPosts = [
    {
      id: 1,
      title: 'Challenges Of Kitchen Sizing & Layout For New Hospitality Firms',
      author: 'Garrison Smith',
      authorAvatar: '/images/blog-author-garrison.jpg',
      date: 'Dec 08, 2025',
      image: '/images/blog-1.jpg',
      excerpt:
        'Giving consultancy for every commercial kitchen requirement, equipment sizing, layout drawing, and lifecycle maintenance for existing projects.',
      slug: 'challenges-of-kitchen-sizing-new-firms',
    },
    {
      id: 2,
      title: 'Why Food Facilities Need Expert Machinery & Metallurgy Support',
      author: 'Garrison Smith',
      authorAvatar: '/images/blog-author-garrison.jpg',
      date: 'Dec 08, 2025',
      image: '/images/blog-2.jpg',
      excerpt:
        'Giving consultancy for certified AISI 304 food-grade stainless fabrication, thermal recovery calculations, and electrical load balancing.',
      slug: 'why-facilities-need-expert-machinery-support',
    },
    {
      id: 3,
      title: 'The Role Of Industrial Equipment Consultants In Commercial Success',
      author: 'Garrison Smith',
      authorAvatar: '/images/blog-author-garrison.jpg',
      date: 'Dec 08, 2025',
      image: '/images/blog-3.jpg',
      excerpt:
        'Giving consultancy for turnkey bakery lines, high-throughput combi steam ovens, and preventive maintenance agreements for hospitality groups.',
      slug: 'role-of-equipment-consultants-in-success',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#08090a] px-6 sm:px-8 border-t border-white/5 relative overflow-hidden" id="blog">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header (Fade In) */}
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#181d28] text-[11px] font-bold tracking-widest text-gray-300 uppercase border border-white/10">
                LATEST NEWS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] font-heading">
                Featured <span className="text-lime-400 sm:text-blue-400 font-extrabold">News &amp; Blogs</span><br />
                From Techmate
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-6 lg:max-w-xl">
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
                Giving technical whitepapers, commercial equipment sizing guides, and kitchen engineering protocols authored by factory specialists.
              </p>

              <Link
                href="/faqs"
                className="text-sm font-bold text-white hover:text-blue-300 underline underline-offset-8 transition-colors shrink-0"
              >
                View All Blogs
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* 3 News & Blog Cards Grid with Staggered Entrance */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {blogPosts.map((post) => (
            <StaggerItem key={post.id}>
              <HoverCard yOffset={-6} scale={1.015} className="h-full">
                <article className="bg-[#11141c] border border-white/5 hover:border-white/20 transition-all rounded-3xl p-5 sm:p-6 flex flex-col justify-between group cursor-pointer shadow-xl h-full">
                  <div>
                    {/* Image Thumbnail with Date Badge on Bottom Right */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-[#161a24]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority={post.id === 1}
                        className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                      />

                      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-mono text-white flex items-center gap-1.5 border border-white/10 z-10 shadow-md">
                        <Calendar className="w-3.5 h-3.5 text-lime-400 sm:text-blue-400" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    {/* Author Row */}
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0 bg-[#181d28]">
                        <Image
                          src={post.authorAvatar}
                          alt={post.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-300">
                        By {post.author}
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading leading-snug group-hover:text-blue-300 transition-colors mb-3">
                      {post.title}
                    </h3>

                    {/* Excerpt Paragraph */}
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Bottom Link */}
                  <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={`/contact?subject=${encodeURIComponent(post.title)}`}
                      className="text-xs font-bold text-lime-400 sm:text-blue-300 group-hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>Read Article</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                    <span className="text-[10px] font-mono text-gray-500 uppercase">
                      5 Min Read
                    </span>
                  </div>
                </article>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </div>
    </section>
  );
}
