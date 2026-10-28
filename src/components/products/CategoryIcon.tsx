import React from 'react';
import {
  Wheat,
  Flame,
  UtensilsCrossed,
  Sparkles,
  Snowflake,
  Thermometer,
  Coffee,
  ChefHat,
  Box,
} from 'lucide-react';
import type { EquipmentCategory } from '@/types/product';

const ICONS: Record<EquipmentCategory, React.ComponentType<{ className?: string }>> = {
  'bakery-baking': Wheat,
  cooking: Flame,
  'food-preparation': UtensilsCrossed,
  dishwashing: Sparkles,
  refrigeration: Snowflake,
  'hot-holding': Thermometer,
  beverage: Coffee,
  'kitchen-equipment': ChefHat,
};

export function CategoryIcon({
  category,
  className = 'w-8 h-8 text-[#174A83]',
}: {
  category?: EquipmentCategory;
  className?: string;
}) {
  const Icon = (category && ICONS[category]) || Box;
  return <Icon className={className} aria-hidden="true" />;
}
