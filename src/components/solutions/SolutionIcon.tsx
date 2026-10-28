import React from 'react';
import { Building2, Wheat, UtensilsCrossed, Coffee, Cloud, ChefHat, Hospital, Warehouse } from 'lucide-react';
import type { SolutionIconName } from '@/lib/solutions-data';

const ICONS = {
  hotel: Building2,
  restaurant: UtensilsCrossed,
  bakery: Wheat,
  cafe: Coffee,
  'cloud-kitchen': Cloud,
  catering: ChefHat,
  institutional: Hospital,
  'central-kitchen': Warehouse,
} as const;

export function SolutionIcon({ name, className = 'w-8 h-8 text-[#174A83]' }: { name: SolutionIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
