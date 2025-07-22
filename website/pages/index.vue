<template>
  <div class="bg-darker text-green-400 font-mono">
    <div class="container mx-auto px-4 sm:px-6 lg:px-12 py-8">
      <!-- Search Interface -->
      <div class="mb-8">
        <h2 class="text-lg md:text-xl font-bold text-green-400 mb-4">
          <span class="text-red-400">[</span>SEARCH_INTERFACE<span class="text-red-400">]</span>
        </h2>
        <div class="bg-dark border border-gray-600 p-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search malware families, mutexes, or categories..."
                class="form-input w-full bg-darker text-green-400 placeholder-gray-600"
                @keyup.enter="performSearch"
              />
            </div>
            <div class="flex gap-2 justify-end md:justify-start">
              <button @click="performSearch" class="btn btn-primary px-6">
                SEARCH
              </button>
              <button @click="clearSearch" class="btn btn-secondary px-6">
                CLEAR
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading and Error States -->
      <div v-if="malwareStore.loading" class="mb-8 p-4 bg-dark border border-gray-600 text-center">
        <div class="text-green-400 text-sm">Loading malware database...</div>
        <div class="loading-spinner w-6 h-6 mx-auto mt-2"></div>
      </div>
      <div v-else-if="malwareStore.error" class="mb-8 p-4 bg-dark border border-red-600 text-center">
        <div class="text-red-400 text-sm mb-2">Failed to load database: {{ malwareStore.error }}</div>
        <button @click="retryLoading" class="btn btn-primary text-xs">RETRY</button>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Category Filters -->
        <div class="mb-8" v-if="safeArray(malwareStore.categories).length > 0">
          <h2 class="text-lg md:text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>FILTER_BY_CATEGORY<span class="text-red-400">]</span>
          </h2>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in safeArray(malwareStore.categories)"
              :key="category"
              @click="filterByCategory(category)"
              class="btn btn-outline text-xs"
              :class="{ 'text-green-400 border-green-400': selectedCategory === category }"
            >
              {{ category.toUpperCase() }}
            </button>
            <button @click="clearCategory" class="btn btn-outline text-xs text-muted">
              CLEAR_FILTER
            </button>
          </div>
        </div>

        <!-- Malware Database -->
        <div class="mb-8">
          <h2 class="text-lg md:text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>MALWARE_DATABASE<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600">
            <!-- Table Header -->
            <div class="hidden md:grid grid-cols-4 gap-4 text-sm font-bold text-green-400 p-4 bg-darker border-b border-gray-600">
              <div>FAMILY_NAME</div>
              <div>CATEGORY</div>
              <div>MUTEX_COUNT</div>
              <div>ACTIONS</div>
            </div>

            <!-- Table Body / Cards -->
            <DynamicScroller
              :items="filteredMalware"
              :min-item-size="88"
              class="max-h-96 overflow-y-auto"
              key-field="id"
            >
              <template v-slot="{ item: malware, index, active }">
                <DynamicScrollerItem
                  :item="malware"
                  :active="active"
                  :size-dependencies="[
                    malware.malware_info.family,
                  ]"
                  :data-index="index"
                >
                  <div v-if="safeArray(filteredMalware).length === 0" class="p-4 text-center text-muted">
                    <div class="text-red-400 mb-2">[NO_DATA_FOUND]</div>
                    <div class="text-xs">No malware entries match your search criteria</div>
                  </div>

                  <div>
                    <!-- Card View for Mobile -->
                    <div class="md:hidden p-4 border-b border-gray-600">
                      <div class="flex justify-between items-start">
                        <div>
                          <div class="font-bold text-green-400">{{ safeValue(malware?.malware_info?.family, 'Unknown') }}</div>
                          <div class="text-muted text-xs">
                            {{ safeArray(malware?.malware_info?.aliases).slice(0, 2).join(', ') }}
                            <span v-if="safeArray(malware?.malware_info?.aliases).length > 2">...</span>
                          </div>
                        </div>
                        <span class="badge badge-red">{{ safeValue(malware?.category, 'unknown').toLowerCase() }}</span>
                      </div>
                      <div class="flex justify-between items-center mt-4">
                        <div class="text-sm">
                          <span class="text-muted">Mutexes: </span>
                          <span class="text-warning">{{ safeArray(malware?.mutexes).length }}</span>
                        </div>
                        <div class="flex gap-2">
                          <NuxtLink 
                            :to="`/malware/${(malware?.malware_info?.family || 'unknown').toLowerCase().replace(/\s+/g, '-')}/`" 
                            class="btn btn-outline text-xs"
                          >
                            VIEW
                          </NuxtLink>
                          <button @click="copyMutexes(malware)" class="btn btn-outline text-xs" :disabled="!malware || !malware.mutexes">
                            COPY
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Table Row for Desktop -->
                    <div class="hidden md:grid grid-cols-4 gap-4 text-sm p-4 border-b border-gray-600 hover:bg-darker transition-colors">
                      <div>
                        <div class="font-bold text-green-400">{{ safeValue(malware?.malware_info?.family, 'Unknown') }}</div>
                        <div class="text-muted text-xs">
                          {{ safeArray(malware?.malware_info?.aliases).slice(0, 2).join(', ') }}
                          <span v-if="safeArray(malware?.malware_info?.aliases).length > 2">...</span>
                        </div>
                      </div>
                      <div>
                        <span class="badge badge-red">{{ safeValue(malware?.category, 'unknown').toLowerCase() }}</span>
                      </div>
                      <div class="text-warning">
                        {{ safeArray(malware?.mutexes).length }}
                      </div>
                      <div class="flex gap-2">
                        <NuxtLink 
                          :to="`/malware/${(malware?.malware_info?.family || 'unknown').toLowerCase().replace(/\s+/g, '-')}/`" 
                          class="btn btn-outline text-xs"
                        >
                          VIEW
                        </NuxtLink>
                        <button @click="copyMutexes(malware)" class="btn btn-outline text-xs" :disabled="!malware || !malware.mutexes">
                          COPY
                        </button>
                      </div>
                    </div>
                  </div>
                </DynamicScrollerItem>
              </template>
            </DynamicScroller>
          </div>
        </div>

        <!-- Export Options -->
        <div class="mb-8">
          <h2 class="text-lg md:text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>EXPORT_OPTIONS<span class="text-red-400">]</span>
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button
              @click="exportJSON"
              class="btn btn-primary p-4"
              :disabled="safeArray(malwareStore.malwareList).length === 0"
            >
              <div class="text-sm font-bold">JSON</div>
              <div class="text-xs text-muted">Complete database</div>
            </button>
            <div class="space-y-2">
              <button
                @click="exportCSV(false)"
                class="btn btn-secondary p-4 w-full"
                :disabled="safeArray(malwareStore.malwareList).length === 0"
              >
                <div class="text-sm font-bold">CSV (Consolidated)</div>
                <div class="text-xs text-muted">One row per family</div>
              </button>
              <button
                @click="exportCSV(true)"
                class="btn btn-outline p-2 w-full"
                :disabled="safeArray(malwareStore.malwareList).length === 0"
              >
                <div class="text-xs font-bold">CSV (Detailed)</div>
                <div class="text-xs text-muted">One row per mutex</div>
              </button>
            </div>
            <button
              @click="exportSigmaRules"
              class="btn btn-outline p-4"
              :disabled="safeArray(malwareStore.malwareList).length === 0"
            >
              <div class="text-sm font-bold">SIGMA</div>
              <div class="text-xs text-muted">Detection rules</div>
            </button>
            <button
              @click="exportYAML"
              class="btn btn-outline p-4"
              :disabled="safeArray(malwareStore?.malwareList).length === 0"
            >
              <div class="text-sm font-bold">YAML</div>
              <div class="text-xs text-muted">Source format</div>
            </button>
          </div>
        </div>

        <!-- What are Malware Mutexes? -->
        <div class="border-t border-gray-600 pt-4">
          <div class="text-sm text-muted">
            <strong>What are Malware Mutexes?</strong><br>
            Mutexes (mutual exclusion objects) are used by malware to prevent multiple instances from running simultaneously. Each malware family typically uses unique mutex names, making them excellent fingerprints for threat identification, attribution, and detection engineering across security operations.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Fuse from 'fuse.js'
import { appConfig } from '~/config/app.config'

const malwareStore = useMalwareStore()
const searchQuery = ref('')
const selectedCategory = ref(null)
let fuse

const filteredMalware = computed(() => {
  if (!malwareStore?.malwareList || !Array.isArray(malwareStore.malwareList)) return []

  let results = malwareStore.malwareList;

  if (searchQuery.value && fuse) {
    const searchResults = fuse.search(searchQuery.value)
    results = searchResults.map(result => result.item)
  }

  if (selectedCategory.value) {
    results = results.filter(malware => malware?.category?.toLowerCase() === selectedCategory.value.toLowerCase())
  }

  return results.map((item, index) => ({
    ...item,
    id: item.malware_info?.family || `item-${index}`
  }))
})

const performSearch = () => {

  console.log('Searching for:', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
}

const filterByCategory = (category) => {
  selectedCategory.value = category === selectedCategory.value ? null : category
}

const clearCategory = () => {
  selectedCategory.value = null
}

const copyMutexes = async (malware) => {
  try {
    if (!malware || !malware.mutexes || !Array.isArray(malware.mutexes)) {
      console.warn('No mutexes available to copy')
      return
    }

    const mutexes = malware.mutexes.map(m => m?.name || 'Unknown').join('\n')
    await navigator.clipboard.writeText(mutexes)
    console.log('Mutexes copied to clipboard')
  } catch (error) {
    console.error('Failed to copy mutexes:', error)
  }
}

const exportJSON = () => {
  try {
    const data = JSON.stringify(safeArray(malwareStore.malwareList), null, 2)
    downloadFile(data, appConfig.exports.json.filename, appConfig.exports.json.mimeType)
  } catch (error) {
    console.error('Failed to export JSON:', error)
  }
}

const exportCSV = async (detailed = false) => {
  try {
    const csvData = await malwareStore.exportToCsv(undefined, detailed)
    const filename = detailed ? 'malware-database-detailed.csv' : appConfig.exports.csv.filename
    downloadFile(csvData, filename, appConfig.exports.csv.mimeType)
  } catch (error) {
    console.error('Failed to export CSV:', error)
  }
}

const exportSigmaRules = async () => {
  try {

    const allRules = []
    const malwareList = safeArray(malwareStore.malwareList)

    for (const malware of malwareList) {
      if (malware && malware.malware_info && malware.malware_info.family) {
        try {
          const sigmaRule = await malwareStore.exportSigmaRule(malware)
          allRules.push(`# ${malware.malware_info.family}\n${sigmaRule}\n\n`)
        } catch (error) {
          console.error(`Failed to generate sigma rule for ${malware.malware_info.family}:`, error)
        }
      }
    }

    const allRulesContent = allRules.join('---\n\n')
    downloadFile(allRulesContent, appConfig.exports.sigma.filename, appConfig.exports.sigma.mimeType)
  } catch (error) {
    console.error('Failed to export Sigma rules:', error)
  }
}

const exportYAML = async () => {
  try {

    const yamlContent = `# EvilMutex Malware Database
# Generated: ${new Date().toISOString()}

malware:
${safeArray(malwareStore.malwareList).map(malware => {
  if (!malware || !malware.malware_info) return ''

  return `  - name: "${malware.malware_info.family || 'Unknown'}"
    category: "${(malware.category || 'unknown').toLowerCase()}"
    family: "${malware.malware_info.family || 'unknown'}"
    description: "${malware.malware_info.description || ''}"
    aliases: ${JSON.stringify(safeArray(malware.malware_info.aliases))}
    primary_tags: ${JSON.stringify(safeArray(malware.primary_tags))}
    mutexes:
${safeArray(malware.mutexes).map(mutex => `      - name: "${mutex?.name || 'Unknown'}"
        analyst: "${mutex?.analyst || 'Unknown'}"
        date_added: "${mutex?.date_added || ''}"
        description: "${mutex?.description || ''}"`).join('\n')}`
}).filter(Boolean).join('\n\n')}
`

    downloadFile(yamlContent, appConfig.exports.yaml.filename, appConfig.exports.yaml.mimeType)
  } catch (error) {
    console.error('Failed to export YAML:', error)
  }
}

const downloadFile = (data, filename, mimeType) => {
  try {
    const blob = new Blob([data], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to download file:', error)
  }
}

const formatDate = (date) => {
  try {
    return date.toISOString().split('T')[0]
  } catch (error) {
    return new Date().toISOString().split('T')[0]
  }
}

const safeValue = (value, fallback = '') => {
  return value !== null && value !== undefined ? value : fallback
}

const safeArray = (value) => {
  return Array.isArray(value) ? value : []
}

const retryLoading = () => {
  malwareStore.loadMalwareData()
}

onMounted(async () => {
  try {
    if (malwareStore.malwareList.length === 0) {
      await malwareStore.loadMalwareData()
    }
    
    const response = await fetch('/data/search-index.json')
    const searchIndex = await response.json()
    const options = {
      keys: ['malware_info.family', 'malware_info.aliases', 'category', 'mutexes.name'],
      includeScore: true,
      threshold: 0.4
    }
    fuse = new Fuse(malwareStore.malwareList, options, Fuse.parseIndex(searchIndex))
  } catch (error) {
    console.error('Failed to initialize store or search index:', error)
  }
})

// Enhanced SEO Meta Tags for Home Page
useSeoMeta({
  title: `${appConfig.app.fullName} - Malware Mutex Database`,
  description: `${appConfig.app.description} - Access comprehensive malware mutex signatures, YARA rules, and threat intelligence data.`,
  keywords: `${appConfig.app.keywords}, malware database, mutex signatures, YARA rules, cybersecurity research, threat hunting`,
  author: 'EvilMutex Team',
  ogTitle: `${appConfig.app.fullName} - Malware Mutex Database`,
  ogDescription: `${appConfig.app.description} - Access comprehensive malware mutex signatures, YARA rules, and threat intelligence data.`,
  ogImage: 'https://evilmutex.org/og-image.png',
  ogUrl: 'https://evilmutex.org/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `${appConfig.app.fullName} - Malware Mutex Database`,
  twitterDescription: `${appConfig.app.description} - Access comprehensive malware mutex signatures and threat intelligence.`,
  twitterImage: 'https://evilmutex.org/og-image.png',
  robots: 'index, follow',
  googleSiteVerification: '' // Add your Google Search Console verification code here
})

// Note: Structured data can be added via SEO modules later if needed
</script>

<style scoped>
</style>