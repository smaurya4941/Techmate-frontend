import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ProjectInfo } from '@/lib/projects-data';

export function ProjectCard({ project }: { project: ProjectInfo }) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-gray-100"
        aria-label={`View project: ${project.title}`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-white border border-white/10">
          {project.category}
        </span>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D62836] mb-2">
          {project.badge}
        </span>
        <h3 className="font-heading font-bold text-lg text-[#102B46] leading-snug mb-2">
          <Link href={`/projects/${project.slug}`} className="hover:text-[#174A83] transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="text-xs text-[#344054] leading-relaxed mb-5 line-clamp-3">{project.summary}</p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-[11px] font-mono text-gray-500">
            {project.metrics.map((m) => `${m.value} ${m.label}`).join(' • ')}
          </span>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174A83] hover:text-[#D62836] transition-colors"
          >
            <span>View project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
