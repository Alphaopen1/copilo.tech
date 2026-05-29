import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://copilo.tech'
  return [
    { url: base,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/onboard`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/mentions-legales`,    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/confidentialite`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
