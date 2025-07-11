<template>
  <div class="bg-darker min-h-screen text-green-400 font-mono">
    
    <div class="container mx-auto px-12 py-8">
      
      <div class="p-6">
        
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>CONTRIBUTOR_HALL_OF_FAME<span class="text-red-400">]</span>
          </h1>
          <pre class="text-sm text-gray-400 mb-4">
Access Level: <span class="text-red-400">CONTRIBUTOR</span>
Repository Status: <span class="text-green-400">OPEN_SOURCE</span>
Community: <span class="text-yellow-400">ACTIVE</span>
Contributions: <span class="text-green-400">WELCOME</span>
          </pre>
        </div>

        
        <div class="mb-8">
          <h2 class="text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>HOW_TO_CONTRIBUTE<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600 p-4">
            <div class="space-y-4">
              <div class="border-l-2 border-green-400 pl-4">
                <div class="text-green-400 font-bold text-sm mb-2">
                  <span class="text-red-400">01.</span> ADD_NEW_MALWARE_SIGNATURES
                </div>
                <div class="text-muted text-xs">
                  Submit YAML files with new malware mutex signatures following our schema
                </div>
              </div>

              <div class="border-l-2 border-warning pl-4">
                <div class="text-warning font-bold text-sm mb-2">
                  <span class="text-red-400">02.</span> IMPROVE_DETECTION_RULES
                </div>
                <div class="text-muted text-xs">
                  Enhance existing Sigma rules or create new detection patterns
                </div>
              </div>

              <div class="border-l-2 border-secondary pl-4">
                <div class="text-secondary font-bold text-sm mb-2">
                  <span class="text-red-400">03.</span> PLATFORM_DEVELOPMENT
                </div>
                <div class="text-muted text-xs">
                  Contribute to the web platform, API, or data processing tools
                </div>
              </div>

              <div class="border-l-2 border-info pl-4">
                <div class="text-info font-bold text-sm mb-2">
                  <span class="text-red-400">04.</span> DOCUMENTATION_&_RESEARCH
                </div>
                <div class="text-muted text-xs">
                  Write documentation, research papers, or malware analysis reports
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="mb-8">
          <h2 class="text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>CONTRIBUTION_GUIDELINES<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600">
            <div class="border-b border-gray-600 p-4 bg-darker">
              <div class="text-sm font-bold text-green-400">SUBMISSION_REQUIREMENTS</div>
            </div>

            <div class="p-4">
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <span class="text-green-400 text-xs">✓</span>
                  <div class="text-sm">
                    <span class="text-green-400">VERIFIED_SAMPLES:</span>
                    <span class="text-muted ml-2">All malware samples must be verified and documented</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-green-400 text-xs">✓</span>
                  <div class="text-sm">
                    <span class="text-green-400">PROPER_ATTRIBUTION:</span>
                    <span class="text-muted ml-2">Include analyst name, date, and source references</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-green-400 text-xs">✓</span>
                  <div class="text-sm">
                    <span class="text-green-400">SCHEMA_COMPLIANCE:</span>
                    <span class="text-muted ml-2">Follow the EvilMutex YAML schema specification</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-green-400 text-xs">✓</span>
                  <div class="text-sm">
                    <span class="text-green-400">QUALITY_ASSURANCE:</span>
                    <span class="text-muted ml-2">Test submissions thoroughly before creating pull requests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="mb-8">
          <h2 class="text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>REPOSITORY_ACCESS<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600 p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="text-sm font-bold text-green-400 mb-2">
                  <span class="text-red-400">PRIMARY_REPOSITORY:</span>
                </div>
                <div class="bg-darker border border-gray-600 p-3">
                  <code class="text-green-400 text-xs">
                    {{ appConfig.repository.primaryRepo }}
                  </code>
                </div>
              </div>

              <div>
                <div class="text-sm font-bold text-green-400 mb-2">
                  <span class="text-red-400">DOCUMENTATION:</span>
                </div>
                <div class="bg-darker border border-gray-600 p-3">
                  <code class="text-green-400 text-xs">
                    {{ appConfig.links.documentation }}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="mb-8">
          <h2 class="text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>CONTACT_CHANNELS<span class="text-red-400">]</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <template v-for="channel in appConfig.contact.channels" :key="channel.name">
              <!-- Disabled/Non-clickable Discord button -->
              <div
                v-if="channel.type === 'disabled' || !channel.url"
                class="btn btn-outline p-4 text-center opacity-50 cursor-not-allowed"
              >
                <div class="text-sm font-bold">{{ channel.name }}</div>
                <div class="text-xs text-muted">{{ channel.description }}</div>
              </div>
              <!-- Clickable buttons for other channels -->
              <a
                v-else
                :href="channel.url"
                :target="channel.type === 'email' ? undefined : '_blank'"
                class="btn btn-outline p-4 text-center hover:bg-gray-700 transition-colors"
              >
                <div class="text-sm font-bold">{{ channel.name }}</div>
                <div class="text-xs text-muted">{{ channel.description }}</div>
              </a>
            </template>
          </div>
        </div>

        
        <div class="mb-8">
          <h2 class="text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>TOP_CONTRIBUTORS<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600">
            <div class="border-b border-gray-600 p-4 bg-darker">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-bold text-green-400">
                <div>CONTRIBUTOR</div>
                <div>CONTRIBUTIONS</div>
                <div>SPECIALIZATION</div>
                <div>STATUS</div>
              </div>
            </div>

            <div class="p-4">
              <div v-if="contributorStats?.loading" class="text-center py-8">
                <div class="text-green-400">Loading contributor statistics...</div>
              </div>

              <div v-else-if="contributorStats?.error" class="text-center py-8">
                <div class="text-red-400">Error loading contributor data: {{ contributorStats.error }}</div>
              </div>

              <div v-else-if="topContributors?.length > 0">
                <div v-for="(contributor, index) in topContributors" :key="contributor.analyst"
                     :class="{ 'border-b border-gray-600 pb-3 mb-3': index < topContributors.length - 1 }">
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div class="font-bold text-green-400">{{ contributor.analyst }}</div>
                      <div class="text-muted text-xs">{{ contributor.role }}</div>
                    </div>
                    <div class="text-warning">
                      {{ contributor.totalMutexes }} signatures, {{ contributor.familyCount }} families
                    </div>
                    <div>
                      <span class="badge text-xs" :class="getSpecializationBadgeClass(contributor.specialization)">
                        {{ contributor.specialization }}
                      </span>
                    </div>
                    <div>
                      <span class="badge badge-green text-xs">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <div class="text-muted">No contributor data available</div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="mb-8">
          <h2 class="text-xl font-bold text-green-400 mb-4">
            <span class="text-red-400">[</span>REFERENCES_&_SOURCES<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600">
            <div class="border-b border-gray-600 p-4 bg-darker">
              <div class="text-sm font-bold text-green-400">DATA_SOURCES</div>
              <div class="text-xs text-muted">Cybersecurity researchers and organizations who contributed to the EvilMutex database</div>
            </div>

            <div class="p-4">
              
              <div v-if="referenceData.loading" class="text-center py-8">
                <div class="text-green-400 text-sm">Loading reference data...</div>
              </div>

              
              <div v-else-if="referenceData.error" class="text-center py-8">
                <div class="text-red-400 text-sm">Error loading reference data: {{ referenceData.error }}</div>
              </div>

              
              <div v-else-if="referenceSources.length === 0" class="text-center py-8">
                <div class="text-muted text-sm">No reference data available</div>
              </div>

              
              <div v-else>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-green-400 mb-4">
                  <div>SOURCE</div>
                  <div class="text-right">REFERENCES</div>
                </div>

                <div class="space-y-2">
                  <div v-for="source in referenceSources" :key="source.domain"
                       class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-b border-gray-600 pb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-green-400">►</span>
                      <a
                        :href="`https://${source.domain}`"
                        target="_blank"
                        class="text-blue-400 hover:text-blue-300 underline"
                      >
                        {{ source.domain }}
                      </a>
                    </div>
                    <div class="text-right text-warning font-mono">
                      {{ source.count }}
                    </div>
                  </div>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-600">
                  <div class="flex justify-between text-sm">
                    <span class="text-muted">Total references across all sources:</span>
                    <span class="text-green-400 font-mono font-bold">{{ totalReferences }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="border-t border-gray-600 pt-4">
          <div class="text-sm text-muted">
            <span class="text-red-400">root@evilmutex:~$</span>
            <span class="terminal-cursor">Ready to accept new contributors</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { appConfig } from '~/config/app.config'

const malwareStore = useMalwareStore()

const contributorStats = ref({
  loading: true,
  error: null,
  data: []
})

const referenceData = ref({
  loading: true,
  error: null,
  data: []
})

const calculateContributorStats = () => {
  try {
    if (!malwareStore?.malwareList || malwareStore.malwareList.length === 0) {
      contributorStats.value = {
        loading: false,
        error: null,
        data: []
      }
      return
    }

    const stats = {}

    malwareStore.malwareList.forEach(malware => {
      if (malware.mutexes && Array.isArray(malware.mutexes)) {
        malware.mutexes.forEach(mutex => {
          const analyst = mutex.analyst || 'Unknown Analyst'

          if (!stats[analyst]) {
            stats[analyst] = {
              analyst: analyst,
              totalMutexes: 0,
              families: new Set(),
              categories: new Set(),
              role: 'Security Researcher'
            }
          }

          stats[analyst].totalMutexes++
          stats[analyst].families.add(malware.malware_info?.family || 'Unknown')
          stats[analyst].categories.add(malware.category || 'unknown')
        })
      }
    })

    const contributorData = Object.values(stats).map(stat => ({
      ...stat,
      familyCount: stat.families.size,
      specialization: getSpecialization(stat.categories)
    }))

    contributorData.sort((a, b) =>
      (b.totalMutexes + b.familyCount) - (a.totalMutexes + a.familyCount)
    )

    contributorStats.value = {
      loading: false,
      error: null,
      data: contributorData
    }

  } catch (error) {
    console.error('Error calculating contributor stats:', error)
    contributorStats.value = {
      loading: false,
      error: error.message,
      data: []
    }
  }
}

const getSpecialization = (categories) => {
  const categoryArray = Array.from(categories)

  if (categoryArray.includes('ransomware')) return 'RANSOMWARE'
  if (categoryArray.includes('rat')) return 'RAT'
  if (categoryArray.includes('trojan')) return 'TROJAN'
  if (categoryArray.includes('worm')) return 'WORM'
  if (categoryArray.length > 1) return 'MULTI_THREAT'

  return 'MALWARE'
}

const getSpecializationBadgeClass = (specialization) => {
  const badgeClasses = {
    'RANSOMWARE': 'badge-red',
    'RAT': 'badge-purple',
    'TROJAN': 'badge-orange',
    'WORM': 'badge-yellow',
    'MULTI_THREAT': 'badge-blue',
    'MALWARE': 'badge-gray'
  }

  return badgeClasses[specialization] || 'badge-gray'
}

const extractDomain = (url) => {
  try {
    const urlObj = new URL(url)
    let domain = urlObj.hostname

    if (domain.startsWith('www.')) {
      domain = domain.substring(4)
    }

    return domain
  } catch (error) {

    const match = url.match(/https?:\/\/([^\/]+)/)
    if (match) {
      let domain = match[1]
      if (domain.startsWith('www.')) {
        domain = domain.substring(4)
      }
      return domain
    }
    return url
  }
}

const referenceSources = computed(() => {
  if (!referenceData.value.data || referenceData.value.data.length === 0) {
    return []
  }

  const domainCounts = new Map()

  referenceData.value.data.forEach(malware => {
    if (malware.mutexes && Array.isArray(malware.mutexes)) {
      malware.mutexes.forEach(mutex => {
        if (mutex.references && Array.isArray(mutex.references)) {
          mutex.references.forEach(ref => {
            const domain = extractDomain(ref)
            domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1)
          })
        }
      })
    }
  })

  const sortedSources = Array.from(domainCounts.entries())
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)

  return sortedSources
})

const totalReferences = computed(() => {
  return referenceSources.value.reduce((sum, source) => sum + source.count, 0)
})

const topContributors = computed(() => {
  if (!contributorStats.value.data) return []

  return contributorStats.value.data.slice(0, 10)
})

onMounted(async () => {
  try {

    if (malwareStore && typeof malwareStore.loadMalwareData === 'function') {
      await malwareStore.loadMalwareData()
    }

    calculateContributorStats()

    try {
      const response = await fetch(appConfig.api.malwareData)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      referenceData.value = {
        loading: false,
        error: null,
        data: data.malware || []
      }
    } catch (err) {
      referenceData.value = {
        loading: false,
        error: err.message,
        data: []
      }
      console.error('Error loading malware data for references:', err)
    }

  } catch (error) {
    console.error('Error loading contributor data:', error)
    contributorStats.value = {
      loading: false,
      error: error.message,
      data: []
    }
  }
})

watch(() => malwareStore?.malwareList, () => {
  calculateContributorStats()
}, { deep: true })

useHead({
  title: 'Contributors - EvilMutex Project',
  meta: [
    {
      name: 'description',
      content: 'Join the EvilMutex community of security researchers and malware analysts. Contribute to the open-source malware mutex intelligence platform.'
    },
    {
      name: 'keywords',
      content: 'malware research, contributors, open source, cybersecurity, threat intelligence'
    }
  ]
})
</script>

<style scoped>

.terminal-cursor {
  position: relative;
}

.terminal-cursor::after {
  content: "_";
  animation: blink 1s infinite;
  color: var(--cursor-color);
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>
