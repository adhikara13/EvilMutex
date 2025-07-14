
export interface MalwareInfo {
  family: string
  aliases: string[]
  description: string
  threat_actor: string
  first_seen: string
}

export interface MutexSignature {
  name: string
  references: string[]
  date_added: string
  analyst: string
}

export interface MalwareData {
  malware_info: MalwareInfo
  category: string
  primary_tags: string[]
  mutexes: MutexSignature[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  total?: number
  page?: number
  limit?: number
}

export interface MalwareListResponse {
  malware: MalwareData[]
  total: number
  categories: string[]
  tags: string[]
}

export interface SearchFilters {
  query?: string
  category?: string
  tags?: string[]
  family?: string
  analyst?: string
  dateFrom?: string
  dateTo?: string
}

export interface SearchResult {
  item: MalwareData
  score: number
  matches: string[]
}

export interface SigmaRule {
  title: string
  id: string
  status: string
  description: string
  license: string
  references: string[]
  author: string
  date: string
  tags: string[]
  logsource: {
    category: string
    product: string
  }
  detection: {
    selection: Record<string, any>
    condition: string
  }
  falsepositives: string[]
  level: string
}

export interface MalwareCard {
  malware: MalwareData
  expanded?: boolean
  showSigmaRule?: boolean
}

export interface StatisticsData {
  totalMalware: number
  totalMutexes: number
  totalFamilies: number
  totalCategories: number
  recentAdditions: number
  topAnalysts: Array<{ name: string; count: number }>
  categoryDistribution: Array<{ category: string; count: number }>
  monthlyGrowth: Array<{ month: string; count: number }>
}

export interface ExportOptions {
  format: 'json' | 'csv' | 'yaml' | 'sigma'
  filters?: SearchFilters
  includeMetadata?: boolean
}

export interface NavigationItem {
  label: string
  to: string
  icon?: string
  badge?: string | number
  children?: NavigationItem[]
}

export interface ThemeConfig {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  mode: 'light' | 'dark' | 'auto'
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export const MALWARE_CATEGORIES = [
  'rat',
  'trojan',
  'ransomware',
  'stealer',
  'keylogger',
  'backdoor',
  'botnet',
  'downloader',
  'rootkit',
  'cryptominer',
  'wiper',
  'adware',
  'spyware'
] as const

export const SIGMA_LEVELS = [
  'low',
  'medium',
  'high',
  'critical'
] as const

export type MalwareCategory = typeof MALWARE_CATEGORIES[number]
export type SigmaLevel = typeof SIGMA_LEVELS[number]