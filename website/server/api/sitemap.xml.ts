import { promises as fs } from 'fs'
import { join } from 'path'
import * as yaml from 'yaml'

export default defineEventHandler(async (event) => {
  try {
    const signaturesDir = join(process.cwd(), '..', 'signatures')
    const yamlFiles = await fs.readdir(signaturesDir)
    const malwareList = []

    // Process all YAML files in signatures/ folder
    const validFiles = yamlFiles.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'))
    
    for (const file of validFiles) {
      const filePath = join(signaturesDir, file)
      const content = await fs.readFile(filePath, 'utf-8')
      const malwareData = yaml.parse(content)
      malwareList.push(malwareData)
    }

    // Generate sitemap XML
    const baseUrl = 'https://evilmutex.org'
    const currentDate = new Date().toISOString()
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/contributor</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`

    // Add malware pages
    malwareList.forEach(malware => {
      const slug = malware.malware_info.family.toLowerCase().replace(/[^a-z0-9]/g, '-')
      sitemap += `
  <url>
    <loc>${baseUrl}/malware/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`
    })

    sitemap += `
</urlset>`

    // Set proper headers
    setHeader(event, 'Content-Type', 'application/xml')
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    
    return sitemap
  } catch (error) {
    console.error('Error generating sitemap:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating sitemap'
    })
  }
}) 