import * as yaml from 'yaml'
import * as Papa from 'papaparse'
import { format } from 'date-fns'
import type {
  MalwareData,
  MalwareListResponse,
  SigmaRule,
  SearchFilters,
  ExportOptions,
  StatisticsData
} from '~/types'

export function parseYamlMalware(yamlContent: string): MalwareData {
  try {
    const parsed = yaml.parse(yamlContent) as MalwareData

    if (!parsed.malware_info || !parsed.mutexes || !Array.isArray(parsed.mutexes)) {
      throw new Error('Invalid malware data structure')
    }

    return parsed
  } catch (error) {
    console.error('Error parsing YAML malware data:', error)
    throw error
  }
}

export function generateJsonResponse(
  malwareList: MalwareData[],
  filters?: SearchFilters
): MalwareListResponse {
  let filteredData = [...malwareList]

  if (filters) {
    filteredData = applyFilters(filteredData, filters)
  }

  const categories = [...new Set(filteredData.map(m => m.category?.toLowerCase()))]
  const tags = [...new Set(filteredData.flatMap(m => m.primary_tags))]

  return {
    malware: filteredData,
    total: filteredData.length,
    categories: categories.sort(),
    tags: tags.sort()
  }
}

export function generateCsvExport(
  malwareList: MalwareData[],
  options: ExportOptions = { format: 'csv' }
): string {
  const csvData: any[] = []

  // Validate input
  if (!Array.isArray(malwareList)) {
    console.warn('generateCsvExport received non-array:', malwareList)
    return ''
  }

  malwareList.forEach(malware => {
    // Skip invalid malware entries
    if (!malware || !malware.malware_info || !Array.isArray(malware.mutexes)) {
      console.warn('Skipping invalid malware entry:', malware)
      return
    }

    const allMutexes = malware.mutexes.map(m => m.name).join(' | ')
    const allAnalysts = [...new Set(malware.mutexes.map(m => m.analyst))].join('; ')
    const allDates = [...new Set(malware.mutexes.map(m => m.date_added))].join('; ')
    const allReferences = [...new Set(malware.mutexes.flatMap(m => Array.isArray(m.references) ? m.references : []))].join(' | ')

    csvData.push({
      malware_family: malware.malware_info.family,
      category: malware.category?.toLowerCase(),
      mutex_count: malware.mutexes.length,
      mutex_names: allMutexes,
      aliases: Array.isArray(malware.malware_info.aliases) ? malware.malware_info.aliases.join('; ') : '',
      tags: Array.isArray(malware.primary_tags) ? malware.primary_tags.join('; ') : '',
      description: malware.malware_info.description,
      threat_actor: malware.malware_info.threat_actor || 'Unknown',
      first_seen: malware.malware_info.first_seen || 'Unknown',
      analysts: allAnalysts,
      dates_added: allDates,
      references: allReferences
    })
  })

  return Papa.unparse(csvData, {
    header: true,
    delimiter: ',',
    quotes: true
  })
}

export function generateDetailedCsvExport(
  malwareList: MalwareData[],
  options: ExportOptions = { format: 'csv' }
): string {
  const csvData: any[] = []

  // Validate input
  if (!Array.isArray(malwareList)) {
    console.warn('generateDetailedCsvExport received non-array:', malwareList)
    return ''
  }

  malwareList.forEach(malware => {
    // Skip invalid malware entries
    if (!malware || !malware.malware_info || !Array.isArray(malware.mutexes)) {
      console.warn('Skipping invalid malware entry:', malware)
      return
    }
    malware.mutexes.forEach(mutex => {
      // Skip invalid mutex entries
      if (!mutex || typeof mutex.name !== 'string') {
        console.warn('Skipping invalid mutex entry:', mutex)
        return
      }
      
      csvData.push({
        malware_family: malware.malware_info.family,
        category: malware.category?.toLowerCase(),
        mutex_name: mutex.name,
        analyst: mutex.analyst,
        date_added: mutex.date_added,
        references: Array.isArray(mutex.references) ? mutex.references.join('; ') : '',
        tags: Array.isArray(malware.primary_tags) ? malware.primary_tags.join('; ') : '',
        aliases: Array.isArray(malware.malware_info.aliases) ? malware.malware_info.aliases.join('; ') : '',
        threat_actor: malware.malware_info.threat_actor,
        first_seen: malware.malware_info.first_seen,
        description: malware.malware_info.description
      })
    })
  })

  return Papa.unparse(csvData, {
    header: true,
    delimiter: ',',
    quotes: true
  })
}

export function generateSigmaRule(malware: MalwareData): SigmaRule {
  const mutexNames = malware.mutexes.map(m => m.name)
  const currentDate = format(new Date(), 'yyyy/MM/dd')
  const analysts = [...new Set(malware.mutexes.map(m => m.analyst || 'uncredited'))].sort().join(' & ')

  return {
    title: `${malware.malware_info.family} Mutex Detection`,
    id: `evil-mutex-${malware.malware_info.family.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    status: 'experimental',
    description: `Detects mutexes associated with ${malware.malware_info.family} malware family`,
    license: 'Detection Rule License 1.1 https://github.com/Neo23x0/signature-base/blob/master/LICENSE',
    references: [
      ...new Set(malware.mutexes.flatMap(m => m.references))
    ],
    author: analysts,
    date: currentDate,
    tags: [
      'attack.defense_evasion',
      'attack.t1027',
      `malware.${malware.category?.toLowerCase()}`,
      ...malware.primary_tags.map(tag => `malware.${tag}`)
    ],
    logsource: {
      category: 'process_creation',
      product: 'windows'
    },
    detection: {
      selection: {
        'Image|endswith': [
          '\\CreateMutex',
          '\\OpenMutex'
        ],
        'CommandLine|contains': mutexNames
      },
      condition: 'selection'
    },
    falsepositives: [
      'Unknown',
      'Legitimate applications using similar mutex names'
    ],
    level: determineSigmaLevel(malware)
  }
}

function determineSigmaLevel(malware: MalwareData): string {
  const criticalCategories = ['ransomware', 'wiper', 'rootkit']
  const highCategories = ['rat', 'backdoor', 'stealer']
  const mediumCategories = ['trojan', 'keylogger', 'downloader']

  const normalizedCategory = malware.category?.toLowerCase()

  if (criticalCategories.includes(normalizedCategory)) {
    return 'critical'
  } else if (highCategories.includes(normalizedCategory)) {
    return 'high'
  } else if (mediumCategories.includes(normalizedCategory)) {
    return 'medium'
  }

  return 'low'
}

function applyFilters(malwareList: MalwareData[], filters: SearchFilters): MalwareData[] {
  return malwareList.filter(malware => {

    if (filters.query) {
      const searchText = filters.query.toLowerCase()
      const searchableText = [
        malware.malware_info.family,
        malware.malware_info.family,
        malware.malware_info.description,
        ...malware.malware_info.aliases,
        ...malware.primary_tags,
        ...malware.mutexes.map(m => m.name)
      ].join(' ').toLowerCase()

      if (!searchableText.includes(searchText)) {
        return false
      }
    }

    if (filters.category && malware.category?.toLowerCase() !== filters.category.toLowerCase()) {
      return false
    }

    if (filters.tags && filters.tags.length > 0) {
      if (!filters.tags.some(tag => malware.primary_tags.includes(tag))) {
        return false
      }
    }

    if (filters.family && malware.malware_info.family !== filters.family) {
      return false
    }

    if (filters.analyst) {
      if (!malware.mutexes.some(m => m.analyst === filters.analyst)) {
        return false
      }
    }

    if (filters.dateFrom || filters.dateTo) {
      const malwareDates = malware.mutexes.map(m => new Date(m.date_added))
      const minDate = Math.min(...malwareDates.map(d => d.getTime()))
      const maxDate = Math.max(...malwareDates.map(d => d.getTime()))

      if (filters.dateFrom && minDate < new Date(filters.dateFrom).getTime()) {
        return false
      }

      if (filters.dateTo && maxDate > new Date(filters.dateTo).getTime()) {
        return false
      }
    }

    return true
  })
}

export function generateStatistics(malwareList: MalwareData[]): StatisticsData {
  try {

    if (!Array.isArray(malwareList)) {
      console.warn('generateStatistics received non-array:', malwareList)
      malwareList = []
    }

    const validMalware = malwareList.filter(m =>
      m &&
      m.malware_info &&
              m.malware_info.family &&
      m.malware_info.family &&
      Array.isArray(m.mutexes)
    )

    const totalMutexes = validMalware.reduce((sum, m) => {
      try {
        return sum + (m.mutexes?.length || 0)
      } catch (error) {
        console.error('Error calculating mutex count for malware:', m, error)
        return sum
      }
    }, 0)

    const families = [...new Set(validMalware
      .filter(m => m.malware_info?.family)
      .map(m => m.malware_info.family)
    )]

    const categories = [...new Set(validMalware
      .filter(m => m.category)
      .map(m => m.category.toLowerCase())
    )]

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentAdditions = validMalware.filter(m => {
      try {
        if (!m.mutexes || !Array.isArray(m.mutexes)) return false
        return m.mutexes.some(mutex => {
          try {
            return mutex?.date_added && new Date(mutex.date_added) > thirtyDaysAgo
          } catch (error) {
            console.error('Error parsing date for mutex:', mutex, error)
            return false
          }
        })
      } catch (error) {
        console.error('Error checking recent additions for malware:', m, error)
        return false
      }
    }).length

    const analystCounts = new Map<string, number>()
    validMalware.forEach(m => {
      try {
        if (!m.mutexes || !Array.isArray(m.mutexes)) return

        m.mutexes.forEach(mutex => {
          try {
            if (mutex?.analyst) {
              analystCounts.set(mutex.analyst, (analystCounts.get(mutex.analyst) || 0) + 1)
            }
          } catch (error) {
            console.error('Error processing mutex analyst:', mutex, error)
          }
        })
      } catch (error) {
        console.error('Error processing malware mutexes:', m, error)
      }
    })

    const topAnalysts = Array.from(analystCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const categoryDistribution = categories.map(category => ({
      category,
      count: validMalware.filter(m => m.category?.toLowerCase() === category).length
    }))

    const monthlyGrowth = generateMonthlyGrowth(validMalware)

    return {
      totalMalware: validMalware.length,
      totalMutexes,
      totalFamilies: families.length,
      totalCategories: categories.length,
      recentAdditions,
      topAnalysts,
      categoryDistribution,
      monthlyGrowth
    }
  } catch (error) {
    console.error('Error generating statistics:', error)
    return {
      totalMalware: 0,
      totalMutexes: 0,
      totalFamilies: 0,
      totalCategories: 0,
      recentAdditions: 0,
      topAnalysts: [],
      categoryDistribution: [],
      monthlyGrowth: []
    }
  }
}

function generateMonthlyGrowth(malwareList: MalwareData[]): Array<{ month: string; count: number }> {
  try {
    if (!Array.isArray(malwareList)) {
      console.warn('generateMonthlyGrowth received non-array:', malwareList)
      return []
    }

    const monthlyData = new Map<string, number>()

    malwareList.forEach(malware => {
      try {
        if (!malware?.mutexes || !Array.isArray(malware.mutexes)) return

        malware.mutexes.forEach(mutex => {
          try {
            if (!mutex?.date_added) return

            const date = new Date(mutex.date_added)

            if (isNaN(date.getTime())) {
              // The validator should prevent this, but as a safeguard:
              console.warn('Skipping invalid date for monthly growth calculation:', mutex.date_added)
              return
            }

            const monthKey = format(date, 'yyyy-MM')
            monthlyData.set(monthKey, (monthlyData.get(monthKey) || 0) + 1)
          } catch (error) {
            console.error('Error processing mutex date:', mutex, error)
          }
        })
      } catch (error) {
        console.error('Error processing malware for monthly growth:', malware, error)
      }
    })

    const months = []
    for (let i = 11; i >= 0; i--) {
      try {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const monthKey = format(date, 'yyyy-MM')
        months.push({
          month: format(date, 'MMM yyyy'),
          count: monthlyData.get(monthKey) || 0
        })
      } catch (error) {
        console.error('Error generating month data:', error)
      }
    }

    return months
  } catch (error) {
    console.error('Error generating monthly growth:', error)
    return []
  }
}

export function generateBadgeJson(malwareList: MalwareData[]): { malware: string; mutexes: string } {
  try {
    if (!Array.isArray(malwareList)) {
      console.warn('generateBadgeJson received non-array:', malwareList)
      malwareList = []
    }

    const validMalware = malwareList.filter(m =>
      m &&
      m.malware_info &&
      m.malware_info.family &&
      Array.isArray(m.mutexes)
    )

    const totalMalware = validMalware.length
    const totalMutexes = validMalware.reduce((sum, m) => {
      try {
        return sum + (m.mutexes?.length || 0)
      } catch (error) {
        console.error('Error calculating mutex count for malware:', m, error)
        return sum
      }
    }, 0)

    // Generate JSON for shields.io endpoint badges
    const malwareBadge = {
      schemaVersion: 1,
      label: 'Malware Families',
      message: totalMalware.toString(),
      color: 'red'
    }

    const mutexesBadge = {
      schemaVersion: 1,
      label: 'Total Mutexes',
      message: totalMutexes.toString(),
      color: 'blue'
    }

    return {
      malware: JSON.stringify(malwareBadge, null, 2),
      mutexes: JSON.stringify(mutexesBadge, null, 2)
    }
  } catch (error) {
    console.error('Error generating badge JSON:', error)
    return {
      malware: JSON.stringify({
        schemaVersion: 1,
        label: 'Malware Families',
        message: '0',
        color: 'red'
      }, null, 2),
      mutexes: JSON.stringify({
        schemaVersion: 1,
        label: 'Total Mutexes',
        message: '0',
        color: 'blue'
      }, null, 2)
    }
  }
}

export function validateYamlStructure(yamlContent: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  try {
    const data = yaml.parse(yamlContent) as MalwareData

    if (!data.malware_info) {
      errors.push('Missing malware_info section')
    } else {

      if (!data.malware_info.family) errors.push('Missing malware_info.family')
      if (!data.malware_info.description) errors.push('Missing malware_info.description')
      if (!data.malware_info.first_seen) errors.push('Missing malware_info.first_seen')
    }

    if (!data.category) {
      errors.push('Missing category')
    }

    if (!data.mutexes || !Array.isArray(data.mutexes)) {
      errors.push('Missing or invalid mutexes array')
    } else {
      data.mutexes.forEach((mutex, index) => {
        if (!mutex.name) errors.push(`Missing mutex[${index}].name`)
        if (!mutex.analyst) errors.push(`Missing mutex[${index}].analyst`)
        if (!mutex.date_added) {
          errors.push(`Missing mutex[${index}].date_added`)
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(mutex.date_added)) {
          errors.push(`Invalid date format for mutex[${index}].date_added. Expected YYYY-MM-DD.`)
        }
      })
    }

  } catch (error) {
    errors.push(`YAML parsing error: ${error}`)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}