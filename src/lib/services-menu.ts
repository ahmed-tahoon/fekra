import type { Locale } from '@/i18n/routing'
import type { ServicesMenu } from '@/components/layout/Header'

type Service = { slug: string; title: string; menuRoles?: { label: string }[] | null }
const groups = [
  { slug: 'hire-in-demand-developers', roles: [] },
  { slug: 'hire-front-end-developers', roles: ['React', 'Angular', 'Vue.js', 'Next.js', 'JavaScript', 'TypeScript'] },
  { slug: 'hire-back-end-developers', roles: ['Python', 'Node.js', 'Java', 'Spring Boot', '.NET', 'ASP.NET Core', 'PHP', 'Laravel', 'Golang'] },
  { slug: 'hire-full-stack-developers', roles: ['Full-Stack', 'MERN Stack', 'MEAN Stack', 'Java Full-Stack', '.NET Full-Stack', 'Python Full-Stack'] },
  { slug: 'hire-ai-data-experts', roles: [] },
  { slug: 'hire-mobile-app-developers', roles: ['iOS', 'Android', 'React Native', 'Flutter', 'Kotlin', 'Swift'] },
  { slug: 'hire-qa-engineers', roles: ['Manual QA', 'Automation QA', 'SDET', 'Performance Test', 'Mobile QA', 'API Test'] },
  { slug: 'hire-devops-cloud-engineers', roles: [] },
] as const

const roleSlugs: Record<string, string> = {
  'Vue.js': 'hire-vuejs-developers', 'Next.js': 'hire-nextjs-developers', 'Node.js': 'hire-nodejs-developers',
  '.NET': 'hire-dotnet-core-developers', 'ASP.NET Core': 'hire-aspnet-developers',
  'Manual QA': 'hire-manual-qa-testers', 'Automation QA': 'hire-automation-qa-engineers',
}

const roleTitle = (technology: string, engineer: boolean, locale: Locale) => {
  const titles = {
    en: `${technology} ${engineer ? 'Engineers' : 'Developers'}`,
    ar: `${engineer ? 'مهندسو' : 'مطورو'} ${technology}`,
    de: `${technology}-${engineer ? 'Engineers' : 'Entwickler'}`,
    fr: `${engineer ? 'Ingénieurs' : 'Développeurs'} ${technology}`,
    es: `${engineer ? 'Ingenieros' : 'Desarrolladores'} ${technology}`,
  }
  return titles[locale]
}

/** Explicit groups follow the approved comp independently of the CMS taxonomy. */
export function buildServicesMenu(services: Service[], locale: Locale): ServicesMenu {
  const bySlug = new Map(services.map((service) => [service.slug, service]))
  return groups.flatMap((group) => {
    const service = bySlug.get(group.slug)
    if (!service) return []
    const roles = group.roles.length
      ? group.roles.map((technology) => {
        const slug = roleSlugs[technology] ?? `hire-${technology.toLowerCase().replaceAll(' ', '-')}-developers`
        return { title: roleTitle(technology, group.slug === 'hire-qa-engineers', locale), slug: bySlug.has(slug) ? slug : group.slug }
      })
      : (service.menuRoles ?? []).map((role) => {
        const target = services.find((candidate) => candidate.title.toLowerCase().replace(/^hire /, '') === role.label.toLowerCase().replace(/^hire /, ''))
        return { title: role.label, slug: target?.slug ?? group.slug }
      })
    return [{ title: service.title, slug: service.slug, roles }]
  })
}
