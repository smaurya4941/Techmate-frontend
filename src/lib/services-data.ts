/**
 * Services. Titles and `description` are the real website positioning supplied by Techmate.
 */
export type ServiceIconName =
  | 'consultation'
  | 'installation'
  | 'training'
  | 'maintenance'
  | 'breakdown'
  | 'spares'
  | 'amc';

export interface ServiceInfo {
  slug: string;
  title: string;
  /** Short label for chips and compact cards. */
  shortTitle: string;
  iconName: ServiceIconName;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export const SERVICES_DATA: ServiceInfo[] = [
  {
    slug: 'consultation',
    title: 'Kitchen Consultation',
    shortTitle: 'Consultation',
    iconName: 'consultation',
    description: 'Understand requirements and recommend the right equipment and configuration.',
    ctaLabel: 'Book a Consultation',
    ctaHref: '/request-quote',
  },
  {
    slug: 'installation',
    title: 'Installation & Commissioning',
    shortTitle: 'Installation',
    iconName: 'installation',
    description: 'Professional installation and equipment commissioning.',
    ctaLabel: 'Inquire for Installation',
    ctaHref: '/request-quote',
  },
  {
    slug: 'training',
    title: 'Operator Training',
    shortTitle: 'Training',
    iconName: 'training',
    description: 'Equipment operation, best practices and user training.',
    ctaLabel: 'Request Training',
    ctaHref: '/support',
  },
  {
    slug: 'maintenance',
    title: 'Preventive Maintenance',
    shortTitle: 'Maintenance',
    iconName: 'maintenance',
    description: 'Scheduled maintenance to improve equipment performance and life.',
    ctaLabel: 'Schedule Service',
    ctaHref: '/support',
  },
  {
    slug: 'breakdown',
    title: 'Breakdown Service',
    shortTitle: 'Breakdown',
    iconName: 'breakdown',
    description: 'Technical support and repair assistance.',
    ctaLabel: 'Request Support',
    ctaHref: '/support',
  },
  {
    slug: 'spares',
    title: 'Genuine Spare Parts',
    shortTitle: 'Spare Parts',
    iconName: 'spares',
    description: 'Supply of genuine equipment spare parts.',
    ctaLabel: 'Request Spares',
    ctaHref: '/support',
  },
  {
    slug: 'amc',
    title: 'AMC',
    shortTitle: 'AMC',
    iconName: 'amc',
    description: 'Annual maintenance and support contracts.',
    ctaLabel: 'Get an AMC Quote',
    ctaHref: '/request-quote',
  },
];
