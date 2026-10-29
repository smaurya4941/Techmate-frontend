import React from 'react';
import type { Metadata } from 'next';
import { CategoriesClient } from '@/components/categories/CategoriesClient';

export const metadata: Metadata = {
  title: 'Commercial Kitchen & Bakery Equipment Categories | Techmate Industries',
  description:
    'Explore Techmate Industries 8 commercial equipment divisions and 44 specialized machinery categories: Bakery Ovens, Spiral Mixers, Cooking Ranges, Combi Ovens, Blast Chillers, Dishwashing, and Stainless Steel Fabrication.',
  keywords: [
    'commercial kitchen equipment categories',
    'bakery machinery divisions',
    'commercial refrigeration catalogue',
    'combi oven models',
    'industrial dishwashers',
    'stainless steel kitchen fabrication',
    'Techmate categories',
  ],
};

export default function CategoriesPage() {
  return <CategoriesClient />;
}

