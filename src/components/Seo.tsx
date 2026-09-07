import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export const SITE_URL = 'https://universal-technologies.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`
const SITE_NAME = 'Universal Technologies'

type SeoProps = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: object | object[]
}

/**
 * index.html ships a static <title> and <meta name="description"> so
 * non-JS clients and the pre-hydration paint have something real. React 19
 * hoists Helmet's own title/meta tags as new nodes rather than replacing
 * those static ones, so this mutates them in place instead of going
 * through Helmet for just these two tags.
 */
function useDocumentHead(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

export function Seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  useDocumentHead(title, description)

  const url = `${SITE_URL}${path}`
  const structuredData = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {structuredData.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  )
}
