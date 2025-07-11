
import { promises as fs } from 'fs'
import { join } from 'path'
import * as yaml from 'yaml'

async function buildMalwareData() {
  console.log('🔒 Building malware data from YAML files...')

  const signaturesDir = join(process.cwd(), '..', 'signatures')
  const publicDataDir = join(process.cwd(), 'public', 'data')

  try {

    await fs.mkdir(publicDataDir, { recursive: true })

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

    const jsonResponse = {
      malware: malwareList,
      total: malwareList.length,
      categories: [...new Set(malwareList.map(m => m.category))].sort(),
      tags: [...new Set(malwareList.flatMap(m => m.primary_tags))].sort(),
      last_updated: new Date().toISOString()
    }

    await fs.writeFile(
      join(publicDataDir, 'malware.json'),
      JSON.stringify(jsonResponse, null, 2)
    )

    console.log(`✅ Built data for ${malwareList.length} malware families`)
    return jsonResponse
  } catch (error) {
    console.error('❌ Error building malware data:', error)
    throw error
  }
}

async function generateStaticSitemap() {
  console.log('🗺️ Generating static sitemap.xml...')
  
  try {
    const data = await buildMalwareData()
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
    data.malware.forEach(malware => {
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

    // Write sitemap to public directory
    const publicDir = join(process.cwd(), 'public')
    await fs.writeFile(join(publicDir, 'sitemap.xml'), sitemap)
    
    console.log(`✅ Generated sitemap.xml with ${data.malware.length + 2} URLs`)
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
  }
}

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  css: ['~/assets/css/main.css'],

  typescript: {
    typeCheck: false
  },

  app: {
    baseURL: '/', // ✅ Correct for Cloudflare Pages
          head: {
        title: 'EvilMutex - Malware Mutex Intelligence',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: 'Comprehensive database of malware mutex signatures for threat intelligence and detection' },
          { name: 'keywords', content: 'malware, mutex, threat intelligence, cybersecurity, detection, sigma rules' },
          { name: 'author', content: 'EvilMutex Team' },
          { name: 'seznam-wmt', content: 'zNCSjjygAPUgu8bISSRgLXlOMJeLS9ek' },
        { property: 'og:title', content: 'EvilMutex - Malware Mutex Intelligence' },
        { property: 'og:description', content: 'Comprehensive database of malware mutex signatures for threat intelligence and detection' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'EvilMutex - Malware Mutex Intelligence' },
        { name: 'twitter:description', content: 'Comprehensive database of malware mutex signatures for threat intelligence and detection' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        // Removed GitHub Pages canonical URL for Cloudflare Pages deployment
      ]
    }
  },

  runtimeConfig: {
    public: {
      githubUrl: 'https://github.com/adhikara13/evilmutex',
      apiBaseUrl: process.env.API_URL || '/api'
    }
  },



  devServer: {
    port: 3000,
    host: '127.0.0.1'
  },

  vite: {
    server: {
      fs: {
        strict: false,
        allow: ['..']
      }
    },
    build: {
      target: 'es2020'
    },
    esbuild: {
      // Remove console logs in production
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
    }
  },



  generate: {
    routes: [
      '/',
      '/contributor'
      // Dynamic routes are handled by nitro:config hook below
    ]
  },

  hooks: {
    // Build malware data before building
    'build:before': async () => {
      console.log('🔒 Building EvilMutex - Malware Mutex Intelligence Platform...')
      await buildMalwareData()
      await generateStaticSitemap()
    },

    'nitro:build:before': async () => {
      console.log('🔧 Preparing data for static generation...')
      await buildMalwareData()
      await generateStaticSitemap()
    },

    'ready': async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 Dev server ready - data built automatically!')
      }
    },

    // Generate routes for all malware pages
    'nitro:config': async (nitroConfig) => {
      try {
        const data = await buildMalwareData()
        const malwareRoutes = data.malware.map(malware => 
          `/malware/${malware.malware_info.family.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
        )
        nitroConfig.prerender = nitroConfig.prerender || {}
        nitroConfig.prerender.routes = [
          ...(nitroConfig.prerender.routes || []),
          ...malwareRoutes
        ]
      } catch (error) {
        console.error('Error generating prerender routes:', error)
      }
    }
  },

  nitro: {
    preset: 'cloudflare-pages', // ✅ Perfect for Cloudflare Pages
    compressPublicAssets: true,
    prerender: {
      routes: [
        '/',
        '/contributor'
      ]
    },
    // Fix middleware conflict warning
    routeRules: {
      '/robots.txt': { headers: { 'Content-Type': 'text/plain' } }
    }
  },

  // Performance optimizations
  experimental: {
    payloadExtraction: false
  },

  compatibilityDate: '2024-11-01'
})