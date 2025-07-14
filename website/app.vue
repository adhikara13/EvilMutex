<template>
      <div id="app" class="min-h-screen bg-darker text-green-400">
    
    <header class="p-6 bg-transparent">
      <div class="container mx-auto px-12">
        <div class="text-center mb-6 bg-transparent">
          <h1 class="text-xl font-bold mb-2 text-green-400">[ MALWARE MUTEX INTELLIGENCE DATABASE ]</h1>
          <pre class="ascii-art font-mono mx-auto text-lg md:text-xl mb-4 opacity-90 text-green-400 bg-transparent" style="width: fit-content;">
 ███████╗██╗   ██╗██╗██╗         ███╗   ███╗██╗   ██╗████████╗███████╗██╗  ██╗
 ██╔════╝██║   ██║██║██║         ████╗ ████║██║   ██║╚══██╔══╝██╔════╝╚██╗██╔╝
█████╗  ██║   ██║██║██║         ██╔████╔██║██║   ██║   ██║   █████╗   ╚███╔╝
██╔══╝  ╚██╗ ██╔╝██║██║         ██║╚██╔╝██║██║   ██║   ██║   ██╔══╝   ██╔██╗
 ███████╗ ╚████╔╝ ██║███████╗    ██║ ╚═╝ ██║╚██████╔╝   ██║   ███████╗██╔╝ ██╗
 ╚══════╝  ╚═══╝  ╚═╝╚══════╝    ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝
          </pre>

          <div class="text-center">
            <div class="flex justify-center items-center space-x-4">
              <p class="text-sm text-gray-400">Advanced Malware Analysis & Threat Intelligence</p>
              <span class="text-muted font-mono text-sm">{{ formattedTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    
    <nav class="bg-dark border-b border-gray-600 py-4">
      <div class="container mx-auto px-12">
        <div class="flex items-center justify-between">
            <div class="flex-1"></div>
            <div class="flex flex-1 items-center justify-center space-x-8">
              <NuxtLink to="/" class="interactive text-green-400 hover:text-green-300 font-mono">
                <span class="text-red-400">[</span>HOME<span class="text-red-400">]</span>
              </NuxtLink>
              <NuxtLink to="/contributor" class="interactive text-green-400 hover:text-green-300 font-mono">
                <span class="text-red-400">[</span>CONTRIBUTOR<span class="text-red-400">]</span>
              </NuxtLink>
              <a :href="appConfig.links.github.main" target="_blank" class="interactive text-green-400 hover:text-green-300 font-mono">
                <span class="text-red-400">[</span>⭐ Star on GitHub<span class="text-red-400">]</span>
              </a>
            </div>
            <div class="flex flex-1 justify-end">
              <button
                  @click="toggleTheme"
                  class="interactive font-mono transition-colors"
                  :style="{ color: themeColor }"
                >
                  <span class="text-red-400">[</span>{{ currentThemeName }}<span class="text-red-400">]</span>
                </button>
            </div>
        </div>
      </div>
    </nav>

    
    <main class="flex-1 bg-darker min-h-screen">
      <NuxtPage />
    </main>

    
    <footer class="border-t border-green-400 py-6 bg-darker">
      <div class="container mx-auto px-12">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-center md:text-left">
            <p class="text-green-400 font-mono text-sm">
              EvilMutex Project v1.0.0
            </p>
            <p class="text-gray-400 font-mono text-xs mt-1">
              Open Source Threat Intelligence Database
            </p>
          </div>
          <div class="flex space-x-6 text-sm">
            <a :href="appConfig.links.github.main" class="interactive text-gray-400 hover:text-green-400 font-mono">
              <span class="text-red-400">[</span>GITHUB<span class="text-red-400">]</span>
            </a>
            <a href="/docs" class="interactive text-gray-400 hover:text-green-400 font-mono">
              <span class="text-red-400">[</span>DOCS<span class="text-red-400">]</span>
            </a>
            <a href="/api" class="interactive text-gray-400 hover:text-green-400 font-mono">
              <span class="text-red-400">[</span>API<span class="text-red-400">]</span>
            </a>
          </div>
        </div>
      </div>
    </footer>

    
    <div id="notifications" class="fixed top-4 right-4 z-50 space-y-2"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

import { appConfig } from '~/config/app.config'

const malwareStore = useMalwareStore()
const currentTime = ref(new Date())

const themes = appConfig.themes

const currentTheme = ref(appConfig.ui.defaultTheme)

let timeInterval

const formattedTime = computed(() => {
  try {
    return currentTime.value.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  } catch (error) {
    console.error('Error formatting time:', error)
    return '00:00:00'
  }
})

const currentThemeName = computed(() => {
  return themes[currentTheme.value]?.name || 'DEFAULT'
})

const themeColor = computed(() => {
  return themes[currentTheme.value]?.color || appConfig.themes.default.fallbackColor
})

const toggleTheme = () => {
  const themeKeys = Object.keys(themes)
  const currentIndex = themeKeys.indexOf(currentTheme.value)
  const nextIndex = (currentIndex + 1) % themeKeys.length
  currentTheme.value = themeKeys[nextIndex]

  if (process.client) {
    localStorage.setItem(appConfig.storage.themeKey, currentTheme.value)
  }
}

const applyTheme = (theme) => {
  if (process.client && document.documentElement) {

    document.documentElement.removeAttribute('data-theme')

    if (theme !== 'matrix') {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }
}

watch(currentTheme, (newTheme) => {
  applyTheme(newTheme)
}, { immediate: true })

const handleError = (error) => {
  console.error('Application error:', error)

}

onMounted(() => {
  try {

    if (process.client) {
      const savedTheme = localStorage.getItem(appConfig.storage.themeKey)
      if (savedTheme && themes[savedTheme]) {
        currentTheme.value = savedTheme
      }
    }

    timeInterval = setInterval(() => {
      currentTime.value = new Date()
    }, appConfig.ui.timeUpdateInterval)

    if (malwareStore && typeof malwareStore.loadMalwareData === 'function') {
      malwareStore.loadMalwareData().catch(handleError)
    }
  } catch (error) {
    handleError(error)
  }
})

onUnmounted(() => {
  try {
    if (timeInterval) {
      clearInterval(timeInterval)
    }
  } catch (error) {
    console.error('Error cleaning up time interval:', error)
  }
})

useHead({
  title: appConfig.app.fullName,
  meta: [
    {
      name: 'description',
      content: appConfig.app.description
    },
    {
      name: 'keywords',
      content: appConfig.app.keywords
    }
  ]
})
</script>

<style scoped>

.ascii-art {
  font-size: 10px;
  line-height: 1;
  overflow-x: auto;
  white-space: pre;
}

@media (min-width: 768px) {
  .ascii-art {
    font-size: 12px;
  }
}

@media (min-width: 1024px) {
  .ascii-art {
    font-size: 14px;
  }
}

.interactive {
  transition: all 0.2s ease;
  position: relative;
}

.interactive:hover {
  text-shadow: 0 0 5px currentColor;
}

.interactive::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.interactive:hover::before {
  transform: scaleX(1);
}

#notifications .notification {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  max-width: 300px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification.success {
  color: var(--text-primary);
  border-color: var(--text-primary);
}

.notification.error {
  color: var(--text-danger);
  border-color: var(--text-danger);
}

.notification.warning {
  color: var(--text-warning);
  border-color: var(--text-warning);
}

.notification.info {
  color: var(--text-secondary);
  border-color: var(--text-secondary);
}
</style>