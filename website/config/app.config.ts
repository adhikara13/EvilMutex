
export const appConfig = {

  app: {
    name: 'EvilMutex',
    fullName: 'EvilMutex - Malware Mutex Intelligence Database',
    description: 'Comprehensive database of malware mutex signatures for threat intelligence and detection. Professional security research platform.',
    keywords: 'malware, mutex, threat intelligence, cybersecurity, detection, sigma rules, enterprise, security platform',
    version: '1.0.0'
  },

  themes: {
    matrix: {
      name: 'MATRIX',
      color: '#00ff00',
      fallbackColor: '#00ff00'
    },
    amber: {
      name: 'AMBER',
      color: '#ffb000',
      fallbackColor: '#ffb000'
    },
    cyber: {
      name: 'CYBER',
      color: '#00ccff',
      fallbackColor: '#00ccff'
    },
    htb: {
      name: 'HTB',
      color: '#9fef00',
      fallbackColor: '#9fef00'
    }
  },

  links: {
    github: {
      main: 'https://github.com/adhikara13/evilmutex',
      repository: 'https://github.com/adhikara13/evilmutex.git',
      issues: 'https://github.com/adhikara13/evilmutex/issues'
    },
    discord: null,
    email: 'contact@evilmutex.org',
    documentation: '/docs/CONTRIBUTING.md'
  },

  contact: {
    channels: [
      {
        name: 'DISCORD',
        description: 'Community chat (Coming Soon)',
        url: null,
        type: 'disabled'
      },
      {
        name: 'GITHUB',
        description: 'Issues & PRs',
        url: 'https://github.com/adhikara13/evilmutex/issues',
        type: 'external'
      },
      {
        name: 'EMAIL',
        description: 'Direct contact',
        url: 'mailto:contact@evilmutex.org',
        type: 'email'
      }
    ]
  },

  repository: {
    primaryRepo: 'git clone https://github.com/adhikara13/evilmutex.git',
    documentation: '/docs/CONTRIBUTING.md'
  },

  api: {
    malwareData: '/data/malware.json'
  },

  storage: {
    themeKey: 'evilmutex-theme'
  },

  datetime: {
    locale: 'en-US',
    timeFormat: {
      hour: '2-digit' as const,
      minute: '2-digit' as const,
      second: '2-digit' as const,
      hour12: false
    },
    dateFormat: {
      year: 'numeric' as const,
      month: '2-digit' as const,
      day: '2-digit' as const
    }
  },

  exports: {
    json: {
      filename: 'malware-database.json',
      mimeType: 'application/json'
    },
    csv: {
      filename: 'malware-database.csv',
      mimeType: 'text/csv'
    },
    yaml: {
      filename: 'malware-database.yaml',
      mimeType: 'text/yaml'
    },
    sigma: {
      filename: 'malware-sigma-rules.txt',
      mimeType: 'text/plain'
    }
  },

  ui: {
    defaultTheme: 'matrix',
    maxPreviewMutexes: 3,
    maxPreviewAliases: 3,
    maxPreviewTags: 4,
    tableMaxHeight: 'max-h-96',
    cardMaxHeight: 'max-h-24',
    timeUpdateInterval: 1000
  },

  text: {
    loading: {
      database: 'Loading malware database...',
      contributors: 'Loading contributor statistics...',
      references: 'Loading reference data...'
    },
    errors: {
      database: 'Failed to load database',
      contributors: 'Error loading contributor data',
      references: 'Error loading reference data',
      copy: 'Failed to copy mutexes',
      export: 'Failed to export data'
    },
    noData: {
      general: 'No data available',
      search: 'No malware entries match your search criteria',
      contributors: 'No contributor data available',
      references: 'No reference data available'
    },
    terminal: {
      prompt: 'root@evilmutex:~$',
      ready: 'Ready to accept new contributors',
      cursor: '_'
    }
  }
} as const

export type AppConfig = typeof appConfig
export type ThemeKey = keyof typeof appConfig.themes
export type ContactChannel = typeof appConfig.contact.channels[0]