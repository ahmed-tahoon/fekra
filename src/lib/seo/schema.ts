import { siteConfig, absoluteUrl } from './config';

/**
 * Section 14.5 — structured data (JSON-LD) builders.
 * Render the output with the <JsonLd> component.
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl('/logo.png'),
    sameAs: siteConfig.sameAs,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@type': 'Organization', name: input.author },
    publisher: organizationSchema(),
    image: input.image ? absoluteUrl(input.image) : undefined,
  };
}

export function jobPostingSchema(input: {
  title: string;
  description: string;
  datePosted: string;
  employmentType: string;
  location: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: input.title,
    description: input.description,
    datePosted: input.datePosted,
    employmentType: input.employmentType,
    hiringOrganization: organizationSchema(),
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: input.location },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
