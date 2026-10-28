import React from 'react';
import {
  Compass,
  ClipboardCheck,
  GraduationCap,
  Wrench,
  LifeBuoy,
  Settings,
  FileCheck,
} from 'lucide-react';
import type { ServiceIconName } from '@/lib/services-data';

const ICONS = {
  consultation: Compass,
  installation: ClipboardCheck,
  training: GraduationCap,
  maintenance: Wrench,
  breakdown: LifeBuoy,
  spares: Settings,
  amc: FileCheck,
} as const;

export function ServiceIcon({ name, className = 'w-8 h-8 text-[#174A83]' }: { name: ServiceIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
