<template>
  <div class="min-h-screen bg-darker text-green-400 flex flex-col">
    <!-- Header with ASCII Art -->
    <header class="p-6 bg-transparent">
      <div class="w-full text-center mb-6">
        <!-- ASCII Art Logo - Full width, no containers -->
        <pre class="ascii-art-large text-lg md:text-xl mb-4 opacity-90 text-green-400 bg-transparent">
███████╗██╗   ██╗██╗██╗         ███╗   ███╗██╗   ██╗████████╗███████╗██╗  ██╗
██╔════╝██║   ██║██║██║         ████╗ ████║██║   ██║╚══██╔══╝██╔════╝╚██╗██╔╝
█████╗  ██║   ██║██║██║         ██╔████╔██║██║   ██║   ██║   █████╗   ╚███╔╝
██╔══╝  ╚██╗ ██╔╝██║██║         ██║╚██╔╝██║██║   ██║   ██║   ██╔══╝   ██╔██╗
███████╗ ╚████╔╝ ██║███████╗    ██║ ╚═╝ ██║╚██████╔╝   ██║   ███████╗██╔╝ ██╗
╚══════╝  ╚═══╝  ╚═╝╚══════╝    ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝
        </pre>

        <div class="text-center">
          <h1 class="text-xl font-bold mb-2 text-green-400">[ MALWARE MUTEX INTELLIGENCE DATABASE ]</h1>
          <p class="text-sm text-gray-400">Advanced Malware Analysis & Threat Intelligence</p>
        </div>
      </div>
    </header>

    <!-- Main Error Content -->
    <main class="flex-1 flex flex-col items-center justify-center bg-darker px-4">
      <div class="w-full text-center">
        <!-- 404 ASCII Art - Full width, no containers -->
        <pre class="ascii-art-large text-red-400 text-xl md:text-2xl mb-8 opacity-90 bg-transparent">
██╗  ██╗ ██████╗ ██╗  ██╗    ███████╗██████╗ ██████╗  ██████╗ ██████╗ 
██║  ██║██╔═══██╗██║  ██║    ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
███████║██║   ██║███████║    █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝
╚════██║██║   ██║╚════██║    ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗
     ██║╚██████╔╝     ██║    ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
     ╚═╝ ╚═════╝      ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
        </pre>

        <!-- Error Message -->
        <div class="max-w-2xl mx-auto space-y-6 mb-8">
          <div class="bg-dark border border-green-400 p-6 rounded font-mono">
            <p class="text-lg text-green-400 mb-4">
              <span class="text-red-400">></span> {{ errorMessage }}
            </p>
            <p class="text-gray-400 text-sm">
              <span class="text-red-400">></span> The requested resource could not be found in our malware database.
            </p>
          </div>

          <!-- Terminal-style suggestions -->
          <div class="bg-dark border border-gray-600 p-6 rounded font-mono text-left">
            <p class="text-green-400 mb-3">
              <span class="text-red-400">root@evilmutex:~$</span> Suggested actions:
            </p>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><span class="text-red-400">></span> Check the URL for typos</li>
              <li><span class="text-red-400">></span> Search our malware database</li>
              <li><span class="text-red-400">></span> Navigate back to homepage</li>
              <li><span class="text-red-400">></span> Report missing signatures</li>
            </ul>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="handleError" 
            class="btn btn-primary px-6 py-3 font-mono text-lg hover:bg-red-900/20 transition-colors"
          >
            <span class="text-red-400">[</span>RETURN_HOME<span class="text-red-400">]</span>
          </button>
          
          <button 
            @click="goBack" 
            class="btn btn-secondary px-6 py-3 font-mono text-lg hover:bg-green-900/20 transition-colors"
          >
            <span class="text-green-400">[</span>GO_BACK<span class="text-green-400">]</span>
          </button>
        </div>

        <!-- Additional Info -->
        <div class="mt-8 text-xs font-mono text-gray-400">
          <p>Error occurred at: {{ currentTime }}</p>
          <p>Request ID: {{ generateRequestId() }}</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
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
            <a href="https://github.com/adhikara13/evilmutex" class="interactive text-gray-400 hover:text-green-400 font-mono">
              <span class="text-red-400">[</span>GITHUB<span class="text-red-400">]</span>
            </a>
            <a href="/docs/" class="interactive text-gray-400 hover:text-green-400 font-mono">
              <span class="text-red-400">[</span>DOCS<span class="text-red-400">]</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

const currentTime = computed(() => {
  return new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
})

const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return 'PAGE_NOT_FOUND'
    case 403:
      return 'ACCESS_DENIED'
    case 500:
      return 'SERVER_ERROR'
    case 503:
      return 'SERVICE_UNAVAILABLE'
    default:
      return 'SYSTEM_ERROR'
  }
})

const errorMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return 'The requested malware signature or page could not be located.'
    case 403:
      return 'Access to this resource is restricted.'
    case 500:
      return 'Internal server error occurred while processing your request.'
    case 503:
      return 'Service temporarily unavailable. Please try again later.'
    default:
      return props.error.statusMessage || 'An unexpected error occurred.'
  }
})

const generateRequestId = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase()
}

const handleError = () => {
  clearError({ redirect: '/' })
}

const goBack = () => {
  if (process.client && window.history.length > 1) {
    window.history.back()
  } else {
    clearError({ redirect: '/' })
  }
}

// Set page title for error pages
useHead({
  title: `${props.error.statusCode} - ${errorTitle.value} | EvilMutex`,
  meta: [
    {
      name: 'description',
      content: `Error ${props.error.statusCode}: ${errorMessage.value}`
    }
  ]
})
</script>

<style scoped>
.ascii-art-large {
  line-height: 1.1;
  white-space: pre;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  width: 100%;
}

.btn {
  transition: all 0.3s ease;
  border: 1px solid;
}

.btn-primary {
  border-color: #ff6b6b;
  color: #ff6b6b;
  background: transparent;
}

.btn-primary:hover {
  background: rgba(255, 107, 107, 0.1);
  box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
}

.btn-secondary {
  border-color: #4ecdc4;
  color: #4ecdc4;
  background: transparent;
}

.btn-secondary:hover {
  background: rgba(78, 205, 196, 0.1);
  box-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
}

.interactive {
  transition: all 0.3s ease;
}

.interactive:hover {
  text-shadow: 0 0 5px currentColor;
}

/* Improved responsive ASCII art */
@media (max-width: 768px) {
  .ascii-art-large {
    font-size: 0.8rem;
    line-height: 1;
  }
}

@media (max-width: 640px) {
  .ascii-art-large {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .ascii-art-large {
    font-size: 0.6rem;
  }
}
</style> 