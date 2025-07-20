export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.server) return

  // Watch for route changes
  const router = useRouter()
  
  router.afterEach((to) => {
    // Normalize path for canonical URL (add trailing slash for consistency)
    const normalizedPath = to.path === '/' 
      ? to.path 
      : to.path.endsWith('/') 
        ? to.path 
        : to.path + '/'
    
    // Set canonical URL
    const canonicalUrl = `https://evilmutex.org${normalizedPath}`
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)
  })
}) 