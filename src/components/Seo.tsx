import { Helmet } from 'react-helmet-async'

export const SITE_URL = 'https://universal-technologies.com'
// 1200×630 social card; regenerate with `node scripts/generate-og-image.mjs`.
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`
const DEFAULT_OG_IMAGE_ALT = 'Universal Technologies — AI agents, automation & software delivery'
const SITE_NAME = 'Universal Technologies'

type SeoProps = {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: object | object[]
  /** Trail after Home, e.g. [{ name: 'Services', path: '/services' }, { name: 'QA', path: '/services/qa' }]. */
  breadcrumbs?: { name: string; path: string }[]
}

export function Seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = 'website',
  noindex = false,
  jsonLd,
  breadcrumbs,
}: SeoProps) {
  const url = `${SITE_URL}${path}`
  const structuredData: object[] = jsonLd ? (Array.isArray(jsonLd) ? [...jsonLd] : [jsonLd]) : []
  if (breadcrumbs?.length) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: SITE_NAME, path: '/' }, ...breadcrumbs].map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
      })),
    })
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      {image === DEFAULT_OG_IMAGE && <meta property="og:image:width" content="1200" />}
      {image === DEFAULT_OG_IMAGE && <meta property="og:image:height" content="630" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {structuredData.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  )
}
